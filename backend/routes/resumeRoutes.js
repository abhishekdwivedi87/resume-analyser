import express from "express";
import multer from "multer";
import { uploadResumeFile, aiAssistant } from "../controllers/resumeController.js";

const router = express.Router();

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// Resume upload + ATS scoring
router.post("/upload-file", upload.single("resume"), uploadResumeFile);

// AI Assistant (Interview prep + Resume improvement)
router.post("/assistant", aiAssistant);

export default router;
