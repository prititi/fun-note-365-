let add_new_que = document.getElementById("add_ques");
let question_form = document.getElementById("quizz_form");
let Question = document.getElementById("que_stion");
let option_a = document.getElementById("option_a");
let option_b = document.getElementById("option_b");
let option_c = document.getElementById("option_c");
let correct_ans = document.getElementById("option_d");
let quest_num = document.getElementById("quest_num");
let que_preview = document.getElementById("que_preview");
let qp = document.getElementById("qp");
let questionarr = JSON.parse(localStorage.getItem("allquestions")) || [];
let qnum = +JSON.parse(localStorage.getItem("que_number")) || 1;
quest_num.innerText = `${qnum}.`;
add_new_que.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    !Question.value ||
    !option_a.value ||
    !option_b.value ||
    !option_c.value ||
    !option_d.value
  ) {
    alert("Plese fill all fields");
  } else {
    let obj = {
      question: Question.value,
      a: option_a.value,
      b: option_b.value,
      c: option_c.value,
      d: option_d.value,
      correct: correct_ans.value,
    };
    questionarr.push(obj);
    localStorage.setItem("allquestions", JSON.stringify(questionarr));
    if(questionarr.length==0){
      que_preview.style.display="none"
      qp.style.display="none"
    }else{
      que_preview.style.display="block";
      qp.style.display="block";
    }
    preview_of_ques(questionarr)
    qnum++;
    quest_num.innerText = `${qnum}.`;
    localStorage.setItem("que_number", JSON.stringify(qnum));
    question_form.reset();
    alert("question added");
  }
});
if(questionarr.length==0){
  que_preview.style.display="none"
  qp.style.display="none"
}else{
  que_preview.style.display="block";
  qp.style.display="block";
}
preview_of_ques(questionarr)
function preview_of_ques(data){
  que_preview.innerHTML=null;
  let qn=1;
data.forEach(el => {
  const div = document.createElement('div');
div.className = 'one_que';

const innerDiv1 = document.createElement('div');
const questionNum = document.createElement('p');
questionNum.textContent =`${qn++}.`;
const questionText = document.createElement('h2');
// const deletebtn = document.createElement('button');
// deletebtn.innerText="Delete This Question"
// deletebtn.setAttribute("id","qdbtn")
questionText.textContent =el.question;
innerDiv1.appendChild(questionNum);
innerDiv1.appendChild(questionText);
// innerDiv1.appendChild(deletebtn);

const innerDiv2 = document.createElement('div');
const optionA = document.createElement('p');
optionA.textContent = 'A:-';
const optionAText = document.createElement('p');
optionAText.textContent =el.a;
innerDiv2.appendChild(optionA);
innerDiv2.appendChild(optionAText);

const innerDiv3 = document.createElement('div');
const optionB = document.createElement('p');
optionB.textContent = 'B:-';
const optionBText = document.createElement('p');
optionBText.textContent =el.b;
innerDiv3.appendChild(optionB);
innerDiv3.appendChild(optionBText);

const innerDiv4 = document.createElement('div');
const optionC = document.createElement('p');
optionC.textContent = 'C:-';
const optionCText = document.createElement('p');
optionCText.textContent =el.c;
innerDiv4.appendChild(optionC);
innerDiv4.appendChild(optionCText);

const innerDiv5 = document.createElement('div');
const optionD = document.createElement('p');
optionD.textContent = 'D:-';
const optionDText = document.createElement('p');
optionDText.textContent =el.d;
innerDiv5.appendChild(optionD);
innerDiv5.appendChild(optionDText);
const innerDiv6 = document.createElement('div');
const ans = document.createElement('p');
ans.textContent = 'Answer:-';
const ansText = document.createElement('p');
ansText.textContent =el.correct;
innerDiv6.appendChild(ans);
innerDiv6.appendChild(ansText);

div.appendChild(innerDiv1);
div.appendChild(innerDiv2);
div.appendChild(innerDiv3);
div.appendChild(innerDiv4);
div.appendChild(innerDiv5);
div.appendChild(innerDiv6);
que_preview.appendChild(div);
});
}
