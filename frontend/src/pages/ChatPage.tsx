import { Box, Typography } from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import InfoImage from "../assets/m_info.avif";
import { useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { useImageUpload } from "../hooks/useImageUpload";

const ChatPage = () => {
    const chatWindowRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState("");

    const {
        chats,
        setChats,
        currentChatId,
        setCurrentChatId,
        currentChat,
        loading,
        updateChatName,
        addChatWithModel,
        deleteChat,
        sendMessage
    } = useChat();

    const { uploadImage } = useImageUpload(chats, currentChatId, setChats);

    return (
        <Box sx={{ display: "flex", height: "100vh", bgcolor: "grey.50" }}>
            <Sidebar
                chats={chats}
                currentChatId={currentChatId}
                setCurrentChatId={setCurrentChatId}
                addChatWithModel={addChatWithModel}
                deleteChat={deleteChat}
                updateChatName={updateChatName}
            />
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Box sx={{ p: 2, borderBottom: "1px solid grey" }}>
                    <Typography variant="h5">{currentChat?.name || "New Chat"}</Typography>
                </Box>
                <Box ref={chatWindowRef} sx={{ flex: 1, overflowY: "auto", p: 2 }}>
                    {!currentChat ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 2,
                                animation: "fadeInDown 0.8s ease-out",
                                textAlign: "center"
                            }}
                        >
                            <img src={InfoImage} alt="info" style={{ width: 150 }} />
                            <Typography variant="body1" sx={{ color: "grey.700" }}>
                                Create a new chat from sidebar with preferred models for image or text input.
                            </Typography>
                        </Box>
                    ) : (
                        <ChatWindow messages={currentChat.messages} loading={loading} />
                    )}
                </Box>
                {currentChat && (
                    <ChatInput
                        input={input}
                        setInput={setInput}
                        sendMessage={() => sendMessage(input, () => setInput(""))}
                        model={currentChat.model}
                        uploadImage={uploadImage}
                    />
                )}
            </Box>
        </Box>
    );
};

export default ChatPage;
