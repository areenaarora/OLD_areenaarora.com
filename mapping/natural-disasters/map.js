mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJlZW5hLWFyb3JhIiwiYSI6ImNsM3U4bXk5NzI5bGIzZ211MmJmMzNpOWkifQ.vVgiB_-ozFDEiI9ERgrq2w";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  zoom: 3.5,
  center: [81.6, 23.5],
  maxZoom: 15,
  minZoom: 2,
});

map.on("load", function () {
  filterLayers("IN");
  function filterLayers(worldview) {
    // The "admin-0-boundary-disputed" layer shows boundaries
    // at this level that are known to be disputed.
    map.setFilter("admin-0-boundary-disputed", [
      "all",
      ["==", ["get", "disputed"], "true"],
      ["==", ["get", "admin_level"], 0],
      ["==", ["get", "maritime"], "false"],
      ["match", ["get", "worldview"], ["all", worldview], true, false],
    ]);
    // The "admin-0-boundary" layer shows all boundaries at
    // this level that are not disputed.
    map.setFilter("admin-0-boundary", [
      "all",
      ["==", ["get", "admin_level"], 0],
      ["==", ["get", "disputed"], "false"],
      ["==", ["get", "maritime"], "false"],
      ["match", ["get", "worldview"], ["all", worldview], true, false],
    ]);
    // The "admin-0-boundary-bg" layer helps features in both
    // "admin-0-boundary" and "admin-0-boundary-disputed" stand
    // out visually.
    map.setFilter("admin-0-boundary-bg", [
      "all",
      ["==", ["get", "admin_level"], 0],
      ["==", ["get", "maritime"], "false"],
      ["match", ["get", "worldview"], ["all", worldview], true, false],
    ]);
  }
  map.addLayer({
    id: "each_disaster",
    type: "circle",
    source: {
      type: "geojson",
      data: "data/india-disasters.geojson",
    },
    paint: {
      "circle-radius": ["*", ["sqrt", ["get", "total"]], 12],
      "circle-color": [
        "match",
        ["get", "disastertype"],
        "flood",
        "#4062bb",
        "storm",
        "#59c3c3",
        "extreme temperature ",
        "#F12323",
        "landslide",
        "#ebebeb",
        "drought",
        "#FCC772",
        "mass movement (dry)",
        "#52489c",
        "earthquake",
        "#C16D47",
        "#ffffff",
      ],
      "circle-opacity": 0.8,
      "circle-stroke-width": 0,
      "circle-stroke-color": "#ffffff",
    },
    maxzoom: 10,
  });
  map.on("click", "each_disaster", function (e) {
    var cityName = e.features[0].properties.geolocation;
    var stateName = e.features[0].properties.adm1;
    var year = e.features[0].properties.year;
    var disasterType = e.features[0].properties.disastertype;
    stateName = stateName.toUpperCase();
    cityName = cityName.toUpperCase();
    disasterType = disasterType.toUpperCase();
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        "<h4>" +
          cityName +
          ", " +
          stateName +
          "</h4>" +
          "<p>" +
          disasterType +
          "</p>" +
          "<p>" +
          year +
          "</p>"
      )
      .addTo(map);
  });
  map.on("mouseenter", "us_disaster_locations", function () {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "us_disaster_locations", function () {
    map.getCanvas().style.cursor = "";
  });
});
