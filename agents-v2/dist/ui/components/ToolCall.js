import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text } from 'ink';
import InkSpinner from 'ink-spinner';
export function ToolCall({ name, status, result }) {
    return (_jsxs(Box, { flexDirection: "column", marginLeft: 2, children: [_jsxs(Box, { children: [_jsx(Text, { color: "yellow", children: "\u26A1 " }), _jsx(Text, { color: "yellow", bold: true, children: name }), status === 'pending' ? (_jsxs(Text, { children: [' ', _jsx(Text, { color: "cyan", children: _jsx(InkSpinner, { type: "dots" }) })] })) : (_jsx(Text, { color: "green", children: " \u2713" }))] }), status === 'complete' && result && (_jsx(Box, { marginLeft: 2, children: _jsxs(Text, { dimColor: true, children: ["\u2192 ", result.slice(0, 100), result.length > 100 ? '...' : ''] }) }))] }));
}
