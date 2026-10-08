import "dotenv/config";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { getTracer, Laminar } from '@lmnr-ai/lmnr';
import { SYSTEM_PROMPT } from "./system/prompt.js";
import { tools } from "./tools/index.js";
const MODEL_NAME = "gpt-6-luna";
Laminar.initialize({
    projectApiKey: process.env.LMNR_API_KEY,
});
export async function runAgent(userMessage, conversationHistory, callbacks) {
    const { text, toolCalls } = await generateText({
        model: openai(MODEL_NAME),
        prompt: userMessage,
        system: SYSTEM_PROMPT,
        tools,
        experimental_telemetry: {
            isEnabled: true,
            tracer: getTracer()
        },
    });
    console.log(text, toolCalls);
}
runAgent("Hello, is this text coming through. Can you tell me what the current time is? Along with the date?", []);
