let now = new Date();
let time = document.querySelector(".card-text");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour.toString().length === 1) {
  hour = "0" + hour;
}
let minutes = now.getMinutes();
if (minutes.toString().length === 1) {
  minutes = "0" + minutes;
}
let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Septembet",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
time.innerHTML = `Last updated: ${hour}:${minutes} – ${date} ${month}, ${day}`;

function showUserCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showGeoloc);
}

function showGeoloc(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature1);
}

function showTemperature1(response) {
  temperature = Math.round(response.data.main.temp);
  let geoPosition = document.querySelector("#main-degree");
  geoPosition.innerHTML = `${temperature}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;
  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = `${response.data.main.pressure}`;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let cityName = document.querySelector("#city");
  cityName.innerHTML = `${response.data.name}`;
  let mainDescription = document.querySelector("#main-description");
  mainDescription.innerHTML = `${response.data.weather[0].main}, ${response.data.weather[0].description}`;
  let icon = document.querySelector("#main-icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric`;
  let apiKey = "6782253072f7d90462731a624097fc54";
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecastDays = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = row>`;

  forecastDays.forEach(function (forecastDays, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col">
    <div class="dayOfWeek"> ${formatDay(forecastDays.dt)} </div>
    <img
      src="https://openweathermap.org/img/wn/${
        forecastDays.weather[0].icon
      }@2x.png"
      alt="Clouds"
      id="forecast-icon"
      width = "80"
    />
    <div class="degree">
      <span class="temp-max">${Math.round(
        forecastDays.temp.max
      )}°</span> <span class="temp-min">${Math.round(
          forecastDays.temp.min
        )}°</span>
    </div>
  </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let showCity = document.querySelector("#current-city");
showCity.addEventListener("click", showUserCity);

function showTemperature(event) {
  event.preventDefault();
  let chosenCity = document.querySelector("#new-city");
  apiInfo(chosenCity.value);
}
function apiInfo(city) {
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature1);
}

function changeCity(event) {
  event.preventDefault();
  document.querySelector("#city").innerHTML = `${chosenCity.value}`;
}

let askCity = document.querySelector(".search-engine");
askCity.addEventListener("submit", showTemperature);

function fahrenheit1(event) {
  event.preventDefault();
  choiceF.classList.add("active");
  choiceC.classList.remove("active");
  let tempF = document.querySelector("#main-degree");
  tempF.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function celsius1(event) {
  event.preventDefault();
  choiceC.classList.add("active");
  choiceF.classList.remove("active");
  let tempC = document.querySelector("#main-degree");
  tempC.innerHTML = `${temperature}`;
}
let temperature = null;

let choiceC = document.querySelector("#celsius");
choiceC.addEventListener("click", celsius1);

let choiceF = document.querySelector("#fahrenheit");
choiceF.addEventListener("click", fahrenheit1);

apiInfo("Kharkiv");
