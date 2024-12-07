const express = require('express');
const bodyParser = require('body-parser');
const weatherApp = express();
const axios = require('axios');
const port = 3000;

weatherApp.use(bodyParser.urlencoded({ extended: true }));

// Function to get the map URL
const getMapUrl = (latitude, longitude) => {
    const apiKey = ''; 
    return ``;
};

weatherApp.post('/weatherresponse', async (req, res) => {
    const city = req.body.city;
    const weatherApiKey = '';
    const unsplashApiKey = '';

    // OpenWeatherMap API for weather information
    const weatherApiUrl = ``;
    
    try {
        const weatherResponse = await axios.get(weatherApiUrl);
        const weatherData = weatherResponse.data;

        // Timezone API for local time using latitude and longitude from OpenWeatherMap
        const timezoneApiUrl = ``;
        const timezoneResponse = await axios.get(timezoneApiUrl);
        const timezoneData = timezoneResponse.data;

        // Unsplash API for a beautiful picture of the city
        const unsplashApiUrl = ``;
        const unsplashResponse = await axios.get(unsplashApiUrl);
        const unsplashData = unsplashResponse.data;

        res.send(`
            <div id="weather-info">
                <div id="left-info">
                    <h2>${city}, ${weatherData.sys.country}</h2>
                    <p><span class="bold">Geolocation:</span> ${weatherData.coord.lat}, ${weatherData.coord.lon}</p>
                    <p><span class="bold">Temperature:</span> ${weatherData.main.temp}°C, ${weatherData.weather[0].description}</p>
                    <p><span class="bold">Feels Like:</span> ${weatherData.main.feels_like}°C</p>
                    <p><span class="bold">Humidity:</span> ${weatherData.main.humidity}%</p>
                    <p><span class="bold">Pressure:</span> ${weatherData.main.pressure} hPa</p>
                    <p><span class="bold">Wind Speed:</span> ${weatherData.wind.speed} km/h</p>
                    <p><span class="bold">Local Time:</span> ${new Date(timezoneData.datetime).toLocaleTimeString()}</p>
                </div>
                <div id="right-info">
                    <img src="${getMapUrl(weatherData.coord.lat, weatherData.coord.lon)}" alt="City Map" width="400" height="400">
                    <img src="${unsplashData.urls.regular}" alt="City Image" width="400" height="400">
                </div>
            </div>
            <style>
                #weather-info {
                    display: flex;
                    justify-content: space-between;
                    background-color: #3498db;
                    padding: 20px;
                    border-radius: 10px;
                    color: white;
                    font-family: 'Arial', sans-serif;
                }
                #left-info {
                    width: 50%;
                    font-size: 20px;
                }
                #right-info {
                    width: 40%;
                }
                .bold {
                    font-weight: bold;
                }
            </style>
        `);
    } catch (error) {
        res.status(500).send('Something went wrong during fetching.');
        console.error(error);
    }
});

weatherApp.get('/', (req, res) => {
    res.sendFile(__dirname + '/weatherresponse.html');
});

weatherApp.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
