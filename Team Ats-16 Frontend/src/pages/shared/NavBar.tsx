import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "/src/assets/received_1719270768907207.jpeg.jpg";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setHasProfile(!!user);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about" },
    { name: "Activities", to: "/activities" },
    { name: "Notice", to: "/notice" },
    { name: "Contact", to: "/contact" },
    
  ];

  if (!hasProfile) {
    navItems.push({ name: "Create Profile", to: "/login" });
  }

  const goToDonation = () => {
    if (window.location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        const element = document.getElementById("donation");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      const element = document.getElementById("donation");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#044039] z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <div
            onClick={() => {
              setMenuOpen(false); // always close menu first
              if (window.location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
              }
            }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="h-12 w-12 rounded-full flex items-center justify-center overflow-hidden bg-yellow-200">
              <img
                src={logo}
                alt="TEAM ATS-16 Logo"
                className="h-10 w-10 object-cover rounded-full"
              />
            </div>
            <div className="leading-tight">
              <h1 className="text-lg font-bold tracking-wide text-yellow-400">
                TEAM ATS-16
              </h1>
              <p className="text-xs text-green-100 italic">
                For the Betterment of Today and Tomorrow
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-green-50 hover:text-yellow-400 font-medium"
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={goToDonation}
              className="ml-3 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold shadow-sm hover:bg-yellow-300 transition"
            >
              Donate
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white z-50 focus:outline-none"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden w-full bg-[#044039] border-t border-[#022926] shadow-md transition-max-h duration-300 overflow-hidden ${menuOpen ? "max-h-96" : "max-h-0"
          }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className="block px-4 py-3 text-sm text-green-50 hover:bg-[#022926]"
            onClick={() => setMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
        <button
          onClick={goToDonation}
          className="block w-full text-left px-4 py-3 text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-300"
        >
          Donate
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
