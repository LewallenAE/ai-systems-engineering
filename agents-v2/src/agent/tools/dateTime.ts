import { tool } from "ai";
import { z } from "zod";

export const getDateTime = tool({
    description: "This tool is used to get the current date and time. Use this for any task where time is needed.",
    inputSchema: z.object({}),
    execute: async () => {
        return new Date().toISOString();
    },
});