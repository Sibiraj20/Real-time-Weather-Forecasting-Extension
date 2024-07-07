document.addEventListener('DOMContentLoaded', function () {
  const apiKey = 'YOUR_API_KEY';
  const toggleSwitch = document.querySelector('#toggle-switch');
  const body = document.querySelector('body');

  // Function to set background image and text color based on time of day
  function setDayNightMode() {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) {
      // Day time (6am to 6pm)
      body.style.backgroundImage = "url('images/day.gif')";
      body.classList.remove('night-mode');
      updateTextColor('#333'); // Update text colors for day mode (black)
    } else {
      // Night time (6pm to 6am)
      body.style.backgroundImage = "url('images/night.gif')";
      body.classList.add('night-mode');
      updateTextColor('#fff'); // Update text colors for night mode (white)
    }
  }

  // Function to update text colors across the UI
  function updateTextColor(color) {
    document.getElementById('location').style.color = color;
    document.getElementById('temperature').style.color = color;
    document.getElementById('description').style.color = color;
    // Update other elements as needed
  }

  // Event listener for the toggle switch
  toggleSwitch.addEventListener('change', function () {
    if (this.checked) {
      // Night mode
      body.style.backgroundImage = "url('images/night.gif')";
      body.classList.add('night-mode');
      updateTextColor('#fff'); // Update text colors for night mode (white)
    } else {
      // Day mode
      body.style.backgroundImage = "url('images/day.gif')";
      body.classList.remove('night-mode');
      updateTextColor('#333'); // Update text colors for day mode (black)
    }
  });

  // Initial setup based on default state
  setDayNightMode();

  // Geolocation and weather data fetching
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const currentWeatherData = await getCurrentWeatherData(lat, lon, apiKey);
      const forecastData = await getForecastData(lat, lon, apiKey);
      updateCurrentWeatherUI(currentWeatherData);
      updateForecastUI(forecastData);
      updateAstronomyUI(forecastData);
    });
  } else {
    alert('Geolocation is not supported by your browser.');
  }

  // Functions for fetching weather data and updating UI
  async function getCurrentWeatherData(lat, lon, apiKey) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`);
    const data = await response.json();
    return data;
  }

  async function getForecastData(lat, lon, apiKey) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=5`);
    const data = await response.json();
    return data;
  }

  function updateCurrentWeatherUI(data) {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const dateTimeString = date.toLocaleDateString(undefined, options);

    document.getElementById('date-time').textContent = `Updated: ${dateTimeString}`;
    document.getElementById('location').textContent = `Location: ${data.location.name}`;
    document.getElementById('temperature').innerHTML = `Temperature: ${data.current.temp_c} °C`;
    document.getElementById('description').textContent = `Description: ${data.current.condition.text}`;
    document.getElementById('weather-icon').src = getWeatherIcon(data.current.condition.code);
  }

  function getTemperatureIcon(temp) {
    if (temp >= 30) {
      return '<img src="icons/hot.png" alt="Hot">';
    } else if (temp >= 15) {
      return '<img src="icons/warm.png" alt="Warm">';
    } else {
      return '<img src="icons/cold.png" alt="Cold">';
    }
  }

  function getWeatherIcon(conditionCode) {
    const icons = {
      1000: 'icons/sunny.png',
      1003: 'icons/partly_cloudy.png',
      1006: 'icons/cloudy.png',
      1009: 'icons/overcast.png',
      1030: 'icons/mist.png',
      1063: 'icons/rain.png',
      1066: 'icons/patchy_snow.png',
      1069: 'icons/patchy_sleet.png',
      1072: 'icons/patchy_freezing_drizzle.png',
      1087: 'icons/thundery_outbreaks.png',
      1114: 'icons/blowing_snow.png',
      1117: 'icons/blizzard.png',
      1135: 'icons/fog.png',
      1147: 'icons/freezing_fog.png',
      1150: 'icons/patchy_light_drizzle.png',
      1153: 'icons/light_drizzle.png',
      1168: 'icons/freezing_drizzle.png',
      1171: 'icons/heavy_freezing_drizzle.png',
      1180: 'icons/patchy_light_rain.png',
      1183: 'icons/rain.png',
      1186: 'icons/moderate_rain_at_times.png',
      1189: 'icons/rain.png',
      1192: 'icons/heavy_rain_at_times.png',
      1195: 'icons/heavy_rain.png',
      1198: 'icons/light_freezing_rain.png',
      1201: 'icons/heavy_freezing_rain.png',
      1204: 'icons/light_sleet.png',
      1207: 'icons/moderate_or_heavy_sleet.png',
      1210: 'icons/patchy_light_snow.png',
      1213: 'icons/light_snow.png',
      1216: 'icons/patchy_moderate_snow.png',
      1219: 'icons/moderate_snow.png',
      1222: 'icons/patchy_heavy_snow.png',
      1225: 'icons/heavy_snow.png',
      1237: 'icons/ice_pellets.png',
      1240: 'icons/light_rain_showers.png',
      1243: 'icons/moderate_or_heavy_rain_showers.png',
      1246: 'icons/torrential_rain_showers.png',
      1249: 'icons/light_sleet_showers.png',
      1252: 'icons/moderate_or_heavy_sleet_showers.png',
      1255: 'icons/light_snow_showers.png',
      1258: 'icons/moderate_or_heavy_snow_showers.png',
      1261: 'icons/light_showers_of_ice_pellets.png',
      1264: 'icons/moderate_or_heavy_showers_of_ice_pellets.png',
      1273: 'icons/patchy_light_rain_with_thunder.png',
      1276: 'icons/moderate_or_heavy_rain_with_thunder.png',
      1279: 'icons/patchy_light_snow_with_thunder.png',
      1282: 'icons/moderate_or_heavy_snow_with_thunder.png'
    }; 
    
    return icons[conditionCode] || 'icons/default.png';
  }

  function updateForecastUI(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; // Clear previous forecast

    data.forecast.forecastday.forEach((day, index) => {
      const forecastDay = document.createElement('div');
      forecastDay.classList.add('forecast-day');

      const date = new Date(day.date);
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      const dayName = date.toLocaleDateString(undefined, options);

      forecastDay.innerHTML = `
        <div>${dayName}</div>
        <img src="${getWeatherIcon(day.day.condition.code)}" alt="${day.day.condition.text}">
        <div>${index === 0 ? `${day.day.avgtemp_c} °C` : `${day.day.avgtemp_c} °C ${getTemperatureIcon(day.day.avgtemp_c)}`}</div>
        <div>${day.day.condition.text}</div>
      `;

      forecastContainer.appendChild(forecastDay);
    });
  }

  function updateAstronomyUI(data) {
    const astronomyContainer = document.getElementById('astronomy');
    const todayAstronomy = data.forecast.forecastday[0].astro;

    document.getElementById('sunrise').textContent = todayAstronomy.sunrise;
    document.getElementById('sunset').textContent = todayAstronomy.sunset;
    document.getElementById('moonrise').textContent = todayAstronomy.moonrise;
    document.getElementById('moonset').textContent = todayAstronomy.moonset;
  }
});
