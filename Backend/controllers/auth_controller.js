import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user_model.js"


export const test=(req,res)=>{
    res.json({
        message:"Hello World"
    })
}

export const signup=async(req,res,next)=>{
    const {username,email,password,role}=req.body;
try {
    const user=await User.findOne({email})
    if(user){
       return res.status(200).json({message:"this account is already created"});
    }
   const hashpassword=bcryptjs.hashSync(password,10)
   const newuser=new User({username,email,password:hashpassword,role})
   await newuser.save();
   res.status(201).json("User created Successfully")
} catch (error) {
   next(error);
}
}


export const signin=async(req,res,next)=>{
    const {email,password}=req.body
    try {
       const validUser=await User.findOne({email})
       if(!validUser) return next(errorHandler(404, 'User not found!'));
const validPassword=bcryptjs.compareSync(password,validUser.password);
if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
const { password: pass, ...rest } = validUser._doc;
res
.cookie('access_token', token, { httpOnly: true })
  .status(200)
  .json(rest);
    } catch (error) {
     next(error)   
    }
}