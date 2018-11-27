$(document).ready(function() {

  var url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/';
  var key = '2c2205d18d6af2bf765f377c9fa41d0c/';
  var coords = {
    santiago: '-33.4377968,-70.6504451',
    quillota: '-32.879997,-71.2473555'
  };

  $('#select').on('change', function(event) {
    $.ajax({
      url: url + key + coords[$(this).val()],
      type: 'GET'
    })
    .then(function(data){
      console.log(data);
    });
  });
});
//leaflet
