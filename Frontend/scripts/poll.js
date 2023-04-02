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



let room=localStorage.getItem("roomno")
let baseUrl="https://fun-chat-ht6d.onrender.com"
let token= localStorage.getItem("token")

let responseForm=document.getElementById("response-form")

const socket = io("https://fun-chat-ht6d.onrender.com" , {transports : ["websocket"]})

socket.emit("joinRoom",{room})

socket.emit("msg","Harshit")

socket.on("message",(msg)=>{
    console.log(msg)
})


responseForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    let res=document.getElementById("res").value;
    socket.emit("response",res)
    alert("Response Added")
    res=""
    location.href="./polls.html"
})

async function getpoll(){
    try {
        let res=await fetch(`${baseUrl}/polls/${room}`,{
            method: "GET"
        })
        let data=await res.json()
        displaydata(data)
        console.log(data[0].polls)
        
    } catch (error) {
        console.log(error)
    }
}
getpoll()

const question =document.querySelector(".question")

function displaydata(data){
    let div=document.createElement("div");
    let h3= document.createElement("h3");
    h3.innerText= data[0].polls+"?";
    div.append(h3);
    question.append(div);

}
