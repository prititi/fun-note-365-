const button = document.getElementById("submit");

const socket = io("https://backend-wikn.onrender.com",{transports:["websocket"]});
button.addEventListener("click",()=>{
    const question = document.getElementById("question").value;
const room = document.getElementById("room").value;
const opt1 = document.getElementById("opt1").value;
const opt2 = document.getElementById("opt2").value;
const opt3 = document.getElementById("opt3").value;
const opt4 = document.getElementById("opt4").value;

    const obj = {room,question,opt1,opt2,opt3,opt4};
    console.log(obj);

    socket.emit("details",obj)
    window.location.href="./adminpol.html"
})

console.log("Hello ")
