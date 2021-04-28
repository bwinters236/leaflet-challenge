var myMap = L.map("map", {
    center: [34.052235, -118.243683],
    zoom: 5
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Use this link to get the geojson data.
  var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson";

d3.json(link).then(function(response) {  

    for (var i = 0; i < response.features.length; i++) {
    var place = response.features[i].properties.place
    var mag = response.features[i].properties.mag
    var location = [response.features[i].geometry.coordinates[0], response.features[i].geometry.coordinates[1]]
    var depth = response.features[i].geometry.coordinates[2]
    var circleColor;

    console.log(location)
  
        
        if(mag > 5){
            circleColor = "black";
        }
        if(mag >= 4 && mag < 5){
            circleColor = "#a5150d";
        }
        if(mag >= 3 && mag < 4){
            circleColor = "#c73813";
        }
        if(mag >= 2 && mag < 3){
            circleColor = "#e32914";
        }
        if(mag >= 1 && mag < 2){
            circleColor = "#fb0101";
        }
        if(mag < 1){
            circleColor = "#f94609";
        }
    
    var quake = L.circleMarker(location, {
        color: "yellow",
        fillColor: circleColor,
        radius: mag * 10


    });

    quake.addTo(myMap);

    }
    








})