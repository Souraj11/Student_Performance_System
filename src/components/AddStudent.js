import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddStudent.css';

const AddStudent = ({ addStudent }) => {
  const [name, setName] = useState('');
  const [engagement, setEngagement] = useState('');
  const [quizScore, setQuizScore] = useState('');
  const [attendance, setAttendance] = useState('');
  const [studyTime, setStudyTime] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && engagement && quizScore && attendance && studyTime && enrollmentNumber) {
      const student = {
        name,
        engagement: parseFloat(engagement),
        quiz_score: parseFloat(quizScore),
        attendance: parseFloat(attendance),
        study_time: parseFloat(studyTime),
        enrollmentNumber,
      };

      addStudent(student);

      // Reset form fields
      setName('');
      setEngagement('');
      setQuizScore('');
      setAttendance('');
      setStudyTime('');
      setEnrollmentNumber('');

      // Navigate back to student list
      navigate('/');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="add-student">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="number,text" value={engagement} onChange={(e) => setEngagement(e.target.value)} placeholder="Engagement" />
        <input type="number" value={quizScore} onChange={(e) => setQuizScore(e.target.value)} placeholder="Quiz Score" />
        <input type="number" value={attendance} onChange={(e) => setAttendance(e.target.value)} placeholder="Attendance (%)"min="0"max="100"step="0.1"/>
        <input type="number" value={studyTime} onChange={(e) => setStudyTime(e.target.value)} placeholder="Study Time" />
        <input type="text" value={enrollmentNumber} onChange={(e) => setEnrollmentNumber(e.target.value)} placeholder="Enrollment Number" />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
