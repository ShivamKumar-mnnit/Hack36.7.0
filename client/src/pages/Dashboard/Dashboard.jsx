import React from 'react';
import Mapp from '../Map2/LocationTracker';
import '../../styles/Userdash.css';
import Noteitem from '../../components/Notes/NoteItem';
import AddNote from '../../components/Notes/AddNote';

// import Mapp from '../Map/Mapp';

// import { GoDotFill } from 'react-icons/go';
import Notes from './../../components/Notes/Notes';

const Dashboard = () => {

 
  // if(!latitude || !longitude){
  //   return <>loading...</>
  // }


  return (
    <div className="mt-10">
        {/* <div className="flex flex-col"> */}

            <div className="m-1 justify-center" >
                <h1 className='map'>Your current Locations</h1>

            {/* <div class="flex flex-col md:flex-row justify-center ">
    <div class="flex md:flex-row">
      <div class="flex-1 p-4"> */}



     <Mapp/>  
      

      {/* </div>
    </div>
  </div> */}

  
                </div>


            <div className="m-1">

            <div class="flex flex-col md:flex-row justify-center h-screen">
    <div class="flex md:flex-row">
      <div class="flex-1 p-4">
        <div id="car-box" class="bg-blue-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
         
          <h2 class="text-2xl font-bold mb-4">Call to Doctor</h2>
          {/* <p>This is a car box.</p> */}
        </div>
      </div>
      <div class="flex-1 p-4">
        <div id="truck-box" class="bg-blue-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          
          <h2 class="text-2xl font-bold mb-4">Call to Ambulance</h2>
          {/* <p>This is a truck box.</p> */}
        </div>
      </div>
    </div>
    <div class="flex md:flex-row">
      <div class="flex-1 p-4">
        <div id="suv-box" class="bg-green-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          
          <h2 class="text-2xl font-bold mb-4">Call to Police</h2>
          {/* <p>This is an SUV box.</p> */}
        </div>
      </div>
      <div class="flex-1 p-4">
        <div id="bike-box" class="bg-yellow-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          
          <h2 class="text-2xl font-bold mb-4">Call to Family</h2>
          {/* <p>This is a bike box.</p> */}
        </div>
        
      </div>
    </div>
  </div>
  



            </div>
        {/* </div> */}
    </div>
  )
}

export default Dashboard