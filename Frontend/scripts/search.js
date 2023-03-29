let baseUrl = "http://localhost:8500/";

let preEnteredCode  = sessionStorage.getItem("eventCode");
let input = document.getElementById("input");
input.value = preEnteredCode;




//function for clearing session storage
window.onbeforeunload = function()
    {
        sessionStorage.removeItem('eventCode');
    };




