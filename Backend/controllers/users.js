const userRouter = require("express").Router();
const { UserModel } = require("../Models/user.model");
const {authenticate}=require('./authenticate')
const jwt = require('jsonwebtoken');

userRouter.get('/',authenticate,async(req,res)=>{
    try{
        
        let userData = await UserModel.findById(req.body.userId);
        
        res.send(userData);
       
    }catch(err){res.status(500);console.log("err | get | users ",err)}
   
})
userRouter.get('/getallusers',async(req,res)=>{
    try{
        
        let userData = await UserModel.find();
        //console.log(userData)
        res.send(userData);
       
    }catch(err){res.status(500);console.log("err | get | users ",err)}
   
})






module.exports={userRouter}