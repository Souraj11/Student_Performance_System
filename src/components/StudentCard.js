import React from 'react';

const StudentCard = ({ student }) => {
  return (
    <div className="student-card">
      <h2>{student.name}</h2>
      <p>Grade: {student.grade}</p>
    </div>
  );
};

export default StudentCard;
