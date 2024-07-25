import crypto from 'crypto';
import sendMail from './sendMail.js';

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
  console.log('otpStore',otpStore) ;
  console.log('otpToken' , otpToken);
  console.log('otpStore[otpToken]',otpStore[otpToken]) ;
  const entry = otpStore[otpToken];

  if (!entry) {
    return false;
  }

  const { userId, otp : storedOtp, expires } = entry;
  console.log(Date.now()) ;
  if (Date.now() > expires) {
    delete otpStore[otpToken];
    return false; 
  }
  if (storedOtp === parseInt(otp, 10)) {
    delete otpStore[otpToken]; 
    return true; 
  }

  return false;
}
