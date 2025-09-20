import { useState, useEffect, useCallback } from "react";
import type { Chat, Message } from "../utils/types.ts";
import { saveChatToStorage, loadChatFromStorage, clearChatStorage } from "../utils/storage";
import { sendMessageToBackend } from "../services/api";

export const useChat = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [currentChatId, setCurrentChatId] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedChats = loadChatFromStorage();
        if (storedChats.length > 0) {
            setChats(storedChats);
            setCurrentChatId(storedChats[0].id);
        }
    }, []);

    useEffect(() => {
        if (chats.length > 0) saveChatToStorage(chats);
    }, [chats]);

    const currentChat = chats.find(c => c.id === currentChatId);

    const updateChatName = useCallback((id: string, newName: string) => {
        setChats(prevChats => prevChats.map(chat => chat.id === id ? { ...chat, name: newName } : chat));
    }, []);

    const addChatWithModel = useCallback((model: "gpt-3.5" | "xAI-Grok 4") => {
        const newChat: Chat = {
            id: Date.now().toString(),
            name: model === "gpt-3.5" ? "GPT-3.5 Chat" : "xAI-Grok Chat",
            messages: [],
            model,
        };
        setChats(prevChats => [newChat, ...prevChats]);
        setCurrentChatId(newChat.id);
    }, []);

    const deleteChat = useCallback((id: string) => {
        setChats(prevChats => {
            const updatedChats = prevChats.filter(c => c.id !== id);
            if (updatedChats.length > 0) setCurrentChatId(updatedChats[0].id);
            else {
                clearChatStorage();
                setCurrentChatId("");
            }
            return updatedChats;
        });
    }, []);

    const sendMessage = useCallback(
        async (input: string, onSent?: () => void, onError?: (message: string) => void) => {
            if (!input.trim()) return;

            const current = chats.find(c => c.id === currentChatId);
            if (!current) return;

            const userMessage: Message = { role: "user", content: input };
            const updatedMessages = [...current.messages, userMessage];

            setChats(prev => prev.map(c => c.id === currentChatId ? { ...c, messages: updatedMessages } : c));

            if (onSent) onSent();

            setLoading(true);
            try {
                const reply = await sendMessageToBackend(current.model, updatedMessages);
                setChats(prev => prev.map(c =>
                    c.id === currentChatId
                        ? { ...c, messages: [...updatedMessages, reply] }
                        : c
                ));
            } catch (err: any) {
                console.error(err);
                const msg = err.message || "API request failed";
                setChats(prev => prev.map(c =>
                    c.id === currentChatId
                        ? { ...c, messages: [...updatedMessages, { role: "assistant", content: `Error: ${msg}` }] }
                        : c
                ));
                if (onError) onError(msg);
            } finally {
                setLoading(false);
            }
        }, [chats, currentChatId]
    );

    return {
        chats,
        currentChatId,
        setCurrentChatId,
        currentChat,
        loading,
        updateChatName,
        addChatWithModel,
        deleteChat,
        sendMessage,
        setChats
    };
};
