const map = L.map('map').setView([0, 0], 2);

// Add OpenStreetMap tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

// URL to fetch the sightings data
const dataUrl = 'https://raw.githubusercontent.com/CraigTheSpaceBum/SatanTracker/main/data.json';

// Fetch sightings data and update the map
fetch(dataUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Update the current location display
    if (data.currentLocation) {
      document.getElementById('current-location').textContent = `Current Location: ${data.currentLocation}`;
    }

    // Add all sightings to the map
    data.sightings.forEach(sighting => {
      L.marker([sighting.lat, sighting.lng])
        .addTo(map)
        .bindPopup(`<b>${sighting.location}</b><br>${sighting.description}`);
    });
  })
  .catch(error => {
    console.error('Error fetching sightings data:', error);
    document.getElementById('current-location').textContent = 'Error loading current location.';
  });
