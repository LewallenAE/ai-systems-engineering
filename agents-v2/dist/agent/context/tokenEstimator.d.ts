import type { ModelMessage } from "ai";
/**
 * Estimate token count from text using simple character division.
 * Uses 3.75 as the divisor (midpoint of 3.5-4 range).
 * This is an approximation - not exact tokenization.
 */
export declare function estimateTokens(text: string): number;
/**
 * Extract text content from a message.
 * Handles different message content formats (string, array, objects).
 */
export declare function extractMessageText(message: ModelMessage): string;
export interface TokenUsage {
    input: number;
    output: number;
    total: number;
}
/**
 * Estimate token counts for an array of messages.
 * Separates input (user, system, tool) from output (assistant) tokens.
 */
export declare function estimateMessagesTokens(messages: ModelMessage[]): TokenUsage;
