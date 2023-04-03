let navbar= document.getElementById("navbar");
let pollData=JSON.parse(localStorage.getItem("polldata"));
let baseUrl="https://fun-chat-ht6d.onrender.com";

function createnav(){
    navbar.innerHTML=
    `
    <div id="child1">
       <a href="#">${pollData.name}</a>
    </div>
    <div id="child3">
       <a href="#"># ${pollData.code}</a>
    </div>
   <div id="child2">
       <a href="#">What's new</a>
       <button >AK</button>
   </div>
    `
}
createnav();

let launchBtn=document.getElementById("launch");

launchBtn.addEventListener("click",async ()=>{
     let input=document.getElementById("open-text").value;
     let code=pollData.code;
     try {
        let obj={polls:input,code};
        let res=await fetch(`${baseUrl}/polls/add`,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify(obj)
        });
        let data=await res.json();
        console.log(data);
        window.location.href="./adminpolled.html";
        
     } catch (error) {
        console.log(error);
     }
});

let code=pollData.code;

let uniqueCode=document.getElementById("code");
 uniqueCode.innerText=`Your participants can interact with your Slido
                        event by joining at Slido.com with the code
                        #${code}`;
let polltext=document.querySelector("#live-polls #child3");
let polltext1=document.querySelector("#live-polls #child1");


function displaypoll(data){
    polltext.innerHTML=`
      ${data.map((elem)=>{
         return `
         <h3><i class="fa-regular fa-message" style="margin-right: 7px;"></i> Open Text Poll</h3>
         <p>Poll for: ${elem.polls}?</p>
         <hr>
         <h2>Responses</h2>
         <div id="all-response">
         </div>
         `;
      })}
    `;
    let allResponse=document.getElementById("all-response");
    async function displayResponse(){
      try {
        let res= await fetch(`${baseUrl}/polls/response/${code}`);
        let data= await res.json();
         allResponse.innerHTML=`
          ${data.map((elem)=>{
              return `
              <div id="one-res">
                <i class="fa-solid fa-user"></i>
                <div>
                    <span>Anonymous</span>
                    <br>
                    <span>${elem.response}</span>
                </div>
              </div>
              `;
          })}
         `;
        
      } catch (error) {
          console.log(error);
      }
    }
    displayResponse();
}

async function showpolltext(){
    try {
        let res=await fetch(`${baseUrl}/polls/${code}`);
        let data=await res.json();
        if(data.length==0){
           polltext1.style.display="block";
           polltext.style.display="none";
        }else{
            displaypoll(data);
        }
       
    } catch (error) {
        console.log(error);
    }
}
showpolltext();



const socket = io("https://fun-chat-ht6d.onrender.com" , {transports : ["websocket"]});

let room=pollData.code+"";

socket.emit("joinRoom",{room});
socket.on("message",async (msg)=>{
    let allResponse=document.getElementById("all-response");
    let obj={code:room,response:msg};
    try {
        let res=await fetch(`${baseUrl}/polls/response/add`,{
            method:"POST",
            body:JSON.stringify(obj),
            headers
:{
                "Content-Type":"Application/json"
            }
        })
        let data=await res.json()
        showpolltext()
        
        
    } catch (error) {
        console.log(error)
    }
})


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
