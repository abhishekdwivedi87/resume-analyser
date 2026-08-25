import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { analyzeResume } from "../utils/aiAnalyzer.js";

export const uploadResumeFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    let resumeText = "";

    // Detect file type
    if (req.file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      resumeText = pdfData.text;
    } else if (
      req.file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      req.file.mimetype === "application/msword"
    ) {
      const docxData = await mammoth.extractRawText({ path: filePath });
      resumeText = docxData.value;
    } else {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    // Analyze resume text
    const { analysis, score } = analyzeResume(resumeText);

    // Send both back
    res.json({ analysis, score });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const aiAssistant = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "No message provided" });
    }

    // TODO: Integrate with AI service for interview prep and resume improvement
    const response = "AI Assistant is under development.";

    res.json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
