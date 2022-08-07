mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJlZW5hLWFyb3JhIiwiYSI6ImNsM3U4bXk5NzI5bGIzZ211MmJmMzNpOWkifQ.vVgiB_-ozFDEiI9ERgrq2w";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/areena-arora/cl4evq6ks004g15myyhrsmd7y",
  zoom: 9,
  center: [-73.88, 40.73],
  maxZoom: 20,
  minZoom: 6,
  maxBounds: [
    [-74.45, 40.45],
    [-73.55, 41],
  ],
});


  map.on('load', function () {
  
    map.addLayer({
        'id': 'green-projects',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': "data/DEP-Green-Infrastructure.geojson",
        },
        'paint': {
            'circle-color': '#4CBB17',
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 0.2,
            'circle-radius': 5,
            'circle-opacity': 0.6,
        }
    });
    // 'complaints',
});




  