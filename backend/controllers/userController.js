import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import validator from "validator"
import crypto from "crypto";
import nodemailer from "nodemailer";
//login user
const loginUser=async(req,res)=>{
  const {email,password} = req.body;
  try {
     const user = await userModel.findOne({email})

     if (!user) {
        return res.json({success: false, message:"User not found"})
        
     }
      const isMatch= await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.json({success: false, message:"Invalid password"})
      }
        const token=createToken(user._id);
        res.json({success: true, token})

  } catch (error) {
    console.log(error);
    res.json({success: false, message:"Error"})
    
  }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET )
}

//register user
const registerUser = async(req,res)=>{
  
    const {name,password,email}=req.body;
    try {
        //chaking is user already registered 
        const  exists= await userModel.findOne({email});  
        if (exists) {
            return res.json({success:false,message:"User already registered"})
        }

        //validator email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if (password.length<8) {
            return res.json({success:false,message:"Please enter a strong password"})
        }
        //hashing user password
        const salt =await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })
        const user= await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}


//forget password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Set token and expiration
    user.resetPasswordToken = tokenHash;
    user.resetPasswordExpires = Date.now() + 3600000; 
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "merzougmanal1108@gmail.com", 
        pass: "tgsu uplf cvmq dggl", 
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      http://localhost:5173/reset-password/${resetToken}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };      

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Reset link sent to email" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error sending reset email" });
  }
};

//Reset Password
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
      // Hash the token to match the database
      const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  
      // Find user with matching token and check if token is expired
      const user = await userModel.findOne({
        resetPasswordToken: tokenHash,
        resetPasswordExpires: { $gt: Date.now() }, 
      });
  
      if (!user) {
        return res.json({ success: false, message: "Invalid or expired token" });
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
  
      // Clear reset token fields
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
      res.json({ success: true, message: "Password reset successfully" });
  
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error resetting password" });
    }
  };
  

  export { loginUser, registerUser, forgotPassword, resetPassword };
