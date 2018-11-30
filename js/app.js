var url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/';
var key = '2c2205d18d6af2bf765f377c9fa41d0c/';
var mymap = null;
var queryParams = ['exclude=[minutely,hourly,daily,alerts,flags]', 'lang=es', 'units=auto'];
var coords = {
    santiago: '-33.4377968,-70.6504451',
    valparaiso: '-33.0458456,-71.6196749',
    quillota: '-32.879997,-71.2473555',
    punta_arenas: '-53.1625446,-70.907785'
};
var icons = {
    'clear-night': 'img/clear-night.png',
    'partly-cloudy-night': 'img/cloudy-night.png',
    'clear-day': 'img/clear-day.png',
    'rain': 'img/rain.png',
    'snow': 'img/snowflake.png',
    'sleet': 'img/sleet.png',
    'wind': 'img/wind.png',
    'fog': 'img/fog.png',
    'cloudy': 'img/cloudy.png',
    'partly-cloudy-day': 'img/cloudy-day.png'
};
$(document).ready(function() {

    generarMapa();
    ajaxCall(coords['santiago']);
    $(document).on('change', '#select', function() {
        var selected = $(this).val();
        if (selected != "") {
            ajaxCall(coords[selected]);
        }
    });
});

function ajaxCall(coords) {
    $.ajax({
        url: url + key + coords + '?' + queryParams[0] + "&" + queryParams[1] + '&' + queryParams[2],
        method: 'GET',
        success: function(data) {
            $('#resumen').text(parseInt(data.currently.temperature) + "º " + data.currently.summary);
            $('#image').attr('src', icons[data.currently.icon]);
            changeMarkerPosition(coords);
        }
    });
}

function generarMapa() {
    var mymap = L.map('mapid').setView([-33.4377968, -70.6504451], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZXVycXVldGEiLCJhIjoiY2pveWs1YTh2Mms0bzNrcGl1OWdremtpdiJ9.fxU81NktFjsaHLFxgN5WHA'
    }).addTo(mymap);
    var marker = L.marker([-33.4377968, -70.6504451]).addTo(mymap);
}

function changeMarkerPosition(coords) {
    var latitud = coords.split(",")[0];
    var longitud = coords.split(",")[1];
    mymap.panTo(new L.LatLng(latitud, longitud));
    L.marker([latitud, longitud]).addTo(mymap);
}