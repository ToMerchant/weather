import css from "./style.css";



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

export {cityLocation};

var degToDir = function (deg) {
  if (deg > 11.25 && deg <= 33.75) {
    return "NNE";
  } else if (deg > 33.75 && deg <= 56.25) {
    return "ENE";
  } else if (deg > 56.25 && deg <= 78.75) {
    return "E";
  } else if (deg > 78.75 && deg <= 101.25) {
    return "ESE";
  } else if (deg > 101.25 && deg <= 123.75) {
    return "ESE";
  } else if (deg > 123.75 && deg <= 146.25) {
    return "SE";
  } else if (deg > 146.25 && deg <= 168.75) {
    return "SSE";
  } else if (deg > 168.75 && deg <= 191.25) {
    return "S";
  } else if (deg > 191.25 && deg <= 213.75) {
    return "SSW";
  } else if (deg > 213.75 && deg <= 236.25) {
    return "SW";
  } else if (deg > 236.25 && deg <= 258.75) {
    return "WSW";
  } else if (deg > 258.75 && deg <= 281.25) {
    return "W";
  } else if (deg > 281.25 && deg <= 303.75) {
    return "WNW";
  } else if (deg > 303.75 && deg <= 326.25) {
    return "NW";
  } else if (deg > 326.25 && deg <= 348.75) {
    return "NNW";
  } else {
    return "N";
  }
};

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
    "Chance of rain: " + Math.round(dailyData.daily[0].pop) + "%, ";
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