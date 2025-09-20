export type Message =
    | { role: "user" | "assistant"; content: string }
    | { role: "user" | "assistant"; content: { type: "image"; url: string } };

export type Chat = {
    id: string;
    name: string;
    messages: Message[];
    model: "gpt-3.5" | "xAI-Grok 4";
};
