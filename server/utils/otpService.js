import crypto from 'crypto';
import {sendMail} from './sendMail.js';

const otpStore = {}; // In-memory store for OTPs. Use a persistent store in production.

// Generate and send OTP
export function sendOTP(userId, email) {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  const otpToken = crypto.randomBytes(20).toString('hex'); // Create a token for the OTP

  // Store OTP with token in the in-memory store, associating with userId
  otpStore[otpToken] = { userId, otp, expires: Date.now() + 10 * 60 * 1000 }; // OTP expires in 10 minutes

  // Send OTP via email or SMS (using email in this example)
  sendMail(email, 'Your OTP Code', `Your OTP code is ${otp}. It will expire in 10 minutes.`);

  return otpToken; // Return the token to the client to use for verification
}

export function verifyOTP(otpToken, otp) {
  const entry = otpStore[otpToken];

  if (!entry) {
    return { valid: false, message: 'Invalid OTP token' };
  }

  const { otp: storedOtp, expires } = entry;

  if (Date.now() > expires) {
    delete otpStore[otpToken];
    return { valid: false, message: 'OTP has expired' };
  }

  console.log(storedOtp === parseInt(otp, 10)) ;

  if (storedOtp === parseInt(otp, 10)) {
    delete otpStore[otpToken]; // Clear OTP from storage after successful verification
    return { valid: true, userId: entry.userId };
  }

  return { valid: false, message: 'Incorrect OTP' };
}

export function sendLanguageChangeOTP(contact, isEmail) {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  const otpToken = crypto.randomBytes(20).toString('hex'); // Create a token for the OTP

  // Store OTP with token in the in-memory store, associating with contact
  otpStore[otpToken] = { contact, otp, expires: Date.now() + 10 * 60 * 1000 }; 
  console.log(otpToken , contact , isEmail) ;
  // Send OTP via email or SMS
  if (isEmail) {
    sendMail(contact, 'Your OTP Code', `Your OTP code is ${otp}. It will expire in 10 minutes.`);
  } else {
  }

  return otpToken ;
}

export function verifyLanguageChangeOTP(otpToken, otp) {
  const entry = otpStore[otpToken];

  if (!entry) {
    return { valid: false, message: 'Invalid OTP token' };
  }

  const { otp: storedOtp, expires } = entry;

  if (Date.now() > expires) {
    delete otpStore[otpToken];
    return { valid: false, message: 'OTP has expired' };
  }

  if (storedOtp === parseInt(otp, 10)) {
    delete otpStore[otpToken]; // Clear OTP from storage after successful verification
    return { valid: true, contact: entry.contact };
  }

  return { valid: false, message: 'Incorrect OTP' };
}