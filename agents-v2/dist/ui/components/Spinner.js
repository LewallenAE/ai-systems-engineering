import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text } from 'ink';
import InkSpinner from 'ink-spinner';
export function Spinner({ label = 'Thinking...' }) {
    return (_jsxs(Text, { children: [_jsx(Text, { color: "cyan", children: _jsx(InkSpinner, { type: "dots" }) }), ' ', _jsx(Text, { dimColor: true, children: label })] }));
}
