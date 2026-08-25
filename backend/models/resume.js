import mongoose from "mongoose";

const resumeSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  skills: [String],
  analysis: { type: String },
}, { timestamps: true });

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
