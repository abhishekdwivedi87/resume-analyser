// backend/utils/aiAnalyzer.js

export const analyzeResume = (resumeText) => {
  if (!resumeText || resumeText.trim() === "") {
    return { analysis: "No resume text provided.", score: 0 };
  }

  let analysis = "Resume analyzed successfully.\n\n";
  let score = 40; // base score

  // Section Checks
  if (resumeText.toLowerCase().includes("summary")) {
    analysis += "✔ Summary section present — this helps recruiters quickly understand your career goals.\n";
    score += 5;
  } else {
    analysis += "✘ Missing Summary section — add a short professional summary to make your resume stand out.\n";
  }

  if (resumeText.toLowerCase().includes("skills")) {
    analysis += "✔ Skills section present — recruiters can easily scan for technical strengths.\n";
    score += 5;
  } else {
    analysis += "✘ Missing Skills section — include a dedicated skills list for better ATS matching.\n";
  }

  // Technical Skills with descriptions
  const skillDescriptions = {
    Python: "Python is widely used in data analysis, machine learning, and backend development.",
    Java: "Java shows strong object-oriented programming knowledge, useful for enterprise applications.",
    SQL: "SQL demonstrates ability to work with databases, crucial for analyst and developer roles.",
    React: "React highlights frontend development skills, valuable for modern web applications.",
    AWS: "AWS experience indicates cloud computing knowledge, important for scalable systems.",
    Excel: "Excel proficiency is essential for data analysis and reporting in many roles."
  };

  Object.keys(skillDescriptions).forEach(skill => {
    if (resumeText.includes(skill)) {
      analysis += `✔ Found ${skill} — ${skillDescriptions[skill]}\n`;
      score += 6;
    }
  });

  // Achievements
  if (resumeText.match(/\d+%|\d+\+|increased|reduced|improved/i)) {
    analysis += "✔ Achievements with measurable results detected — recruiters value numbers that show impact.\n";
    score += 10;
  } else {
    analysis += "✘ No measurable achievements — add metrics (e.g., 'Improved efficiency by 20%').\n";
  }

  // Clamp score
  if (score > 100) score = 100;
  if (score < 0) score = 0;

  return { analysis, score };
};
