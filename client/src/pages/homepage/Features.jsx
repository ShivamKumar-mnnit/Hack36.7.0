import {
    ClockIcon,
    CursorClickIcon,
    HeartIcon,
    UsersIcon,
  } from "@heroicons/react/solid";
  import React from "react";
  import Feature from "./FeatureItem";
  
  function Features() {
    return (
      <section className="container mt-24 flex flex-col items-center">
        <h2 className="text-[32px] font-bold text-center sm:text-left">
          This  Product was Built Specifically for You
        </h2>
  
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
  
        <Feature
          Icon={CursorClickIcon}
          title="Accident Mapping Remotly"
          iconBgColor="#02897A"
          description=" Real Time Accident Mapping ."
        />
        <Feature
          Icon={UsersIcon}
          iconBgColor="#4D8DFF"
          title="Predicting Accident"
          description=". Pre-Analysis of Accident ."
        />
        <Feature
          Icon={HeartIcon}
          iconBgColor="#740A76"
          title="Closest helping services"
          description=". Fast access to closest helping services ."
        />
        <Feature
          Icon={ClockIcon}
          iconBgColor="#F03E3D"
          title="Live streaming "
          description=". Live streaming with Doctors"
        />
        </div>
  
        <button className="primary-button mt-14">Sign up Now</button>
  
      </section>
    );
  }
  
  export default Features;