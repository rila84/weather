function date(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuseday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}: ${minutes}`;
}
function forcastDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Wed", "Thur", "Fri", "Sat", "Sun", "Mon", "Thus"];
  return days[date.getDay()];
}

function displayForcast(response) {
  let forcast = response.data.daily;
  let forcastElement = document.querySelector("#forcast");
  let forcastHTML = ` <div class="row">`;
  forcast.forEach(function (forcastDay, index) {
    if (index < 6) {
      forcastHTML =
        forcastHTML +
        `<div class="col-2">
              <span class="forcast-day">${forcastDate(
                forcastDay.dt * 1000
              )}</span>
              <img
                src="http://openweathermap.org/img/wn/${
                  forcastDay.weather[0].icon
                }@2x.png"
                width="50px"
                id="forcast-icon"
              />
              <div class="forcast-degrees">
                <span id="forcast-max">${Math.round(
                  forcastDay.temp.max
                )}°</span>
                <span id="forcast-min">${Math.round(
                  forcastDay.temp.min
                )}°</span>
              </div>
            </div>`;
    }
  });
  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

function forcastWeather(coordinates) {
  let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}

function showWeatherInformation(response) {
  let cityElement = document.querySelector("#current-city");
  let tempElement = document.querySelector("#current-temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  let celsiusTemp = Math.round(response.data.main.temp);

  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = date(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  forcastWeather(response.data.coord);

  function displayFahrenheit(event) {
    event.preventDefault();
    celsius.classList.remove("active");
    fahrenheit.classList.add("active");
    tempElement.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
  }
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", displayFahrenheit);

  function displayCelsius(event) {
    event.preventDefault();
    fahrenheit.classList.remove("active");
    celsius.classList.add("active");
    tempElement.innerHTML = celsiusTemp;
  }
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", displayCelsius);
}

function searchCity(city) {
  let apiKey = "5d9235a86e48ae6996d42d29c5604b9e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherInformation);
}

function submitting(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  searchCity(cityInput.value);
}

let submitCity = document.querySelector("#search-form");
submitCity.addEventListener("submit", submitting);

searchCity("london");
