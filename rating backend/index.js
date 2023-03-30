// 1 Import 
import express from 'express';
import WebSocket, {WebSocketServer} from 'ws';
const app = express();
const log = console.log;
import fs from 'fs';

// 6 STATIC FOLDER
app.use(express.static('public'));


// 7 DATA ARRAY
let jsonData = JSON.parse(fs.readFileSync('./data/data.json')) || [13,3,4,5,6,11];
// console.log(jsonData.data);


// 3 WS SERVER
const wss = new WebSocketServer({port:8080});
// 4 SERVER EVENTS
wss.on('connection', (ws, res)=>{
    // 8 ON CLIENT MESSAGE
    ws.on('message', data =>{
        let newData = JSON.parse(data.toString());
        newData.data.forEach((d, index) => {
            jsonData.data[index] = +d;
        });
        let updatedData = JSON.stringify(jsonData, null, 2); 
        // console.log(updatedData);
        // Save New Values
        fs.writeFileSync('./data/data.json', updatedData);
        // BROADCAST DATE UPDATED
        let date = new Date().toLocaleDateString();
        let time = new Date().toLocaleTimeString();
        let datetime = ('⌛' + date + ' ' + time).toString();
        wss.clients.forEach(c=>{
            if(c.readyState === WebSocket.OPEN){
                c.send(JSON.stringify({time:datetime, message:`Updated data`, data:jsonData.data}))
            }
        });
    });
   
    // 5 Welcome message
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    let datetime = ('⌛' + date + ' ' + time).toString();
    ws.send(JSON.stringify({time:datetime, message:`Welcome from the Server 🎉`, data:jsonData.data}));
});

// 2 SERVER LISTENER
const PORT = 8500;
app.listen(PORT, ()=> log(`Server beating 😊 on port ${PORT}`));