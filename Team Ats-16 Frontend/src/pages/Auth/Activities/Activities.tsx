import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Sparkles, Leaf, BookOpen, Droplet, Users } from "lucide-react";

import slide1 from "../../../assets/slider1.jpg";
import slide2 from "../../../assets/slider2.jpg";
import slide3 from "../../../assets/slider3.jpg";
import slide4 from "../../../assets/slider4.jpg";
import slide5 from "../../../assets/slider5.jpg";
import slide6 from "../../../assets/slider6.jpg";

interface Activity {
  id: number;
  title: string;
  desc: string;
  img: string;
  category: string;
  icon: JSX.Element;
}

const activities: Activity[] = [
  {
    id: 1,
    title: "Community Program",
    desc: "Helping local people with social work and awareness campaigns.",
    img: slide1,
    category: "Social",
    icon: <Users className="text-emerald-500" size={22} />,
  },
  {
    id: 2,
    title: "Tree Plantation",
    desc: "We care for the environment and nature — join our green mission!",
    img: slide2,
    category: "Environment",
    icon: <Leaf className="text-green-600" size={22} />,
  },
  {
    id: 3,
    title: "Education Support",
    desc: "Providing educational help to students who need guidance.",
    img: slide3,
    category: "Education",
    icon: <BookOpen className="text-yellow-600" size={22} />,
  },
  {
    id: 4,
    title: "Clean City Project",
    desc: "Keeping our city clean and beautiful with monthly drives.",
    img: slide4,
    category: "Environment",
    icon: <Sparkles className="text-blue-500" size={22} />,
  },
  {
    id: 5,
    title: "Blood Donation Camp",
    desc: "Regular blood donation events for saving lives.",
    img: slide5,
    category: "Health",
    icon: <Droplet className="text-red-500" size={22} />,
  },
  {
    id: 6,
    title: "Youth Empowerment",
    desc: "Encouraging young people to lead change and inspire others.",
    img: slide6,
    category: "Youth",
    icon: <Heart className="text-pink-500" size={22} />,
  },
];

const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredActivities = activities.filter((act) => {
    const matchesCategory = filter === "All" || act.category === filter;
    const matchesSearch = act.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    "All",
    ...Array.from(new Set(activities.map((a) => a.category))),
  ];

  // Highlight one random “Activity of the Month”
  const featured = activities[Math.floor(Math.random() * activities.length)];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-emerald-50 via-yellow-50 to-white p-8 overflow-hidden pt-32">
      {/* Floating glowing background orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-40 animate-pulse" />

      <div className="text-center relative z-10">
        <h1 className="text-4xl font-bold text-emerald-700 mb-2">
          Our Activities
        </h1>
        <p className="text-gray-600 mb-8 text-sm">
          Explore how we’re creating impact together 🌱
        </p>
      </div>

      {/* Featured Activity */}
      <motion.div
        className="max-w-5xl mx-auto mb-12 p-6 bg-gradient-to-r from-yellow-100 via-emerald-100 to-yellow-50 rounded-2xl shadow-md relative z-10 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-3 right-4 bg-yellow-400 text-white px-3 py-1 text-xs rounded-full font-semibold">
          🌟 Activity of the Month
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <motion.img
            src={featured.img}
            alt={featured.title}
            className="w-full md:w-1/2 rounded-xl shadow-md object-cover"
            whileHover={{ scale: 1.05 }}
          />
          <div>
            <h2 className="text-2xl font-bold text-emerald-800 mb-2 flex items-center gap-2">
              {featured.icon}
              {featured.title}
            </h2>
            <p className="text-gray-700 mb-3">{featured.desc}</p>
            <button
              onClick={() => navigate(`/activities/${featured.id}`)}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition"
            >
              Join Now →
            </button>
          </div>
        </div>
      </motion.div>

      {/* Search + Category Filter */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mb-8 relative z-10">
        <input
          type="text"
          placeholder="🔍 Search activities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none transition"
        />
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${filter === cat
                  ? "bg-emerald-500 text-white"
                  : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
        {filteredActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-transparent hover:border-emerald-200"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ rotateY: 8 }}
          >
            <div className="relative h-48 overflow-hidden">
              <motion.img
                src={activity.img}
                alt={activity.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <span className="absolute bottom-2 left-2 bg-white/80 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full">
                {activity.category}
              </span>
            </div>

            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-emerald-800 flex justify-center items-center gap-2 mb-2">
                {activity.icon}
                {activity.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{activity.desc}</p>

              <button
                onClick={() => navigate(`/activities/${activity.id}`)}
                className="px-4 py-1.5 bg-yellow-400 text-black text-sm font-medium rounded-lg hover:bg-yellow-500 transition"
              >
                See More →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-sm">
          No activities found.
        </p>
      )}
    </div>
  );
};

export default ActivitiesPage;
