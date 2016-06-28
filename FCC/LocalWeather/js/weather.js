var geocoder;
GCODE = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA7SWl3vpKZvepF6yKcnVmek9XuwSFLWJc";

var WCBASE = "http://api.openweathermap.org/data/2.5/weather?"
var latString = "lat=";
var lonString = "lon=";
var WCEND = "units=metric&appid=e1860c03f703294ea7f4db66179179d6";

/*
  Builds the REQUEST Url for the getWeather(lat, lgt)
  function.
*/
function buildWeatherUrl(lat, lgt) {
  return WCBASE + latString + lat + "&" + lonString + lgt + "&" + WCEND;
}

/*
  A function which with the help of latitude 
  and longitude finds the particular position
  and its corresponding weather.
  lat - Latitude
  lgt - Longitude
*/
function getWeather(lat, lgt) {
  console.log(lat + " / " + lgt);
  var WCODE = buildWeatherUrl(lat, lgt);
  $.getJSON(WCODE, function(data, status) {
    if (status === "success") {
      console.log("DATA: " + data.sys["country"] + ". STATUS: " + status);
    }
  });
}

// Get location function if the name was entered
function geocodeLoc() {
  var address = "Beograd";
  geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      console.log("Geocoder FINE");
      var res = results[0].geometry.location;
      var latitude = res.lat();
      var longitude = res.lng();
      $("#lat").html(latitude);
      $("#lgt").html(longitude);
      var addComp = results[0].address_components;
      var compTypes = results[0].types;
      var plID = results[0].place_id;
      $("#city").html(addComp[0].long_name);
      $("#country").html(addComp[2].long_name);

      getWeather(latitude, longitude);

    } else console.log("Geocoder FAIL");
  });

}

/**
* Uses GCODE (Google Geolocation API) 
* to reutun the current location 
* of the user and subsequently calls
* getWeather with the resulted
* latitude and longitude.
*/
function getCurrentLocation(){
  $.post(GCODE, function(data, status){
    console.log("Current location status : "+ data.status);
    console.log(JSON.stringify(data));
    getWeather(data.location["lat"],data.location["lng"]);
  });
  
  
}