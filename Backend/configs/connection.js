const mongoose = require("mongoose");
require("dotenv").config();

//mongoDB connection
const connection = mongoose.connect(process.env.mongoUrl)

//redis connection
const redis = require("redis");
const client = redis.createClient({
    password: '7AjANQJm7otoljAc8kFpy0Rw6qG6vnCT',
    socket: {
        host: 'redis-18250.c301.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 18250
    }
});





module.exports={connection, client}
