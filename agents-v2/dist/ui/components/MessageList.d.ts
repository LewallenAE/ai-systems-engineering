export interface Message {
    role: 'user' | 'assistant';
    content: string;
}
interface MessageListProps {
    messages: Message[];
}
export declare function MessageList({ messages }: MessageListProps): import("react/jsx-runtime").JSX.Element;
export {};
