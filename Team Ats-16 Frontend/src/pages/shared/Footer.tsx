import React from "react";
import atsLogo from "../../assets/received_1719270768907207.jpeg.jpg";

const Footer: React.FC = () => {
  return (
    <footer className="relative text-white font-semibold mt-auto">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[#044039] opacity-95"></div>

      <svg
        className="absolute bottom-0 w-full h-24 sm:h-32 md:h-36 lg:h-40"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="rgba(255,255,255,0.05)"
          d="M0,224L48,213.3C96,203,192,181,288,160C384,139,480,117,576,128C672,139,768,181,864,208C960,235,1056,245,1152,229.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>

      {/* MAIN CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10
        flex flex-row flex-wrap justify-center items-center text-center gap-8
        md:flex-row md:justify-between md:items-center md:text-left md:gap-0">

        {/* LOGO + DESCRIPTION */}
        <div className="flex flex-col items-center md:items-start space-y-3 md:w-1/3">
          <div className="flex items-center space-x-3">
            <img
              src={atsLogo}
              alt="ATS Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-full border-2 border-yellow-400"
            />
            <h2 className="text-lg sm:text-xl text-yellow-400 font-semibold">
              TEAM ATS 16
            </h2>
          </div>

          <p className="text-gray-200 text-sm sm:text-base leading-relaxed max-w-xs md:max-w-none">
            Team ATS 16 – A group of friends passionate about social activism,
            making a positive difference together.
          </p>
        </div>

        {/* FOOTER LINKS */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 md:w-2/3">
          <div>
            <h3 className="text-white mb-2 font-semibold">Menu</h3>
            <ul className="space-y-1 text-sm sm:text-base text-gray-200">
              <li><a href="#" className="hover:text-yellow-400">About Us</a></li>
              <li><a href="#" className="hover:text-yellow-400">Projects</a></li>
              <li><a href="#" className="hover:text-yellow-400">Gallery</a></li>
              <li><a href="#" className="hover:text-yellow-400">Blogs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-2 font-semibold">Connect</h3>
            <ul className="space-y-1 text-sm sm:text-base text-gray-200">
              <li><a href="#" className="hover:text-yellow-400">Regular Donor</a></li>
              <li><a href="#" className="hover:text-yellow-400">Lifetime Donor</a></li>
              <li><a href="#" className="hover:text-yellow-400">Volunteer</a></li>
              <li><a href="#" className="hover:text-yellow-400">Career</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-2 font-semibold">Others</h3>
            <ul className="space-y-1 text-sm sm:text-base text-gray-200">
              <li><a href="#" className="hover:text-yellow-400">Contact</a></li>
              <li><a href="#" className="hover:text-yellow-400">Terms of Condition</a></li>
              <li><a href="#" className="hover:text-yellow-400">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative border-t border-gray-700 py-4 text-center text-sm sm:text-base text-gray-300">
        © {new Date().getFullYear()} TEAM ATS 16. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
