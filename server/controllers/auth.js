import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import users from "../models/auth.js";
import sendMail from "./sendMail.js";

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

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    
    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }

    const id = existinguser._id ;

    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const response = await sendMail(email,"Reset your Password",`http://localhost:3000/Auth/Resetpassword/${id}/${token}`)

    res.status(200).json({ result: existinguser, token , response});
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};


export const resetPassword = async (req, res) => {
  
  const { id, token } = req.params;
  const { password } = req.body;
  try {

  console.log(process.env.JWT_SECRET) ;
  console.log(password) ;
  console.log(id) ;
  console.log(token) ;
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  if (!decoded) {
    return res.status(403).json({
      success: false,
      message: 'Error in token'
    })
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const updatedUser = await users.findByIdAndUpdate({ _id: id }, { password: hashedPassword } , {new : true});

  return res.status(200).json({
    success : true ,
    message : 'password reset successfully' ,
    updatedUser : updatedUser,
  })
  } catch (error) {
    res.status(500).json(error.message);    
  }
  

}
