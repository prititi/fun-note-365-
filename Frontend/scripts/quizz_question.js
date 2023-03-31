let baseurl="http://localhost:8500/";
const userid="prashant@9305";
const permitted_quiz_rooms=3;
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
    if(quizz_room_name.value==""){
      alert("Please fill the Quizz Room Name")
    }else{
      if(fetch_total_quiz(userid)){
        room_quizz=quizz_room_name.value;
    let obj={
      roomname:room_quizz,
      Author:`${userid}`,
      quiz:questionarr,
      timeout:Number(max_time.value)
    }
    //creating quiz using mongodb
    fetch_create_quiz(obj)
    questionarr = [];
    preview_of_ques(questionarr);
    localStorage.setItem("allquestions", "");
    localStorage.setItem("que_number", "");
    quest_num.innerText = `1.`;
    quizz_room_name.value="";
    max_time.value="";
    alert("Quizz Created Successfully");
      }else{
        // message to upgrade his plan
        alert(`You have reached limit ${permitted_quiz_rooms} of creating quiz rooms,kindly upgrade your plan to continue. `)
      }
    }
  } else {
    alert("Add Questions To Create Quizz");
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
    alert("Plese fill all fields");
  } else if (
    correct_ans.value.toLowerCase() !== "a" &&
    correct_ans.value.toLowerCase() !== "b" &&
    correct_ans.value.toLowerCase() !== "c" &&
    correct_ans.value.toLowerCase() !== "d"
  ) {
    console.log( correct_ans.value.toLowerCase())
    alert("Please Enter Correct answer field properly");
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
    alert("question added");
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
    alert("First Add Question In Order To Edit");
  }
});

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
    alert("Plese fill all fields");
  }else if (
    E_correct_ans.value.toLowerCase() !== "a" &&
    E_correct_ans.value.toLowerCase() !== "b" &&
    E_correct_ans.value.toLowerCase() !== "c" &&
    E_correct_ans.value.toLowerCase() !== "d"
  ) {
    alert("Please Enter Correct answer field properly");
  }  else {
    const obj = {
      question_number: que_stion_number.value,
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
    innerDiv1.setAttribute("class","preview_question_tab")
    const innerDiv2 = document.createElement("div");
    const optionA = document.createElement("p");
    optionA.textContent = "A:-";
    const optionAText = document.createElement("p");
    optionAText.textContent = el.a;
    innerDiv2.appendChild(optionA);
    innerDiv2.appendChild(optionAText);
    innerDiv2.setAttribute("class","even_option")
    const innerDiv3 = document.createElement("div");
    const optionB = document.createElement("p");
    optionB.textContent = "B:-";
    const optionBText = document.createElement("p");
    optionBText.textContent = el.b;
    innerDiv3.appendChild(optionB);
    innerDiv3.appendChild(optionBText);
    innerDiv3.setAttribute("class","odd_option")
    const innerDiv4 = document.createElement("div");
    const optionC = document.createElement("p");
    optionC.textContent = "C:-";
    const optionCText = document.createElement("p");
    optionCText.textContent = el.c;
    innerDiv4.appendChild(optionC);
    innerDiv4.appendChild(optionCText);
    innerDiv4.setAttribute("class","even_option")
    const innerDiv5 = document.createElement("div");
    const optionD = document.createElement("p");
    optionD.textContent = "D:-";
    const optionDText = document.createElement("p");
    optionDText.textContent = el.d;
    innerDiv5.appendChild(optionD);
    innerDiv5.appendChild(optionDText);
    innerDiv5.setAttribute("class","odd_option")
    const innerDiv6 = document.createElement("div");
    const ans = document.createElement("p");
    ans.textContent = "Answer:-";
    const ansText = document.createElement("p");
    ansText.textContent = el.correct;
    innerDiv6.appendChild(ans);
    innerDiv6.appendChild(ansText);
    innerDiv6.setAttribute("class","ans_option")
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
    alert("Add Questions First to Delete");
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
  const url = `${baseurl}quiz/createQuiz`;
  const data = obj;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    alert(data.msg);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function fetch_total_quiz(userid) {
  const url = `${baseurl}quiz/totalquizes/${userid}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    alert(data.msg);
    console.log(data.count); // count of quiz rooms user has created;
    if(data.count<=permitted_quiz_rooms){
      return true;
    }else{
      return false;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


