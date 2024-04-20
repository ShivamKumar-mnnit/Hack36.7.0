import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Define the array of safety tips
const safetyTips = [
  { id: 1, tip: "Always wear a helmet when riding a bicycle or motorcycle." },
  { id: 2, tip: "Keep a first aid kit in your home and car." },
  {
    id: 3,
    tip: "Install smoke detectors and carbon monoxide detectors in your home.",
  },
  { id: 4, tip: "Avoid texting or using your phone while driving." },
  { id: 5, tip: "Use sunscreen to protect your skin from harmful UV rays." },
  {
    id: 6,
    tip:
      "Keep a safe distance from wild animals, especially if they seem agitated.",
  },
  {
    id: 7,
    tip: "Stay hydrated, especially during hot weather or physical activity.",
  },
  {
    id: 8,
    tip:
      "Always read and follow the instructions when using power tools or machinery.",
  },
  {
    id: 9,
    tip:
      "Keep emergency contact numbers handy, such as for poison control and local hospitals.",
  },
  {
    id: 10,
    tip: "Practice good ergonomics to prevent repetitive strain injuries.",
  },
  {
    id: 11,
    tip:
      "Inspect playground equipment for safety hazards before allowing children to play.",
  },
  {
    id: 12,
    tip: "Secure heavy furniture and appliances to prevent tipping accidents.",
  },
  {
    id: 13,
    tip:
      "Store cleaning products and chemicals out of reach of children and pets.",
  },
  {
    id: 14,
    tip:
      "Wear protective gear, such as goggles and gloves, when working with hazardous materials.",
  },
  {
    id: 15,
    tip: "Use caution when walking on wet or slippery surfaces to avoid falls.",
  },
  {
    id: 16,
    tip:
      "Inspect electrical cords and outlets regularly for signs of damage or wear.",
  },
  {
    id: 17,
    tip:
      "Teach children how to swim and supervise them around water at all times.",
  },
  {
    id: 18,
    tip:
      "Take regular breaks and stretch when sitting or standing for long periods.",
  },
  {
    id: 19,
    tip:
      "Keep a flashlight and spare batteries in your home and car for emergencies.",
  },
  {
    id: 20,
    tip:
      "Dispose of expired medications properly to prevent accidental ingestion.",
  },
];
function Hero() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [blink, setBlink] = useState(true);

  // Function to switch to the next safety tip
  const showNextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % safetyTips.length);
  };

  useEffect(() => {
    // Set interval to switch between safety tips every 5 seconds
    const interval = setInterval(() => {
      showNextTip();
    }, 5000);

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  useEffect(() => {
    // Toggle blinking effect every time safety tip changes
    const blinkInterval = setInterval(() => {
      setBlink((prevBlink) => !prevBlink);
    }, 500);

    // Clear blink interval when component unmounts or when the tip changes
    return () => clearInterval(blinkInterval);
  }, [currentTipIndex]);

  return (
    <main className="container mt-4 md:flex flex-row-reverse justify-between items-center">
      <div className="md:max-w-[50%]">
        <img src="./images/amico.svg" alt="hero" />
      </div>

      <div className="text-center sm:text-left md:max-w-[40%]">
        <h1 className="font-bold text-4xl leading-[60px]">Road Safety Tips</h1>
        {/* Display current safety tip with blinking effect */}
        <p
          className={`mt-4 text-[18px] leading-[28px] font-normal ${
            blink ? "opacity-0" : "opacity-100"
          }`}
        >
          {safetyTips[currentTipIndex].tip}
        </p>
        <div className="mt-8 flex items-center justify-between sm:justify-start sm:space-x-8">
          {/* Container for "Get Started" button */}
          <div>
            <Link to="/register" className="primary-button">
              Get Started
            </Link>
          </div>
          {/* Container for "Watch the Video" button */}
          <div>
            <Link
              to="/watch-video"
              className="font-semibold text-primary whitespace-nowrap flex items-center underline hover:scale-110 active:scale-95 duration-200 cursor-pointer"
            >
              Watch the Video
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
