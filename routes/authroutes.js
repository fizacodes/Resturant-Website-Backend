import express from 'express'
import User from '../models/User.js'
import bcrypt from  'bcryptjs'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../middlewares/verifyToken.js'


const router= express.Router()
//SignUp Route
router.post('/signup',async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const existingUser=await User.findOne({email})
        if(existingUser) return res.status(400).json({message:"User already exists"})

         const hashedPassword=await bcrypt.hash(password,12);
         const newUser=new User ({name,email,password:hashedPassword})
         await newUser.save();
         res.status(201).json({message:"User created successfully"})   
    }
    catch(error){
        res.status(500).json({message:"Something went"})
    }
})


// SignIn Route
router.post('/signin', async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user =await User.findOne({email})
        if(!user) return res.status(400).json({message:'Invalid Credentials'})
         const isPasswordCorrect=await bcrypt.compare(password,user.password)   
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid credentials"})
         const token=jwt.sign({id:user._id,role: user.role},process.env.JWT_SECRET,{expiresIn:"1h"})  
        
        res.cookie('token', token, {
        httpOnly: true,        
        secure: true,        
        sameSite: 'none',
        maxAge:  60 * 60 * 1000, 
      })
      .status(200).json({  message: 'Login successful', user: { id: user._id, email: user.email ,role:user.role } 
      });
    }catch(error){
        res.status(500).json({message:"Something went wrong"})}
})


// Getting logged in user info for frontend usage


router.get("/me",verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user }); // send { id, email, role }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});



//logout route
router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "none", secure: true });
  return res.status(200).json({ message: "Logged out" });
});
export default router;
