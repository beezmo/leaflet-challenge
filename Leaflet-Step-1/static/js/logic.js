function markerSize(population) {
  return population * 10000;
}

function createMap(quakes) {
    var worldmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
    });

    var baseMaps = {
    "World Map": worldmap
    };

    var overlayMaps = {
    "Earthquakes": quakes
    };

    var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [worldmap, quakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(map);
}

function createMarkers(response) {
    var features = response.features;

    var quakeMarkers = [];

    for (var i = 0; i < features.length; i++) {
        
        var loc = features[i].geometry;
        var coords = [loc.coordinates[1], loc.coordinates[0]];

        var quakeMarker = L.circle(coords, {
            fillOpacity: 0.75,
            color: "white",
            fillColor: "purple",
            radius: markerSize(features[i].properties.mag)
        }).bindPopup(features[i].properties.title);
  


        quakeMarkers.push(quakeMarker);
    }

    createMap(L.layerGroup(quakeMarkers));
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);