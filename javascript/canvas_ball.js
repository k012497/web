// var dx = 5;
// var dy = 5;
// var x = 150;
// var y = 100;
var startDrawing;
var drawing;
var inputValue = {
    x: null,
    y: null,
    dx: null,
    dy: null,
};

function myCanvas() {
    if(!inputValue.x){
        return;
    }
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, 500, 400); //무효화 영역처리- 전체 영역을 지우고 다시 그리진않음 c.f.invalidate()
    context.beginPath();
    context.fillStyle = "red";
    context.arc(inputValue.x, inputValue.y, 20, 0, Math.PI * 2, true); //공을 그린다
    context.closePath();
    context.fill();

    if (inputValue.x < (0 + 20) || inputValue.x > (500 - 20)) {
        inputValue.dx = -inputValue.dx;
    }
    if (inputValue.y < (0 + 20) || inputValue.y > (400 - 20)) {
        inputValue.dy = -inputValue.dy;
    }
    inputValue.x += inputValue.dx;
    inputValue.y += inputValue.dy;
}

function start() {
    var result = verify();
    if (!result) {
        return;
    } else {
        stop();
        startDrawing = setInterval(myCanvas, 15);
    }
}

function stop() {
    clearInterval(startDrawing);
}

function verify() {
    var result = true;
    inputValue = {
        x: parseInt(document.getElementById("xValue").value),
        y: parseInt(document.getElementById("yValue").value),
        dx: parseInt(document.getElementById("dxValue").value),
        dy: parseInt(document.getElementById("dyValue").value),
    };

    if (inputValue.x === "" || inputValue.y === "" || inputValue.dx === "" || inputValue.dy === "") {
        alert("x, y, dx, dy값을 입력해주세요");
        result = false;
    }

    if((inputValue.dx > 10 || inputValue.dx < 5) || (inputValue.dy > 10 || inputValue.dy < 5)){
        result = false;
    }

    if((inputValue.x > 500 || inputValue.x < 250)){
        result = false;
    }

    if((inputValue.y > 400 || inputValue.y < 200)){
        result = false;
    }

    if(!result){
        alert("x: 250~500, y: 200~400, dx: 5~10, dy: 5~10");
    }

    return result;
}