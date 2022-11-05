function showWeatherInformation(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function searchCity(city) {
  let apiKey = "5d9235a86e48ae6996d42d29c5604b9e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherInformation);
}
function submitting(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city");
  let cityInput = document.querySelector("#search-input").value;
  city = cityInput;
  searchCity(city);
}
let submitCity = document.querySelector("#search-form");
submitCity.addEventListener("submit", submitting);
