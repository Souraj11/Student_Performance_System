import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const { enrollmentNo } = useParams();  
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        
        const response = await axios.get(`http://127.0.0.1:8000/api/students/${enrollmentNo}`);
        
        
        if (response.data) {
          setStudent(response.data);
        } else {
          setError("Student not found.");
        }
      } catch (error) {
        setError("Failed to fetch student data.");
        console.error("Error details:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [enrollmentNo]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!student) {
    return <div className="not-found">Student not found.</div>;
  }

  return (
    <div className="student-dashboard">
      <h2>Welcome to Your Dashboard, {student.name}!</h2>
      <div className="dashboard-content">
        <p><strong>Enrollment Number:</strong> {student.enrollment_no}</p>
        <h3>Sessions:</h3>
        {student.sessions && student.sessions.length > 0 ? (
          student.sessions.map((session, index) => (
            <div key={index} className="session">
              <p><strong>Session {index + 1}:</strong></p>
              <p><strong>Engagement Score:</strong> {session.engagement_score}</p>
              <p><strong>Quiz Score:</strong> {session.quiz_score}</p>
              <p><strong>Attendance:</strong> {session.attendance}%</p>
              <p><strong>Study Time:</strong> {session.studytime} hours</p>
            </div>
          ))
        ) : (
          <p>No sessions found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;