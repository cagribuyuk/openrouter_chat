import { Box, Typography } from "@mui/material";
import AssistantLogo from "../assets/m_space.avif";

type Props = { role: "user" | "assistant"; content: string | { type: "image"; url: string } };

export default function MessageBubble({ role, content }: Props) {
    const isUser = role === "user";

    return (
        <Box sx={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", mb: 1 }}>
            {!isUser && (
                <Box
                    component="img"
                    src={AssistantLogo}
                    alt="Assistant Logo"
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        mr: 1,
                        alignSelf: "flex-start",
                    }}
                />
            )}

            <Box
                sx={{
                    maxWidth: "70%",
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: isUser ? "primary.main" : "grey.300",
                    color: isUser ? "white" : "black",
                    boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {typeof content === "string" ? (
                    <Typography>{content}</Typography>
                ) : content.type === "image" ? (
                    <img src={content.url} style={{ maxWidth: "100%", borderRadius: 8 }} />
                ) : null}
            </Box>
        </Box>
    );
}
