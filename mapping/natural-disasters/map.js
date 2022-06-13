mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJlZW5hLWFyb3JhIiwiYSI6ImNsM3U4bXk5NzI5bGIzZ211MmJmMzNpOWkifQ.vVgiB_-ozFDEiI9ERgrq2w";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/areena-arora/cl44y9p4r000g14rw0lv2rigo",
  zoom: 3.5,
  center: [81.6, 23.5],
  maxZoom: 15,
  minZoom: 2,
});

map.on("load", function () {
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
          "<h2>" +
          disasterType +
          "</h2>" +
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