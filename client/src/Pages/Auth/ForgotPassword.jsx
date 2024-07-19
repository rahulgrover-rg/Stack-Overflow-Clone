import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Auth.css";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { forgotPassword } from "../../actions/auth.js";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email,navigate)) ;
  };

  return (
    <section className="auth-section">
      <div className="auth-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
          
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
            />
          </label>
          
          <button type="submit" className="auth-btn">
            Send Mail
          </button>
        </form>
        
      </div>
    </section>
  );
};

export default ForgotPassword;
