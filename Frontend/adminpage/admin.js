var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");
var sidebarCloseIcon = document.getElementById("sidebarIcon");
let loding_container = document.getElementById("loding_container");
function toggleSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar_responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar_responsive");
    sidebarOpen = false;
  }
}


let baseurl = "https://fun-chat-ht6d.onrender.com/";
// let baseurl = "http://localhost:8500/";

const previousQuizes = document.getElementById("previous_quizes");
const participantList = document.getElementById("participant-list");

fetch_previous_quiz() 
fetch_rankings()
fetch_allusers()
fetch_allEvents()
// fetch function for quiz
async function fetch_previous_quiz() {
   loding_container.style.display="block";
  const url = `${baseurl}quiz/totalquizes`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    document.getElementById("totproducts").innerText = data.rooms.length;
    // loding_container.style.display="none";
    //here call the rendring function
    if (data.rooms.length > 0) {
      renderQuiz(data.rooms);
    } else {
      previousQuizes.innerHTML = null;
      let heading = document.createElement("h1");
      heading.innerText = "You Have Not Created Any Quizz Room Till Now";
      previousQuizes.appendChild(heading);
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

function renderQuiz(Data) {
  previousQuizes.innerHTML = null;
  let heading = document.createElement("h1");
  heading.innerText = "All User's Quiz Rooms";
  previousQuizes.appendChild(heading);

  Data.forEach((quizData) => {
    const quizContainer = document.createElement("div");
    quizContainer.classList.add("quiz-container");

    const roomnameEl = document.createElement("p");
    roomnameEl.textContent = `Room Name: ${quizData.roomname}`;
    quizContainer.appendChild(roomnameEl);

    const authorEl = document.createElement("p");
    authorEl.textContent = `Author: ${quizData.Author}`;
    quizContainer.appendChild(authorEl);
    const timeforq = document.createElement("p");
    timeforq.textContent = `Maximum Time: ${quizData.timeout} minutes`;
    quizContainer.appendChild(timeforq);
    const time = document.createElement("p");
    time.textContent = `Created At: ${quizData.time}`;
    quizContainer.appendChild(time);
    const date = document.createElement("p");
    date.textContent = `Created On: ${quizData.date}`;
    quizContainer.appendChild(date);

    quizData.quiz.forEach((questionData, index) => {
      const questionEl = document.createElement("p");
      questionEl.textContent = `Question ${index + 1}: ${
        questionData.question
      }`;
      quizContainer.appendChild(questionEl);

      const optionsEl = document.createElement("ul");
      optionsEl.classList.add("options");

      const optionAEl = document.createElement("li");
      optionAEl.textContent = `A. ${questionData.a}`;
      optionsEl.appendChild(optionAEl);

      const optionBEl = document.createElement("li");
      optionBEl.textContent = `B. ${questionData.b}`;
      optionsEl.appendChild(optionBEl);

      const optionCEl = document.createElement("li");
      optionCEl.textContent = `C. ${questionData.c}`;
      optionsEl.appendChild(optionCEl);

      const optionDEl = document.createElement("li");
      optionDEl.textContent = `D. ${questionData.d}`;
      optionsEl.appendChild(optionDEl);
      const correct = document.createElement("li");
      correct.setAttribute("class", "answer_que");
      correct.textContent = `Answer. ${questionData.correct}`;
      optionsEl.appendChild(correct);

      quizContainer.appendChild(optionsEl);
    });

    previousQuizes.appendChild(quizContainer);
  });
}


// js for displaying ranking

async function fetch_rankings() {
  // loding_container.style.display="block";
  // const url = `${baseurl}quiz/getParticipent/${userid}`;
  const url = `${baseurl}quiz/getParticipent`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    document.getElementById("menproducts_").innerText =data.participents.length  ;
    // loding_container.style.display="none";
    //here call the rendring function
    if (data.participents.length > 0) {
      renderRanks(data.participents);
    } else {
      participantList.innerHTML = null;
      let heading = document.createElement("h1");
      heading.innerText = "No One Have Participated In Your Quiz Room";
      participantList.appendChild(heading);
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

function renderRanks(participants) {
  participantList.innerHTML = null;
  let heading = document.createElement("h1");
  heading.innerText =
    "Ranking Of Participents Those Who Have Participated In Any Of Quiz Room";
  participantList.appendChild(heading);
  participants.sort((a, b) => {
    if (b.correct_ans === a.correct_ans) {
      return a.name.localeCompare(b.name);
    }
    return b.correct_ans - a.correct_ans;
  });
  let n = 1;
  for (const participant of participants) {
    const participantItem = document.createElement("li");

    const rank = document.createElement("h2");
    rank.innerText = `Rank: ${n++}`;
    participantItem.appendChild(rank);

    const name = document.createElement("p");
    name.innerText = `Name: ${participant.name}`;
    participantItem.appendChild(name);

    const correctAns = document.createElement("p");
    correctAns.innerText = `Correct Answers: ${participant.correct_ans}`;
    participantItem.appendChild(correctAns);

    const totalQue = document.createElement("p");
    totalQue.innerText = `Total Questions: ${participant.total_que}`;
    participantItem.appendChild(totalQue);

    const time = document.createElement("p");
    time.innerText = `Time: ${participant.time}`;
    participantItem.appendChild(time);

    const date = document.createElement("p");
    date.innerText = `Date: ${participant.date}`;
    participantItem.appendChild(date);

    const quizRoom = document.createElement("p");
    quizRoom.innerText = `Quiz Room Name: ${participant.quizRoom}`;
    participantItem.appendChild(quizRoom);

    const Author = document.createElement("p");
    Author.innerText = `Quiz Room Created By: ${participant.Author}`;
    participantItem.appendChild(Author);

    participantList.appendChild(participantItem);
  }
}


async function fetch_allusers() {
  // loding_container.style.display="block";
  // const url = `${baseurl}quiz/getParticipent/${userid}`;
  const url = `${baseurl}users/getallusers`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    document.getElementById("totuser").innerText=data.length;
   rendertable(data, document.getElementById("tbody_"));
  } catch (error) {
    console.log("Error:", error);
  }
}
function rendertable(data, selector) {
  let s = 1;
  data.forEach((el, index) => {
    let tr = document.createElement("tr");
    let sno = document.createElement("td");
    sno.innerText = s++;
    let img = document.createElement("td");
    let imgtag = document.createElement("img");
    imgtag.setAttribute("src", el.profilePic);
    imgtag.setAttribute("class", "table_user_img");
    img.append(imgtag);
    let name = document.createElement("td");
    name.innerText = el.name;
    let email = document.createElement("td");
    email.innerText = `$ ${el.email}`;
    let plan = document.createElement("td");
    plan.innerText = el.plan.type;

    tr.append(sno, img, name,email,plan);
    selector.append(tr);
  });
}


async function fetch_allEvents() {
  // loding_container.style.display="block";
  // const url = `${baseurl}quiz/getParticipent/${userid}`;
  const url = `${baseurl}events`;
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
    document.getElementById("women_pro_").innerText=data.length;
    rendertable_events(data, document.getElementById("tbody_footwear"));
  } catch (error) {
    console.log("Error:", error);
  }
}

function rendertable_events(data, selector) {
  let s = 1;
  data.forEach((el, index) => {
    let tr = document.createElement("tr");
    let sno = document.createElement("td");
    sno.innerText = s++;
    let name = document.createElement("td");
    name.innerText = el.name;
    // let dateStr;
    // let date;
    // if(el.startdate==undefined||el.startdate==null||el.startdate){
    //    dateStr = el.startdate;
    //    date = dateStr.substring(0, 10);
    // }else{
    //   date="Not Given"
    // }
    let start = document.createElement("td");
    start.innerText = `$ ${el.startdate}`;
    let eventcode = document.createElement("td");
    eventcode.innerText = `$ ${el.code}`;
    // let EdateStr;
    // let Edate;
    // if(el.enddate==undefined||el.enddate==null||el.enddat){
    //   EdateStr = el.startdate;
    //   Edate = dateStr.substring(0, 10);
    // }else{
    //   Edate="Not Given";
    // }
    let end = document.createElement("td");
    end.innerText = `${el.enddate}`;

    tr.append(sno,eventcode,name,start,end);
    selector.append(tr);
  });
}




// let user_logged=[{name:"prashant",email:"p@g.com"}]
// // let user_logged=JSON.parse(localStorage.getItem("user"));
// //  if(user_logged[0].name=="admin" && user_logged[0].email=="admin@gmail.com"){
// //   
// //   });
// //  }else{
// //   document.getElementById("admin_welcome").innerText="Unauthorised user Please login using Admin's credentials"
// //   document.getElementById("admin_name_h1").innerText="Unauthorised user"
// //   document.getElementById("admin_img").style.display="none"
// //   alert("You will not be able to perform any action. Please login via admin's user")
// //  }


