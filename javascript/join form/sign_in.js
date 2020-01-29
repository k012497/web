function signIn(){
    let inputId = document.querySelector("#input-id");
    let inputPw = document.querySelector("#input-pw");

    const id = "a123123", pw = "a123123";
    if(inputId.value !== id && inputPw.value !== pw){
        alert("아이디와 비밀번호를 확인해주세요!");
    } else {
        alert("어서오세요!");
        inputId.value = "";
        inputPw.value = "";
        console.log(inputId, inputPw);
    }
}

function switchIpSecurity(){
    const switchValue = document.querySelector("#ip-security-switch");
    if(switchValue.innerHTML === "ON"){
        switchValue.innerHTML = "OFF"
        alert("IP 보안을 해제합니다.");
    }else{
        switchValue.innerHTML = "ON"
        alert("IP 보안을 적용합니다.");
    }
}