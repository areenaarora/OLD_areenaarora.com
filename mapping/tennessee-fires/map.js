mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJlZW5hLWFyb3JhIiwiYSI6ImNsM3U4bXk5NzI5bGIzZ211MmJmMzNpOWkifQ.vVgiB_-ozFDEiI9ERgrq2w";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/areena-arora/cl4yi8n6v000p14nvwb35apdl",
  projection: "mercator",
  zoom: 6,
  center: [-86.1, 35.9],
  maxZoom: 10,
  minZoom: 5,
});

map.on("load", function () {
    map.addLayer({
      id: "outline",
      type: "line",
      source: {
        type: "geojson",
        data: "data/TNData.geojson",
      },
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.7,
      },
    });
    map.addLayer({
      id: "wildfire",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/TNData.geojson",
      },
      paint: {
        "fill-color": [
          "match",
          ["get", "naturalBreaks"],
          "39% - 51%", "#F8CDAA",
          "51% - 64%", "#FAB184",
          "64% - 86%", "#F8936D",
          "86% - 93%", "#EF7860",
          "93% - 100%", "#E35B5B",
          "#ffffff",
        ],
        "fill-outline-color": "#ffffff",
      },
    });
  });

  // Popup
map.on("click", "wildfire", function (e) {
    let county_name = e.features[0].properties["NAME_x"];
    let exposed = e.features[0].properties["Total fraction of HUs directly or indirectly exposed"];
    exposed = (exposed * 100).toFixed(0);
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        "<h4>" +
        county_name +
          "</hr>" +
          "<br>" +
          "<p>" +
          exposed +
          "% of housing units exposed to wildfire" +
          "</p>"
      )
      .addTo(map);
  });
  // Change the cursor to a pointer when the mouse is over the turnstileData layer.
  map.on("mouseenter", "wildfire", function () {
    map.getCanvas().style.cursor = "pointer";
  });
  // Change it back to a pointer when it leaves.
  map.on("mouseleave", "wildfire", function () {
    map.getCanvas().style.cursor = "";
  });