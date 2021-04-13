
let name = document.getElementById("name");
let temp = document.getElementById("temp");
let max = document.getElementById("max");
let min = document.getElementById("min");
let feelsLike = document.getElementById("feelsLike");

let chanceRain = document.getElementById("chanceRain");
let wind = document.getElementById("wind");
let uv = document.getElementById("uv");
let iconNow = document.getElementById('iconNow');

let forecastTemp = document.getElementById('forecastTemp');
// let forecastRain = document.getElementById('forecastRain');
let forecastDescription = document.getElementById('forecastDescription');
let forecastDays = document.getElementById('forecastDays');
let forecastIcon = document.getElementById('forecastIcon');

let cityLocation = "Melbourne, Au";

if (localStorage.getItem('city') !== null) {
    cityLocation = localStorage.getItem('city');
}


let cityLat = "";
let cityLon = "";

let cityInput = document.getElementById('cityInput');
let searchButton = document.getElementById('search');
searchButton.addEventListener('click', function () {
    cityLocation = cityInput.value;
    forecastTemp.innerText = '';
    forecastDescription.innerText = '';
    forecastDays.innerText = '';
    forecastIcon.innerText = '';
    localStorage.setItem('city', cityInput.value);
    getWeather(cityLocation);
    cityInput.value = '';
});

cityInput.addEventListener('keyup', function () {
    if (event.keyCode === 13) {
        searchButton.click();
    }
})

export {
    cityLocation, name, temp, max, min, feelsLike, chanceRain, wind, uv, iconNow, forecastTemp, forecastDescription, forecastDays, forecastIcon, cityLat, cityLon,
    cityInput, searchButton
}