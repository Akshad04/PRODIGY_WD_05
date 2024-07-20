// JavaScript code (app.js)

// Your OpenWeatherMap API key
const apiKey = '2db6258b658103032fe75983127bbf8f';

// Select elements from the DOM
const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temp');
const cityElement = document.querySelector('.city');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');

// Function to fetch weather data from OpenWeatherMap
const getWeather = async (city) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const weatherResponse = await fetch(weatherUrl);
    if (weatherResponse.ok) {
        const weatherData = await weatherResponse.json();
        console.log('Weather Data:', weatherData); // Log the fetched data
        return weatherData;
    } else {
        alert('City not found');
        return null;
    }
};

// Function to update the weather UI
const updateWeatherUI = (data) => {
    const { temp } = data.main;
    const { speed: windspeed } = data.wind;
    const { icon } = data.weather[0];
    const { name } = data;
    const { humidity } = data.main;
    
    // Log the wind speed to ensure it's being fetched correctly
    console.log('Windspeed:', windspeed); // Log wind speed to check the value
    
    const imgPath = `http://openweathermap.org/img/wn/${icon}.png`;
    weatherIcon.src = imgPath;
    tempElement.textContent = `${Math.round(temp)}°C`;
    cityElement.textContent = name;
    humidityElement.textContent = `${humidity}%`;
    windElement.textContent = `${windspeed} km/h`;

    console.log('Temperature:', temp);
    console.log('City:', name);
    console.log('Humidity:', humidity);
    console.log('Wind Speed:', windspeed);
    
    // Revert button background color to white
    searchButton.classList.remove('clicked');
};

// Event listener for search button
searchButton.addEventListener('click', async () => {
    const city = searchInput.value;
    if (city) {
        searchButton.classList.add('clicked'); // Change button background color on click
        const weatherData = await getWeather(city);
        if (weatherData) {
            updateWeatherUI(weatherData);
        }
    } else {
        alert('Please enter a city name');
    }
});


