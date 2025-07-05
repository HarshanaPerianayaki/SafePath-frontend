// frontend/src/MapComponent.jsx
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import axios from 'axios';

const libraries = ['places'];
const mapContainerStyle = { width: '100%', height: '500px' };
const center = { lat: 12.9716, lng: 77.5946 }; // Bangalore

export default function MapComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    libraries,
  });

  const [dangerZones, setDangerZones] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/danger-zones")
      .then(res => setDangerZones(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap zoom={12} center={center} mapContainerStyle={mapContainerStyle}>
      {dangerZones.map((zone, idx) => (
        <Marker
          key={idx}
          position={{ lat: zone.location.lat, lng: zone.location.lng }}
          label="⚠️"
        />
      ))}
    </GoogleMap>
  );
}
