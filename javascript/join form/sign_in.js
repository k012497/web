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