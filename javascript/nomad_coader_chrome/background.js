const body = document.querySelector("body");
const IMG_NUMBER = 5;

function setImage(imgNum){
    const image = new Image();
    image.src = `images/${imgNum +1}.jpg`;
    image.classList.add('bgImage');
    image.addEventListener('load', function(){
        body.prepend(image);
    });
}

function genRandom() {  
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}
function init(){
    const randomNumber = genRandom();
    setImage(randomNumber);
}

init();