import "dotenv/config";
import {generateText, type ModelMessage} from "ai";
import {openai} from "@ai-sdk/openai";
import {SYSTEM_PROMPT} from "./system/prompt";
import { tools } from "./tools/index.ts";
import { executeTool } from "./executeTools.ts";
import type {AgentCallbacks} from "../types.ts";
const MODEL_NAME = "gpt-6-luna";

export async function runAgent (
    userMessage: string, 
    conversationHistory: ModelMessage[], 
    callbacks: AgentCallbacks,
): Promise<any> {
    const {text, toolCalls} = await generateText({
        model: openai(MODEL_NAME),
        prompt: userMessage,
        system: SYSTEM_PROMPT,
        tools,
    });

    console.log(text, toolCalls);


}

runAgent("Hello, is this text coming through. Can you tell me what the current time is? Along with the date?")
