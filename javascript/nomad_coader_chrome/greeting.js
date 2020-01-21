const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function askForName(){
    form.classList.add(SHOWING_CN);
}

function saveName(name){
    localStorage.setItem(USER_LS, name);
}

input.addEventListener('keydown', function(e){
    if(e.code === 'Enter'){
        e.preventDefault();
        let currentValue = this.value;
        saveName(currentValue);
        paintGreeting(currentValue);
    }
});

function paintGreeting(text) { 
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `Hello ${text}`;
}

function init(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

init();