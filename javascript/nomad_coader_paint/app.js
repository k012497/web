// canvas
const canvas = document.getElementById('jsCanvas');
const context = canvas.getContext('2d');

const INIT_RANGE = 2.5;
const INIT_COLOR = 'rgb(29, 29, 29)';
const CANVAS_SIZE = 700;

// controller
const colors = document.querySelectorAll('.controls_color');
const range = document.getElementById('jsRange');
const btnMode = document.querySelector('#jsMode');
const btnSave = document.querySelector('#jsSave');


// canvas를 픽셀을 다룰 element로 만들기 위해 width, height 지정 (실제 픽셀사이즈 지정. pixel modifier에 사이즈 주기)
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// flag
let isPainting = false;
let isBrush = true;

context.lineWidth = INIT_RANGE; // 기본 선 굵기
context.strokeStyle = INIT_COLOR; // 기본 선 색상
context.strokeStyle = INIT_COLOR; // 기본 채우기 색상


function startpainting(){
    isPainting = true;
}

function stopPainting(){
    isPainting = false;
}

function onMouseMove(e){
    // 마우스가 움직일 때
    const x = e.offsetX;
    const y = e.offsetY;

    if(!isPainting){
        // 클릭 안 하고 움직일 때
        // 보이진 않지만 path 조정
        context.beginPath();
        context.moveTo(x, y);
    } else {
        // 클릭 하고 움직일 때
        // 선 그리기
        if(isBrush){
            context.lineTo(x, y);
            context.stroke();
        }
    }
}

function onMouseDown(){
    isPainting = true;
}

function setLineWidth(){
    context.lineWidth = range.value;
}

function setColor(e) { 
    const colorSelected = e.target;
    const colorName = colorSelected.style.backgroundColor;
    context.strokeStyle = colorName;
    context.fillStyle = colorName;

    Array.from(colors).forEach(color => {
        color.classList.remove('color_selected');
    });
    colorSelected.classList.toggle('color_selected');
}

function changeMode(e) {
    isBrush = !isBrush; // mode 변경

    if(isBrush){
        // 브러쉬 모드일 경우
        e.currentTarget.textContent = "FILL";
    } else {
        // 채우기 모드일 경우
        e.currentTarget.textContent = "BRUSH";
        context.fillStyle = context.strokeStyle;
    }
}

function fillCanvas() {
    if(!isBrush){
        context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleContextMenu(e) {
    e.preventDefault();
}

function saveImage(){
    const image = canvas.toDataURL(); // jpeg이미지 생성 , default png
    const link = document.createElement("a"); // anchor 생성
    link.href = image;
    link.download = Date.now(); // 파일명
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startpainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", fillCanvas);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

if(range){
    range.addEventListener("change", setLineWidth);
}

if(colors){
    Array.from(colors).forEach(color => {
        color.addEventListener('click', setColor);
    });
}

if(btnMode){
    btnMode.addEventListener('click', changeMode);
}

if(btnSave){
    btnSave.addEventListener('click', saveImage);
}