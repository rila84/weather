function showTemperature(response) {
console.log(response.data.name);
  
}

let apiKey = "5d9235a86e48ae6996d42d29c5604b9e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
