const container = document.querySelector(".container");
const searchBtn = document.querySelector(".question-box button");
const weatherHeader = document.querySelector(".weather__header");
const weatherDetails = document.querySelector(".weather__details");
const troubleBox = document.querySelector(".trouble-box");

// const SETTINGS_JSON = JSON.parse(settings);

searchBtn.addEventListener("click", () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=moscow&appid=47ecd3c8c4b34013f35078594428cd5a&units=metric&lang=ru`
  ).then((response) =>
    response.json().then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherHeader.style.display = "none";
        weatherDetails.style.display = "none";
        troubleBox.style.display = "block";
        troubleBox.classList.add("fade-in-animation");
        return;
      }

      troubleBox.style.display = "none";
      troubleBox.classList.remove("fade-in-animation");

      const image = document.querySelector(".weather__header img");
      const temperature = document.querySelector(
        ".weather__header .temperature"
      );
      const description = document.querySelector(
        ".weather__header .description"
      );
      const humidity = document.querySelector(
        ".weather__details .humidity span"
      );
      const wind = document.querySelector(".weather__details .wind span");

      image.src =
        "/assets/images/weather-icons/" + json.weather[0].icon + ".png";

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity} %`;
      wind.innerHTML = `${parseInt(json.wind.speed)} м/с`;

      weatherHeader.style.display = "";
      weatherDetails.style.display = "";
      weatherHeader.classList.add("fade-in-animation");
      weatherDetails.classList.add("fade-in-animation");
      container.style.height = "570px";
    })
  );
});
