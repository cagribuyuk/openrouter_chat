const { processChat, processChatWithImage } = require("../services/chat_service");
const { trace } = require("@opentelemetry/api");

const tracer = trace.getTracer("backend-tracer");

const handleErrors = (res, err, defaultMsg) => {
    console.error(err.response?.data || err.message || err);
    res.status(500).json({ error: err.response?.data?.message || defaultMsg });
};

exports.handleChat = async (req, res) => {
    const span = tracer.startSpan("handleChat");
    try {
        const result = await processChat(req.body);
        span.setStatus({ code: 1, message: "Success" });
        res.json(result);
    } catch (err) {
        span.recordException(err);
        span.setStatus({ code: 2, message: err.message });
        handleErrors(res, err, "GPT-3.5 request failed");
    } finally {
        span.end();
    }
};

exports.handleChatWithImage = async (req, res) => {
    const span = tracer.startSpan("handleChatWithImage");
    try {
        const result = await processChatWithImage(req.body);
        span.setStatus({ code: 1, message: "Success" });
        res.json(result);
    } catch (err) {
        span.recordException(err);
        span.setStatus({ code: 2, message: err.message });
        handleErrors(res, err, "Grok request failed");
    } finally {
        span.end();
    }
};
