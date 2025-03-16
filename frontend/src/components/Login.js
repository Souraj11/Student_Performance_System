import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, githubProvider, microsoftProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import "./Login.css";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogin = async (provider) => {
    try {
      let selectedProvider;
      if (provider === "Google") selectedProvider = googleProvider;
      else if (provider === "GitHub") selectedProvider = githubProvider;
      else if (provider === "Microsoft") selectedProvider = microsoftProvider;

      const result = await signInWithPopup(auth, selectedProvider);
      setUser(result.user); // Set user data after login
      navigate("/"); // Redirect to main page
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to Student Analytics</h2>
        <button className="google" onClick={() => handleLogin("Google")}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" />
          Login with Google
        </button>
        <button className="github" onClick={() => handleLogin("GitHub")}>
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" />
          Login with GitHub
        </button>
        <button className="discord" onClick={() => handleLogin("Discord")}>
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png" alt="Discord" />
          Login with Discord
        </button>
        <button className="microsoft" onClick={() => handleLogin("Microsoft")}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" alt="Microsoft" />
          Login with Microsoft
        </button>
      </div>
    </div>
  );
};

export default Login;
