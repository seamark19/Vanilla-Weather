let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let year = now.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];
let li = document.querySelector("li");

li.innerHTML = `${day}, ${date}  ${month}, ${year} , ${hours}:${minutes}`;

function displayForcast(){
  let forcastElement = document.querySelector("#forcast");
   let forcastHTML =  `<div class = "row">`;
   let days = [ "Wed", "Thu", "Fri","Sat","Sun", "Mon"];
   days.forEach(function(day){
    forcastHTML = forcastHTML+`
  <div class="col-2">
       <div class="weather-forcast-date">${day}</div>    
          <img src="https://openweathermap.org/img/wn/04d@2x.png" alt="" id="icon" width=42/>
           <div class="weather-forcast-temperature">
            <span class="weather-forcast-temperature-max">20°</span>
            <span class="weather-forcast-temperature-min">12°</span>
           
           </div>
           </div>
 `

   })
  
forcastHTML = forcastHTML + `</div>`;
forcastElement.innerHTML = forcastHTML;
}





function displayWeatherCondition(response) {
  console.log(response.data);
  

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute ("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute ("alt",`https://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`);



}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityInput.value;
}
let cityInput = document.querySelector("#city-input");
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
displayForcast();
