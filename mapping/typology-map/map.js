mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJlZW5hLWFyb3JhIiwiYSI6ImNsM3U4bXk5NzI5bGIzZ211MmJmMzNpOWkifQ.vVgiB_-ozFDEiI9ERgrq2w";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/areena-arora/cl3ugxu1u003614jzkj9maigu",
  zoom: 2.5,
  maxZoom: 9,
  minZoom: 3,
  center: [-97.5, 40],
});

mmap.on("load", function () {
    map.addLayer({
      id: "county_typology_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "data/countyTypologyCodes.geojson",
      },
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.3,
      },
    }, "waterway-label");
  
    map.addLayer(
      {
        id: "county_typology",
        type: "fill",
        source: {
          type: "geojson",
          data: "data/countyTypologyCodes.geojson",
        },
        minzoom: 3,
        paint: {
          "fill-color": [
            "match",
            ["get", "Economic_Type_Label"],
            "Nonspecialized",
            "#ab9191",
            "Maufacturing",
            "#6193c7",
            "Farming",
            "#229c38",
            "Federal/State Government",
            "#f8c347",
            "Recreation",
            "#c771ba",
            "Mining",
            "#76e3de",
            "#ffffff",
          ],
        },
      },
      "county_typology_outline"
    );
    
  })