import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import banner1 from "../../../assets/472985741_2117945025291327_1131473740927672519_n.jpg";
import banner2 from "../../../assets/482220644_2164917983927364_5223002019177975125_n.jpg";

const Banner: React.FC = () => {
  const banners = [banner1, banner2];
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[320px] sm:h-[400px] md:h-[520px] lg:h-[600px] text-white mb-20 md:mb-28 rounded-lg overflow-hidden shadow-xl">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {banners.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full flex items-center justify-center text-center"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: index === 1 ? "center 70%" : "center",
              }}
            >
              <div className="absolute inset-0 bg-black/40"></div>

              <div className="relative z-10 px-3 sm:px-6 md:px-10">
                <h1 className="text-xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 leading-snug">
                  Join Our Social Activities!
                </h1>
                <p className="text-sm sm:text-lg md:text-xl mb-4 sm:mb-6">
                  Together we can make a difference in our community
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
                  {/* Know More */}
                  <button
                    onClick={() => navigate("/notice")}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold
                               py-2 px-4 rounded-lg transition
                               text-sm sm:text-base
                               w-36 sm:w-40"
                  >
                    Know More
                  </button>

                  {/* All Activities */}
                  <button
                    onClick={() => navigate("/activities")}
                    className="bg-transparent border border-white hover:bg-white hover:text-black
                               text-white font-semibold
                               py-2 px-4 rounded-lg transition
                               text-sm sm:text-base
                               w-36 sm:w-40"
                  >
                    All Activities
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
