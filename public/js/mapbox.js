/*eslint-disable*/
export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibWliYWxvOTc4NyIsImEiOiJjbTkyOTBxdWMwOHpiMmlxeml2dmJndXBtIn0.75SCnt7Sm13Czf0xLdSMCg';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mibalo9787/cm92d4x1l006q01qz2yxf6my5', // style URL
    scrollZoom: false
    // center: locations[0].coordinates, // starting position [lng, lat]
    // zoom: 9 // starting zoom
  });

  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach(loc => {
    // Create a marker
    const marker = document.createElement('div');
    marker.className = 'marker';

    // Add the
    new mapboxgl.Marker({
      element: marker,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //Add popup
    new mapboxgl.Popup({ offset: 30 })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day: ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    // Exntend the map bounds to include current the points
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 150,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
