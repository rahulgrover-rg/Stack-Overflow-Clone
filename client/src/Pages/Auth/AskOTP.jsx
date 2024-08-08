import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "./Auth.css";
import icon from "../../assets/icon.png";
import { sendOtpForLanguageChange, verifyOtpForLanguageChange } from "../../actions/auth";


const AskOTP = () => {
  const [contact, setContact] = useState("");
  const [receivedOTP, setReceivedOTP] = useState(false);
  const [OTP, setOTP] = useState('');
  const location = useLocation();
  const otpToken = useSelector((state) => state?.otpReducer?.otpToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const type = location.state.language === "fr" ? 'email' : 'number';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (receivedOTP) {
      const data = await dispatch(verifyOtpForLanguageChange({ otpToken: otpToken, otp: OTP }));
      if (data.success) {
        alert("OTP verified successfully!");
        dispatch({
          type: "CHANGE_LANG",
          payload: location.state.language
        });
        navigate('/'); // Navigate to desired page after successful verification
      }
    } else {
      const isEmail = true;
      const data = await dispatch(sendOtpForLanguageChange({ contact, isEmail }));

      if (data.success) {
        setReceivedOTP(true);
        console.log(receivedOTP);
      }
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="text"
              name={type}
              id="email"
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
              }}
            />
          </label>
          {
            receivedOTP ?
              <label htmlFor="otp">
                <h4>OTP</h4>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={OTP}
                  onChange={(e) => {
                    setOTP(e.target.value);
                  }}
                />
              </label>
              :
              <button type="submit" className="auth-btn" disabled={receivedOTP}>
                Send OTP
              </button>
          }

          {receivedOTP &&
            <button type="submit" className="auth-btn" >
              Verify OTP
            </button>}

        </form>

      </div>
    </section>
  );
};

export default AskOTP;
