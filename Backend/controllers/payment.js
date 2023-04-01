const paymentRouter = require('express').Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const {UserModel}=require('../Models/user.model');
const { authenticate } = require('./authenticate');


paymentRouter.patch("/",authenticate,async(req,res)=>{
    try{
        let obj = {plan:{
            type:req.body.type,
            payment:req.body.payment,
            limit:req.body.limit
        }}
    let userData = await UserModel.findOneAndUpdate({_id:req.body.userId},obj,{new:true})
    
    res.send(userData);
   
   
    

    





    }catch(err){console.log("err | payment | patch",err)}
})






module.exports={paymentRouter}