mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJlZW5hLWFyb3JhIiwiYSI6ImNsM3U4bXk5NzI5bGIzZ211MmJmMzNpOWkifQ.vVgiB_-ozFDEiI9ERgrq2w";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/areena-arora/cl43fks6m001c14qj9dqz03dw",
  zoom: 3.8,
  maxZoom: 10,
  minZoom: 3,
  center: [-97.5, 40],
});

map.on("load", function () {
  map.addLayer(
    {
      id: "county_typology_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "./data/map_typology.geojson",
      },
      paint: {
        "line-color": "#fff",
        "line-width": 0.5,
      },
    },
    "waterway-label"
  );
});

map.on("load", function () {
  map.addLayer(
    {
      id: "county_typology",
      type: "line",
      source: {
        type: "geojson",
        data: "./data/map_typology.geojson",
      },
      paint: {
        "line-color": "#fff",
        "line-width": 0.5,
      },
    },
    "waterway-label"
  );

  map.addLayer(
    {
      id: "details_typology",
      type: "fill",
      source: {
        type: "geojson",
        data: "./data/map_typology.geojson",
      },
      paint: {
        "fill-color": [
          "match",
          ["get", "Economic_Type_Label"],
          "Nonspecialized",
          "#e6f5c9",
          "Maufacturing",
          "#fdcdac",
          "Farming",
          "#b3e2cd",
          "Federal/State Government",
          "#f4cae4",
          "Recreation",
          "#cbd5e8",
          "Mining",
          "#fff2ae",
          "#ffffff",
        ],
      },
    },
    "county_typology"
  );
});
map.on("click", "details_typology", function (e) {
  var winner = e.features[0].properties.Winner;
  var wnrPerc = e.features[0].properties.WnrPerc;
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(winner + "<br>" + wnrPerc)
    .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the us_states_elections layer.
map.on("mouseenter", "details_typology", function () {
  map.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map.on("mouseleave", "details_typology", function () {
  map.getCanvas().style.cursor = "";
});

map.on("click", "details_typology", function (e) {
  var stateName = e.features[0].properties["STATE_NAME"];
  var countyName = e.features[0].properties["NAMELSAD"];
  var economicType = e.features[0].properties["Economic_Type_Label"];
  stateName = stateName.toUpperCase();
  countyName = countyName.toUpperCase();
  economicType = economicType.toUpperCase();
  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(countyName + "," + "<br>" + stateName + "<br>" + economicType)
    .addTo(map);
});
map.on("mouseenter", "details_typology", function () {
  map.getCanvas().style.cursor = "pointer";
});
map.on("mouseleave", "details_typology", function () {
  map.getCanvas().style.cursor = "";
});