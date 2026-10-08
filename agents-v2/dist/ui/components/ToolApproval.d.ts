interface ToolApprovalProps {
    toolName: string;
    args: unknown;
    onResolve: (approved: boolean) => void;
}
export declare function ToolApproval({ toolName, args, onResolve }: ToolApprovalProps): import("react/jsx-runtime").JSX.Element;
export {};
