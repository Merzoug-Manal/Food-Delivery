import React, { useContext, useState } from 'react';
import './Login.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios';

function Login({ setShowLogin }) {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [forgotEmail, setForgotEmail] = useState("");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  const onForgotPassword = async (event) => {
    event.preventDefault();
    const response = await axios.post(`${url}/api/user/forgot-password`, { email: forgotEmail });
    if (response.data.success) {
      alert("Reset link sent to your email!");
      setShowForgotPassword(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login">
      {showForgotPassword ? (
        <form onSubmit={onForgotPassword} className="login-container">
          <div className="login-title">
            <h2>Forgot Password</h2>
            <img onClick={() => setShowForgotPassword(false)} src={assets.cross_icon} alt="" />
          </div>
          <div className="login-inputs">
            <input
              name="forgotEmail"
              onChange={(e) => setForgotEmail(e.target.value)}
              value={forgotEmail}
              type="email"
              placeholder="Enter your email"
              required
            />
            <button type="submit">Send Reset Link</button>
          </div>
        </form>
      ) : (
        <form onSubmit={onLogin} className="login-container">
          <div className="login-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
          </div>
          <div className="login-inputs">
            {currState === "Login" ? null : (
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Your name"
                required
              />
            )}
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Your email"
              required
            />
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder="Password"
              required
            />
            <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
          </div>
          <div className="login-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          {currState === "Login" ? (
            <>
              <p>
                Forgot Password?{" "}
                <span onClick={() => setShowForgotPassword(true)}>Click here</span>
              </p>
              <p>
                Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span>
              </p>
            </>
          ) : (
            <p>
              Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default Login;
