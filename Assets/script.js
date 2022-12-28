var searchFormEl = document.querySelector("#input");
//display current day
// var today = dayjs().format("M/D/YYYY");
// $("#currentDate").text(today);
//API call
let weather = {
  apiKey: "eecf1a631d8c006257ac098176a8bfc6",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        displayWeather(data);
        forecast5Day.fetchWeather(data);
      });
  },
};

displayWeather = function (data) {
  let { name } = data;
  const { icon } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  console.log(name, icon, temp, humidity, speed);
  document.querySelector("#cityName").innerText = "Weather in " + name;
  document.querySelector("#icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector("#temp").innerText = temp + "°";
  document.querySelector("#humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector("#wind").innerText = "Wind: " + speed + "mph";
};

let forecast5Day = {
  apiKey: "eecf1a631d8c006257ac098176a8bfc6",
  fetchWeather: function (data) {
    var lon = data.coord.lon;
    var lat = data.coord.lat;
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=` +
        this.apiKey
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        document.querySelector("#forecastContainer").innerHTML = "";
        for (i = 2; i < data.list.length; i += 8) {
          document.querySelector(
            "#forecastContainer"
          ).innerHTML += `<div id="forecast" class="card" style="width: 18rem;">
          <p id="icon"  class="card-text"><img src="https://openweathermap.org/img/wn/${
            data.list[i].weather[0].icon
          }.png"></p>
            <div class="card-body">
              <p id="date"  class="card-text">${data.list[i].dt_txt.replace(
                "12:00:00",
                ""
              )}</p>
              <p id="temp"  class="card-text">${data.list[i].main.temp}</p>
              <p id="wind"  class="card-text">${data.list[i].wind.speed}</p>
              <p id="humidity"  class="card-text">${
                data.list[i].main.humidity
              }</p>
            </div>
          </div>`;
        }
      });
  },
};
displayForecast5Day = {};

function handleSearchSubmit(event) {
  event.preventDefault();
  weather.fetchWeather(searchFormEl.value);
}

//Event Listeners
document.querySelector("#submit").addEventListener("click", handleSearchSubmit);
