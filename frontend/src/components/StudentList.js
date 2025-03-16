import React from 'react';
import { Link } from 'react-router-dom';
import './StudentList.css';

const StudentList = ({ students }) => {
  return (
    <div className="student-list">
      {students.length > 0 &&
        students.map((student, index) => (
          <div key={index} className="student-card">
            <h3>{student.name}</h3>
            <p>Engagement: {student.engagement}</p>
            <p>Quiz Score: {student.quiz_score}</p>
            <p>Attendance: {student.attendance}%</p>
            <p>Enrollment Number: {student.enrollmentNumber}</p>
            <p>Study Time: {student.study_time} hours</p>

            {/* AI Recommendation Button */}
            <Link to={`/ai-recommendation/${student.enrollmentNumber}`}>
              <button className="ai-rec-button">Get AI Recommendation</button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default StudentList;
