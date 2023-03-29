
let baseUrl = "http://localhost:8500"
let form = document.querySelector("#form");


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
let regRoute = baseUrl+"/register"

fetch(regRoute, {
  method: 'POST',
  body: JSON.stringify(obj),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => {
   response.json()
     if(response.status=="402"){ response.json();console.log("second")}
    
})
  .then((json) => {

    
    console.log(json);alert(json.status)

});

 }



   
    
   


}catch(err){console.log(err);alert("some error happened")}

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


///<button onclick="document.getElementById('id01').style.display='block'" class="w3-button w3-black">Fade In Modal</button>

