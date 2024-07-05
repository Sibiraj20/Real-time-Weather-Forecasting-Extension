document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'b1a4fd2aeaed4f7c9ae111750240507';
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const currentWeatherData = await getCurrentWeatherData(lat, lon, apiKey);
        const forecastData = await getForecastData(lat, lon, apiKey);
        updateCurrentWeatherUI(currentWeatherData);
        updateForecastUI(forecastData);
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
      switch (conditionCode) {
        case 113: // Sunny
          return 'icons/sunny.png';
        case 116: // Partly cloudy
          return 'icons/partly_cloudy.png';
        case 119: // Cloudy
          return 'icons/cloudy.png';
        case 143: // Mist
          return 'icons/mist.png';
        case 176: // Patchy rain nearby
        case 263: // Patchy light drizzle
        case 296: // Light rain showers
        case 299: // Moderate rain showers
        case 302: // Moderate rain
        case 305: // Heavy rain showers
        case 308: // Heavy rain
          return 'icons/rain.png';
        default:
          return 'icons/default.png';
      }
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
  });
  