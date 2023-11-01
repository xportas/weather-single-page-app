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
                    //Validation: if the forecasted date is the same as the current date + n<4 day and the hour is 15 or 3 it get the data
                    if ((forecastedDate.getDate() == (currentDate.getDate() + dayCounter)) && (forecastedDate.getHours() == (15 || 3))) {
                        dayCounter++;
                        // TODO: corregir el fallo de que puede ser día 31 y volver a empezar el mes                        
                        //TODO: cogemos los datos que nos interesa de cada uno de los díasy luego hacemos append con el código de abajo para ir metiendo el tiempo pronosticado debajo.
                    }
                    if (dayCounter > 5) {
                        goOutLoop = true;
                    }
                }


                $('#city-weather-content').append('<div class="row"><div class="col-9"><p>' + WEEKDAY + '</p></div><div class="col-3"><p>' + MIN-MAX + '</p></div></div>');
            },
            error: function (error) {
                console.error("Error: ", error);
            },
        })
    }

    function searchCityWeatherByCurrentLocation(position) {
        let lat = position.coord.lat; //falla aquí
        let lon = position.coord.lon;
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


        // TODO : HACER CALL PARA LA PREVISION DE 5 DIAS
        

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