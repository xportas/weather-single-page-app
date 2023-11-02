$(document).ready(function () {

    var apiCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?";
    var apiForecastedUrl = "https://api.openweathermap.org/data/2.5/forecast?";
    var apiKey = "0ad2ed4b77ee83cd4eddf03827379892";

    var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var input = $('#location-input')
    var btnSearch = $('#btn-search')
    var aCurrent = $('#a-current-city')

    function searchCityWeatherByName(city) {
        $.ajax({ // current weather call
            type: "GET",
            url: apiCurrentUrl + "q=" + city + "&appid=" + apiKey,
            dataType: "json",
            success: function (response) {
                $('#city-weather-content').empty();

                //vemos la respuesta de la api por la consola para depurar
                console.log(response)

                let name = response.name;
                let icon = response.weather[0].icon + '.png';
                let temp = Math.round(response.main.temp - 273);
                let humidity = response.main.humidity;

                $('#city-weather-content').append('<div class="row mt-3"><h2 class="d-flex justify-content-center">' + name + '</h2></div><div class="row col-9"><img src="assets/images/' + icon + '" alt="current-weather-img"></div><div class="row"><p class="d-flex justify-content-center">Temp: ' + temp + 'ºC | Humidity: ' + humidity + '%</p></div>');
            },
            error: function (error) {
                console.error("Error: ", error);
            },
        })


        $.ajax({ // forecasted weather call
            type: "GET",
            url: apiForecastedUrl + "q=" + city + "&appid=" + apiKey,
            dataType: "json",
            success: function (response) {
                //vemos la respuesta de la api por la consola para depurar
                console.log(response);
                
                let currentDate = new Date();

                let i = 0;
                let dayCounter = 1;
                goOutLoop = false;
                while (i < response.list.length && goOutLoop != true) {
                    let forecastedDate = new Date(response.list[i].dt_txt);
                    let tempMax = -1000;
                    let tempMin = 1000;
                    //Validation: if the forecasted date is the same as the current date + n<4 day it gets the weather data
                    if ((forecastedDate.getDate() == (currentDate.getDate() + dayCounter)) || ((forecastedDate.getMonth() == currentDate.getMonth()+1) && (forecastedDate.getDate() <= 4))) {
                        let j = i+1;
                        while (j<response.list.length && forecastedDate.getDate() == new Date(response.list[j].dt_txt).getDate()) {
                            if (tempMax < response.list[j].main.temp_max) {
                                tempMax = response.list[j].main.temp_max;
                            }
                            if (tempMin > response.list[j].main.temp_min) {
                                tempMin = response.list[j].main.temp_min;
                            }
                            j++;
                        }
                        $('#city-weather-content').append('<div class="row"><div class="col-7"><p>' + weekDays[forecastedDate.getDay()] + '</p></div><div class="col-5"><p>' + Math.round(tempMax - 273) + 'ºC | ' + Math.round(tempMin - 273) + 'ºC</p></div></div>');
                        dayCounter++;
                    }
                    if (dayCounter > 5) {
                        goOutLoop = true;
                    }
                    i++;
                }
            },
            error: function (error) {
                console.error("Error: ", error);
            },
        })
    }

    function searchCityWeatherByCurrentLocation(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        $.ajax({ // current weather call
            type: "GET",
            url: apiCurrentUrl + 'lat=' + lat + '&lon=' + lon + "&appid=" + apiKey,
            dataType: "json",
            success: function (response) {
                $('#city-weather-content').empty();

                //vemos la respuesta de la api por la consola para depurar
                console.log(response)

                let name = response.name;
                let icon = response.weather[0].icon + '.png';
                let temp = Math.round(response.main.temp - 273);
                let humidity = response.main.humidity;

                $('#city-weather-content').append('<div class="row mt-3"><h2 class="d-flex justify-content-center">' + name + '</h2></div><div class="row col-9"><img src="assets/images/' + icon + '" alt="current-weather-img"></div><div class="row"><p class="d-flex justify-content-center">Temp: ' + temp + 'ºC | Humidity: ' + humidity + '%</p></div>');
            },
            error: function (error) {
                console.error("Error: ", error);
            },
        })


        $.ajax({ // forecasted weather call
            type: "GET",
            url: apiForecastedUrl + 'lat=' + lat + '&lon=' + lon + "&appid=" + apiKey,
            dataType: "json",
            success: function (response) {
                //vemos la respuesta de la api por la consola para depurar
                console.log(response);
                
                let currentDate = new Date();

                let i = 0;
                let dayCounter = 1;
                goOutLoop = false;
                while (i < response.list.length && goOutLoop != true) {
                    let forecastedDate = new Date(response.list[i].dt_txt);
                    let tempMax = -1000;
                    let tempMin = 1000;
                    //Validation: if the forecasted date is the same as the current date + n<4 day it gets the weather data
                    if ((forecastedDate.getDate() == (currentDate.getDate() + dayCounter)) || ((forecastedDate.getMonth() == currentDate.getMonth()+1) && (forecastedDate.getDate() <= 4))) {
                        let j = i+1;
                        while (j<response.list.length && forecastedDate.getDate() == new Date(response.list[j].dt_txt).getDate()) {
                            if (tempMax < response.list[j].main.temp_max) {
                                tempMax = response.list[j].main.temp_max;
                            }
                            if (tempMin > response.list[j].main.temp_min) {
                                tempMin = response.list[j].main.temp_min;
                            }
                            j++;
                        }
                        $('#city-weather-content').append('<div class="row"><div class="col-7"><p>' + weekDays[forecastedDate.getDay()] + '</p></div><div class="col-5"><p>' + Math.round(tempMax - 273) + 'ºC | ' + Math.round(tempMin - 273) + 'ºC</p></div></div>');
                        dayCounter++;
                    }
                    if (dayCounter > 5) {
                        goOutLoop = true;
                    }
                    i++;
                }
            },
            error: function (error) {
                console.error("Error: ", error);
            },
        })
    }

    function errorGetCurrentLocation() {
            alert("Unable to retrieve your location for weather");
        }

    //function to get user current location
    function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(searchCityWeatherByCurrentLocation, errorGetCurrentLocation);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    

    // EVENT LISTENERS
    btnSearch.on('click', function (event) {
        event.preventDefault();
        searchCityWeatherByName(input.val());
    });

    aCurrent.on('click', function (event) {
        event.preventDefault();
        getCurrentLocation();
    });

});