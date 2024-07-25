import express from "express";

import { forgotPassword, login, resetPassword, signup, verifyOtp } from "../controllers/auth.js";
import { getAllUsers, updateProfile } from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post('/verify-otp', verifyOtp);
router.post("/login/forgotpassword" , forgotPassword) ;
router.post("/login/resetpassword/:id/:token" , resetPassword) ;

router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", auth, updateProfile);

export default router;
