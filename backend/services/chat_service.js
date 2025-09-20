const axios = require("axios");

exports.processChat = async ({ model, messages }) => {
    if (!messages || !Array.isArray(messages)) throw new Error("Messages must be an array");

    const payload = messages.map(m => ({ role: m.role, content: [{ type: "text", text: m.content }] }));

    const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        { model: model || "openai/gpt-3.5-turbo", messages: payload },
        { headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` } }
    );

    if (!res.data || !res.data.choices) throw new Error("Invalid API response");

    return res.data;
};

exports.processChatWithImage = async ({ messages }) => {
    if (!messages || !Array.isArray(messages)) throw new Error("Messages must be an array");

    const payload = messages.map(m => {
        if (typeof m.content === "string") return { role: m.role, content: [{ type: "text", text: m.content }] };
        if (m.content?.type === "image" && m.content?.url) return { role: m.role, content: [{ type: "image_url", image_url: { url: m.content.url } }] };
        throw new Error(`Unsupported message type: ${JSON.stringify(m.content)}`);
    });

    const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        { model: "x-ai/grok-4-fast:free", messages: payload },
        { headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` } }
    );

    if (!res.data || !res.data.choices) throw new Error("Invalid API response");

    return res.data;
};
