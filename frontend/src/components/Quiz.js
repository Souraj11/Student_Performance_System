import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomModal from "./CustomModal";
import "./Quiz.css";

const Quiz = () => {
  const { enrollmentNo } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]); // Initialize with an empty array
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Fetch quiz questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("Fetching quiz questions from backend...");
        const response = await axios.get("http://127.0.0.1:8000/api/quiz/questions");
        console.log("Quiz Questions Response:", response.data); // Log the response
        if (response.data && response.data.questions) {
          setQuestions(response.data.questions);
        } else {
          setError("No questions found in the response.");
        }
      } catch (error) {
        setError("Failed to fetch quiz questions.");
        console.error("Error details:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Save selected answer
  const handleAnswerSelect = (questionIndex, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  // Submit quiz answers
  const handleSubmitQuiz = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/quiz/submit", {
        enrollment_no: parseInt(enrollmentNo),
        answers: answers,
      });

      if (response.data.message === "Quiz submitted successfully") {
        alert(`Quiz submitted! Your score: ${response.data.score}/${response.data.total_questions}`);
        navigate(`/students/${enrollmentNo}`); // Redirect back to dashboard
      }
    } catch (error) {
      setError("Failed to submit quiz.");
      console.error("Error details:", error.response?.data || error.message);
    }
  };

  // Handle leaving the quiz
  const handleLeaveQuiz = () => {
    setShowConfirmModal(true); // Show confirmation modal
  };

  // Confirm leaving the quiz
  const confirmLeaveQuiz = () => {
    setShowConfirmModal(false); // Hide confirmation modal
    navigate(`/students/${enrollmentNo}`); // Redirect back to dashboard
  };

  return (
    <div className="quiz-container">
      <h2>Quiz</h2>
      {loading ? (
        <div className="loading">Loading quiz questions...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : questions && questions.length > 0 ? (
        <div className="questions">
          {questions.map((question, index) => (
            <div key={index} className="question">
              <h3>{question.question}</h3>
              {question.options && question.options.map((option, i) => (
                <label key={i}>
                  <input
                    type="radio"
                    name={`question${index}`}
                    value={i}
                    onChange={() => handleAnswerSelect(index, i)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-questions">No questions available.</div>
      )}
      <div className="quiz-actions">
        <button onClick={handleSubmitQuiz} className="submit-btn">
          Submit Quiz
        </button>
        <button onClick={handleLeaveQuiz} className="leave-btn">
          Leave Quiz
        </button>
      </div>

      {/* Custom Confirmation Modal */}
      <CustomModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        title="Leave Quiz"
      >
        <p>Are you sure you want to leave the quiz? Your progress will be lost.</p>
        <button onClick={() => setShowConfirmModal(false)}>Cancel</button>
        <button onClick={confirmLeaveQuiz}>Leave Quiz</button>
      </CustomModal>
    </div>
  );
};

export default Quiz;