// apiKey = "598e202570aa8399fc1c4fb7e14a72a5";
// day and time
function formatDate(date) {
  let hours = now.getHours();
  let minutes = now.getMinutes();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let now = new Date();
let dateString = document.querySelector("#date-time");

dateString.innerHTML = formatDate(now);

// Location

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let currentCity = document.querySelector("#current-city");
  if (searchInput.value) {
    currentCity.innerHTML = searchInput.value;
    function showTemperatureCity(response) {
      let cityName = response.data.name;
      let temperature = Math.round(response.data.main.temp);
      let description = response.data.weather[0].description;
      let humidity = response.data.main.humidity;
      let wind = response.data.wind.speed;
      let nameElement = document.querySelector("#current-city");
      let temperatureElement = document.querySelector("#degree-value");
      let descriptionElement = document.querySelector("#description");
      let humidityElement = document.querySelector("#humidity");
      let windElement = document.querySelector("#wind");
      nameElement.innerHTML = cityName;
      temperatureElement.innerHTML = temperature;
      descriptionElement.innerHTML = description;
      humidityElement.innerHTML = humidity;
      windElement.innerHTML = wind;
    }
    let apiKey = "598e202570aa8399fc1c4fb7e14a72a5";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperatureCity);
  }
}

function findCurrentLocation(event) {
  function showTemperature(response) {
    let cityName = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    let humidity = response.data.main.humidity;
    let wind = response.data.wind.speed;
    let nameElement = document.querySelector("#current-city");
    let temperatureElement = document.querySelector("#degree-value");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    nameElement.innerHTML = cityName;
    temperatureElement.innerHTML = temperature;
    descriptionElement.innerHTML = description;
    humidityElement.innerHTML = humidity;
    windElement.innerHTML = wind;
  }
  function retrievePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiKey = "598e202570aa8399fc1c4fb7e14a72a5";
    let unit = "metric";
    let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`;
    let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showTemperature);
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", search);

let currentCityButton = document.querySelector("#current-city-button");

currentCityButton.addEventListener("click", findCurrentLocation);

// to farenheit

function showCelsius(event) {
  event.preventDefault();
  let value = document.querySelector("#degree-value");
  value.innerHTML = "9";
}

function showFarenheit(event) {
  event.preventDefault();
  let value = document.querySelector("#degree-value");
  value.innerHTML = "48.2";
}

let celsiusLink = document.querySelector("#celsius-link");
let farenheitLink = document.querySelector("#farenheit-link");

celsiusLink.addEventListener("click", showCelsius);
farenheitLink.addEventListener("click", showFarenheit);
