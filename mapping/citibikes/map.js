mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJlZW5hLWFyb3JhIiwiYSI6ImNsM3U4bXk5NzI5bGIzZ211MmJmMzNpOWkifQ.vVgiB_-ozFDEiI9ERgrq2w";
var map = new mapboxgl.Map({
  container: "map2020",
  style: "mapbox://styles/areena-arora/cl4bpgcic001115mzcxycrbe3",
  zoom: 10.5,
  center: [-73.96, 40.76],
  maxZoom: 15,
  minZoom: 8,
  maxBounds: [
    [-74.45, 40.45],
    [-73.55, 41],
  ],
});

map.on("load", function () {
  map.addLayer({
    id: "starts2020",
    type: "circle",
    source: {
      type: "geojson",
      data: "data/starts2020.geojson",
    },
    paint: {
      "circle-color": "#50C878",
      "circle-stroke-color": "#ffffff",
      "circle-stroke-width": 0.2,
      "circle-opacity": 0.5,
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "number_of_trips"],
        10,
        2,
        14000,
        20,
      ],
    },
  });
});

// Create the popup
map.on("click", "starts2020", function (e) {
  let trips_number = e.features[0].properties.number_of_trips;
  let stationName = e.features[0].properties["start station name"];
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h4>" +
        stationName +
        "</hr>" +
        "<br>" +
        "<p>" +
        trips_number +
        " trip starts" +
        "</p>"
    )
    .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the turnstileData layer.
map.on("mouseenter", "starts2020", function () {
  map.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map.on("mouseleave", "starts2020", function () {
  map.getCanvas().style.cursor = "";
});

// NEW MAP FOR 2021

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJlZW5hLWFyb3JhIiwiYSI6ImNsM3U4bXk5NzI5bGIzZ211MmJmMzNpOWkifQ.vVgiB_-ozFDEiI9ERgrq2w";
var map2021 = new mapboxgl.Map({
  container: "map2021",
  style: "mapbox://styles/areena-arora/cl4bpgcic001115mzcxycrbe3",
  zoom: 10.5,
  center: [-73.96, 40.76],
  maxZoom: 15,
  minZoom: 8,
  maxBounds: [
    [-74.45, 40.45],
    [-73.55, 41],
  ],
});
map2021.on("load", function () {
  map2021.addLayer({
    id: "starts2021",
    type: "circle",
    source: {
      type: "geojson",
      data: "data/starts2021.geojson",
    },
    paint: {
      "circle-color": "#50C878",
      "circle-stroke-color": "#ffffff",
      "circle-stroke-width": 0.2,
      "circle-opacity": 0.5,
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "number_of_trips"],
        10,
        2,
        14500,
        20,
      ],
    },
  });
});

// Create the popup
map2021.on("click", "starts2021", function (e) {
  let trips_number = e.features[0].properties.number_of_trips;
  let stationName = e.features[0].properties.start_station_name;
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h4>" +
        stationName +
        "</hr>" +
        "<br>" +
        "<p>" +
        trips_number +
        " trip starts" +
        "</p>"
    )
    .addTo(map2021);
});
// Change the cursor to a pointer when the mouse is over the turnstileData layer.
map2021.on("mouseenter", "starts2021", function () {
  map2021.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map2021.on("mouseleave", "starts2021", function () {
  map2021.getCanvas().style.cursor = "";
});

// STOP MAPS
mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJlZW5hLWFyb3JhIiwiYSI6ImNsM3U4bXk5NzI5bGIzZ211MmJmMzNpOWkifQ.vVgiB_-ozFDEiI9ERgrq2w";
var stop2020 = new mapboxgl.Map({
  container: "stops2020",
  style: "mapbox://styles/areena-arora/cl4bpgcic001115mzcxycrbe3",
  zoom: 10.5,
  center: [-73.96, 40.76],
  maxZoom: 15,
  minZoom: 8,
  maxBounds: [
    [-74.45, 40.45],
    [-73.55, 41],
  ],
});

stop2020.on("load", function () {
  stop2020.addLayer({
    id: "stop2020",
    type: "circle",
    source: {
      type: "geojson",
      data: "data/stops2020.geojson",
    },
    paint: {
      "circle-color": "#EE4B2B",
      "circle-stroke-color": "#ffffff",
      "circle-stroke-width": 0.2,
      "circle-opacity": 0.5,
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "number_of_trips"],
        10,
        2,
        14000,
        20,
      ],
    },
  });
});

// Create the popup
stop2020.on("click", "stop2020", function (e) {
  let trips_number = e.features[0].properties.number_of_trips;
  let stationName = e.features[0].properties["end station name"];
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h4>" +
        stationName +
        "</hr>" +
        "<br>" +
        "<p>" +
        trips_number +
        " trip stops" +
        "</p>"
    )
    .addTo(stop2020);
});
// Change the cursor to a pointer when the mouse is over the turnstileData layer.
stop2020.on("mouseenter", "stop2020", function () {
  stop2020.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
stop2020.on("mouseleave", "stop2020", function () {
  stop2020.getCanvas().style.cursor = "";
});

// NEW STOP MAP: 2021
mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJlZW5hLWFyb3JhIiwiYSI6ImNsM3U4bXk5NzI5bGIzZ211MmJmMzNpOWkifQ.vVgiB_-ozFDEiI9ERgrq2w";
var stop2021 = new mapboxgl.Map({
  container: "stops2021",
  style: "mapbox://styles/areena-arora/cl4bpgcic001115mzcxycrbe3",
  zoom: 10.5,
  center: [-73.96, 40.76],
  maxZoom: 15,
  minZoom: 8,
  maxBounds: [
    [-74.45, 40.45],
    [-73.55, 41],
  ],
});

stop2021.on("load", function () {
  stop2021.addLayer({
    id: "stop2021",
    type: "circle",
    source: {
      type: "geojson",
      data: "data/stops2021.geojson",
    },
    paint: {
      "circle-color": "#EE4B2B",
      "circle-stroke-color": "#ffffff",
      "circle-stroke-width": 0.2,
      "circle-opacity": 0.5,
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["get", "number_of_trips"],
        10,
        2,
        14000,
        20,
      ],
    },
  });
});

// Create the popup
stop2021.on("click", "stop2021", function (e) {
  let trips_number = e.features[0].properties.number_of_trips;
  let stationName = e.features[0].properties.end_station_name;
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h4>" +
        stationName +
        "</hr>" +
        "<br>" +
        "<p>" +
        trips_number +
        " trip stops" +
        "</p>"
    )
    .addTo(stop2021);
});
// Change the cursor to a pointer when the mouse is over the turnstileData layer.
stop2021.on("mouseenter", "stop2021", function () {
  stop2021.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
stop2021.on("mouseleave", "stop2021", function () {
  stop2021.getCanvas().style.cursor = "";
});