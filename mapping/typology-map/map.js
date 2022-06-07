mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJlZW5hLWFyb3JhIiwiYSI6ImNsM3U4bXk5NzI5bGIzZ211MmJmMzNpOWkifQ.vVgiB_-ozFDEiI9ERgrq2w";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/areena-arora/cl43fks6m001c14qj9dqz03dw",
  zoom: 6.5,
  center: [-85.5, 37.7],
});
map.on("load", function () {
  map.addLayer(
    {
      id: "us_typology",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/map_typology.geojson",
      },
      paint: {
        "fill-color": "#cccccc",
        "fill-outline-color": "#000000",
      },
    },
    "county_typology"
  );

  map.addLayer(
    {
      id: "county_typology",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/map_typology.geojson",
      },
      paint: {
        "fill-color": [
          "match",
          ["get", "dominant_sector"],
          "Farming", "#ab9191",
          "Federal/State Government", "#6193c7",
          "Manufacturing", "#229c38",
          "Mining", "#f8c347",
          "Nonspecialized", "#c771ba",
          "Recreation", "#76e3de",
        ],
        "fill-outline-color": "#ffffff",
      },
    },
    "us_typology"
  );
});