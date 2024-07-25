import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Auth.css";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup, login, verifyOtp } from "../../actions/auth"; // Import verifyOtp action
import ForgotPassword from "./ForgotPassword";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpRequired, setOtpRequired] = useState(false);
  const [otpToken, setOtpToken] = useState("");
  const [message, setMessage] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
    setOtp("");
    setOtpRequired(false);
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("Enter email and password");
    }
    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
      }
      dispatch(signup({ name, email, password }, navigate));
    } else {
      dispatch(login({ email, password }, navigate)).then((response) => {
        if (response.otpRequired) {
          setOtpRequired(true);
          setOtpToken(response.otpToken);
          setEmail(response.email) ;
          setMessage("OTP sent to your email. Please enter it below.");
        } else {
          navigate("/"); // Navigate to home on successful login
        }
      });
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    console.log('otpToken',otpToken , 'otp' , otp) ;
    dispatch(verifyOtp({ otpToken, otp,email }, navigate)).then((response) => {
      if (response.success) {
        setMessage("OTP verified. Login successful!");
        navigate("/");
      } else {
        setMessage("Invalid OTP. Please try again.");
      }
    });
  };

  return forgotPassword ? (
    <ForgotPassword />
  ) : (
    <section className="auth-section">
      {isSignup && <AboutAuth />}
      <div className="auth-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={otpRequired ? handleOtpSubmit : handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              disabled={otpRequired}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignup && (
                <p
                  style={{ color: "#007ac6", fontSize: "13px" }}
                  onClick={() => setForgotPassword(true)}
                >
                  forgot password?
                </p>
              )}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              disabled={otpRequired}
            />
          </label>
          {otpRequired && (
            <label htmlFor="otp">
              <h4>OTP</h4>
              <input
                type="text"
                name="otp"
                id="otp"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                required
              />
            </label>
          )}
          <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : otpRequired ? "Verify OTP" : "Log in"}
          </button>
        </form>
        <p>{message}</p>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "sign up"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
