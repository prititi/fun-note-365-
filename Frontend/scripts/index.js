const boxDropdown = document.querySelectorAll('.boxDropdown');
for (const list of document.querySelectorAll('li.categ')) {
    const boxDropdownList = document.querySelectorAll('.boxDropdown')[x];
    list.addEventListener('mouseenter',() => {
        boxDropdownList.style.display = 'block';
    });
    list.addEventListener('mouseleave',() => {
        boxDropdownList.style.display = 'none';
    });
}
for (const box of boxDropdown) {
    box.addEventListener('mouseenter',() => {
        box.style.display = 'block';
    });
    box.addEventListener('mouseleave',() => {
        box.style.display = 'none';
    });
}

const codeBtn = document.getElementById("code-btn");
codeBtn.addEventListener("click", () => {
    const code = document.getElementById("code").value;
    localStorage.setItem("roomno", JSON.stringify(+code));
    window.location.href = "./polls.html";
});
