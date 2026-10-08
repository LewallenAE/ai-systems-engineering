import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Box, Text } from "ink";
export function TokenUsage({ usage }) {
    if (!usage) {
        return null;
    }
    const thresholdPercent = Math.round(usage.threshold * 100);
    const usagePercent = usage.percentage.toFixed(1);
    // Determine color based on usage
    let color = "green";
    if (usage.percentage >= usage.threshold * 100) {
        color = "red";
    }
    else if (usage.percentage >= usage.threshold * 100 * 0.75) {
        color = "yellow";
    }
    return (_jsx(Box, { borderStyle: "single", borderColor: "gray", paddingX: 1, children: _jsxs(Text, { children: ["Tokens:", " ", _jsxs(Text, { color: color, bold: true, children: [usagePercent, "%"] }), _jsxs(Text, { dimColor: true, children: [" (threshold: ", thresholdPercent, "%)"] })] }) }));
}
