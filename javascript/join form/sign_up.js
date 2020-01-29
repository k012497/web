let code;
let validated;

function submitForm(){
    // event.preventDefault();
    const noWarning = checkWarningMsg(); // 올바르지 않은 형식이 있는지 확인
    const noBlank = checkInputValues(); // 빈 칸이 있는지 확인

    console.log(noWarning, validated, noBlank);

    if(noWarning && validated && noBlank){
        // 빈 칸 없이 모두 올바르게 입력했을 때
        alert("제출 완료");
        location.href = "sign_in.html";
    }
}

function checkInputValues(){
    const inputArr = document.getElementsByClassName('required');
    for(let i = 0 ; i < inputArr.length ; i++){
        if(inputArr[i].value === ""){
            inputArr[i].focus();
            alert("모든 항목을 올바르게 입력해주세요.");
            return false;
        }
    }
    return true;
}

function checkWarningMsg(){
    const warningMsgs = document.querySelectorAll(".warning-msg");

    for(let i = 0 ; i < warningMsgs.length ; i++){
        if(warningMsgs[i].innerHTML !== ""){
            alert("모든 항목을 올바르게 입력해주세요.");
            return false;
        }
    }
    return true;
}

function checkId(id){
    const regExp = /^[a-z]{1}[a-zA-Z0-9]{6,11}$/;
    if(regExp.test(id)){
        document.getElementById('idMsg').textContent = "";
    }else{
    document.getElementById('idMsg').textContent = "숫자, 영문 소문자로 6~12자, 첫 글자는 영문만 가능합니다.";
    }
}

function checkPassword(password){
    const regExp = /^[a-zA-Z0-9]{8,20}$/;
    if(regExp.test(password)){
        document.getElementById('password1Msg').textContent = "";
    }else{
    document.getElementById('password1Msg').textContent = "숫자, 영문으로 8~20자만 가능합니다.";
    }

    checkPasswordsSame();
}

function checkPasswordsSame() {  
    let password1 = document.querySelector('#password').value;
    let password2 = document.querySelector('#password2').value;
    const pwCheckMsg = document.getElementById('password2Msg');

    if(!password1){
        pwCheckMsg.innerHTML = "비밀번호를 먼저 입력해 주세요";
        return;
    }

    if(password1 !== password2){
        console.log(password1 !== password2);
        console.log(password2);
        pwCheckMsg.innerHTML = "비밀번호가 일치하지 않습니다.";
    }else{
        pwCheckMsg.innerHTML = "";
    }
}

function checkName(name){
    console.log(name);
    var regExp = /^[가-힣]{2,6}$/;
    if(regExp.test(name)){
        document.getElementById('nameMsg').textContent = "";
    }else{
        document.getElementById('nameMsg').textContent = "공백 제외 한글 2~8자만 가능합니다.";
    }
}
function checkDateOfBirth(date){
    // 오늘 날짜 이전인지 검사
    let today = new Date();
    const year = String(today.getFullYear());
    const month = today.getMonth()+1 < 10 ? ("0" + String(today.getMonth() + 1)) : String(today.getMonth() + 1);
    const day = String(today.getDate());
    today = year + month + day;

    const inputDate = date.replace(/-/gi, "");
    console.log(inputDate, today);
    console.log(inputDate > today);
    if(inputDate > today) {
        document.getElementById("dobMsg").textContent = "오늘 날짜 이전으로 설정해주세요";
    } else {
        document.getElementById("dobMsg").textContent = "";
    }
    
}

function checkEmail(){
    if(email.value === ""){
        document.getElementById("emailMsg").textContent = "";
        return;
    }

    var emailReg = /([a-z0-9_-]+)@([a-z-]+)\.([a-z]{2,3})/; // 영문 또는 숫자 @ 영문 . 영문 2-3개
    if(!emailReg.test(email.value)){
        document.getElementById("emailMsg").textContent = "올바른 이메일 주소형식을 사용해주세요.";
    }else{
        document.getElementById("emailMsg").textContent = "";
    }
}

function checkMobile(phoneNum){
    var moblieReg = /^\d{3}-\d{3,4}-\d{4}$/; // 숫자 3개  숫자 3-4개 - 숫자 4개

    if(!moblieReg.test(phoneNum)){
        document.getElementById("mobileMsg").textContent = "(-)를 포함한 번호를 입력해주세요";
    }else{
        document.getElementById("mobileMsg").textContent = "";
    }
}

function createCaptcha() {
    //clear the contents of captcha div first 
    document.getElementById('captcha-canv').innerHTML = "";
    
    var charsArray =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
      if (captcha.indexOf(charsArray[index]) == -1){
        captcha.push(charsArray[index]);
      } else {
        i--;
      }
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.height = 50;
    var context = canv.getContext("2d");
    context.font = "34px Georgia";
    context.strokeText(captcha.join(""), 0, 30);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    code = captcha.join("");
    document.getElementById("captcha-canv").prepend(canv); // adds the canvas to the body element
}

function validateCaptcha() {
    // event.preventDefault();
    //   debugger
    if (document.getElementById("cpatchaTextBox").value == code) {
      alert("확인되었습니다.")
      validated = true;
    } else {
      alert("자동방지 문자를 다시 확인해주세요.");
      createCaptcha();
      validated = false;
    }
}

function init() {  
    createCaptcha();
}