

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




let baseUrl="https://fun-chat-ht6d.onrender.com"

async function fetchEvent(){
  try {
    let res= await fetch(`${baseUrl}/events`,{
      method:"GET",
      headers:{
        // Authorization: token
      }
    })
    let data= await res.json()
    data = data[data.length-1]
    let id = data._id
    console.log(id)
    getpoll(id)
    
  } catch (error) {
     console.log(error)
  }
}

async function getpoll(id){
    try {
      let res= await fetch(`${baseUrl}/events/${id}`)
      let data= await res.json()
      console.log(data)
      localStorage.setItem("polldata",JSON.stringify(data))
      window.location.href="./adminpolled.html"
      
    } catch (error) {
        console.log(error)
    }
}

let createPollBtn= document.getElementById("create-poll")
let cancelBtn=document.getElementById("cancel")
let body=document.querySelector("body")
let pollBox=document.getElementById("crete-pollbox")

createPollBtn.addEventListener("click",()=>{
 
    pollBox.style.display="block"
    body.style.opacity="1"
    pollBox.style.opacity="1"
})

cancelBtn.addEventListener("click",()=>{
  pollBox.style.display="none"
  body.style.opacity="1.0"
})

let pollBtn=document.getElementById("submit")

pollBtn.addEventListener("click", ()=>{
  let startdate=document.getElementById("start-date").value;
  let enddate=document.getElementById("end-date").value
  let name=document.getElementById("poll-name").value
    let obj={
      startdate:startdate,enddate:enddate,name:name
    }
    console.log(obj)
    addPoll(obj)

})

async function addPoll(obj){
  try {
    let res=await fetch(`${baseUrl}/events/add`,{
      method:"POST",
      body:JSON.stringify(obj),
      headers:{
        "Content-Type":"Application/json",
        // Authorization: token
      }
    })
    let data=await res.json()
    alert("Event Created")
    pollBox.style.display="none"
    fetchEvent()
    body.style.opacity="1"
    
  } catch (error) {
      console.log(error)
  }

}


let Rating= document.getElementById("Rating")
Rating.addEventListener("click",()=>{
  window.location.href="./rating.html"
})

let Quiz= document.getElementById("Quiz")
Quiz.addEventListener("click",()=>{
  window.location.href="./quizz_question.html"
})
let Ranking= document.getElementById("Ranking")
Ranking.addEventListener("click",()=>{
  window.location.href="./Rankadmin.html"
})



