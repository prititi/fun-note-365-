const dummyquestions= [{
    question: "Which of the following is a client site language?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
},
{
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
},
{
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
},
{
    question: "What does CSS stands for?",
    a: "Hypertext Markup Language",
    b: "Cascading Style Sheet",
    c: "Jason Object Notation",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "b",
}
];
// const quizData =JSON.parse(localStorage.getItem("Quizquestions")) ||dummyquestions;

const quizData =dummyquestions;
//js for user details
let mainsection=document.querySelector(".main");
let user_details_div=document.querySelector("#user_details");
let user_name=document.querySelector("#user_name");
let Quizz_room_name=document.querySelector("#Quizz_room_name");
let roombtn=document.querySelector("#roombtn");
let participant_name;
let participant_room;
mainsection.style.display="none";
user_details_div.style.display="block";
roombtn.addEventListener("click",()=>{
    if (JSON.parse(localStorage.getItem(Quizz_room_name.value))) {
        if(!user_name.value){
            alert("Plese Enter your name in Order to participate in Quizz")
        }else{
            alert("starting your Quizz")
            participant_name=user_name.value;
            participant_room=Quizz_room_name.value;
            user_details_div.style.display="none";
            mainsection.style.display="flex";
        }
      } else {
        alert("Incorrect Quizz Room Name,Kindly enter exact Quizz Room Name (case sensitive)")
      }
})

//quizz controlling js
let index = 0;
let correct = 0,
incorrect = 0,
total = quizData.length;
let questionBox = document.getElementById("questionBox");
let allInputs = document.querySelectorAll("input[type='radio']")
const loadQuestion = () => {
if (total === index) {
    return quizEnd()
}
reset()
const data = quizData[index]
questionBox.innerHTML = `${index + 1}) ${data.question}`
allInputs[0].nextElementSibling.innerText = data.a
allInputs[1].nextElementSibling.innerText = data.b
allInputs[2].nextElementSibling.innerText = data.c
allInputs[3].nextElementSibling.innerText = data.d
}

document.querySelector("#submit").addEventListener("click",()=>{
    const data = quizData[index]
    const ans = getAnswer()
    if (ans === data.correct) {
        correct++;
    } else {
        incorrect++;
    }
    index++;
    loadQuestion()
}
)

const getAnswer = () => {
let ans;
allInputs.forEach(
    (inputEl) => {
        if (inputEl.checked) {
            ans = inputEl.value;
        }
    }
)
return ans;
}

const reset = () => {
allInputs.forEach(
    (inputEl) => {
        inputEl.checked = false;
    }
)
}

const quizEnd = () => {
document.getElementsByClassName("container")[0].innerHTML = `
    <div class="col">
        <h3 class="w-100"> Hii ${participant_name}, you've scored ${correct} / ${total} </h3>
    </div>
`
}
loadQuestion(index);
