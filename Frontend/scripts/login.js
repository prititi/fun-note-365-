
let baseUrl = "https://fun-chat-ht6d.onrender.com"
let form = document.querySelector("#form");
storeEventCode()

//google auth 
let googleBtn = document.querySelector("#google");
googleBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    //_______________________________________

    Swal.fire({
      // title: "Enter Your registered email",
      // input: 'text',
      html:"<img style='width:50px;margin :10px' src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png'>      <input id='e1' type='email' placeholder='email associated with google' >",
      
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'continue',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`${baseUrl}/login/${document.getElementById("e1").value}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("authToken",result.value.authToken);
        localStorage.setItem("refreshToken",result.value.refreshToken);
        localStorage.setItem("userData",JSON.stringify(result.value.userData));
        
        Swal.fire({
          title: `${result.value.msg}`,
          imageUrl: result.value.userData.profilePic
        })
        setTimeout(()=>{ window.location.href='./index.html'},2000)
       
      }
    })









//_____________________________________________
    //window.location.href="http://localhost:8500/oauth/google"
    
})


form.addEventListener("submit",async(e)=>{
try{
e.preventDefault();

let email = form.email.value;
let password=form.pw.value;

if( !password || !email ){
    errorAlert("Please fill all the fields")
}else if(password.length<6){
errorAlert("Please use the original password ")
}else if(!ValidateEmail(email)){
errorAlert("Please enter a valid email")
}
else {
//success
//alert("success")
let obj ={
    
    email : form.email.value,
    password:form.pw.value,
    
}

let res = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if(res.ok){
    let data = await res.json();
    let authToken = data.authToken;
    let refreshToken = data.refreshToken;
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("refreshToken", refreshToken);
    alert("login successfull");
    window.location.href = "./index.html";
  }
  else {
   if(res.status==401){
    let d = await res.json();
    alert(JSON.stringify(d));
     
     
  }
  else if(res.status==404){
    let d = await res.json();
    alert(JSON.stringify(d));
    
      window.location.href = "./signup.html";
  }
//    else if(res.status==401){alert(" password not matching")}
//   }



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


///<button onclick="document.getElementById('id01').style.display='block'" class="w3-button w3-black">Fade In Modal</button>


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

