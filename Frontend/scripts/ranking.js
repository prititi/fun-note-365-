let boxDropdown = document.querySelectorAll('.boxDropdown');
for (let x = 0; x < document.querySelectorAll('li.categ').length; x++) {
    let list = document.querySelectorAll('li.categ')[x];
    let boxDropdown_list =  document.querySelectorAll('.boxDropdown')[x];
    list.addEventListener('mouseenter',() =>{
        boxDropdown_list.style.display = 'block';
    })
    list.addEventListener('mouseleave',() =>{
        boxDropdown_list.style.display = 'none';
    })
}
for (let x = 0; x < boxDropdown.length; x++) {
    const box = boxDropdown[x];
    box.addEventListener('mouseenter',() =>{
        box.style.display = 'block';
    })
    box.addEventListener('mouseleave',() =>{
        box.style.display = 'none';
    })
}



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
    setInterval(()=>{
        window.location.href = "./index.html"
    },1000)
    window.location.href="./adminpol.html"
})