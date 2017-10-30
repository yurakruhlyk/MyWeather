'use strict'

// Function for output city, temperature, hour, icon
const renderWeather = function(city, temperature, weatherCode) {
  const wrapper = document.getElementById('wrapper');

  wrapper.setAttribute('data-hour', getHours());
  wrapper.innerHTML += `<i class="${weatherIcon(weatherCode)}"></i>`;
  wrapper.innerHTML += `<span class="temperature">${temperature}&deg;C</span>`;
  wrapper.innerHTML += `<h1 class="city">${city}</h1>`;
}



// Function for get weatherIcon
const weatherIcon = function(weatherCode) {
  const time = getHours();
  const timeOfDay = (time > 7 && time < 18) ? 'day' : 'night';
  const className = `weather-icon wi wi-owm-${timeOfDay}-${weatherCode}`;

  return className;
}

// Function for get Hour
const getHours = function() {
  const date = new Date();
  const time = date.getHours();

  return time;
}

// Fetch weather user
const fetchWeather = city => {
  const baseUrl = 'http://api.openweathermap.org';
  const path = '/data/2.5/weather';
  const appId = '0daa83ea1b190102f2bc310b0c995c55';
  const query = `units=metric&lang=en&appid=${appId}`;

  fetch(`${baseUrl}${path}?q=${city}&${query}`)
    .then(response => response.json())
    .then(data => renderWeather(data.name, Math.round(data.main.temp), data.weather[0].id))
    .catch(error => console.error(error));
}

// Fetch city user
const fetchCity = () => {
  fetch('http://freegeoip.net/json/')
    .then(response => response.json())
    .then(({ city }) => fetchWeather(city))
    .catch(error => console.error(error));
}

fetchCity();