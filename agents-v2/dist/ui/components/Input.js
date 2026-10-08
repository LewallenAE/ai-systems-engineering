import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Text, useInput } from 'ink';
export function Input({ onSubmit, disabled = false }) {
    const [value, setValue] = useState('');
    useInput((input, key) => {
        if (disabled)
            return;
        if (key.return) {
            if (value.trim()) {
                onSubmit(value);
                setValue('');
            }
            return;
        }
        if (key.backspace || key.delete) {
            setValue((prev) => prev.slice(0, -1));
            return;
        }
        if (input && !key.ctrl && !key.meta) {
            setValue((prev) => prev + input);
        }
    });
    return (_jsxs(Box, { children: [_jsx(Text, { color: "blue", bold: true, children: '> ' }), _jsx(Text, { children: value }), !disabled && _jsx(Text, { color: "gray", children: "\u258C" })] }));
}
