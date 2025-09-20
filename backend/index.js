require("dotenv").config();
require("./tracing");
const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chat_routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", chatRoutes);

app.get("/health", (req, res) => res.status(200).json({ status: "OK", message: "Server is running" }));

app.use((err, req, res, next) => {
    console.error("Global Error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
