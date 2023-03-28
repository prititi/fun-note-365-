const userRouter = require("express").Router();


userRouter.get('/',async(req,res)=>{
    res.send("hi")
})






module.exports={userRouter}