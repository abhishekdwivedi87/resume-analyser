import React, { useState } from "react";
import ResumeUpload from "./components/ResumeUpload";
import AssistantChat from "./components/AssistantChat";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <aside className="sidebar">
        <h2 className="sidebar-logo">AI <span>Resume</span> Analyzer</h2>
        <nav>
          <ul>
            <li><i className="fas fa-home"></i> Dashboard</li>
            <li><i className="fas fa-file-alt"></i> Resume Analysis</li>
            <li><i className="fas fa-robot"></i> AI Assistant</li>
            <li><i className="fas fa-cog"></i> Settings</li>
          </ul>
        </nav>
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </aside>

      <main className="dashboard">
        <section className="analysis-panel">
          <h2>Resume Analysis</h2>
          <ResumeUpload />
        </section>

        <section className="assistant-panel">
          <h2><i className="fas fa-comments"></i> AI Career Assistant</h2>
          <AssistantChat />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
