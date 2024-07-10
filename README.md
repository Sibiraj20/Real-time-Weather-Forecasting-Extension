# Weather Forecast Chrome Extension

This Chrome extension provides the current weather and a 5-day weather forecast (excluding today) based on the user's geolocation. The data is fetched from WeatherAPI and displayed in a user-friendly UI.

## Features

- *Current Weather*: Displays the current temperature, weather condition, and an appropriate icon.
- *5-Day Forecast*: Shows the weather forecast for the upcoming 5 days, excluding today.
- *Astronomy Information*: Provides sunrise, sunset, moonrise, and moonset times for the current day.
- *Geolocation*: Automatically fetches weather data based on the user's current location.

## Installation

1. Clone this repository to your local machine:
  
2. Open Chrome and navigate to chrome://extensions/.

3. Enable "Developer mode" by toggling the switch in the top right corner.

4. Click on "Load unpacked" and select the directory where you cloned the repository.

## Usage

1. Click on the extension icon in the Chrome toolbar to open the weather dashboard.

2. The extension will request access to your geolocation. Allow access to enable the extension to fetch weather data for your current location.

3. The dashboard will display:
   - *Current Weather*: Location, temperature, weather condition, and icon.
   - *5-Day Forecast*: Weather forecast for the next 5 days.
   - *Astronomy Information*: Sunrise, sunset, moonrise, and moonset times.

## Code Overview

### content.js

The main script responsible for fetching and displaying weather data:

- *Geolocation*: Retrieves the user's current location.
- *Weather Data Fetching*:
  - getCurrentWeatherData(lat, lon, apiKey): Fetches current weather data from WeatherAPI.
  - getForecastData(lat, lon, apiKey): Fetches 5-day weather forecast data from WeatherAPI.
- *UI Updates*:
  - updateCurrentWeatherUI(data): Updates the UI with current weather information.
  - updateForecastUI(data): Updates the UI with the 5-day weather forecast (excluding today).
  - updateAstronomyUI(data): Updates the UI with astronomy information.

### manifest.json

Defines the extension's metadata and permissions, including geolocation and active tab permissions.

### popup.html

The HTML structure for the extension's popup UI.

### styles.css

Contains the CSS styles for the extension's UI components.

## Dependencies

- [WeatherAPI](https://www.weatherapi.com/): Provides the weather data.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
