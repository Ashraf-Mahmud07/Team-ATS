import React from "react";
import Banner from "../Banner/Banner";
import DonationCard from "../Donation/Donation";
import MySwiper from "../Swiper/Swiper";
import UniqueSection from "../Unique/Unique";

const Home: React.FC = () => {
  return (
    <div>
      <Banner />
      <DonationCard />
      <MySwiper />
      <UniqueSection />
    </div>
  );
};

export default Home;
