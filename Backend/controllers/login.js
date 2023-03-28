const loginRouter = require('express').Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const {UserModel}=require('../Models/user.model')





loginRouter.post("/",async(req,res)=>{
   try {
   let {email , password}=req.body;
   if(!email || !password){res.status(422).json("please fill all the fields")}
   else{
    let userData = await UserModel.findOne({email});
    if(!userData){res.status(404).json("user doesn't exists , please register")}
    else{
    const val = await bcrypt.compare(password,userData.password);
    if(!val){res.status(401).json(`Hi ${userData.name}, the password you have entered is incorrect`)}
    else{
    //_________create and send token
    const  authToken = jwt.sign({ userId: userData._id }, process.env.normalKey,{ expiresIn: '1h' });
    const  refreshToken = jwt.sign({ userId: userData._id }, process.env.refreshKey,{ expiresIn: "21 days" });

    res.cookie('authToken',authToken,{expires:new Date(Date.now()+50000000)})
    res.cookie("refreshToken",refreshToken);
    res.send({msg:`Hi ${userData.name}, Welcome back`,authToken,refreshToken})
    
    //________token send ___________
    }
    }
   }
   } catch (error) {console.log("error | loginrouter | post",error)}
})








module.exports={loginRouter};