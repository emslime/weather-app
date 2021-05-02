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
  "November",
  "December",
];
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (minute < 10) {
  minute = `0${minute}`;
}

let h6 = document.querySelector("h6.today");
h6.innerHTML = `${day} ${hour}:${minute}<br />${month} ${date}`;

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#location");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;

  let city = cityInput.value;
  let units = "imperial";
  let apiKey = "db51b5a53faf37133eab9327ddad8802";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = `${temperature}`;

  let geoCity = document.querySelector("#location");
  geoCity.innerHTML = response.data.name;

  let skyDescription = document.querySelector("#weather-type");
  skyDescription.innerHTML = response.data.weather[0].description;
}

function showGeoResults(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiKey = "db51b5a53faf37133eab9327ddad8802";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrlGeo = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrlGeo).then(showWeather);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", showGeoLocation);

function showGeoLocation() {
  navigator.geolocation.getCurrentPosition(showGeoResults);
}
