import {generateText, stepCountIs, tool, type ToolSet} from "ai";
import {openai} from "@ai-sdk/openai";
import {z} from "zod";

import type {
  EvalData,
  SingleTurnResult,
  MultiTurnEvalData,
  MultiTurnResult,
} from "./types.ts";

const TOOL_DEFINITIONS: any = {
  readFile: {
    description: "Read the contents of a file at the specified path",
    parameters: z.object({
    path: z.string().describe("the path to the file you want to read"),
    }),
  },
  writeFile: {
    description: "Write items to the contents of a file at the specified file path",
    parameters: z.object({
    path: z.string().describe("The content that you want to write to a file"),
  }),
},
  listFiles: {
    description: "List the name and type of files at the specified file path",
    parameters: z.object({
    path: z.string().describe("the path or directory to the files you want to list"),
  }),
},
  deleteFIle: {
    description: "Delete the named file at the specified file path.",
    parameters: z.object({
    path: z.string().describe("the path to the file you want to delete"),
  }),
},
  runCommand: {
    description: "Exceute a shell command and return its output",
    parameters: z.object({
    command: z.string().describe("the path to the file you want to read"),
  }),
},
};

export const singleTurnExecutor = async (data: EvalData) => {
  const messages = buildMessages(data);

  const tools: ToolSet = {};
  for (const toolName of data.tools) {
    const def = TOOL_DEFINITIONS[toolName];

    if (def) {
      tools[toolName] = tool({
        description: def.description,
        inputSchema: def.parameters,
      });
    }
  }

  const {toolCalls} = await generateText({
    model: openai(data.config?.model ?? "gpt-5-mini"),
    messages,
    tools,
    stopWhen: stepCountIs(1),
    temperature: data.config?.temperature ?? undefined,
  });

  const calls = toolCalls.map(tc => ({
    toolName: tc.toolName,
    args: 'args' in tc? tc.args : {},
  }));

  const toolNames = toolCalls.map(tc => tc.toolName);

  return{
    toolCalls,
    toolNames,
    selectedAny: toolNames.length > 0,
  }
}