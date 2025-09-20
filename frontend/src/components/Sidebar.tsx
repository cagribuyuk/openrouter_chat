import { useState } from "react";
import { Box, Button, List, ListSubheader, ListItemButton, ListItemText, Collapse, IconButton, Typography, Avatar, InputBase, Paper, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import type { Chat } from "../utils/types.ts";
import OpenAILogo from "../assets/openai-chatgpt-logo.png";
import GrokLogo from "../assets/grok.png";
import ChatbotLogo from "../assets/chatbot.png";
import Loader from "./Loader";

type Props = {
    chats: Chat[];
    currentChatId: string;
    setCurrentChatId: (id: string) => void;
    addChatWithModel: (modelId: "gpt-3.5" | "xAI-Grok 4") => void;
    deleteChat: (id: string) => void;
    updateChatName: (id: string, newName: string) => void;
};

export const Sidebar = ({ chats, currentChatId, setCurrentChatId, addChatWithModel, deleteChat, updateChatName }: Props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modelOpen, setModelOpen] = useState<{ [key: string]: boolean }>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [searching, setSearching] = useState(false);
    const [editingChatId, setEditingChatId] = useState<string | null>(null);
    const [editChatName, setEditChatName] = useState("");

    const models: { id: "gpt-3.5" | "xAI-Grok 4"; name: string; description: string; logo: string }[] = [
        { id: "gpt-3.5", name: "GPT-3.5", description: "text", logo: OpenAILogo },
        { id: "xAI-Grok 4", name: "xAI-Grok 4", description: "multimodal", logo: GrokLogo },
    ];

    const groupedChats: Record<string, Chat[]> = chats.reduce((acc, c) => {
        if (!acc[c.model]) acc[c.model] = [];
        acc[c.model].push(c);
        return acc;
    }, {} as Record<string, Chat[]>);

    const handleSearchChange = (val: string) => {
        setSearchTerm(val);
        setSearching(true);
        setTimeout(() => setSearching(false), 500);
    };

    const handleEditClick = (chat: Chat, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingChatId(chat.id);
        setEditChatName(chat.name);
    };

    const handleSaveEdit = (chatId: string) => {
        if (editChatName.trim()) {
            updateChatName(chatId, editChatName.trim());
        }
        setEditingChatId(null);
        setEditChatName("");
    };

    const handleCancelEdit = () => {
        setEditingChatId(null);
        setEditChatName("");
    };

    const handleKeyPress = (e: React.KeyboardEvent, chatId: string) => {
        if (e.key === 'Enter') {
            handleSaveEdit(chatId);
        } else if (e.key === 'Escape') {
            handleCancelEdit();
        }
    };

    return (
        <Box sx={{ width: 300, bgcolor: "background.paper", display: "flex", flexDirection: "column", borderRight: "1px solid #e0e0e0" }}>
            <Box sx={{ p:2, borderBottom:"1px solid #e0e0e0", display:"flex", alignItems:"center", gap:1 }}>
                <Avatar src={ChatbotLogo} variant="square" sx={{ width:32, height:32 }} />
                <Paper sx={{ display: "flex", alignItems:"center", px:1, borderRadius:2, bgcolor:"grey.100", height:32, ml:7, flex:1 }}>
                    <SearchIcon sx={{ color:"grey.600", fontSize:20 }} />
                    <InputBase
                        placeholder="Search chat..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        sx={{ ml:1, flex:1, fontSize:14 }}
                    />
                    {searchTerm && (
                        <IconButton size="small" onClick={() => setSearchTerm("")}>
                            <CloseIcon sx={{ fontSize:18, color:"grey.600" }} />
                        </IconButton>
                    )}
                </Paper>
            </Box>

            <List sx={{ flex:1, overflowY:"auto" }}>
                {Object.entries(groupedChats).map(([modelId, modelChats], idx, arr) => {
                    const model = models.find(m => m.id === modelId);
                    const filteredChats = modelChats.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
                    const isOpen = modelOpen[modelId] ?? true;

                    return (
                        <Box key={modelId} sx={{ borderBottom: idx < arr.length -1 ? "1px solid #e0e0e0" : "none" }}>
                            <ListSubheader
                                sx={{
                                    display:"flex",
                                    alignItems:"center",
                                    gap:1,
                                    bgcolor:"background.paper",
                                    cursor:"pointer",
                                    py:1,
                                    "&:hover": { bgcolor:"grey.100" },
                                    fontWeight:600,
                                    fontSize:14,
                                    letterSpacing:0.3
                                }}
                                onClick={() => setModelOpen({ ...modelOpen, [modelId]: !isOpen })}
                            >
                                {model && <Avatar src={model.logo} variant="square" sx={{ width: 24, height: 24 }} />}
                                <Typography variant="subtitle2">{model?.name}</Typography>
                                <Typography variant="caption" sx={{ fontStyle:"italic", ml:1 }}>{model?.description}</Typography>
                            </ListSubheader>
                            <Collapse in={isOpen}>
                                {searching ? (
                                    <Box sx={{ display:"flex", justifyContent:"center", p:1 }}>
                                        <Loader />
                                    </Box>
                                ) : (
                                    filteredChats.map(c => (
                                        <ListItemButton
                                            key={c.id}
                                            selected={c.id === currentChatId}
                                            onClick={() => {
                                                if (editingChatId !== c.id) {
                                                    setCurrentChatId(c.id);
                                                }
                                            }}
                                            sx={{ pl:4 }}
                                            disableRipple
                                        >
                                            {editingChatId === c.id ? (
                                                <Box sx={{ display: "flex", alignItems: "center", flex: 1, gap: 1 }}>
                                                    <TextField
                                                        size="small"
                                                        value={editChatName}
                                                        onChange={(e) => setEditChatName(e.target.value)}
                                                        onKeyPress={(e) => handleKeyPress(e, c.id)}
                                                        autoFocus
                                                        sx={{ flex: 1 }}
                                                        inputProps={{
                                                            style: { fontSize: '14px' },
                                                            maxLength: 50
                                                        }}
                                                    />
                                                    <IconButton
                                                        onClick={(e) => { e.stopPropagation(); handleSaveEdit(c.id); }}
                                                        sx={{ color: "success.main" }}
                                                        size="small"
                                                    >
                                                        <CheckIcon fontSize="small"/>
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={(e) => { e.stopPropagation(); handleCancelEdit(); }}
                                                        sx={{ color: "error.main" }}
                                                        size="small"
                                                    >
                                                        <CancelIcon fontSize="small"/>
                                                    </IconButton>
                                                </Box>
                                            ) : (
                                                <>
                                                    <ListItemText
                                                        primary={c.name}
                                                        primaryTypographyProps={{
                                                            fontSize:14,
                                                            noWrap: true,
                                                            title: c.name
                                                        }}
                                                    />
                                                    <IconButton
                                                        onClick={(e) => handleEditClick(c, e)}
                                                        sx={{ color: "primary.main", mr: 0.5 }}
                                                        size="small"
                                                    >
                                                        <EditIcon fontSize="small"/>
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={(e) => { e.stopPropagation(); deleteChat(c.id); }}
                                                        sx={{ color: "error.main" }}
                                                        size="small"
                                                    >
                                                        <DeleteIcon fontSize="small"/>
                                                    </IconButton>
                                                </>
                                            )}
                                        </ListItemButton>
                                    ))
                                )}
                            </Collapse>
                        </Box>
                    );
                })}
            </List>

            <Box sx={{ p:2, borderTop:"1px solid #e0e0e0" }}>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    startIcon={<AddIcon />}
                    sx={{ justifyContent:"flex-start" }}
                >
                    New Chat
                </Button>
                <Collapse in={dropdownOpen}>
                    {models.map(m => (
                        <Button
                            key={m.id}
                            fullWidth
                            onClick={() => addChatWithModel(m.id)}
                            sx={{ justifyContent:"flex-start", display:"flex", alignItems:"center", gap:1, mt:1 }}
                        >
                            <Avatar src={m.logo} variant="rounded" sx={{ width:24, height:24 }} />
                            <Typography>{m.name}</Typography>
                            <Typography sx={{ fontStyle:"italic", ml:1 }}>{m.description}</Typography>
                        </Button>
                    ))}
                </Collapse>
            </Box>
        </Box>
    );
};