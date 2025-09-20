import { Box, IconButton, TextField, useTheme } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import { useRef } from "react";

type Props = {
    input: string;
    setInput: (val: string) => void;
    sendMessage: () => void;
    model: "gpt-3.5" | "xAI-Grok 4";
    uploadImage: (file: File) => void;
};

export default function ChatInput({ input, setInput, sendMessage, model, uploadImage }: Props) {
    const theme = useTheme();
    const fileRef = useRef<HTMLInputElement>(null);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 2,
                bgcolor: theme.palette.background.paper,
                boxShadow: "0px -2px 12px rgba(0,0,0,0.08)",
                borderRadius: 3,
            }}
        >
            <TextField
                fullWidth
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                sx={{
                    bgcolor: theme.palette.background.default,
                    borderRadius: 3,
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    boxShadow: "inset 0px 1px 3px rgba(0,0,0,0.08)",
                    paddingRight: model === "xAI-Grok 4" ? "0px" : "0px",
                }}
            />

            <Box sx={{ display: "flex", gap: 1 }}>
                {model === "xAI-Grok 4" && (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            ref={fileRef}
                            onChange={(e) => e.target.files && uploadImage(e.target.files[0])}
                        />
                        <IconButton
                            onClick={() => fileRef.current?.click()}
                            sx={{
                                bgcolor: theme.palette.grey[300],
                                "&:hover": { bgcolor: theme.palette.grey[400] },
                                p: 1.5,
                                borderRadius: 2,
                            }}
                        >
                            <ImageIcon fontSize="medium" />
                        </IconButton>
                    </>
                )}
                <IconButton
                    onClick={sendMessage}
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        color: "white",
                        "&:hover": { bgcolor: theme.palette.primary.dark },
                        p: 1.5,
                        borderRadius: 2,
                    }}
                >
                    <SendIcon fontSize="medium" />
                </IconButton>
            </Box>
        </Box>
    );
}
