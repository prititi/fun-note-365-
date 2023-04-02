let baseUrl = "http://localhost:8500/";

let preEnteredCode  = sessionStorage.getItem("eventCode");
let input = document.getElementById("input");
input.value = preEnteredCode;




//function for clearing session storage
window.onbeforeunload = function()
    {
        sessionStorage.removeItem('eventCode');
    };


    const codeBtn = document.getElementById("enter");
codeBtn.addEventListener("click", () => {
    const code = document.getElementById("input").value;
    localStorage.setItem("roomno", JSON.stringify(+code));
    window.location.href = "./polls.html";
});


