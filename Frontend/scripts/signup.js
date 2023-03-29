
let baseUrl = "http://localhost:8500"
let form = document.querySelector("#form");


//google auth 
let googleBtn = document.querySelector("#google");
googleBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href="http://localhost:8500/oauth/google"
    
})

storeEventCode()





form.addEventListener("submit",async(e)=>{
try{
e.preventDefault();
let name = form.name.value;
let email = form.email.value;
let password=form.pw.value;
let cPassword=form.cpw.value;
if(!name || !password || !cPassword || !email ){
    errorAlert("Please fill all the fields")
}else if(password !=cPassword){
errorAlert("password doesn't match") 
}else if(password.length<6){
errorAlert("Please use a strong password with atleast 8 charectors")
}else if(!ValidateEmail(email)){
errorAlert("Please enter a valid email")
}
else {
//success
//alert("success")
let obj ={
    name : form.name.value,
    email : form.email.value,
    password:form.pw.value,
    cPassword:form.cpw.value
}

let res = await fetch(`${baseUrl}/register`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if(res.ok){
    let data = await res.json();
    let authToken = data.authToken;
    sessionStorage.setItem("authToken", authToken);
    alert("registered succesfully");
    window.location.href = "./login.html";
  }
  else {
   if(res.status==409){
      alert("user already exists, login please");
      window.location.href = "./login.html";
  }
   else if(res.status==401){alert(" password not matching")}
  }




   
    
   
}

}catch(err){console.log(err);alert("something went wrong, please try again later")}

//event listener ends here
})


//email validator with regex
function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    //alert("You have entered an invalid email address!")
    return (false)
}


//function to show error
function errorAlert(msg){
    let p = document.getElementById("errorDisplay");
    p.innerText=msg;
    p.classList.add("redBorder");
    setTimeout(() => {
        p.innerHTML=null;
        p.classList.remove("redBorder")
    }, 5000);
}


//function for event code 
function storeEventCode(){
    let arrow = document.getElementById("enter");
    arrow.addEventListener("click",(e)=>{
        e.preventDefault();
    let code = document.getElementById("code");
    sessionStorage.setItem("eventCode", code.value);
    let c = sessionStorage.getItem("eventCode");
    if(c){
        window.location.href="./search.html"
    }
    
   
    })
}
// storeEventCode()

///<button onclick="document.getElementById('id01').style.display='block'" class="w3-button w3-black">Fade In Modal</button>

