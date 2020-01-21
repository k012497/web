const API_KEY = 'f572ad707d4e5e42cb7e831630442f11';
const COORDS = 'coords';

const weather = document.querySelector(".js-weather");

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){ // then(): 데이터가 완전히 들어오고난 후 호출
        // console.log(response.json()); // 네트워크 정보를 담은 response
        return response.json();
    }).then(function(json){
        // console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}℃, ${place}`
    }); 
}

function saveCoords(coordsObj) {  
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {  
    const latitude = position.coords.latitude,
        longitude = position.coords.longitude;
    const coordsObj = {
        latitude, // 속성 명과 넣어줄 변수 명이 같을 때
        longitude,
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {  
    console.log("CANT ACCESS GEO LOCATION");
}

function askForCoords() {  
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function init(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else {
        // get weather
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

init();