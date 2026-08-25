import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2026 AI Resume Analyzer | Connect with me:</p>
        <div className="social-icons">
          <a href="mailto:abhishekdwivediofficial65@gmail.com" title="Email">
            <i className="fas fa-envelope"></i>
          </a>
          <a href="https://github.com/abhishekdwivedi87" target="_blank" rel="noreferrer" title="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/abhishek-dwivedi-6156312b9" target="_blank" rel="noreferrer" title="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/abhishek_.dwivedi_" target="_blank" rel="noreferrer" title="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
