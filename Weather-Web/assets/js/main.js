const cityInput = document.getElementById("city");
const searchButton = document.getElementById("search-btn");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const errorMessage = document.getElementById("error-message");

// Replace this with your OpenWeatherMap API key
const apiKey = "YOUR_API_KEY"; 

// Add event listener to the search button
searchButton.addEventListener("click", function() {
    const city = cityInput.value.trim();

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    // Clear previous error message
    errorMessage.textContent = "";

    // Fetch the weather data
    getWeather(city);
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        errorMessage.textContent = error.message;
        weatherInfo.style.display = "none";
    }
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;

    // Show weather info
    weatherInfo.style.display = "block";

    cityName.textContent = `Weather in ${name}`;
    temperature.textContent = `Temperature: ${main.temp}°C`;
    description.textContent = `Condition: ${weather[0].description}`;
    humidity.textContent = `Humidity: ${main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${wind.speed} m/s`;

    // Clear the input field
    cityInput.value = "";
}

