import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text } from 'ink';
export function MessageList({ messages }) {
    return (_jsx(Box, { flexDirection: "column", gap: 1, children: messages.map((message, index) => (_jsxs(Box, { flexDirection: "column", children: [_jsx(Text, { color: message.role === 'user' ? 'blue' : 'green', bold: true, children: message.role === 'user' ? '› You' : '› Assistant' }), _jsx(Box, { marginLeft: 2, children: _jsx(Text, { children: message.content }) })] }, index))) }));
}
