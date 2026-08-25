import React, { useState } from "react";
import api from "../services/api";
import "./ResumeUpload.css";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) {
      setResult("Please select a resume file first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const res = await api.post("/resumes/upload-file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data.analysis);
      setScore(res.data.score);
    } catch (err) {
      setResult("Error analyzing resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-card">
      <h2>AI Resume Analyzer</h2>
      <p className="subtitle">Upload your resume (PDF/DOCX) for instant ATS analysis</p>

      <div className="file-input">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      <button className="analyze-btn" onClick={handleSubmit}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {result && <div className="result-box">{result}</div>}

      {score !== null && (
        <div className="score-box">
          <h3>ATS Score: {score}%</h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${score}%`,
                background: score >= 80 ? "#00ffcc" : score >= 50 ? "#ffdd57" : "#ff4b2b",
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;
