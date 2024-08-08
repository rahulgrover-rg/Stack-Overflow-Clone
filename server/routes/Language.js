import express from 'express';
import { sendOtpForLanguageChange, verifyOtpForLanguageChange } from '../controllers/auth.js';

const router = express.Router();

router.post('/send-otp', sendOtpForLanguageChange);
router.post('/verify-otp', verifyOtpForLanguageChange);

export default router;