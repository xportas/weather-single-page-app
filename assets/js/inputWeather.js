$(document).ready(function () {

    var apiCurrentByNameUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
    var apiCurrentByLatLonUrl = "https://api.openweathermap.org/data/2.5/weather?";
    var api5DaysByNameUrl = "api.openweathermap.org/data/2.5/forecast?q=";
    var api5DaysByLatLonUrl = "api.openweathermap.org/data/2.5/forecast?";
    var apiKey = "0ad2ed4b77ee83cd4eddf03827379892";

    var input = $('#location-input')
    var btnSearch = $('#btn-search')
    var aCurrent = $('#a-current-city')

    /* POSIBLE NECESIDAD PARA VALIDAR
    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentMonth = currentDate.getMonth() + 1;
    var currentYear = currentDate.getFullYear();
    var formatedDate = currentYear + "-" + currentMonth + "-" + currentDay;*/

    function searchCityWeatherByName(city) {
        $.ajax({ // current weather call
            type: "GET",
            url: apiCurrentByNameUrl + city + "&appid=" + apiKey,
            dataType: "json",
            success: function (response) {
                $('#city-weather-content').empty();

                //vemos la respuesta de la api por la consola para depurar
                console.log(response)

                let name = response.name;
                let icon = response.weather.icon;
                let tempMin = response.main.temp_min;
                let tempMax = response.main.temp_max;

                $('#city-weather-content').append('<div class="row mt-3"><h2 class="d-flex justify-content-center">' + name + '</h2></div><div class="row col-9"><img src="assets/images/' + icon + '.png" alt="current-weather-img"></div><div class="row"><p class="d-flex justify-content-center">Min: ' + tempMin + 'º  -  Max: ' + tempMax + 'º</p></div>');
            },
            error: function (error) {
                console.error("Error: ", error);
            },
        })


        $.ajax({ // forecasted weather call
            type: "GET",
            url: api5DaysByNameUrl + city + "&appid=" + apiKey,
            dataType: "json",
            success: function (response) {
                //vemos la respuesta de la api por la consola para depurar
                console.log(response);


                for (let i = 0; i < response.length; i++) {
                    
                    //TODO VALIDACIONES
                    
                    if (response[i].name == city) {
                        $('#city-weather-content').append('<div class="row"><div class="col-9"><p>' + TOCHANGE + '</p></div><div class="col-3"><p>' + TOCHANGE + '</p></div></div>');
                    }
                }
            },
            error: function (error) {
                console.error("Error: ", error);
            },
        })
    }

    function searchCityWeatherByCurrentLocation(position) {
        let lat = position.coord.lat;
        let lon = position.coord.lon;
        $.ajax({ // current weather call
            type: "GET",
            url: apiCurrentByLatLonUrl + 'lat=' + lat + '&lon=' + lon + "&appid=" + apiKey,
            dataType: "json",
            success: function (response) {
                $('#city-weather-content').empty();

                //vemos la respuesta de la api por la consola para depurar
                console.log(response)

                let name = response.name;
                let icon = response.weather.icon;
                let tempMin = response.main.temp_min;
                let tempMax = response.main.temp_max;

                $('#city-weather-content').append('<div class="row mt-3"><h2 class="d-flex justify-content-center">' + name + '</h2></div><div class="row col-9"><img src="assets/images/' + icon + '.png" alt="current-weather-img"></div><div class="row"><p class="d-flex justify-content-center">Min: ' + tempMin + 'º  -  Max: ' + tempMax + 'º</p></div>');
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