let baseUrl = "http://localhost:8500";
let plan = localStorage.getItem("plan")
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
        
        let data = await response.json();
        //_______________________________
        displayProfile(data)

        //_______________________________
        
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

function displayProfile(obj){
userInfoDiv.innerHTML=`                        <div id="userInfoDiv" class="user-info">
<img id="profilePic" class="img-profile img-circle img-responsive center-block" src="${obj.profilePic}" alt="">
<ul class="meta list list-unstyled">
    <li id="name" class="name">${obj.name}
        <label class="label label-info"></label>
    </li>
    <li class="email"><a href="#">${obj.email}</a></li>
    
    <li class="activity">Selected Plan :  <label style="background-color: green;color: white;border-radius: 5px;padding: 0px 5px;" class="label label-info">UX Designer</label> </li>
    <li class="activity"> No of events : 234</li>
    <li class="activity"> No of polls : 24</li>
    <li class="activity"> No of events : unlimited</li>



    <li class="activity">Payment:  <label style="background-color: rgb(214, 47, 5);color: white;border-radius: 5px;padding: 0px 7px;" class="label label-info">$ 100</label> </li>
    <li id="changePlan" class="activity"> <label style="background-color: rgb(138, 0, 0);color: white;border-radius: 5px;padding: 5px 15px;margin: 40px;cursor: pointer;" class="label label-info">Change Plan</label> </li>
    
</ul>
</div>`


}























//user Profile
//class = userInfo
// let userName  = document.getElementById("name");
// let userPic = document.getElementById("profilePic");
// let userEmail = document.getElementById("email")
//sample data 




//payment info

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

    alert(JSON.stringify(obj,null,2))
})








