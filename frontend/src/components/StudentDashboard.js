import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const { enrollmentNo } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [quizScores, setQuizScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper function to parse timestamp
  const parseTimestamp = (timestamp) => {
    if (!timestamp) return null;

    // If it's a Firestore Timestamp object
    if (typeof timestamp.toDate === "function") {
      return timestamp.toDate();
    }

    // If it's a string or number, convert to Date
    if (typeof timestamp === "string" || typeof timestamp === "number") {
      return new Date(timestamp);
    }

    // If it's already a Date object
    if (timestamp instanceof Date) {
      return timestamp;
    }

    // Fallback for invalid timestamp
    console.error("Invalid timestamp format:", timestamp);
    return null;
  };

  // Fetch student details, sessions, and quiz scores
  const fetchStudent = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch student data
      const studentResponse = await axios.get(`http://127.0.0.1:8000/api/students/${enrollmentNo}`);
      setStudent(studentResponse.data);

      // Fetch sessions
      const sessionsResponse = await axios.get(`http://127.0.0.1:8000/api/students/${enrollmentNo}/sessions`);
      setSessions(sessionsResponse.data);

      // Fetch quiz scores
      const quizScoresResponse = await axios.get(`http://127.0.0.1:8000/api/students/${enrollmentNo}/quiz_scores`);
      setQuizScores(quizScoresResponse.data);
    } catch (error) {
      setError("Failed to fetch student data.");
      console.error("Error details:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }, [enrollmentNo]);

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  // Navigate to the Quiz page
  const handleTakeQuiz = () => {
    navigate(`/quiz/${enrollmentNo}`);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!student) return <div className="not-found">Student not found.</div>;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Welcome, {student.name}!</h1>
        <p>Enrollment Number: {student.enrollment_no}</p>
      </header>

      {/* Take Quiz Button */}
      <div className="take-quiz-section">
        <button onClick={handleTakeQuiz} className="take-quiz-btn">
          Take Quiz
        </button>
      </div>

      {/* Sessions Section */}
      <section className="sessions-section">
        <h2>Sessions</h2>
        {sessions.length > 0 ? (
          <div className="sessions-grid">
            {sessions.map((session, index) => (
              <div key={index} className="session-card">
                <h3>Session {index + 1}</h3>
                <p><strong>Engagement Score:</strong> {session.engagement_score}</p>
                <p><strong>Attendance:</strong> {session.attendance}%</p>
                <p><strong>Study Time:</strong> {session.studytime} hours</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No sessions found.</p>
        )}
      </section>

      {/* Quiz Scores Section */}
      <section className="quiz-scores-section">
        <h2>Quiz Scores</h2>
        {quizScores.length > 0 ? (
          <div className="quiz-scores-grid">
            {quizScores.map((quiz, index) => {
              const quizDate = parseTimestamp(quiz.timestamp);
              return (
                <div key={index} className="quiz-score-card">
                  <h3>Quiz ID: {quiz.quiz_id}</h3>
                  <p><strong>Score:</strong> {quiz.score}/{quiz.total_questions}</p>
                  <p><strong>Date:</strong> {quizDate ? quizDate.toLocaleString() : "Invalid Date"}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No quiz scores found.</p>
        )}
      </section>
    </div>
  );
};

export default StudentDashboard;