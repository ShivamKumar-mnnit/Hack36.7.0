import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "./constant";

export default function LocationTracker() {
  // Define yellowIcon here
  const yellowIcon = L.icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

  function LocationMarker({ position }) {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.flyTo(position, 18);
        const circle = L.circle(position, {
          radius: position.accuracy * 100,
          color: "red",
          fillOpacity: 0.1,
        });
        circle.addTo(map);
      }
    }, [map, position]);

    return position ? (
      <Marker position={position} icon={icon}>
        <Popup>
          You are here. <br /> Your coordinate is: Lat: {position.lat}, Long:{" "}
          {position.lng} <br /> Accuracy: {position.accuracy}
        </Popup>
      </Marker>
    ) : null;
  }

  const [currentPosition, setCurrentPosition] = useState(null);
  const yellowMarkers = [
    { lat: 25.436249, lng: 81.846519 }, // Example coordinates   ,
    { lat: 25.39904, lng: 81.874863 }, // Add more coordinates as needed   25.399040, 81.874863
    { lat: 25.42477, lng: 81.830254 }, // Example coordinates   ,25.424770, 81.830254
    { lat: 25.39904, lng: 81.874863 },
    { lat: 25.385101, lng: 81.874222 }, // Example coordinates   ,25.385101, 81.874222
    { lat: 25.390005, lng: 81.877296 }, //25.390005, 81.877296
    { lat: 25.402531, lng: 81.869354 }, // Example coordinates 25.402531, 81.869354  ,
    { lat: 25.494101, lng: 81.870712 }, //25.494101, 81.870712
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          console.log("Latitude:", latitude); // Log latitude
          console.log("Longitude:", longitude); // Log longitude
          setCurrentPosition({ lat: latitude, lng: longitude, accuracy });
        },
        (error) => {
          console.error("Error getting current position:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <MapContainer
      center={[49.1951, 16.6068]}
      zoom={13}
      scrollWheelZoom
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {yellowMarkers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.lat, marker.lng]}
          icon={yellowIcon}
        >
          <Popup>
            Yellow Marker {index + 1} <br /> Lat: {marker.lat}, Long:{" "}
            {marker.lng}
          </Popup>
        </Marker>
      ))}
      <LocationMarker position={currentPosition} />
    </MapContainer>
  );
}