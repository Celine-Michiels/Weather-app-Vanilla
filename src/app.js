//date
function formatDate(timestamp) {
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
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

//forecast
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class ="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  
            <div class="col-2">
              <div class="weather-forecast-date">${day}</div>

              <img
                src="https://openweathermap.org/img/wn/02d@2x.png"
                alt="cloud"
                width="48"
              />

              <div class="weather-forecast-temperature">
                <span class="weather-forecast-max">18°</span>
                <span class="weather-forecast-min">12°</span>
              </div>
            </div>
          `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "88724523008dc9e1be18f6eb6a959b67";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
// temperature and time

function displayTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#current-description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "7748ce211231684d961afc06321ccff6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusValue.classList.remove("active");
  fahrenheitValue.classList.add("active");
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusValue.classList.add("active");
  fahrenheitValue.classList.remove("active");
}

let celsiusTemperature = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

let fahrenheitValue = document.querySelector("#fahrenheit-value");
fahrenheitValue.addEventListener("click", displayFahrenheitTemp);

let celsiusValue = document.querySelector("#celsius-value");
celsiusValue.addEventListener("click", displayCelsiusTemp);

search("Braine-l'Alleud");
