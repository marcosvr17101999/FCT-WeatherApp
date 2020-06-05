//RECUPERAR POSICION HTML
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// COMPROBACION NAVEGADOR
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}
//POSICION USUARIO
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
    initMap(latitude, longitude);
}
// TIMEPO API 
let xhr = new XMLHttpRequest();
let weather = {};
function getWeather(latitude, longitude) {
    xhr.open('GET', 'http://api.weatherstack.com/current?access_key=b11d212b1a4974d58649f7583806d7e7&query=' + latitude + "," + longitude);
    xhr.responseType = 'text';
    xhr.addEventListener('load', displayWeather)
    xhr.send();
}
// MANDAR DATOS INTERFAZ
function displayWeather() {
    if (xhr.status === 200) {
        console.log("entre");
        weather = JSON.parse(xhr.responseText);
        console.log(weather)
        console.log(weather.location.name)
        console.log(weather.current.temperature)
        iconElement.innerHTML = `<img src="${weather.current.weather_icons[0]}"/>`;
        tempElement.innerHTML = `${weather.current.temperature}°<span>C</span>`;
        descElement.innerHTML = weather.current.weather_descriptions[0];
        locationElement.innerHTML = `${weather.location.name},${weather.location.country}`;
    }
}
function initMap(latitude, longitude) {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: latitude, lng: longitude },
        zoom: 9,
    });
}
