import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Text, useInput } from "ink";
const MAX_PREVIEW_LINES = 5;
function formatArgs(args) {
    const formatted = JSON.stringify(args, null, 2);
    const lines = formatted.split("\n");
    if (lines.length <= MAX_PREVIEW_LINES) {
        return { preview: formatted, extraLines: 0 };
    }
    const preview = lines.slice(0, MAX_PREVIEW_LINES).join("\n");
    const extraLines = lines.length - MAX_PREVIEW_LINES;
    return { preview, extraLines };
}
function getArgsSummary(args) {
    if (typeof args !== "object" || args === null) {
        return String(args);
    }
    const obj = args;
    // Try to find a meaningful key to show inline
    const meaningfulKeys = ["path", "filePath", "command", "query", "code", "content"];
    for (const key of meaningfulKeys) {
        if (key in obj && typeof obj[key] === "string") {
            const value = obj[key];
            // Truncate long values
            if (value.length > 50) {
                return value.slice(0, 50) + "...";
            }
            return value;
        }
    }
    // Fall back to first string key
    const keys = Object.keys(obj);
    if (keys.length > 0 && typeof obj[keys[0]] === "string") {
        const value = obj[keys[0]];
        if (value.length > 50) {
            return value.slice(0, 50) + "...";
        }
        return value;
    }
    return "";
}
export function ToolApproval({ toolName, args, onResolve }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const options = ["Yes", "No"];
    useInput((input, key) => {
        if (key.upArrow || key.downArrow) {
            setSelectedIndex((prev) => (prev === 0 ? 1 : 0));
            return;
        }
        if (key.return) {
            onResolve(selectedIndex === 0);
        }
    }, { isActive: true });
    const argsSummary = getArgsSummary(args);
    const { preview, extraLines } = formatArgs(args);
    return (_jsxs(Box, { flexDirection: "column", marginTop: 1, children: [_jsx(Text, { color: "yellow", bold: true, children: "Tool Approval Required" }), _jsxs(Box, { marginLeft: 2, flexDirection: "column", children: [_jsxs(Text, { children: [_jsx(Text, { color: "cyan", bold: true, children: toolName }), argsSummary && (_jsxs(Text, { dimColor: true, children: ["(", argsSummary, ")"] }))] }), _jsxs(Box, { marginLeft: 2, flexDirection: "column", children: [_jsx(Text, { dimColor: true, children: preview }), extraLines > 0 && (_jsxs(Text, { color: "gray", children: ["... +", extraLines, " more lines"] }))] })] }), _jsx(Box, { marginTop: 1, marginLeft: 2, flexDirection: "row", gap: 2, children: options.map((option, index) => (_jsxs(Text, { color: selectedIndex === index ? "green" : "gray", bold: selectedIndex === index, children: [selectedIndex === index ? "› " : "  ", option] }, option))) })] }));
}
