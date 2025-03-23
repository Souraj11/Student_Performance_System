import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import AIRecommendation from "./components/AIRecommendation";
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import Quiz from "./components/Quiz";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./App.css";

const pageVariants = {
  initial: { opacity: 0, y: -30, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.4 } },
};

function App() {
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState(null);


  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const addStudent = (student) => {
    setStudents([...students, { ...student, enrollmentNumber: students.length + 1 }]);
  };

  return (
    <Router>
      <motion.div className="app-container" initial="initial" animate="animate" exit="exit" variants={pageVariants}>
        {user && (
          <button className="logout-button" onClick={() => signOut(auth)}>
            Logout
          </button>
        )}

        <Routes>
          {}
          <Route path="/login" element={<Login setUser={setUser} />} />

          {}
          <Route
            path="/"
            element={
              user ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut", staggerChildren: 0.3 }}
                >
                  <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                    Student Management System
                  </motion.h1>
                  <AddStudent addStudent={addStudent} />
                  <StudentList students={students} />
                </motion.div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {}
          <Route
            path="/ai-recommendation/:enrollmentNumber"
            element={
              user ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <AIRecommendation students={students} />
                </motion.div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {}
          <Route
            path="/dashboard/:enrollmentNo"
            element={
              user ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <StudentDashboard />
                </motion.div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {}
          <Route
            path="/quiz/:enrollmentNo"
            element={
              user ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Quiz />
                </motion.div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </motion.div>
    </Router>
  );
}

export default App;