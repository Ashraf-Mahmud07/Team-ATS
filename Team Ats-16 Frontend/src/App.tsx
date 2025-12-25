import React from "react";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div className="relative bg-emerald-50">
      <Navbar />

      {/* Each section below has enough height to scroll */}
      <section
        id="home"
        className="h-screen flex items-center justify-center bg-emerald-100"
      >
        <h1 className="text-4xl font-bold text-emerald-900">
          Welcome to TEAM ATS-16
        </h1>
      </section>

      <section
        id="about"
        className="h-screen flex items-center justify-center bg-emerald-200"
      >
        <div className="max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-emerald-800 mb-4">
            About Us
          </h2>
          <p className="text-green-900">
            TEAM ATS-16 is a group of friends dedicated to social activities for
            community betterment.
          </p>
        </div>
      </section>

      <section
        id="activities"
        className="h-screen flex items-center justify-center bg-emerald-300"
      >
        <div className="max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-emerald-900 mb-4">
            Our Activities
          </h2>
          <p className="text-green-900">
            From charity to awareness campaigns — we aim to inspire change.
          </p>
        </div>
      </section>

      <section
        id="notice"
        className="h-screen flex items-center justify-center bg-emerald-400"
      >
        <div className="max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-emerald-900 mb-4">
            Notices
          </h2>
          <p className="text-green-900">
            Stay informed with our latest updates and announcements.
          </p>
        </div>
      </section>

      <section
        id="contact"
        className="h-screen flex items-center justify-center bg-emerald-500"
      >
        <div className="max-w-2xl text-center text-white">
          <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
          <p>Email: info@teamats16.com | Phone: +880123456789</p>
        </div>
      </section>

      <section
        id="login"
        className="h-screen flex items-center justify-center bg-emerald-600"
      >
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-emerald-900 mb-4 text-center">
            Login
          </h2>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="bg-emerald-800 text-white py-2 rounded hover:bg-emerald-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </section>

      <section
        id="donate"
        className="h-screen flex items-center justify-center bg-emerald-700"
      >
        <div className="max-w-md w-full bg-yellow-400 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Donate Now</h2>
          <p className="mb-4 text-black">
            Your contribution helps us continue our community work.
          </p>
          <button className="bg-black text-yellow-400 px-4 py-2 rounded hover:bg-gray-800 transition">
            Donate
          </button>
        </div>
      </section>
    </div>
  );
};

export default App;
