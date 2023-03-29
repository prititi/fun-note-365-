module.exports = function (io) {
    //Socket.IO
    io.on('connection', function (socket) {
       console.log("one new user connected")
        //ON Events
       
            socket.emit("message","hi from socketFunc")
        
        
        //End ON Events
    });
    
};