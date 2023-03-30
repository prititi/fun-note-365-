const express=require("express")
const { EventModel } = require("../Models/adminpol.model")

const eventRouter=express.Router()

eventRouter.get("/:id",async (req,res)=>{
    let id=req.params.id
    try {
        let events= await EventModel.findOne({_id:id})
        res.json(events)
    } catch (error) {
        console.log(error)
    }
})

eventRouter.post("/add",async (req,res)=>{
    let {name,startdate,enddate}=req.body
    let code= Math.floor(100000 + Math.random() * 9000000)
    try {
        const event= new EventModel({name,startdate,enddate,code})
        await event.save()
        res.send({"msg":"Event Added to DataBase"})
        
    } catch (error) {
        console.log(error);
    }
})


eventRouter.get("/",async (req,res)=>{
    try {
        let events= await EventModel.find()
        res.json(events)
    } catch (error) {
        console.log(error)
    }
})



module.exports={
    eventRouter
}