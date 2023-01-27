// Time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentTime = document.querySelector(".city-time");
function time() {
  let minutes = now.getMinutes();
  let hours = now.getHours();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${hours}:${minutes}`;
}
currentTime.innerHTML = `${days[now.getDay()]}, ${time()}`;

//City

function showCity(event) {
  event.preventDefault();
  let userCity = document.querySelector("#city-input");
  let pageCity = document.querySelector("#shown-city");
  pageCity.innerHTML = `${userCity.value}`;
  let apiKey = "4a9226e32b5fb3eb0ec3575c32bb69f3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "4a9226e32b5fb3eb0ec3575c32bb69f3";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemperature);
}

function getCity(event) {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let changeButton = document.querySelector("#city-form");
changeButton.addEventListener("submit", showCity);
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCity);

function showTemperature(response) {
  console.log(response.data);
  let basicCity = document.querySelector("#shown-city");
  let temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#degree");
  let description = document.querySelector("#weather-description");
  let feels = document.querySelector("#feels");
  let humidity = document.querySelector("#humidity");

  basicCity.innerHTML = response.data.name;
  degrees.innerHTML = temperature;
  description.innerHTML = response.data.weather[0].main;
  feels.innerHTML = `${Math.round(response.data.main.feels_like)}&degC`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
}

// C/F
let farTemp = document.querySelector("#f-temp");
let celTemp = document.querySelector("#c-temp");

function toCelsius(event) {
  let shownTemp = document.querySelector("#degree");
  event.preventDefault();
  shownTemp.innerHTML = 17;
}
celTemp.addEventListener("click", toCelsius);

function toFahrenheit(event) {
  event.preventDefault();
  let shownTemp = document.querySelector("#degree");
  let newFTemp = Math.round((17 * 9) / 5 + 32);
  shownTemp.innerHTML = newFTemp;
}
farTemp.addEventListener("click", toFahrenheit);
