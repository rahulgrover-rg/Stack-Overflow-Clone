import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import users from "../models/auth.js";
import {sendMail} from "../utils/sendMail.js";
import Login from "../models/Login.js"; 
import { sendOTP, verifyOTP } from "../utils/otpService.js"; 
import { getUserSystemDetails } from "../utils/systemDetails.js"; 
import { sendLanguageChangeOTP, verifyLanguageChangeOTP } from "../utils/otpService.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};

// Login function with integrated changes
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }
    
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Capture system details and IP address
    console.log(req.headers);
    const systemDetails = getUserSystemDetails(req.headers['user-agent']);
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress;
    const { browser, os, isMobile } = systemDetails;
    console.log('systemDetails : ',systemDetails) ;

    // Save login information
    const login = new Login({
      userId: existinguser._id,
      ipAddress,
      browser,
      os,
      isMobile
    });

    await login.save();
    existinguser.loginHistory.push(login._id);
    await existinguser.save();

    // Handle OTP verification for Chrome users
    if (browser === 'chrome') {
      const otpToken = sendOTP(existinguser._id,email); // Send OTP to user's email/phone
      return res.status(200).send({ message: 'OTP sent. Please verify to continue.',otpToken : otpToken, otpRequired: true ,email : email });
    }

    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const loginHistory = await Login.find({ _id: { $in: existinguser.loginHistory } }).sort({ createdAt: -1 });

    res.status(200).json({ result: {...existinguser.toObject() , loginHistory}, token, otpRequired: false });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};

// Route to verify OTP
export const verifyOtp = async (req, res) => {
  const { otpToken, otp,email } = req.body;
  const isValid = verifyOTP(otpToken, otp);

  if (isValid.valid) {
    const existinguser = await users.findOne({ email });
    if(!existinguser) {
      return res.status(404).json({message : 'user not found' , success : false})
    }
    const systemDetails = getUserSystemDetails(req.headers['user-agent']);
    const ipAddress = req.ip;
    const { browser, os, isMobile } = systemDetails;
    console.log('systemDetails : ',systemDetails) ;
    // Save login information
    const login = new Login({
      userId: existinguser._id,
      ipAddress,
      browser,
      os,
      isMobile
    });

    await login.save();
    existinguser.loginHistory.push(login._id);
    await existinguser.save();

    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    const loginHistory = await Login.find({ _id: { $in: existinguser.loginHistory } }).sort({ createdAt: -1 });

    return res.status(200).json({ result: {...existinguser.toObject() , loginHistory}, token, otpRequired: false, message: 'OTP verified. Login successful.',success: true });
  }

  res.status(400).send({ message: 'Invalid OTP. Please try again.' });
};

// Forgot password function (unchanged)
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    
    if (!existinguser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const id = existinguser._id;

    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const response = await sendMail(email, "Reset your Password", `http://localhost:3000/Auth/Resetpassword/${id}/${token}`);

    res.status(200).json({ result: existinguser, token, response });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};

// Reset password function (unchanged)
export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(403).json({
        success: false,
        message: 'Error in token'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const updatedUser = await users.findByIdAndUpdate({ _id: id }, { password: hashedPassword }, { new: true });

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully',
      updatedUser: updatedUser,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Send OTP for language change
export const sendOtpForLanguageChange = async (req, res) => {
  const { contact, isEmail } = req.body;

  try {
    const otpToken = sendLanguageChangeOTP(contact, isEmail);
    res.status(200).json({ success: true, otpToken });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error sending OTP' });
  }
};

// Verify OTP for language change
export const verifyOtpForLanguageChange = async (req, res) => {

  const { otpToken, otp } = req.body;

  try {
    const isValid = verifyLanguageChangeOTP(otpToken, otp);
    if (isValid.valid) {
      res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ success: false, message: isValid.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error verifying OTP' });
  }
};