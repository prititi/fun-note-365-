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


let baseurl = "https://fun-chat-ht6d.onrender.com/";
// let baseurl = "http://localhost:8500/";
const userid = JSON.parse(localStorage.getItem("userData"))._id;
// const userid = "priti";
const permitted_quiz_rooms =JSON.parse(localStorage.getItem("userData")).plan.limit;
// const permitted_quiz_rooms=5;

let loding_container = document.getElementById("loding_container");
let add_new_que = document.getElementById("add_ques");
let create_quizz = document.getElementById("create_quizz");
let question_form = document.getElementById("quizz_form");
let Question = document.getElementById("que_stion");
let option_a = document.getElementById("option_a");
let option_b = document.getElementById("option_b");
let option_c = document.getElementById("option_c");
let correct_ans = document.getElementById("correct_ans");
let quizz_room_name = document.getElementById("quizz_room_name");
let room_quizz;
let quest_num = document.getElementById("quest_num");
let que_preview = document.getElementById("que_preview");
let max_time = document.getElementById("max_time");
let qp = document.getElementById("qp");
let qarr = localStorage.getItem("allquestions") || "";
let qn = localStorage.getItem("que_number") || 1;
let questionarr;
let qnum;
if (qarr) {
  questionarr = JSON.parse(qarr);
  qnum = qn;
} else {
  qarr = [];
  qnum = 1;
  questionarr = qarr;
}
quest_num.innerText = `${qnum}.`;

//creating quizz
create_quizz.addEventListener("click", (e) => {
  e.preventDefault();
  if (questionarr.length > 0) {
    if (quizz_room_name.value == "") {
      // alert("Please fill the Quizz Room Name");
      swal({
        title: "Please fill the Quizz Room Name",
        text: "In Order To Create Quizz.",
        icon: "success",
      });
    } else {
      if (fetch_total_quiz(userid)) {
        room_quizz = quizz_room_name.value;
        let now = new Date();
        let hours = now.getHours().toString().padStart(2, "0");
        let minutes = now.getMinutes().toString().padStart(2, "0");
        let seconds = now.getSeconds().toString().padStart(2, "0");
        let day = now.getDate().toString().padStart(2, "0");
        let month = (now.getMonth() + 1).toString().padStart(2, "0");
        let year = now.getFullYear();
        let obj = {
          roomname: room_quizz,
          Author: `${userid}`,
          quiz: questionarr,
          timeout: Number(max_time.value),
          time: hours + ":" + minutes + ":" + seconds,
          date: day + "/" + month + "/" + year,
        };
        //creating quiz using mongodb
        fetch_create_quiz(obj);
      } else {
        // message to upgrade his plan
        // alert(
        //   `You have reached limit ${permitted_quiz_rooms} of creating quiz rooms,kindly upgrade your plan to continue. `
        // );
        swal({
          title: `You have reached limit ${permitted_quiz_rooms} of creating quiz rooms,`,
          text: "Kindly upgrade your plan to continue.",
          icon: "success",
        });
      }
    }
  } else {
    // alert("Add Questions To Create Quizz");
    swal({
      title: "Add Questions First",
      text: "In Order To Create Quizz.",
      icon: "success",
    });
  }
});
//adding questions
add_new_que.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    !Question.value ||
    !option_a.value ||
    !option_b.value ||
    !option_c.value ||
    !option_d.value ||
    !correct_ans.value
  ) {
    // alert("Plese fill all fields");
    swal({
      title: "Plese fill all fields",
      text: "To Continue...",
      icon: "success",
    });
  } else if (
    correct_ans.value.toLowerCase() !== "a" &&
    correct_ans.value.toLowerCase() !== "b" &&
    correct_ans.value.toLowerCase() !== "c" &&
    correct_ans.value.toLowerCase() !== "d"
  ) {
    // alert("Please Enter Correct answer field properly");
    swal({
      title: "Please Enter Correct answer field properly",
      text: "To Continue...",
      icon: "success",
    });
  } else {
    let obj = {
      question: Question.value,
      a: option_a.value,
      b: option_b.value,
      c: option_c.value,
      d: option_d.value,
      correct: correct_ans.value.toLowerCase(),
    };
    questionarr.push(obj);
    localStorage.setItem("allquestions", JSON.stringify(questionarr));
    if (questionarr.length == 0) {
      que_preview.style.display = "none";
      qp.style.display = "none";
    } else {
      que_preview.style.display = "block";
      qp.style.display = "block";
    }
    preview_of_ques(questionarr);
    qnum++;
    quest_num.innerText = `${qnum}.`;
    localStorage.setItem("que_number", qnum);
    question_form.reset();
    // alert("question added");
    swal({
      title: "Question Added",
      text: "You Can now Create Quizz Or Add More Questions To It.",
      icon: "success",
    });
  }
});

// editing a question
const edit_btn = document.getElementById("edit_btn");
const edit_que = document.getElementById("edit_que");
edit_btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (questionarr.length > 0) {
    edit_que.style.display = "block";
  } else {
    // alert("First Add Question In Order To Edit");
    swal({
      title: "First Add Question In Order To Edit",
      text: "",
      icon: "success",
    });
  }
});

//editing quiz
const submitBtn = document.querySelector("#E_submit");
submitBtn.addEventListener("click", submitForm);
function submitForm(event) {
  event.preventDefault();
  const que_stion_number = document.querySelector("#que_stion_number");
  const E_que_stion = document.querySelector("#E_que_stion");
  const E_option_a = document.querySelector("#E_option_a");
  const E_option_b = document.querySelector("#E_option_b");
  const E_option_c = document.querySelector("#E_option_c");
  const E_option_d = document.querySelector("#E_option_d");
  const E_correct_ans = document.querySelector("#E_correct_ans");
  if (
    !E_que_stion.value ||
    !E_option_a.value ||
    !E_option_b.value ||
    !E_option_c.value ||
    !E_option_d.value ||
    !E_correct_ans.value
  ) {
    // alert("Plese fill all fields");
    swal({
      title: "Plese fill all fields",
      text: "",
      icon: "success",
    });
  } else if (
    E_correct_ans.value.toLowerCase() !== "a" &&
    E_correct_ans.value.toLowerCase() !== "b" &&
    E_correct_ans.value.toLowerCase() !== "c" &&
    E_correct_ans.value.toLowerCase() !== "d"
  ) {
    // alert("Please Enter Correct answer field properly");
    swal({
      title: "Please Enter Correct answer field properly",
      text: "",
      icon: "success",
    });
  } else {
    const obj = {
      question: E_que_stion.value,
      a: E_option_a.value,
      b: E_option_b.value,
      c: E_option_c.value,
      d: E_option_d.value,
      correct: E_correct_ans.value,
    };

    let qu = Number(que_stion_number.value);
    questionarr[qu - 1] = obj;
    localStorage.setItem("allquestions", JSON.stringify(questionarr));
    preview_of_ques(questionarr);
    edit_que.style.display = "none";
  }
}

//preview of questions
preview_of_ques(questionarr);
function preview_of_ques(data) {
  if (questionarr.length == 0) {
    que_preview.style.display = "none";
    qp.style.display = "none";
  } else {
    que_preview.style.display = "block";
    qp.style.display = "block";
  }
  que_preview.innerHTML = null;
  let qn = 1;
  data.forEach((el) => {
    const div = document.createElement("div");
    div.className = "one_que";

    const innerDiv1 = document.createElement("div");
    const questionNum = document.createElement("p");
    questionNum.textContent = `${qn++}.`;
    const questionText = document.createElement("h2");
    questionText.textContent = el.question;
    innerDiv1.appendChild(questionNum);
    innerDiv1.appendChild(questionText);
    innerDiv1.setAttribute("class", "preview_question_tab");
    const innerDiv2 = document.createElement("div");
    const optionA = document.createElement("p");
    optionA.textContent = "A:-";
    const optionAText = document.createElement("p");
    optionAText.textContent = el.a;
    innerDiv2.appendChild(optionA);
    innerDiv2.appendChild(optionAText);
    innerDiv2.setAttribute("class", "even_option");
    const innerDiv3 = document.createElement("div");
    const optionB = document.createElement("p");
    optionB.textContent = "B:-";
    const optionBText = document.createElement("p");
    optionBText.textContent = el.b;
    innerDiv3.appendChild(optionB);
    innerDiv3.appendChild(optionBText);
    innerDiv3.setAttribute("class", "odd_option");
    const innerDiv4 = document.createElement("div");
    const optionC = document.createElement("p");
    optionC.textContent = "C:-";
    const optionCText = document.createElement("p");
    optionCText.textContent = el.c;
    innerDiv4.appendChild(optionC);
    innerDiv4.appendChild(optionCText);
    innerDiv4.setAttribute("class", "even_option");
    const innerDiv5 = document.createElement("div");
    const optionD = document.createElement("p");
    optionD.textContent = "D:-";
    const optionDText = document.createElement("p");
    optionDText.textContent = el.d;
    innerDiv5.appendChild(optionD);
    innerDiv5.appendChild(optionDText);
    innerDiv5.setAttribute("class", "odd_option");
    const innerDiv6 = document.createElement("div");
    const ans = document.createElement("p");
    ans.textContent = "Answer:-";
    const ansText = document.createElement("p");
    ansText.textContent = el.correct;
    innerDiv6.appendChild(ans);
    innerDiv6.appendChild(ansText);
    innerDiv6.setAttribute("class", "ans_option");
    div.appendChild(innerDiv1);
    div.appendChild(innerDiv2);
    div.appendChild(innerDiv3);
    div.appendChild(innerDiv4);
    div.appendChild(innerDiv5);
    div.appendChild(innerDiv6);
    que_preview.appendChild(div);
  });
}

//deleting a question
let delete_div = document.getElementById("deletingdiv");
let deleteqbtn = document.getElementById("deleteqbtn");
let delete_question_num = document.getElementById("delete_question_num");
let deleteing_div_btn = document.getElementById("deleteing_div_btn");
deleteing_div_btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (questionarr.length == 0) {
    // alert("Add Questions First to Delete");
    swal({
      title: "Add Questions First to Delete",
      text: "",
      icon: "success",
    });
  } else {
    if (delete_div.style.display === "block") {
      delete_div.style.display = "none";
    } else {
      delete_div.style.display = "block";
    }
  }
});

deleteqbtn.addEventListener("click", (e) => {
  e.preventDefault();
  let d_q_num = Number(delete_question_num.value) - 1;
  questionarr.splice(d_q_num, 1);
  localStorage.setItem("allquestions", JSON.stringify(questionarr));
  qnum--;
  localStorage.setItem("que_number", qnum);
  quest_num.innerText = `${qnum}.`;
  preview_of_ques(questionarr);
  delete_div.style.display = "none";
});

// fetching functions

async function fetch_create_quiz(obj) {
  loding_container.style.display="block";
  const url = `${baseurl}quiz/createQuiz`;
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
    if (data.ok) {
      questionarr = [];
      preview_of_ques(questionarr);
      localStorage.setItem("allquestions", "");
      localStorage.setItem("que_number", "");
      quest_num.innerText = `1.`;
      quizz_room_name.value = "";
      max_time.value = "";
      // alert(`${data.msg} and link:http://127.0.0.1:5502/Frontend/quizz.html`)
      swal({
        title: `${data.msg}`,
        text: "link: https://quiz-page-mu.vercel.app/",
        icon: "success",
      });
    } else {
      // alert(data.msg)
      swal({
        title: `${data.msg}`,
        text: "",
        icon: "success",
      });
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

async function fetch_total_quiz(userid) {
  // making loding animation to show up
  loding_container.style.display="block";
  const url = `${baseurl}quiz/totalquizes/${userid}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // as soon as we get the response from server making the loding animation hidden
    loding_container.style.display="none";
    // count of quiz rooms user has created;
    if (data.count <= permitted_quiz_rooms) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

//js for master div and all btns controllers
let master_quizz = document.getElementById("master_quizz");
let master_room = document.getElementById("master_room");
let ranking_btn = document.getElementById("ranking_btn");
let delete_qr = document.getElementById("delete_qr");
let quizz_cont = document.getElementById("quizz_cont");
let delete_Qr = document.getElementById("delete_Qr");
let deletesubquiz = document.getElementById("deletesubquiz");
let delete_qr_btn = document.getElementById("delete_qr_btn");

const previousQuizes = document.getElementById("previous_quizes");
const participantList = document.getElementById("participant-list");
master_quizz.addEventListener("click", () => {
  if (quizz_cont.style.display == "block") {
    master_quizz.innerText = "Create Quiz";
    loding_container.style.display="none";
    quizz_cont.style.display = "none";
  } else {
    quizz_cont.style.display = "block";
    master_quizz.innerText = "Hide Create Quiz Panel";
  }
});
master_room.addEventListener("click", () => {
  if (previousQuizes.style.display == "block") {
    master_room.innerText = "Previous Quizs and Quiz Rooms";
    loding_container.style.display="none";
    previousQuizes.style.display = "none";
  } else {
    previousQuizes.style.display = "block";
    master_room.innerText = "Hide Quiz Rooms";
    fetch_previous_quiz(userid);
  }
});
ranking_btn.addEventListener("click", () => {
  if (participantList.style.display == "block") {
    ranking_btn.innerText = "See Rankings of Quiz Participents";
    loding_container.style.display="none";
    participantList.style.display = "none";
  } else {
    participantList.style.display = "block";
    ranking_btn.innerText = "Hide Rankings";
    fetch_rankings("demo2");
  }
});
delete_qr.addEventListener("click", () => {
  if (deletesubquiz.style.display == "block") {
    delete_qr.innerText = "Delete a Quiz / Quiz Room";
    loding_container.style.display="none";
    deletesubquiz.style.display = "none";
  } else {
    deletesubquiz.style.display = "block";
    delete_qr.innerText = "Hide Delete Quiz Panel";
  }
  delete_qr_btn.addEventListener("click", () => {
    if (!delete_Qr.value) {
      // alert("Please Enter Quizz Room First !")
      swal({
        title: "Please Enter Quizz Room First !",
        text: "",
        icon: "success",
      });
    } else {
      fetch_delete_quiz(delete_Qr.value);
    }
  });
});

async function fetch_previous_quiz(userid) {
  loding_container.style.display="block";
  const url = `${baseurl}quiz/totalquizes/${userid}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    loding_container.style.display="none";
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
  heading.innerText = "All Of Your Previous Quiz Rooms";
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

async function fetch_rankings(room_quizz) {
  loding_container.style.display="block";
  const url = `${baseurl}quiz/getParticipent/${userid}`;
  // const url = `${baseurl}quiz/getParticipent`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    loding_container.style.display="none";
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
    "Ranking Participents Those Who Have Participated In Your Quiz Room";
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

    participantList.appendChild(participantItem);
  }
}

// js for deleting quizz rooms

async function fetch_delete_quiz(roomName) {
  loding_container.style.display="block";
  const url = `${baseurl}quiz/expireQuiz/${roomName}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    loding_container.style.display="none";
    //here call the rendring function
    // alert(data.msg);
    swal({
      title: `${data.msg}`,
      text: "",
      icon: "success",
    });
  } catch (error) {
    console.log("Error:", error);
  }
}
