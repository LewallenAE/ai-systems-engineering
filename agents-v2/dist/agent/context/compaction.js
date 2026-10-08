import { extractMessageText } from "./tokenEstimator.js";
const SUMMARIZATION_PROMPT = `
`;
/**
 * Format messages array as readable text for summarization
 */
function messagesToText(messages) {
    return messages
        .map((msg) => {
        const role = msg.role.toUpperCase();
        const content = extractMessageText(msg);
        return `[${role}]: ${content}`;
    })
        .join("\n\n");
}
/**
 * Compact a conversation by summarizing it with an LLM.
 *
 * Takes the current messages (excluding system prompt) and returns a new
 * messages array with:
 * - A user message containing the summary
 * - An assistant acknowledgment
 *
 * The system prompt should be prepended by the caller.
 */
export async function compactConversation(messages, model = "gpt-5-mini") {
    // Filter out system messages - they're handled separately
    //
}
