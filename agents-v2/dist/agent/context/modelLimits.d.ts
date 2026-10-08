import type { ModelLimits } from "../../types.ts";
/**
 * Default threshold for context window usage (80%)
 */
export declare const DEFAULT_THRESHOLD = 0.8;
/**
 * Get token limits for a specific model.
 * Falls back to default limits if model not found.
 * Matches GPT-5 variants (gpt-5, gpt-5-mini, etc.)
 */
export declare function getModelLimits(model: string): ModelLimits;
/**
 * Check if token usage exceeds the threshold
 */
export declare function isOverThreshold(totalTokens: number, contextWindow: number, threshold?: number): boolean;
/**
 * Calculate usage percentage
 */
export declare function calculateUsagePercentage(totalTokens: number, contextWindow: number): number;
