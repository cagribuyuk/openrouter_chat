const express = require("express");
const { handleChat, handleChatWithImage } = require("../controllers/chat_controller");

const router = express.Router();

router.post("/chat", handleChat);
router.post("/chat-with-image", handleChatWithImage);

module.exports = router;
