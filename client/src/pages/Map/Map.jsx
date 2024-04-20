import React, { useState } from 'react'


const Map = () => {
  // console.log(navigator.geolocation.getCurrentPosition);
  
  const [latitude,setLatitude]=useState();
  const [longitude,setLongitude]=useState();
  const [add,setAdd]=useState();


  let apiKey = "f855a34a61f440a3a7e42eabb768d186"
  let apiEndpoint = "https://api.opencagedata.com/geocode/v1/json"

const getUserCurrAdd = async(lat,lon)=>{
    let query = `${lat},${lon}`;
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
            setLatitude(positon.coords.latitude);
            setLongitude(positon.coords.longitude);
            getUserCurrAdd(positon.coords.latitude,positon.coords.longitude);
            
        },(error)=>{
          console.log(error.message);
        })
      }
  }

if(!latitude || !longitude){
  return <>loading...</>
}

  return (
    <div>
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


    </div>
  )
}

export default Map
