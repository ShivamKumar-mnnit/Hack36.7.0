import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Benefits from './Benefits';
import OurExperts from './OurExperts';
import Blogs from './Blogs';
import PriceTable from './PriceTable';
import Testimonials from './Testimonials';
import BottomCTA from './BottomCTA';
import useFetch from '../../hooks/fetch.hook';
import { useNavigate } from 'react-router-dom';
import MyChatBot from './Reactchatbot';

const Homepage = () => {
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();

  // if(!apiData)return<>loading...</>

  // console.log(apiData?.role);
  // if(apiData?.role===1){
  //   navigate('/adminpage')
  // }

  return (
    <div>
      <style>
        {`
          .homepage-container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .chatbot-container {
            margin-top: 20px; /* Adjust margin as needed */
          }

          @media (max-width: 768px) {
            .homepage-container {
              padding: 0 20px; /* Adjust padding as needed */
            }
          }
        `}
      </style>
      <Header />
      <Hero />
      <Features />
      <Benefits />
      <OurExperts />
      <Testimonials />
      <BottomCTA />
      <div className="chatbot-container">
        <MyChatBot />
      </div>
    </div>
  );
};

export default Homepage;
