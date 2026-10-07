import "dotenv/config";
import {generateText, type ModelMessage} from "ai";
import {openai} from "@ai-sdk/openai";
import {getTracer, Laminar} from "@lmnr-ai/lmnr"
import {SYSTEM_PROMPT} from "./system/prompt.ts";
import { tools } from "./tools/index.ts";
import { executeTool } from "./executeTools.ts";
import type {AgentCallbacks} from "../types.ts";
const MODEL_NAME = "gpt-6-luna";

Laminar.initialize({
    projectApiKey: process.env.LMNR_API_KEY,
});

export async function runAgent (
    userMessage: string, 
    conversationHistory: ModelMessage[], 
    callbacks: AgentCallbacks,
): Promise<any> {

    const {text, toolCalls} = await generateText({
        model: openai(MODEL_NAME),
        prompt: userMessage,
        // messages: [],
        system: SYSTEM_PROMPT,
        tools,
        experimental_telemetry: {
            isEnabled: true,
            tracer: getTracer(),
        }
        // temperature: 0,
        // stopWhen: stepCountIs(2),
    });

    await Laminar.flush();

    console.log(text, toolCalls);

    // better to use a for loop instead of forEach forEach doesn't await promises returned form the callbacks.
    toolCalls.forEach(async (tc) => {
        console.log(await executeTool(tc.toolName, tc.input))
    });

}

runAgent("Hello, is this text coming through. Can you tell me what the current time is? Along with the date?", 
    [], 
    {} as AgentCallbacks
);
