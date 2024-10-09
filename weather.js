const apiKey = '5f8bb3c4ea287ee704488a101d27f468'; 
const locationDisplay = document.getElementById('location-display');
const weatherCondition = document.getElementById('weather-condition');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const loadingSpinner = document.getElementById('loading-spinner');

function getWeatherData(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    locationDisplay.textContent = `Location: ${data.name}, ${data.sys.country}`;
    weatherCondition.textContent = `Condition: ${data.weather[0].description}`;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    humidity.textContent = `Humidity: ${data.main.humidity} %`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    document.querySelector('.weather-info').style.visibility = 'visible';
    loadingSpinner.style.display = 'none';
}

function enableInputs() {
    cityInput.disabled = false;
    getWeatherBtn.disabled = false;
}

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        loadingSpinner.style.display = 'block';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                displayWeatherData(data);
                loadingSpinner.style.display = 'none';
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherData(latitude, longitude);
            enableInputs();
        }, error => {
            locationDisplay.textContent = 'Unable to fetch your location. Please enter a city.';
            enableInputs();
        });
    } else {
        locationDisplay.textContent = 'Geolocation is not supported by this browser.';
        enableInputs();
    }
}

getLocation();
