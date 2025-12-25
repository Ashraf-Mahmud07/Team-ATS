import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

import slide1 from "../../../assets/slider1.jpg";
import slide2 from "../../../assets/slider2.jpg";
import slide3 from "../../../assets/slider3.jpg";
import slide4 from "../../../assets/slider4.jpg";
import slide5 from "../../../assets/slider5.jpg";
import slide6 from "../../../assets/slider6.jpg";

const MySwiper: React.FC = () => {
  const navigate = useNavigate();

  const slides = [
    { id: 1, img: slide1, title: "Community Program", desc: "Helping local people with social work." },
    { id: 2, img: slide2, title: "Tree Plantation", desc: "We care for the environment and nature." },
    { id: 3, img: slide3, title: "Education Support", desc: "Providing educational help to students." },
    { id: 4, img: slide4, title: "Clean City Project", desc: "Keeping our city clean and green." },
    { id: 5, img: slide5, title: "Blood Donation Camp", desc: "Regular donation events for health aid." },
    { id: 6, img: slide6, title: "Youth Empowerment", desc: "Encouraging young people to lead change." },
  ];

  return (
    <div className="mt-12 mb-16 px-4 sm:px-6 md:px-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-emerald-700 mb-6">
        Our Recent Activities
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 25 },
        }}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full h-48 sm:h-52 md:h-56 lg:h-60 overflow-hidden rounded-xl shadow-md">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="text-center mt-3 px-1">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                {slide.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">{slide.desc}</p>
              <button
                onClick={() => navigate(`/activities?activityId=${slide.id}`)}
                className="mt-2 px-3 sm:px-4 py-1.5 bg-yellow-400 text-black text-xs sm:text-sm font-medium rounded-lg hover:bg-yellow-500 transition"
              >
                See Details
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MySwiper;
