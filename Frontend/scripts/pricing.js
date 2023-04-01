let basicPlans = [
    {
        type:"Basic",
        price:0,
        features:{"participants":3, "events":2, "poll":1,},
        color:"#32b4b5",
        btnText:"Get started "
    },
    {
        type:"Advanced",
        price:1,
        features:{"participants":5, "events":7, "poll":5,},
        color:"#f06e28",
        btnText:"Buy Now"
    },
    {
        type:"Ultimate",
        price:2,
        features:{"participants":1000, "events":100, "poll":"unlimited",},
        color:"#8d2fe7",
        btnText:"Buy Now"
    }
];
let singleUsePlans = [
    {
        type:"Basic",
        price:0,
        features:{"participants":3, "events":2, "poll":1,},
        color:"#32b4b5",
        btnText:"Get started "
    },
    {
        type:"Advanced",
        price:5,
        features:{"participants":5, "events":7, "poll":5,},
        color:"#f06e28",
        btnText:"Buy Now"
    },
    {
        type:"Ultimate",
        price:10,
        features:{"participants":1000, "events":100, "poll":"unlimited",},
        color:"#8d2fe7",
        btnText:"Buy Now"
    }
];



function displayBasicPlans(arr){

let mainDiv = document.getElementById("mainDiv")
mainDiv.innerHTML=null;

arr.forEach(item => {
    let div = document.createElement("div");
    div.classList.add('col-lg-4')
      let div12 = document.createElement("div");
          div12.classList.add("bg-white", "mt-3", "price-box");
          let div20 = document.createElement("div");
              div20.classList.add("pricing-name", "text-center");
                   div20.innerHTML=`<h4 class="mb-0">${item.type}</h4>`
         div12.append(div20); //heading done
     let div21 = document.createElement("div");
         
         div21.classList.add("plan-price", "text-center","mt-4")
         div21.innerHTML=`<h1 class="text-custom font-weight-normal mb-0"  style="font-size: 100px;" >₹${item.price}<span>/Month</span></h1>`
         div12.append(div21)
     let div22 = document.createElement("div");
         div22.classList.add("price-features", "mt-5");
         let obj =item.features;
         for(var x in obj){
            let p =document.createElement("p");
            p.innerHTML=`<i style="background-color: #fff; font-size: xx-large;" class=" mdi mdi-check"></i> ${x} <span class="font-weight-bold">${obj[x]}</span>` 
            div22.append(p);
        }
        div12.append(div22)
    let div23 = document.createElement("div");
        div23.classList.add("text-center", "mt-5");
        let btn = document.createElement("a");
        btn.classList.add("btn" ,"btn-custom");
        btn.innerText= item.btnText;
        btn.addEventListener("click",()=>{
            planSelected(item)
        });
        div23.append(btn)
    
    div12.append(div23);

div.append(div12)
mainDiv.append(div);
//alert("done")
});



}
displayBasicPlans(basicPlans)


function planSelected(plan){
    
    localStorage.setItem("plan",JSON.stringify(plan));
    let planData = localStorage.getItem("plan");
    if(planData){window.location.href="./payment.html"}
    
}