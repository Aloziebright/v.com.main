// Global variables
let map;
let marker;
let userLocation = null;

// Initialize the map
function initMap() {
    // Create a default map centered on world
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: { lat: 0, lng: 0 },
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
    });
    
    // Add event listener for the locate button
    document.getElementById('locate-btn').addEventListener('click', getUserLocation);
    
    // Add event listener for the share button
    document.getElementById('share-btn').addEventListener('click', shareLocation);
}

// Get user's current location
function getUserLocation() {
    const statusElement = document.getElementById('status');
    statusElement.style.display = 'block';
    statusElement.textContent = 'Locating...';
    statusElement.className = 'status';
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // Success callback
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const accuracy = position.coords.accuracy;
                
                // Update the UI with coordinates
                document.getElementById('latitude').textContent = lat.toFixed(6);
                document.getElementById('longitude').textContent = lng.toFixed(6);
                document.getElementById('accuracy').textContent = `${Math.round(accuracy)} meters`;
                
                // Store the location
                userLocation = { lat, lng };
                
                // Update the map
                updateMap(lat, lng, accuracy);
                
                // Show success message
                statusElement.textContent = 'Location found successfully!';
                statusElement.className = 'status success';
            },
            // Error callback
            function(error) {
                let errorMessage = 'Unknown error occurred.';
                
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location access was denied. Please allow location access and try again.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'The request to get your location timed out.';
                        break;
                }
                
                statusElement.textContent = errorMessage;
                statusElement.className = 'status error';
            },
            // Options
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    } else {
        statusElement.textContent = 'Geolocation is not supported by this browser.';
        statusElement.className = 'status error';
    }
}

// Update the map with the user's location
function updateMap(lat, lng, accuracy) {
    // Create a new position object
    const position = { lat, lng };
    
    // Center the map on the user's location
    map.setCenter(position);
    map.setZoom(15);
    
    // Remove existing marker if it exists
    if (marker) {
        marker.setMap(null);
    }
    
    // Add a new marker at the user's location
    marker = new google.maps.Marker({
        position: position,
        map: map,
        title: 'Your Location',
        animation: google.maps.Animation.DROP
    });
    
    // Add a circle to show accuracy
    const circle = new google.maps.Circle({
        strokeColor: '#4285F4',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#4285F4',
        fillOpacity: 0.15,
        map: map,
        center: position,
        radius: accuracy
    });
}

// Share location function
function shareLocation() {
    if (!userLocation) {
        const statusElement = document.getElementById('status');
        statusElement.style.display = 'block';
        statusElement.textContent = 'Please find your location first.';
        statusElement.className = 'status error';
        return;
    }
    
    const lat = userLocation.lat;
    const lng = userLocation.lng;
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    const text = `My current location: ${lat.toFixed(6)}, ${lng.toFixed(6)}\nView on Google Maps: ${mapsUrl}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Location',
            text: text
        })
        .then(() => {
            const statusElement = document.getElementById('status');
            statusElement.style.display = 'block';
            statusElement.textContent = 'Location shared successfully!';
            statusElement.className = 'status success';
        })
        .catch((error) => {
            console.error('Error sharing:', error);
            fallbackShare(text);
        });
    } else {
        fallbackShare(text);
    }
}

// Fallback for browsers that don't support Web Share API
function fallbackShare(text) {
    // Copy to clipboard
    navigator.clipboard.writeText(text)
        .then(() => {
            const statusElement = document.getElementById('status');
            statusElement.style.display = 'block';
            statusElement.textContent = 'Location copied to clipboard!';
            statusElement.className = 'status success';
        })
        .catch(() => {
            // If clipboard fails, show the text in an alert
            alert(`Share this location:\n\n${text}`);
        });
}