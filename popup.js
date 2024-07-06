document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'YOUR-API-KEY';
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const currentWeatherData = await getCurrentWeatherData(lat, lon, apiKey);
        const forecastData = await getForecastData(lat, lon, apiKey);
        updateCurrentWeatherUI(currentWeatherData);
        updateForecastUI(forecastData);
        updateAstronomyUI(forecastData); // New function to update astronomy data
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  
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
      document.getElementById('location').textContent = `Location: ${data.location.name}`;
      document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c} °C`;
      document.getElementById('description').textContent = `Description: ${data.current.condition.text}`;
      document.getElementById('weather-icon').src = getWeatherIcon(data.current.condition.code);
    }
  
    function getWeatherIcon(conditionCode) {
    const icons = {
      1000: 'icons/sunny.png',             // Sunny
      1003: 'icons/partly_cloudy.png',     // Partly cloudy
      1006: 'icons/cloudy.png',            // Cloudy
      1009: 'icons/overcast.png',          // Overcast
      1030: 'icons/mist.png',              // Mist
      1063: 'icons/rain.png',       // Patchy rain possible
      1066: 'icons/patchy_snow.png',       // Patchy snow possible
      1069: 'icons/patchy_sleet.png',      // Patchy sleet possible
      1072: 'icons/patchy_freezing_drizzle.png', // Patchy freezing drizzle possible
      1087: 'icons/thundery_outbreaks.png', // Thundery outbreaks possible
      1114: 'icons/blowing_snow.png',      // Blowing snow
      1117: 'icons/blizzard.png',          // Blizzard
      1135: 'icons/fog.png',               // Fog
      1147: 'icons/freezing_fog.png',      // Freezing fog
      1150: 'icons/patchy_light_drizzle.png', // Patchy light drizzle
      1153: 'icons/light_drizzle.png',     // Light drizzle
      1168: 'icons/freezing_drizzle.png',  // Freezing drizzle
      1171: 'icons/heavy_freezing_drizzle.png', // Heavy freezing drizzle
      1180: 'icons/patchy_light_rain.png', // Patchy light rain
      1183: 'icons/light_rain.png',        // Light rain
      1186: 'icons/moderate_rain_at_times.png', // Moderate rain at times
      1189: 'icons/moderate_rain.png',     // Moderate rain
      1192: 'icons/heavy_rain_at_times.png', // Heavy rain at times
      1195: 'icons/heavy_rain.png',        // Heavy rain
      1198: 'icons/light_freezing_rain.png', // Light freezing rain
      1201: 'icons/heavy_freezing_rain.png', // Heavy freezing rain
      1204: 'icons/light_sleet.png',       // Light sleet
      1207: 'icons/moderate_or_heavy_sleet.png', // Moderate or heavy sleet
      1210: 'icons/patchy_light_snow.png', // Patchy light snow
      1213: 'icons/light_snow.png',        // Light snow
      1216: 'icons/patchy_moderate_snow.png', // Patchy moderate snow
      1219: 'icons/moderate_snow.png',     // Moderate snow
      1222: 'icons/patchy_heavy_snow.png', // Patchy heavy snow
      1225: 'icons/heavy_snow.png',        // Heavy snow
      1237: 'icons/ice_pellets.png',       // Ice pellets
      1240: 'icons/light_rain_showers.png', // Light rain showers
      1243: 'icons/moderate_or_heavy_rain_showers.png', // Moderate or heavy rain showers
      1246: 'icons/torrential_rain_showers.png', // Torrential rain showers
      1249: 'icons/light_sleet_showers.png', // Light sleet showers
      1252: 'icons/moderate_or_heavy_sleet_showers.png', // Moderate or heavy sleet showers
      1255: 'icons/light_snow_showers.png', // Light snow showers
      1258: 'icons/moderate_or_heavy_snow_showers.png', // Moderate or heavy snow showers
      1261: 'icons/light_showers_of_ice_pellets.png', // Light showers of ice pellets
      1264: 'icons/moderate_or_heavy_showers_of_ice_pellets.png', // Moderate or heavy showers of ice pellets
      1273: 'icons/patchy_light_rain_with_thunder.png', // Patchy light rain with thunder
      1276: 'icons/moderate_or_heavy_rain_with_thunder.png', // Moderate or heavy rain with thunder
      1279: 'icons/patchy_light_snow_with_thunder.png', // Patchy light snow with thunder
      1282: 'icons/moderate_or_heavy_snow_with_thunder.png' // Moderate or heavy snow with thunder
    };
  
    return icons[conditionCode] || 'icons/default.png';
  }
  
    function updateForecastUI(data) {
      const forecastContainer = document.getElementById('forecast');
      forecastContainer.innerHTML = ''; // Clear previous forecast
  
      data.forecast.forecastday.forEach(day => {
        const forecastDay = document.createElement('div');
        forecastDay.classList.add('forecast-day');
  
        const date = new Date(day.date);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const dayName = date.toLocaleDateString(undefined, options);
  
        forecastDay.innerHTML = `
          <div>${dayName}</div>
          <img src="${getWeatherIcon(day.day.condition.code)}" alt="${day.day.condition.text}">
          <div>${day.day.avgtemp_c} °C</div>
          <div>${day.day.condition.text}</div>
        `;
  
        forecastContainer.appendChild(forecastDay);
      });
    }
    function updateAstronomyUI(data) {
    const astronomyContainer = document.getElementById('astronomy');
    const todayAstronomy = data.forecast.forecastday[0].astro;

    astronomyContainer.innerHTML = `
      <div><strong>Sunrise:</strong> ${todayAstronomy.sunrise}</div>
      <div><strong>Sunset:</strong> ${todayAstronomy.sunset}</div>
      <div><strong>Moonrise:</strong> ${todayAstronomy.moonrise}</div>
      <div><strong>Moonset:</strong> ${todayAstronomy.moonset}</div>
    `;
  }
});

  
