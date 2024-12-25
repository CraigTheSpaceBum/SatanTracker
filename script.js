const map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

// Fetch the sightings data from the GitHub repository
fetch('https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/branch/data.json')
  .then(response => response.json())
  .then(data => {
    if (data.currentLocation) {
      document.getElementById('current-location').textContent = `Current Location: ${data.currentLocation}`;
    }

    data.sightings.forEach(sighting => {
      L.marker([sighting.lat, sighting.lng])
        .addTo(map)
        .bindPopup(`<b>${sighting.location}</b><br>${sighting.description}`);
    });
  })
  .catch(error => console.error('Error fetching sightings data:', error));
