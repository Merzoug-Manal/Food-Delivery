import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css';

function ResetPassword() {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`https://food-backend-07pg.onrender.com/api/user/reset-password/${token}`, {
        newPassword,
      });

      if (response.data.success) {
        alert("Password reset successful!");
        navigate("/"); // Redirect to home page
      } else {
        setError(response.data.message || "Failed to reset password.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="reset">
    <div className="reset-password" >
      <form onSubmit={handleResetPassword} className="login-container" >
        <div className="login-title">
        <h2>Reset Password</h2>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="login-inputs">
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
         <button type="submit">Reset Password</button>
        </div>
       
      </form>
    </div>
    </div>
  );
}

export default ResetPassword;
