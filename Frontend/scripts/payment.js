let baseUrl = "https://adventurous-teal-dungarees.cyclic.app";
let plan = localStorage.getItem("plan");
plan = JSON.parse(plan);
console.log(plan)
let userInfoDiv = document.getElementById("mainProfile");


//requesting user info from backend 
 async function getUser(){
    try{
       let url = `${baseUrl}/users`
        let response = await fetch(url, {
            method: 'GET',
         
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'authToken'   :localStorage.getItem("authToken"),
              'refreshToken':localStorage.getItem('refreshToken')
            },
          })
        if(response.ok==true){
            let data = await response.json();
        //_______________________________
        displayProfile(data,plan)
        
        //_______________________________
        }
        else{
            window.location.href = "./login.html"
        }
       
        

        
    }catch(err){console.log("error in get regest ",err)}
}getUser();
{/*<img id="profilePic" class="img-profile img-circle img-responsive center-block" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="">
 <ul class="meta list list-unstyled">
<li id="name" class="name">Rebecca Sanders
    <label class="label label-info">UX Designer</label>
</li>
<li class="email"><a href="#">Rebecca.S@website.com</a></li>
<li class="activity">Last logged in: Today at 2:18pm</li>
</ul> */}

function displayProfile(obj,plan){
userInfoDiv.innerHTML=`                        <div id="userInfoDiv" class="user-info">
<img id="profilePic" class="img-profile img-circle img-responsive center-block" src="${obj.profilePic}" alt="">
<ul class="meta list list-unstyled">
    <li id="name" class="name">${obj.name}
        <label class="label label-info"></label>
    </li>
    <li class="email"><a href="#">${obj.email}</a></li>
    
    <li class="activity">Selected Plan :   <label style="background-color: green;color: white;border-radius: 5px;padding: 0px 5px;" class="label label-info">${plan.type}</label> </li>
    <li class="activity"> No of participants :${plan.features.participants}</li>
    <li class="activity"> No of polls : ${plan.features.poll}</li>




    <li class="activity">Payment:  <label style="background-color: rgb(214, 47, 5);color: white;border-radius: 5px;padding: 0px 7px;" class="label label-info">₹ ${plan.price}</label> </li>
    <li id="changePlan" onclick="submit()" class="activity"> <label style="background-color: rgb(138, 0, 0);color: white;border-radius: 5px;padding: 5px 15px;margin: 40px;cursor: pointer;" class="label label-info">Change Plan</label> </li>
    
</ul>
</div>`


}

function submit(){
  Swal.fire(
    'You can change plan 😊....',
    '',
    'success'
  )
  setTimeout(() => {
    window.location.href= "./pricing.html"
  }, 3000);

}























//user Profile
//class = userInfo
// let userName  = document.getElementById("name");
// let userPic = document.getElementById("profilePic");
// let userEmail = document.getElementById("email")
//sample data 




//payment info
let loding_container = document.getElementById("loding_container");
let cardName = document.getElementById("nameOnCard").value;
let cardNumber = document.getElementById("cardNumber").value;
let expiryMonth = document.getElementById("ExpMonth").value;
let expiryYear = document.getElementById("expYear").value;
let cvv = document.getElementById("cvv").value;

//address 
let address = document.getElementById("address").value;
let city = document.getElementById("city").value;
let pincode = document.getElementById("pincode").value;
let country = document.getElementById("country").value;
let state = document.getElementById("state").value;

//payment btn
let payBtn = document.getElementById("payBtn");
payBtn.addEventListener("click",async (e)=>{
    try{
    e.preventDefault();
    let obj = {
        //address 
cardName  :document.getElementById("nameOnCard").value,
cardNumber :document.getElementById("cardNumber").value,
expiryMonth : document.getElementById("ExpMonth").value,
expiryYear : document.getElementById("expYear").value,
cvv : document.getElementById("cvv").value,
address : document.getElementById("address").value,
city : document.getElementById("city").value,
pincode : document.getElementById("pincode").value,
country : document.getElementById("country").value,
state : document.getElementById("state").value,
    }
    // making loding animation to show up
  loding_container.style.display="block";

    let response = await fetch(`${baseUrl}/payment`, {
        method: 'PATCH',
        body: JSON.stringify({
          type:plan.type,
          payment:plan.price,
          limit:plan.features.participants
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'authToken':localStorage.getItem("authToken"),
          'refreshToken':localStorage.getItem("refreshToken")
        }
      })
    
        let data = await response.json();
        //alert(JSON.stringify(data,null,2));
        // as soon as we get the response from server making the loding animation hidden
    loding_container.style.display="none";
        Swal.fire({
            icon: 'success',
            title: `congrats ${data.name}`,
            text: `your payment of ₹${data.plan.payment} is successfull`,
            footer: `you have upgraded to ${data.plan.type} plan`
          })
   
          setTimeout(() => {
            window.location.href="./index.html"
          },2000);
   

    

    }catch(err){console.log(err)}
})








