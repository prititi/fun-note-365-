const { UserModel } = require('../Models/user.model');

const regRouter = require('express').Router();

//post
regRouter.post("/",async(req,res)=>{
   try {
   let {name, email ,password,cPassword}=req.body;
   if(!name || !email || !password || !cPassword){res.status(422).json({msg: "fill all the fields"})}
   else{
   if(password!==cPassword){res.status(401).json({msg:"password doesn't match"})}
   else{
   //______validate email here ___________________
   //_____________________________________________
   let userExists = await UserModel.findOne({email});
   if(userExists){res.status(409).json({msg:"user alreeady exists, please login"})}
   
   else{
   let newUser = new UserModel(req.body);
   let response = await newUser.save();
   res.send(response);
   }
   }

   }
   } catch (error) {console.log("error | regRouter | post",error);res.status(500).json("something went wrong...")}
})




module.exports={regRouter}