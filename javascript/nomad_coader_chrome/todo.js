const toDoForm = document.querySelector(".js-toDoForm"), // form 사용 시 다른 자바스크립트 파일의 const랑 이름 충돌. 모듈 분리하는 법?
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function filterFn(toDo){
    return toDo.id === 1; // true인 것만 리턴
}

function deleteToDo(event) {
    // html에서 지우기
    const li = event.target.parentNode;
    const id = li.id;
    toDoList.removeChild(li);

    // local storage에서 지우기 (새로 저장)
    const cleanToDos = toDos.filter(function (toDo){
        return toDo.id !== parseInt(li.id); // toDo의 아이디가 li의 아이디와 같지 않을 때, 즉 지운 li와 같은 아이디인 toDo를 찾음
    });

    toDos = cleanToDos; // 새로운 toDos를 toDos배열에 넣음
    saveToDo(toDos); // 새로운 값이 담긴 toDos를 local storage에 저장
}

function paintToDoList(text) {  
    console.log(text);
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = toDos.length + 1;
    li.id = newId;
    span.innerHTML = text;
    delBtn.innerHTML = '🅧';
    delBtn.addEventListener('click', deleteToDo);

    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);

    const toDoObj = {
        text: text, // local storage에는 문자열 제외 js타입을 저장할 수 없다!
        id: newId,
    }
    toDos.push(toDoObj);
    saveToDo(toDos);
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    console.log(typeof loadedToDos, loadedToDos);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        console.log(parsedToDos);
        parsedToDos.forEach(toDo => {
            paintToDoList(toDo.text);
        });
    }
}

function saveToDo(list){
    localStorage.setItem(TODOS_LS, JSON.stringify(list));
}

function submitHandler(e){
    e.preventDefault();
    const currentValue = toDoInput.value;
    paintToDoList(currentValue);
    toDoInput.value = "";
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", submitHandler);
}

init();