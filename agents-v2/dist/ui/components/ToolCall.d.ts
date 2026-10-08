export interface ToolCallProps {
    name: string;
    args?: unknown;
    status: 'pending' | 'complete';
    result?: string;
}
export declare function ToolCall({ name, status, result }: ToolCallProps): import("react/jsx-runtime").JSX.Element;
