// First I create a map, I give it LA's coordinates to open, so you can see the CA coast
var myMap = L.map("map", {
    center: [34.052235, -118.243683],
    zoom: 3
});
  
// Tile layer for map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);
  
// Link to geojson data
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// The rest of the program happens in the d3 call, which is given our url and gives back response
d3.json(link).then(function(response) {  

    // For loop to run the length of how many quakes are in the data.  Grabs key data from json and stores it for use.  Parse int to make sure number values are not strings
    for (var i = 0; i < response.features.length; i++) {
    var place = response.features[i].properties.place
    var mag = parseInt(response.features[i].properties.mag)
    var location = [parseInt(response.features[i].geometry.coordinates[1]), parseInt(response.features[i].geometry.coordinates[0])]
    var depth = parseInt(response.features[i].geometry.coordinates[2])
    

    // A variable for the color of the circle which is then assigned a color through a series of ifs regarding quake depth
    var circleColor;
    if(depth >= 125){
        circleColor = "black";
    }
    if(depth >= 100 && depth < 125){
        circleColor = "red";
    }
    if(depth >= 75 && depth < 100){
        circleColor = "orange";
    }
    if(depth >= 50 && depth < 75){
        circleColor = "yellow";
    }
    if(depth >= 25 && depth < 50){
        circleColor = "green";
    }
    if(depth < 25){
        circleColor = "blue";
    }
    
    // Creating circles for every quake in the loop, assigning it it's coordinates fill color and radius based off values from json
    var quake = L.circleMarker(location, {
        color: "white",
        fillColor: circleColor,
        fillOpacity: 1,
        radius: mag * 5

    // Binds a pop up to each circle, adds the circle and popup to the map
    }).bindPopup("<h2>" + place + "<br>Magnitude: " + mag + "<br>Depth: " + depth + "</h2>").addTo(myMap);

    

    

    // End of for loop
    }
    
    // Creating our legend through the leaflet legend controls
    var legend = L.control({ position: "bottomleft" });

    // Adds sections to the legend for each depth range and a corresponding colored box, all formatting handled in the CSS 
    legend.onAdd = function(myMap) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Earthquake Depth</h4>";
    div.innerHTML += '<i style="background: black"></i><span>125+</span><br>';
    div.innerHTML += '<i style="background: red"></i><span>100-125</span><br>';
    div.innerHTML += '<i style="background: orange"></i><span>75-100</span><br>';
    div.innerHTML += '<i style="background: yellow"></i><span>50-75</span><br>';
    div.innerHTML += '<i style="background: green"></i><span>25-50</span><br>';
    div.innerHTML += '<i style="background: blue"></i><span>Under 25</span><br>';


    return div;
    };

    // Add legend to map
    legend.addTo(myMap);




})