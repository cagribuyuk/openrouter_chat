import type { Chat, Message } from "../utils/types.ts";
import { useCallback } from "react";

export const useImageUpload = (
    chats: Chat[],
    currentChatId: string,
    setChats: React.Dispatch<React.SetStateAction<Chat[]>>
) => {
    const uploadImage = useCallback((file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("Only image files are allowed");
            return;
        }

        const currentChat = chats.find(c => c.id === currentChatId);
        if (!currentChat) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target?.result as string;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                const maxSize = 512;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx?.drawImage(img, 0, 0, width, height);

                const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7);

                const userMessage: Message = {
                    role: "user",
                    content: { type: "image", url: resizedBase64 },
                };

                setChats(prevChats =>
                    prevChats.map(c =>
                        c.id === currentChatId
                            ? { ...c, messages: [...c.messages, userMessage] }
                            : c
                    )
                );
            };
        };
        reader.readAsDataURL(file);
    }, [chats, currentChatId, setChats]);


    return { uploadImage };
};
