import { useState } from "react";
import { registerUser, loginUser } from "../lib/data";
import { BookOpen } from "lucide-react";
import "./SignIn.css";

const SignIn = ({ onAuth }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // new

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    if (isRegister) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (password.length < 4) {
        setError("Password must be at least 4 characters");
        return;
      }
      const result = registerUser(username.trim(), password);
      if (!result.success) {
        setError(result.error);
        return;
      }
      loginUser(username.trim(), password);
      onAuth(username.trim());
    } else {
      const result = loginUser(username.trim(), password);
      if (!result.success) {
        setError(result.error);
        return;
      }
      onAuth(username.trim());
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-header">
          <BookOpen className="signin-icon" />
          <h1 className="signin-title">BOOKSY</h1>
          <p className="signin-subtitle">
            {isRegister ? "Create your account" : "Welcome back"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="signin-form glass">
          {error && <p className="signin-error">{error}</p>}

          <div>
            <label className="signin-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="signin-input"
              placeholder="Enter username"
            />
          </div>

          <div className="signin-password-wrap">
            <label className="signin-label">Password</label>
            <div className="signin-password-box">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signin-input"
                placeholder="Enter password"
              />
              <button
                type="button"
                className="signin-show-btn"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {isRegister && (
            <div className="signin-confirm-wrap">
              <label className="signin-label">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="signin-input"
                placeholder="Confirm password"
              />
            </div>
          )}

          <button type="submit" className="signin-submit">
            {isRegister ? "Create Account" : "Sign In"}
          </button>

          <p className="signin-toggle">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
              }}
              className="signin-toggle-btn">
              {isRegister ? "Sign In" : "Register"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
