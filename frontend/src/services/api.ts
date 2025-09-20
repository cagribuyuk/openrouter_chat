import axios from "axios";
import type { Message } from "../utils/types.ts";

const BACKEND_URL = import.meta.env.VITE_SERVER_API_URL;

export const sendMessageToBackend = async (model: string, messages: Message[]) => {
    if (model === "gpt-3.5") {
        const res = await axios.post(`${BACKEND_URL}/api/chat`, {
            model: "openai/gpt-3.5-turbo",
            messages
        });
        return res.data.choices?.[0]?.message || { role: "assistant", content: "No response" };
    } else if (model === "xAI-Grok 4") {
        const res = await axios.post(`${BACKEND_URL}/api/chat-with-image`, {
            messages
        });
        return res.data.choices?.[0]?.message || { role: "assistant", content: "No response" };
    }
};
