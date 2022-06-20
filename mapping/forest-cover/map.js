mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJlZW5hLWFyb3JhIiwiYSI6ImNsM3U4bXk5NzI5bGIzZ211MmJmMzNpOWkifQ.vVgiB_-ozFDEiI9ERgrq2w";

var map = new mapboxgl.Map({
  container: "map-1990",
  style: "mapbox://styles/areena-arora/cl3ugxu1u003614jzkj9maigu",
  projection: "naturalEarth",
  zoom: 0.8,
  maxZoom: 9,
  minZoom: 0.2,
  center: [0, 0],
});
map.on("load", function () {
  map.addLayer({
    id: "forest-data-1990",
    type: "fill",
    source: {
      type: "geojson",
      data: "/data/countriesClimate.geojson",
    },
    paint: {
      "fill-color": [
        "match",
        ["get", "RATING_1990"],
        "A",
        "#ffffe5",
        "B",
        "#f7fcb9",
        "C",
        "#d9f0a3",
        "D",
        "#addd8e",
        "E",
        "#78c679",
        "F",
        "#41ab5d",
        "G",
        "#238443",
        "H",
        "#006837",
        "I",
        "#004529",
        "J",
        "#00441b",
        "O",
        "#FFFFFF",
        "S",
        "#fee391",
        "#000000",
      ],
      "fill-outline-color": "#000000",
    },
  });
});
// Popup
map.on("click", "map", function (e) {
  let country_name = e.features[0].properties["Country Name"];
  let pct_1990 = e.features[0].properties["RATING_1990"];
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h4>" +
        country_name +
        "</hr>" +
        "<br>" +
        "<p>" +
        pct_1990 +
        " percentage of land area covered by forest" +
        "</p>"
    )
    .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the turnstileData layer.
map.on("mouseenter", "map-1990", function () {
  map.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map.on("mouseleave", "map-1990", function () {
  map.getCanvas().style.cursor = "";
});
//
// SECOND MAP
//
var map_2020 = new mapboxgl.Map({
  container: "map-2020",
  style: "mapbox://styles/areena-arora/cl3ugxu1u003614jzkj9maigu",
  projection: "naturalEarth",
  zoom: 0.8,
  maxZoom: 9,
  minZoom: 0.2,
  center: [0, 0],
});
map_2020.on("load", function () {
  map_2020.addLayer({
    id: "forest-data-2020",
    type: "fill",
    source: {
      type: "geojson",
      data: "/data/countriesClimate.geojson",
    },
    paint: {
      "fill-color": [
        "match",
        ["get", "RATING_1990"],
        "A",
        "#ffffe5",
        "B",
        "#f7fcb9",
        "C",
        "#d9f0a3",
        "D",
        "#addd8e",
        "E",
        "#78c679",
        "F",
        "#41ab5d",
        "G",
        "#238443",
        "H",
        "#006837",
        "I",
        "#004529",
        "J",
        "#00441b",
        // no data
        "O",
        //
        "#FFFFFF",
        "S",
        "#fee391",
        "#000000",
      ],
      "fill-outline-color": "#000000",
    },
  });
});
