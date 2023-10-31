$(document).ready(function(){

    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
    var apiKey = "0ad2ed4b77ee83cd4eddf03827379892";

    var input = $('#location-input')
    var btn = $('#btn-search')

    function searchCity(city){
        $.ajax({
            type: "GET",
            url: apiUrl + city + "&appid=" + apiKey, 
            dataType: "json",
            success: function(response){
                $('table > tbody').empty() //TODO gestionar cómo se muestra por pantalla la información

                //vemos la respuesta de la api por la consola para depurar
                //console.log(response)

                for (let i=0; i<response.length; i++){
                    $('table tbody').append('<tr><th scope="row">' + response[i].name + '</th><td>' + response[i].lat + '</td><td>' + response[i].lon + '</td><td>' + response[i].country + '</td></tr>');
                    //TODO lo mismo, esto construye la info en el html
                }

            }, 
            error: function(error){
                console.error("Error: ", error);
            },
        })

    } 

    btn.on('click', function(event){
        event.preventDefault();
        searchCity(input.val())
    });

    //CURRENT LOCATION: ver cómo funciona navigator.geolocation
    //genera una función que coja la localización actual del usuario
    // function getCurrentLocation(){
    //     if (navigator.geolocation){
    //         navigator.geolocation.getCurrentPosition(showPosition);
    //     } else {
    //         alert("Geolocation is not supported by this browser.");
    //     }
    // }
    

});