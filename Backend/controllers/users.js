const userRouter = require("express").Router();
const { UserModel } = require("../Models/user.model");
const {authenticate}=require('./authenticate')

userRouter.get('/',authenticate,async(req,res)=>{
    try{
        
        let userData = await UserModel.findById(req.body.userId);
        console.log("user info send ",userData);
        console.log("expecting 200")
        res.send(userData);
       
    }catch(err){res.status(500);console.log("err | get | users ",err)}
   
})






module.exports={userRouter}