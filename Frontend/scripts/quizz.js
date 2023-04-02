let baseurl = "https://fun-chat-ht6d.onrender.com/";
let userid ;
const dummyquestions = [
  {
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
  },
];

// swal({
//   title: 'Logged In successfully!',
//   text: 'You are logged in successfully.',
//   icon: 'success'
// })
// swal({
//   title: 'Logged In successfully!',
//   text: 'You are logged in successfully.',
//   icon: 'error'
// })

let quizData;
//js for user details
let mainsection = document.querySelector(".main");
let Quizcontainer = document.querySelector(".container");
let user_details_div = document.querySelector("#user_details");
let user_name = document.querySelector("#user_name");
let Quizz_room_name = document.querySelector("#Quizz_room_name");
let roombtn = document.querySelector("#roombtn");
let timercatiner = document.querySelector("#timercatiner");
let participant_name;
let participant_room;
mainsection.style.display = "none";
user_details_div.style.display = "block";
roombtn.addEventListener("click", () => {
  if (Quizz_room_name.value) {
    if (!user_name.value) {
      // alert("Plese Enter your name in Order to participate in Quizz");
      swal({
        title: "Plese Enter Your Name",
        text: "In Order To Participate In Quizz.",
        icon: "success",
      });
    } else {
      participant_name = user_name.value;
      participant_room = Quizz_room_name.value;
      fetch_start_quiz(participant_room);
    }
  } else {
    // alert("Please enter Quizz Room Name,to continue (case sensitive)");
    swal({
      title: "Plese Enter Quiz Room Name",
      text: "In Order To Participate In Quizz (case sensitive)",
      icon: "success",
    });
  }
});

//quizz controlling js
function start_quizz() {
  let index = 0;
  let correct = 0,
    incorrect = 0,
    total = quizData.length;
  let questionBox = document.getElementById("questionBox");
  let allInputs = document.querySelectorAll("input[type='radio']");
  const loadQuestion = () => {
    if (total === index) {
      return quizEnd();
    }
    reset();
    const data = quizData[index];
    questionBox.innerHTML = `${index + 1}) ${data.question}`;
    allInputs[0].nextElementSibling.innerText = data.a;
    allInputs[1].nextElementSibling.innerText = data.b;
    allInputs[2].nextElementSibling.innerText = data.c;
    allInputs[3].nextElementSibling.innerText = data.d;
  };

  document.querySelector("#submit").addEventListener("click", () => {
    const data = quizData[index];
    const ans = getAnswer();
    if (ans === data.correct) {
      correct++;
    } else {
      incorrect++;
    }
    index++;
    loadQuestion();
  });

  const getAnswer = () => {
    let ans;
    allInputs.forEach((inputEl) => {
      if (inputEl.checked) {
        ans = inputEl.value;
      }
    });
    return ans;
  };

  const reset = () => {
    allInputs.forEach((inputEl) => {
      inputEl.checked = false;
    });
  };
  let participated_users =
    JSON.parse(localStorage.getItem("all_participated_users")) || [];
  const quizEnd = () => {
    document.getElementsByClassName("container")[0].innerHTML = `
    <div class="col">
        <h3 class="w-100"> Hii ${participant_name}, you've scored ${correct} / ${total} </h3>
    </div>
`;

    let now = new Date();
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");
    let day = now.getDate().toString().padStart(2, "0");
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let year = now.getFullYear();

    let uobj = {
      name: participant_name,
      correct_ans: correct,
      wrong_ans: total - correct,
      total_que: total,
      time: hours + ":" + minutes + ":" + seconds,
      date: day + "/" + month + "/" + year,
      quizRoom: participant_room,
      Author: userid,
    };
    timercatiner.style.display = "none";
    fetch_save_pariticipents(uobj);
  };
  loadQuestion(index);
}

// fetching functions
async function fetch_save_pariticipents(obj) {
  
  loding_container.style.display="block";
  const url = `${baseurl}quiz/saveParticipent`;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    loding_container.style.display="none";
    // alert(data.msg);
    swal({
      title: `${data.msg}`,
      text: "Redirecting To HomePage...",
      icon: "success",
    });
    await new Promise((resolve) => setTimeout(resolve, 2500));
    window.location.href = "./index.html";
  } catch (error) {
    console.log(error);
  }
}

async function fetch_start_quiz(roomname) {
  loding_container.style.display="block";
  const url = `${baseurl}quiz/startQuiz/${roomname}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    loding_container.style.display="none";
    console.log(data)
    if (data.ok) {
      quizData = data.quiz.quiz;
      userid= data.quiz.Author;
      // alert(data.msg);
      swal({
        title: `${data.msg}`,
        text: "",
        icon: "success",
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      user_details_div.style.display = "none";
      mainsection.style.display = "flex";
      // start_quizz();
      // let n = data.quiz.timeout;
      // countdownmaneger(n);
      let n = data.quiz.timeout;
      countdownmaneger(n);
      start_quizz();
    } else {
      // alert(data.msg);
      swal({
        title: `${data.msg}`,
        text: "",
        icon: "success",
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function countdownmaneger(n) {
  timercatiner.style.display = "block";
  let timertext = document.getElementById("time");
  const starting_time = 1;
  let time = starting_time * 60;
  let timerintervel = setInterval(updateCountdown, 1000);
  async function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 0) {
      clearInterval(timerintervel);
      timertext.innerHTML = "EXPIRED";
      document.getElementsByClassName("container")[0].innerHTML = `
       <div class="col">
           <h3 class="w-100"> Hii ${participant_name}, Sorry Quizz Time got over </h3>
       </div>
   `;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      swal({
        title: `Redirecting You To HomePage`,
        text: "Please Wait....",
        icon: "success",
      });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      window.location.href = "./index.html";
    } else {
      seconds = seconds < 10 ? "0" + seconds : seconds;
      timertext.innerHTML = `${minutes}:${seconds}`;
      time--;
    }
  }
}
