import { Box } from "@mui/material";
import MessageBubble from "./MessageBubble";
import Loader from "./Loader";
import type { Message } from "../utils/types.ts";

type Props = {
    messages: Message[];
    loading?: boolean;
};

const ChatWindow = ({ messages, loading }: Props) => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {messages.map((m, i) => (
            <MessageBubble key={i} role={m.role} content={m.content} />
        ))}
        {loading && <Loader />}
    </Box>
);

export default ChatWindow;
