import React from "react";
import { motion } from "framer-motion";
import { FaHandsHelping, FaLeaf, FaSmile, FaUsers } from "react-icons/fa";

const UniqueSection: React.FC = () => {
  const activities = [
    {
      icon: <FaHandsHelping className="text-5xl text-yellow-500" />,
      title: "Community Volunteering",
      desc: "Join hands with local heroes to help those in need.",
    },
    {
      icon: <FaLeaf className="text-5xl text-green-500" />,
      title: "Tree Planting",
      desc: "We make the city greener — one tree at a time.",
    },
    {
      icon: <FaSmile className="text-5xl text-pink-500" />,
      title: "Child Support",
      desc: "Organizing events and education for underprivileged children.",
    },
    {
      icon: <FaUsers className="text-5xl text-blue-500" />,
      title: "Youth Empowerment",
      desc: "Developing leadership skills through workshops and fun activities.",
    },
  ];

  const counters = [
    { number: "10+", label: "Events Completed" },
    { number: "250+", label: "Volunteers" },
    { number: "10+", label: "Communities Impacted" },
    { number: "100%", label: "Love & Passion" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Mission Section */}
      <section className="text-center py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-emerald-50 to-white">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-emerald-700 mb-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Together, We Make a Difference 🌍
        </motion.h2>
        <motion.p
          className="max-w-3xl mx-auto text-gray-700 text-base sm:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Our mission is to build a community where helping others is part of
          everyday life — from organizing charity drives to creating clean,
          green neighborhoods.
        </motion.p>
      </section>

      {/* Featured Activities */}
      <section className="py-16 bg-white px-4 sm:px-6 md:px-8">
        <h3 className="text-center text-2xl sm:text-3xl md:text-3xl font-semibold mb-10 text-emerald-700">
          Featured Activities
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {activities.map((item, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h4 className="text-lg sm:text-xl font-bold mb-2 text-emerald-700">
                {item.title}
              </h4>
              <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Impact Counter Section */}
      <section className="bg-emerald-700 text-white py-16 text-center">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {counters.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-2">
                {item.number}
              </h3>
              <p className="text-emerald-100 text-sm sm:text-base">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Join Us Call to Action */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-emerald-400 text-center text-white px-4 sm:px-6 md:px-8">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Be a Part of the Change 💪
        </motion.h2>
        <p className="text-base sm:text-lg max-w-2xl mx-auto mb-8">
          Whether it’s donating, volunteering, or spreading awareness — your
          contribution matters. Let’s make our community stronger together.
        </p>
        <button className="bg-white text-emerald-700 font-semibold py-3 px-6 rounded-full hover:bg-emerald-100 transition text-sm sm:text-base">
          Join Us Today
        </button>
      </section>
    </div>
  );
};

export default UniqueSection;
