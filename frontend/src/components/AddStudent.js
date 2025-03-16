import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddStudent.css";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [engagement_score, setEngagementScore] = useState("");
  const [quiz_score, setQuizScore] = useState("");
  const [attendance, setAttendance] = useState("");
  const [studytime, setStudyTime] = useState("");
  const [enrollment_no, setEnrollmentNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  

    
    if (!name || !engagement_score || !quiz_score || !attendance || !studytime || !enrollment_no) {
      setError("Please fill in all fields.");
      return;
    }

    if (isNaN(engagement_score) || isNaN(quiz_score) || isNaN(attendance) || isNaN(studytime)) {
      setError("Please enter valid numeric values for engagement, quiz score, attendance, and study time.");
      return;
    }

    if (attendance < 0 || attendance > 100) {
      setError("Attendance must be between 0 and 100.");
      return;
    }

    const student = {
      name,
      engagement_score: parseFloat(engagement_score),
      quiz_score: parseFloat(quiz_score),
      attendance: parseFloat(attendance),
      studytime: parseFloat(studytime),
      enrollment_no: parseInt(enrollment_no),  
    };

    setLoading(true);

    try {
     
      const response = await axios.post("http://127.0.0.1:8000/api/students", student);

      if (response.status === 200) {
        alert("Student session added successfully!");

        
        navigate(`/dashboard/${enrollment_no}`);
      } else {
        setError("Failed to add student session. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while adding the student session.");
      console.error("Error details:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }

    
    setName("");
    setEngagementScore("");
    setQuizScore("");
    setAttendance("");
    setStudyTime("");
    setEnrollmentNumber("");
  };

  return (
    <div className="add-student">
      <h2>Add Student Session</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="number"
          value={engagement_score}
          onChange={(e) => setEngagementScore(e.target.value)}
          placeholder="Engagement Score"
        />
        <input
          type="number"
          value={quiz_score}
          onChange={(e) => setQuizScore(e.target.value)}
          placeholder="Quiz Score"
        />
        <input
          type="number"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
          placeholder="Attendance (%)"
          min="0"
          max="100"
          step="0.1"
        />
        <input
          type="number"
          value={studytime}
          onChange={(e) => setStudyTime(e.target.value)}
          placeholder="Study Time (hours)"
        />
        <input
          type="text"
          value={enrollment_no}
          onChange={(e) => setEnrollmentNumber(e.target.value)}
          placeholder="Enrollment Number"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Session"}
        </button>
      </form>
    </div>
  );
};

export default AddStudent;