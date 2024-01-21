# OpenWeather Web Application

## Overview

The OpenWeather web application is a simple weather forecasting tool that allows users to check the current weather and 5-day forecast for a specific city or their current location. The application uses the OpenWeatherMap API to fetch weather data.

## Features

1. **Search by City**: Users can enter the name of a city in the search bar and click the "Search" button to view the current weather and 5-day forecast for that city.

2. **Current Location**: Users can click on the "Current location" link to retrieve weather information based on their current location using the browser's geolocation feature.

3. **Responsive Design**: The application is designed to be responsive and works well on various devices, including desktops, tablets, and mobile phones.

## Technologies Used

- **HTML**: The application's structure is built using HTML to create the webpage.

- **CSS (Bootstrap)**: Bootstrap 5.3.2 is used for styling, providing a responsive and visually appealing design.

- **JavaScript (jQuery)**: The application uses JavaScript, particularly the jQuery library, to handle user interactions and make asynchronous API requests.

- **OpenWeatherMap API**: The OpenWeatherMap API is utilized to fetch both current weather and 5-day forecast data.

## How It Works

1. **City Search**: Users can enter the name of a city in the search input and click the "Search" button. The application will then make an API call to OpenWeatherMap to retrieve and display the current weather and 5-day forecast for the specified city.

2. **Current Location**: Clicking on the "Current location" link triggers a geolocation request. If successful, the application makes API calls to OpenWeatherMap using the obtained latitude and longitude to display the current weather and 5-day forecast for the user's current location.

3. **Navigation**: The navigation bar provides links to the home page, current location, and a search bar for city-based weather searches.

## Usage

1. Clone the repository or download the source code.

2. Open the `index.html` file in a web browser.

3. Enter a city name in the search bar and click "Search," or click "Current location" to get weather information based on your current location.

## Additional Information

- The application is built to be user-friendly and visually appealing, providing an intuitive interface for users to interact with.

- Developers can extend the functionality or customize the design by modifying the JavaScript code, adding new features, or adjusting the styling.

- Ensure that an internet connection is available as the application relies on making API calls to OpenWeatherMap.

- The OpenWeatherMap API key used in the application is provided in the JavaScript code. Developers should consider using their own API key for a production environment.