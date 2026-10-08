import { AgentCallbacks } from './../../dist/types.d';
import "dotenv/config";
import { type ModelMessage } from "ai";
export declare function runAgent(userMessage: string, conversationHistory: ModelMessage[], callbacks: AgentCallbacks): Promise<any>;
