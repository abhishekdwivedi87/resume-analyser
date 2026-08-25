import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Resume routes
app.use("/api/resumes", resumeRoutes);

// AI Assistant route (LM Studio)
app.post("/api/assistant", async (req, res) => {
  try {
    const { message, model } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "A message is required" });
    }

    if (!process.env.LM_STUDIO_URL) {
      return res.status(500).json({ error: "LM_STUDIO_URL is not configured" });
    }

    const response = await fetch(`${process.env.LM_STUDIO_URL}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: model || process.env.LM_STUDIO_MODEL, // fallback to default
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "LM Studio rejected the request"
      });
    }

    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      return res.status(502).json({ error: "LM Studio returned no assistant reply" });
    }

    res.json({ reply });
  } catch (error) {
    console.error("LM Studio error:", error.message);
    res.status(502).json({ error: "Could not reach LM Studio. Make sure it is running." });
  }
});


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use. Stop the existing backend or set a different PORT in .env.`
        );
        process.exit(1);
      }
      throw error;
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
