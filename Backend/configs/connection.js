const mongoose = require("mongoose");
require("dotenv").config();

//mongoDB connection
const connection = mongoose.connect(process.env.mongoUrl)







module.exports={connection}
