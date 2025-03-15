import React from 'react';
import { useParams } from 'react-router-dom';
import './AIRecommendation.css';

const AIRecommendation = ({ students }) => {
  const { enrollmentNumber } = useParams();
  
  // Convert enrollmentNumber to a number for matching
  const student = students.find(s => s.enrollmentNumber === Number(enrollmentNumber));

  if (!student) {
    return <h2>Student Not Found</h2>;
  }

  return (
    <div className="ai-recommendation">
      <h2>AI Recommendation for {student.name}</h2>

      <div className="recommendation-section">
        <h3>📌 Personalized Recommendation</h3>
        <p>
          Based on your engagement and quiz scores, we suggest focusing on
          {student.quiz_score < 50 ? " revisiting key topics." : " advanced learning modules."}
        </p>
      </div>

      <div className="recommendation-section">
        <h3>📊 Predictive Analysis</h3>
        <p>
          Your current attendance rate of <strong>{student.attendance}%</strong> 
          and study time of <strong>{student.study_time} hours</strong> suggests a 
          {student.attendance < 75 ? " need for improvement in consistency." : " strong study habit."}
        </p>
      </div>
    </div>
  );
};

export default AIRecommendation;
