$(document).ready(function () {
    const apiBaseUrl = "https://api.openweathermap.org/data/2.5/";
    const apiKey = "0ad2ed4b77ee83cd4eddf03827379892";
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const input = $('#location-input');
    const btnSearch = $('#btn-search');
    const aCurrent = $('#a-current-city');
    const divLogo = $('#div-logo');
    const divCityWeather = $('#div-cityweather');
    const homeElements = $('#home, #home-tit');



    function searchCityWeather(url, params, successCallback) {
        $.ajax({
            type: "GET",
            url: apiBaseUrl + url + params,
            dataType: "json",
            success: successCallback,
            error: function (error) {
                console.error("Error: ", error);
            },
        });
    }



    function displayCurrentWeather(response) {
        $('#city-weather-content').empty();
        const name = response.name;
        const icon = response.weather[0].icon + '.png';
        const temp = Math.round(response.main.temp - 273);
        const humidity = response.main.humidity;
        $('#city-weather-content').append(`
            <div class="row mt-3">
                <h2 class="d-flex justify-content-center">${name}</h2>
            </div>
            <div class="row col-9">
                <img src="assets/img/${icon}" alt="current-weather-img">
            </div>
            <div class="row">
                <p class="d-flex justify-content-center">Temp: ${temp}ºC | Humidity: ${humidity}%</p>
            </div>
        `);
    }



    function displayForecastedWeather(response) {
        console.log(response);
        const currentDate = new Date();
        let i = 0;
        let dayCounter = 1;
        let goOutLoop = false;
        while (i < response.list.length && !goOutLoop) {
            const forecastedDate = new Date(response.list[i].dt_txt);
            let tempMax = -1000;
            let tempMin = 1000;
            if ((forecastedDate.getDate() === (currentDate.getDate() + dayCounter)) ||
                ((forecastedDate.getMonth() === currentDate.getMonth() + 1) && (forecastedDate.getDate() <= 4))) {
                let j = i + 1;
                while (j < response.list.length && forecastedDate.getDate() === new Date(response.list[j].dt_txt).getDate()) {
                    tempMax = Math.max(tempMax, response.list[j].main.temp_max);
                    tempMin = Math.min(tempMin, response.list[j].main.temp_min);
                    j++;
                }
                $('#city-weather-content').append(`
                    <div class="row">
                        <div class="col-7">
                            <p>${weekDays[forecastedDate.getDay()]}</p>
                        </div>
                        <div class="col-5">
                            <p>${Math.round(tempMax - 273)}ºC | ${Math.round(tempMin - 273)}ºC</p>
                        </div>
                    </div>
                `);
                dayCounter++;
            }
            if (dayCounter > 4) {
                goOutLoop = true;
            }
            i++;
        }
    }



    function searchCityWeatherByName(city) {
        const params = `q=${city}&appid=${apiKey}`;
        searchCityWeather("weather?", params, displayCurrentWeather);
        searchCityWeather("forecast?", params, displayForecastedWeather);
    }



    function searchCityWeatherByCurrentLocation(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const params = `lat=${lat}&lon=${lon}&appid=${apiKey}`;
        searchCityWeather("weather?", params, displayCurrentWeather);
        searchCityWeather("forecast?", params, displayForecastedWeather);
    }



    function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(searchCityWeatherByCurrentLocation, errorGetCurrentLocation);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function errorGetCurrentLocation() {
        alert("Unable to retrieve your location for weather");
    }



    /* 
    *  EVENT LISTENERS 
    */
    btnSearch.on('click', function (event) {
        event.preventDefault();
        searchCityWeatherByName(input.val());
        input.val('');
        divLogo.addClass('d-none');
        divCityWeather.removeClass('d-none');
    });


    aCurrent.on('click', function (event) {
        event.preventDefault();
        getCurrentLocation();
        divLogo.addClass('d-none');
        divCityWeather.removeClass('d-none');
    });


    homeElements.on('click', function (event) {
        event.preventDefault();
        divLogo.removeClass('d-none');
        divCityWeather.addClass('d-none');
    });
});
