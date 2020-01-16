var dx = 5;
var dy = 5;
var x = 150;
var y = 100;
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
    context.clearRect(0, 0, 300, 200); //무효화 영역처리- 전체 영역을 지우고 다시 그리진않음 c.f.invalidate()
    context.beginPath();
    context.fillStyle = "red";
    context.arc(x, y, 20, 0, Math.PI * 2, true); //공을 그린다
    context.closePath();
    context.fill();

    if (x < (0 + 20) || x > (300 - 20)) {
        dx = -dx;
    }
    if (y < (0 + 20) || y > (200 - 20)) {
        dy = -dy;
    }
    x += dx;
    y += dy;
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
    inputValue = {
        x: document.getElementById("xValue").value,
        y: document.getElementById("yValue").value,
        dx: document.getElementById("dxValue").value,
        dy: document.getElementById("dyValue").value,
    };

    if (inputValue.x === "" || inputValue.y === "" || inputValue.dx === "" || inputValue.dy === "") {
        alert("x, y, dx, dy값을 입력해주세요");
        return false;
    }
    return true;
}