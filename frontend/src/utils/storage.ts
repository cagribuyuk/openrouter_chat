const CHAT_STORAGE_KEY = "chat_history";

export const saveChatToStorage = (messages: any[]) => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
};

export const loadChatFromStorage = (): any[] => {
    const data = localStorage.getItem(CHAT_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const clearChatStorage = () => {
    localStorage.removeItem(CHAT_STORAGE_KEY);
};
