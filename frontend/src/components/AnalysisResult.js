import React from "react";

function AnalysisResult({ result }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Analysis Result</h2>
      <p>{result || "Upload a resume to see analysis."}</p>
    </div>
  );
}

export default AnalysisResult;
