import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "./constant";

export default function LocationTracker() {

  const [latitude,setLatitude]=useState();
  const [longitude,setLongitude]=useState();
  const [add,setAdd]=useState();


  let apiKey = "ccfd0bf34b6e4e9aaef2073a924aa6f6"
  // let apiKey = "4b9dc8e995d343d8a0bcfa6e4979defa"
  let apiEndpoint = "https://api.opencagedata.com/geocode/v1/json"

const getUserCurrAdd = async(lat,lon)=>{
    let query = `${lat},${lon}`;
    let apiUrl = `${apiEndpoint}?key=${apiKey}&q=${query}&pretty=1`

    try{
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data.results.formatted);
      setAdd(data.results[0].formatted);
    }catch(error){
      console.log(error);
    }

  }




  const HospitalIcon = L.icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

  const policeIcon = L.icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

  const ambulanceIcon = L.icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
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
        map.flyTo(position, 12);
        const circle = L.circle(position, {
          radius: position.accuracy *7,
          color: "red",
          fillOpacity: 0.1,
        });
        circle.addTo(map);
      }
    }, [map, position]);

    return position ? (
      <Marker position={position} icon={icon}>
        <Popup>
          {add} <br /> Your coordinate is: Lat: {position.lat}, Long:{" "}
          {position.lng} <br /> Accuracy: {position.accuracy}
        </Popup>
      </Marker>
    ) : null;
  }


  const [currentPosition, setCurrentPosition] = useState(null);

  const yellowMarkers = [
    // for hospitals
    { lat: 25.436249, lng: 81.846519 },
    { lat: 25.39904, lng: 81.874863 },
    { lat: 25.42477, lng: 81.830254 },
    { lat: 25.39904, lng: 81.874863 },
    { lat: 25.385101, lng: 81.874222 },
    { lat: 25.390005, lng: 81.877296 },
    { lat: 25.402531, lng: 81.869354 },
    { lat: 25.494101, lng: 81.870712 },
    { lat: 25.385101, lng: 81.874222 },
    { lat: 25.390005, lng: 81.877296 },
    { lat: 25.402531, lng: 81.869354 },
    { lat: 25.494101, lng: 81.870712 },
  ];

  const blueMarkers = [
    // for police stations
    { lat: 25.437249, lng: 81.847519 },
    { lat: 25.39804, lng: 81.875863 },
    { lat: 25.42377, lng: 81.831254 },
    { lat: 25.39704, lng: 81.875863 },
    { lat: 25.386101, lng: 81.875222 },
    { lat: 25.391005, lng: 81.878296 },
    { lat: 25.403531, lng: 81.870354 },
    { lat: 25.495101, lng: 81.871712 },
  ];

  const redMarkers = [
    // for ambulances
    { lat: 25.438249, lng: 81.848519 },
    { lat: 25.39704, lng: 81.876863 },
    { lat: 25.42277, lng: 81.832254 },
    { lat: 25.39504, lng: 81.876863 },
    { lat: 25.387101, lng: 81.876222 },
    { lat: 25.392005, lng: 81.879296 },
    { lat: 25.404531, lng: 81.871354 },
    { lat: 25.496101, lng: 81.872712 },
  ];



  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          console.log("Latitude:", latitude); // Log latitude
          console.log("Longitude:", longitude); // Log longitude
          setCurrentPosition({ lat: latitude, lng: longitude, accuracy });
          getUserCurrAdd(position.coords.latitude,position.coords.longitude);
        },
        (error) => {
          console.error("Error getting current position:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  
  console.log(add);

 

  return (
    <>
      <MapContainer
        center={[25.436249, 81.846519]} // Center the map around a specific location
        zoom={14} // Adjust the initial zoom level as needed
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
            icon={HospitalIcon}
          >
            <Popup>
              Hospital Marker {index + 1} <br /> Lat: {marker.lat}, Long:{" "}
              {marker.lng}
            </Popup>
          </Marker>
        ))}
        {blueMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.lat, marker.lng]}
            icon={policeIcon}
          >
            <Popup>
              Police Station Marker {index + 1} <br /> Lat: {marker.lat}, Long:{" "}
              {marker.lng}
            </Popup>
          </Marker>
        ))}
        {redMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.lat, marker.lng]}
            icon={ambulanceIcon}
          >
            <Popup>
              Ambulance Marker {index + 1} <br /> Lat: {marker.lat}, Long:{" "}
              {marker.lng}
            </Popup>
          </Marker>
        ))}
        <LocationMarker position={currentPosition} />
      </MapContainer>
    </>
  );
}