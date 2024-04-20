import React, { useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMap,Popup } from 'react-leaflet'
// import osm from "./osm-providers";
// import Geolocation from './Geolocation';
import icon from './icon.png'

import L, { marker } from "leaflet";

import "leaflet/dist/leaflet.css"; 


const markerIcon = new L.Icon({
    iconUrl:icon, 
    iconSize:[45,45],
    iconAnchor: [17,46],
    popupAnchor: [0,-46]
})

const Mapp = () => {

  const [location,setLocation]= useState({
    loaded:false,
    coordinates:{lat:"",lng:""}
});

   const [center,setCenter]= useState({lat: 25.4956256, lng: 81.8572574});
   const Zoom_level = 9;
   const mapref = useRef();



  //  const [latitude,setLatitude]=useState(13);
  // const [longitude,setLongitude]=useState(80);
  const [add,setAdd]=useState();
  let apiKey = "f855a34a61f440a3a7e42eabb768d186"
  let apiEndpoint = "https://api.opencagedata.com/geocode/v1/json"

const getUserCurrAdd = async(lat,lng)=>{
    let query = `${lat},${lng}`;
    let apiUrl = `${apiEndpoint}?key=${apiKey}&q=${query}&pretty=1`

    try{
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data.results[0].components);
      setAdd(data.results[0].components);
    }catch(error){
      console.log(error);
    }

  }

  console.log(add);
  
  function getlocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((positon)=>{
          console.log(positon.coords.latitude);
          setLocation({
            loaded:true,
            coordinates:{
                lat:location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
          setCenter({ lat: latitude, lng: longitude });
          getUserCurrAdd(positon.coords.latitude,positon.coords.longitude);
          
      },(error)=>{
        console.log(error.message);
      })
    }
}

// console.log(latitude);

// if(!latitude || !longitude)return <>loading...</>




  return (
    <div className='row'>


{/* <div>
      <button onClick={getlocation}>show location</button>
      <br />
  lat    
{
  latitude?<>{latitude}</>:<>...</>
}
<br />
lon
{
  longitude?<>{longitude}</>:<>...</>
}


    </div> */}

       
        <div className="col text-center">
            {/* <h2>basic map</h2>
            <p>loadning map...</p> */}
            <div className="col">
            <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    <Marker position={[location.coordinates.lat,location.coordinates.lng]} icon={markerIcon}/>

    <Marker position={[25.5956256,81.8572574]} icon={markerIcon}/>
    {/* <Popup>
            <b>First map</b>
    </Popup> */}
  </MapContainer>
            </div>
        </div>
      
    </div>
  )
}

export default Mapp
