import React from 'react';
import car1 from './assets/car1.jpg';
import car3 from './assets/car3.jpg';
import car4 from './assets/car4.jpg';
import car5 from './assets/car5.jpg';

const Cars = () => {
  const boxes = document.querySelectorAll('.flex-1 > div');
  let selectedBox = null;

  boxes.forEach((box) => {
    box.addEventListener('click', () => {
      // Remove the inline styles from the previously selected box
      if (selectedBox) {
        selectedBox.style.removeProperty('border');
        selectedBox.style.removeProperty('box-shadow');
      }

      // Add the inline styles to the clicked box
      box.style.border = '4px solid #333333';
      box.style.boxShadow = '0 0 10px rgba(51, 51, 51, 0.5)';
      selectedBox = box;
    });
  });
  return (
    <div class="flex flex-col md:flex-row justify-center items-center h-screen">
    <div class="flex md:flex-row">
      <div class="flex-1 p-4">
        <div id="car-box" class="bg-blue-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <img src={car1} alt="Car" class="w-full h-48 object-cover rounded-t-lg" />
          <h2 class="text-2xl font-bold mb-4">Car</h2>
          <p>This is a car box.</p>
        </div>
      </div>
      <div class="flex-1 p-4">
        <div id="truck-box" class="bg-blue-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <img src={car3} alt="Truck" class="w-full h-48 object-cover rounded-t-lg" />
          <h2 class="text-2xl font-bold mb-4">Truck</h2>
          <p>This is a truck box.</p>
        </div>
      </div>
    </div>
    <div class="flex md:flex-row">
      <div class="flex-1 p-4">
        <div id="suv-box" class="bg-green-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <img src={car4} alt="SUV" class="w-full h-48 object-cover rounded-t-lg" />
          <h2 class="text-2xl font-bold mb-4">SUV</h2>
          <p>This is an SUV box.</p>
        </div>
      </div>
      <div class="flex-1 p-4">
        <div id="bike-box" class="bg-yellow-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <img src={car5} alt="Bike" class="w-full h-48 object-cover rounded-t-lg" />
          <h2 class="text-2xl font-bold mb-4">Bike</h2>
          <p>This is a bike box.</p>
        </div>
      </div>
    </div>
  </div>
    
  );
};

export default Cars;