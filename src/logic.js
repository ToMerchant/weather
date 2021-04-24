
import { degToDir } from "./helpers.js";

import {
    cityLocation, name, temp, max, min, feelsLike, chanceRain, wind, uv, iconNow, forecastTemp, forecastDescription, forecastDays, forecastIcon, cityLat, cityLon,
    cityInput, searchButton
} from "./dom.js"






async function getWeather(city) {
    const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=8a4050dbfb1c491f85cde1a492fbc3d7&units=metric ",
        { mode: "cors" }
    );
    const weatherData = await response.json();
    name.innerText = weatherData.name + ", " + weatherData.sys.country;
    temp.innerText =

        Math.round(weatherData.main.temp) +
        "°" +
        " with " +
        weatherData.weather[0].description;
    max.innerText = "Max: " + Math.round(weatherData.main.temp_max) + "°";
    min.innerText = "Min: " + Math.round(weatherData.main.temp_min) + "°";
    feelsLike.innerText =
        "Feels like: " + Math.round(weatherData.main.feels_like) + "°";
    wind.innerText =
        "Wind: " +
        degToDir(weatherData.wind.deg) +
        " " +
        weatherData.wind.speed +
        " km/h";
    iconNow.src = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon.toString() + "@2x.png";

    //document.title = weatherData.name + ', ' + Math.round(weatherData.main.temp) + "°";

    cityLon = weatherData.coord.lon.toString();
    cityLat = weatherData.coord.lat.toString();

    getDaily(cityLat, cityLon);
}
getWeather(cityLocation);

async function getDaily(lat, lon) {
    const response = await fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude=current,minutely,hourly,alerts&appid=8a4050dbfb1c491f85cde1a492fbc3d7&units=metric",
        { mode: "cors" }
    );

    const dailyData = await response.json();

    let day = new Date(Date.now() + (dailyData.timezone_offset)).getDay() + 1;

    let daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

    for (let i = 0; i < daysArray.length; i++) {
        let current = (i + day) % daysArray.length;
        let inputDay = document.createElement('div');
        inputDay.className = 'dailyDay';
        inputDay.innerText = daysArray[current];
        forecastDays.appendChild(inputDay);
    }


    chanceRain.innerText =
        "Chance of rain: " + (dailyData.daily[0].pop * 100) + "%";
    uv.innerText = "UV index: " + dailyData.daily[0].uvi;

    for (let i = 1; i < 8; i++) {
        let temp = document.createElement('div');
        temp.className = 'dailyDescription';
        temp.innerText = Math.round(dailyData.daily[i].temp.day) + "° with";
        forecastTemp.appendChild(temp);

        // let rain = document.createElement('div');
        // rain.className = 'daily';
        // rain.innerText = Math.round((100 * dailyData.daily[i].pop)) + "%";
        // forecastRain.appendChild(rain);

        let description = document.createElement('div');
        description.className = 'dailyDescription';
        description.innerText = dailyData.daily[i].weather[0].description;
        forecastDescription.appendChild(description);

        let icon = document.createElement('img');
        icon.className = 'daily';
        icon.src = "http://openweathermap.org/img/wn/" + dailyData.daily[i].weather[0].icon.toString() + "@2x.png";
        forecastIcon.appendChild(icon);


    }

}