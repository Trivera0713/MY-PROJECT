let now = new Date();
console.log(now);

let today = document.querySelector("h3");

let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novemeber",
  "Decemeber",
];
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();

if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

today.innerHTML = `${day} ${month} ${date} ${year} ${hour} : ${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  console.log(searchInput.value);
  let h2 = document.querySelector("h2");
  if (searchInput.value) {
    h2.innerHTML = `${searchInput.value}`;
  } else {
    h2.innerHTML = null;
    alert("Please type a city!");
  }
  let apiKey = "c03face7caa58a9b7ffa9f52b7238a93";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=Imperial`;
  console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getWeather);
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

function getWeather(response) {
  let temper = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = `${temper}°F`;
  let description = document.querySelector(".tempDescription");
  description.innerHTML = response.data.weather[0].description;
}
function myLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiKey = "c03face7caa58a9b7ffa9f52b7238a93";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}

let locationButton = document.querySelector(".location");
locationButton.addEventListener("click", getCurrentLocation);
