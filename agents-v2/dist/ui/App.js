import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import { Box, Text, useApp } from "ink";
import { runAgent } from "../agent/run.js";
import { MessageList } from "./components/MessageList.js";
import { ToolCall } from "./components/ToolCall.js";
import { Spinner } from "./components/Spinner.js";
import { Input } from "./components/Input.js";
import { ToolApproval } from "./components/ToolApproval.js";
import { TokenUsage } from "./components/TokenUsage.js";
export function App() {
    const { exit } = useApp();
    const [messages, setMessages] = useState([]);
    const [conversationHistory, setConversationHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [streamingText, setStreamingText] = useState("");
    const [activeToolCalls, setActiveToolCalls] = useState([]);
    const [pendingApproval, setPendingApproval] = useState(null);
    const [tokenUsage, setTokenUsage] = useState(null);
    const handleSubmit = useCallback(async (userInput) => {
        if (userInput.toLowerCase() === "exit" ||
            userInput.toLowerCase() === "quit") {
            exit();
            return;
        }
        setMessages((prev) => [...prev, { role: "user", content: userInput }]);
        setIsLoading(true);
        setStreamingText("");
        setActiveToolCalls([]);
        try {
            const newHistory = await runAgent(userInput, conversationHistory, {
                onToken: (token) => {
                    setStreamingText((prev) => prev + token);
                },
                onToolCallStart: (name, args) => {
                    setActiveToolCalls((prev) => [
                        ...prev,
                        {
                            id: `${name}-${Date.now()}`,
                            name,
                            args,
                            status: "pending",
                        },
                    ]);
                },
                onToolCallEnd: (name, result) => {
                    setActiveToolCalls((prev) => prev.map((tc) => tc.name === name && tc.status === "pending"
                        ? { ...tc, status: "complete", result }
                        : tc));
                },
                onComplete: (response) => {
                    if (response) {
                        setMessages((prev) => [
                            ...prev,
                            { role: "assistant", content: response },
                        ]);
                    }
                    setStreamingText("");
                    setActiveToolCalls([]);
                },
                onToolApproval: (name, args) => {
                    return new Promise((resolve) => {
                        setPendingApproval({ toolName: name, args, resolve });
                    });
                },
                onTokenUsage: (usage) => {
                    setTokenUsage(usage);
                },
            });
            setConversationHistory(newHistory);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: `Error: ${errorMessage}` },
            ]);
        }
        finally {
            setIsLoading(false);
        }
    }, [conversationHistory, exit]);
    return (_jsxs(Box, { flexDirection: "column", padding: 1, children: [_jsxs(Box, { marginBottom: 1, children: [_jsx(Text, { bold: true, color: "magenta", children: "\uD83E\uDD16 AI Agent" }), _jsx(Text, { dimColor: true, children: " (type \"exit\" to quit)" })] }), _jsxs(Box, { flexDirection: "column", marginBottom: 1, children: [_jsx(MessageList, { messages: messages }), streamingText && (_jsxs(Box, { flexDirection: "column", marginTop: 1, children: [_jsx(Text, { color: "green", bold: true, children: "\u203A Assistant" }), _jsxs(Box, { marginLeft: 2, children: [_jsx(Text, { children: streamingText }), _jsx(Text, { color: "gray", children: "\u258C" })] })] })), activeToolCalls.length > 0 && !pendingApproval && (_jsx(Box, { flexDirection: "column", marginTop: 1, children: activeToolCalls.map((tc) => (_jsx(ToolCall, { name: tc.name, args: tc.args, status: tc.status, result: tc.result }, tc.id))) })), isLoading && !streamingText && activeToolCalls.length === 0 && !pendingApproval && (_jsx(Box, { marginTop: 1, children: _jsx(Spinner, {}) })), pendingApproval && (_jsx(ToolApproval, { toolName: pendingApproval.toolName, args: pendingApproval.args, onResolve: (approved) => {
                            pendingApproval.resolve(approved);
                            setPendingApproval(null);
                        } }))] }), !pendingApproval && (_jsx(Input, { onSubmit: handleSubmit, disabled: isLoading })), _jsx(TokenUsage, { usage: tokenUsage })] }));
}
