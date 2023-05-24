import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createError from "../utils/error.js";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import cors from 'cors';


export const register= async (req,res,next)=>{
       try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser= new User({
               ...req.body,
                password:hash

        })
        try{
                await newUser.save();
        }catch(err){
                

              switch (Object.keys(err.keyPattern)[0]) {
                case "username":
                       return next(createError(404,"Username already exist!"));
                case "email":
                        return next(createError(404,"Email already exist!"));
                default:
              }
              
               
              
        }
        const user= await User.findOne({username:req.body.username});
        const token = jwt.sign({id:user._id,isAdmin:user.isAdmin}, process.env.JWT,);
        const {password,isAdmin,...otherDetails}=user._doc;

        res.cookie("access_token",token,).status(200).json({...otherDetails});

       }catch(err){
        next(err);
       }
}
export const login=async(req,res,next)=>{
        try{
            const user= await User.findOne({username:req.body.username});
            if(!user) return next(createError(404,"User not found!"));
            const isPasswordCorrect=await bcrypt.compare(req.body.password, user.password);
            if(!isPasswordCorrect) return next(createError(400,"Wrong password or username!"));
            const token = jwt.sign({id:user._id,isAdmin:user.isAdmin}, process.env.JWT,);
            const {password,isAdmin,isTeacher,...otherDetails}=user._doc;

            res.cookie("access_token",token,).status(200).json({isAdmin,isTeacher, details:{...otherDetails}});

            
        }catch(err){
                next(err);
        }
}
export const logout = async (req, res, next) => {
        try {
          res.clearCookie("access_token").status(200).json({ message: "Logged out successfully" });
        } catch (err) {
          next(err);
        }
      };

export const forgotPassword=async(req,res,next)=>{
        const email=req.body.email;
      
        try{
                const oldUser=await User.findOne({email});
                if(!oldUser){
                       return res.status(200).json({message:"User not exist!"});
                }
                const secret=process.env.JWT+oldUser.password;
                const token=jwt.sign({email:oldUser.email,id:oldUser._id},secret,{expiresIn:"1h"});
                const link=`http://localhost:8800/resetPassword/${oldUser._id}/${token}`;//this link will be send to user's mail

                const transporter = nodemailer.createTransport({
                  service: 'hotmail',
                  auth: {
                    user: 'enim.campus@hotmail.com',
                    pass: 'node123!'
                  }
                });
                const mailOptions = {
                        from: 'enim.campus@hotmail.com',
                        to: email,
                        subject: 'Password reset',
                        text:link
                      };
                      
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                          return next(createError(200,"Email sent !"));
                        }
                      });
                      
                 
        }catch(err){
                next(err);
        }
        
};
export const resetPassword= async (req,res,next)=>{
        const {id, token}=req.params;
        
        const oldUser=await User.findOne({_id:id});
        if(!oldUser){
            return res.status(200).json({message:"User not exist!"});
     }
     const secret=process.env.JWT+oldUser.password;
     try{
        const verify=jwt.verify(token,secret);
        res.render("index",{email:verify.email,message:"not verified"})
    
     }catch(err){
        res.send("Not verified")
        next(err);
     }
    };

    export const resetPasswordVerification= async (req,res,next)=>{
        const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.JWT + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);;
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: hash
        },
      }
    );

    res.render("index", { email: verify.email, message: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Something Went Wrong" });
  }
    }


      