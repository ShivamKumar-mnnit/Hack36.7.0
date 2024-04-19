import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "./constant";

export default function LocationTracker() {

  const [add,setAdd]=useState();
  let apiKey = "f855a34a61f440a3a7e42eabb768d186"
  let apiEndpoint = "https://api.opencagedata.com/geocode/v1/json"

const getUserCurrAdd = async(lat,lng)=>{
    let query = `${lat},${lng}`;
    let apiUrl = `${apiEndpoint}?key=${apiKey}&q=${query}&pretty=1`

    try{
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data.results[0].formatted);
      setAdd(data.results[0].formatted);
    }catch(error){
      console.log(error);
    }

  }



  function LocationMarker({ position }) {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.flyTo(position, 18);
        const circle = L.circle(position, {
          radius:  20,
          color: "red",
          fillOpacity: 0.1,
        });
        circle.addTo(map);

        // Fetch additional location details using Google Maps Geocoding API
        const apiKey = ""; // Replace with your actual API key
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${apiKey}`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.results.length > 0) {
              const result = data.results[0];
              // console.log(result);
              const formattedAddress = result.formatted_address;
              const addressComponents = result.address_components;

              // Extract specific address details
              const city = addressComponents.find((component) =>
                component.types.includes("locality")
              )?.long_name;
              const postalCode = addressComponents.find((component) =>
                component.types.includes("postal_code")
              )?.long_name;

              console.log("Address Details:");
              console.log("Formatted Address:", formattedAddress);
              console.log("City:", city);
              console.log("Postal Code:", postalCode);
              console.log("Latitude:", position.lat);
              console.log("Longitude:", position.lng);
              getUserCurrAdd(position.lat,position.lng);
              console.log(add);
            } else {
              console.log("No address details found.");
            }
          })
          .catch((error) => {
            console.error("Error fetching address details:", error);
          });
      }
    }, [map, position]);



   


    return position ? (
      <Marker position={position} icon={icon}>

        <Popup>
          You are at {add} <br /> Your coordinate is: Lat: {position.lat}, Long:{" "}
          {position.lng} <br /> Accuracy: {position.accuracy}
        </Popup>

      </Marker>
    ) : null;
  }

  const [currentPosition, setCurrentPosition] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          console.log("Latitude:", latitude); // Log latitude
          console.log("Longitude:", longitude); // Log longitude
          getUserCurrAdd(latitude,longitude);
          console.log(add);
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
      style={{ height: "70vh" }}
    >
      <TileLayer
        attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={currentPosition} />
    </MapContainer>
  );
}
