//real time in city
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
time.innerHTML = `Currently ${hour}:${minutes} – ${date} ${month}, ${day}`;

//FAKE TEMP
//function fahrenheit1(event) {
//event.preventDefault();

//let tempF = document.querySelector("#main-degree");
//tempF.innerHTML = Math.round((1 * 9) / 5 + 32);
//}

//function celsius1(event) {
//event.preventDefault();

//let tempC = document.querySelector("#main-degree");
//tempC.innerHTML = 1;
//}

//let choiceC = document.querySelector("#celsius");
//choiceC.addEventListener("click", celsius1);

//let choiceF = document.querySelector("#fahrenheit");
//choiceF.addEventListener("click", fahrenheit1);

//API Geolocation
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
  let temperature = Math.round(response.data.main.temp);
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
}

let showCity = document.querySelector("#current-city");
showCity.addEventListener("click", showUserCity);

//API weather

function showTemperature(event) {
  event.preventDefault();
  let chosenCity = document.querySelector("#new-city");
  console.log(chosenCity.value);
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature1);
}

//search engine, cities
function changeCity(event) {
  event.preventDefault();
  document.querySelector("#city").innerHTML = `${chosenCity.value}`;
}

let askCity = document.querySelector(".search-engine");
askCity.addEventListener("submit", showTemperature);
