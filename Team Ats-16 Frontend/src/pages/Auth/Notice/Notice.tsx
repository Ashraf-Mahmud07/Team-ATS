import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Volume2, Sparkles, Clock } from "lucide-react";

// Images
import notice1 from "../../../../src/assets/slider1.jpg";
import notice2 from "../../../../src/assets/slider2.jpg";
import notice3 from "../../../../src/assets/slider5.jpg";
import notice4 from "../../../../src/assets/slider6.jpg";

interface Notice {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  img?: string;
  link?: string;
}

const notices: Notice[] = [
  {
    id: 1,
    title: "Tree Plantation Event",
    description:
      "Join us this Saturday to plant trees in the city park and help green the community.",
    date: "2025-11-10",
    img: notice1,
    category: "Environment",
  },
  {
    id: 2,
    title: "Blood Donation Camp",
    description:
      "We are organizing a blood donation camp at the community center. Volunteers welcome!",
    date: "2025-11-15",
    img: notice2,
    link: "/activities/5",
    category: "Health",
  },
  {
    id: 3,
    title: "Youth Leadership Workshop",
    description:
      "Empower young leaders with our upcoming leadership workshop.",
    date: "2025-11-20",
    img: notice3,
    category: "Education",
  },
  {
    id: 4,
    title: "Community Clean-Up Drive",
    description:
      "Let's clean up our local park and streets. Join hands for a cleaner city.",
    date: "2025-11-25",
    img: notice4,
    category: "Community",
  },
];

const NoticePage: React.FC = () => {
  const navigate = useNavigate();
  const today = new Date();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const handleSpeak = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utter);
  };

  const filteredNotices = notices.filter((notice) => {
    const matchesCategory = filter === "All" || notice.category === filter;
    const matchesSearch =
      notice.title.toLowerCase().includes(search.toLowerCase()) ||
      notice.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    "All",
    ...Array.from(new Set(notices.map((n) => n.category))),
  ];

  const getDaysLeft = (dateStr: string) => {
    const date = new Date(dateStr);
    const diff = Math.ceil(
      (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff >= 0 ? diff : null;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-emerald-50 via-yellow-50 to-white py-12 px-6 pt-32 overflow-hidden">
      {/* Floating glowing circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>

      <div className="text-center mb-10 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-700 mb-4">
          Latest Notices & Announcements
        </h1>
        <p className="text-gray-600 text-sm">
          Stay updated with the latest activities and community events.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mb-8 relative z-10">
        <input
          type="text"
          placeholder="🔍 Search notices..."
          className="w-full md:w-1/2 p-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${filter === cat
                ? "bg-emerald-500 text-white"
                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                }`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notice Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {filteredNotices.map((notice, index) => {
          const dateObj = new Date(notice.date);
          const daysLeft = getDaysLeft(notice.date);
          const isUpcoming = daysLeft !== null && daysLeft <= 10;
          const isNew =
            (today.getTime() - dateObj.getTime()) / (1000 * 3600 * 24) < 3;

          return (
            <motion.div
              key={notice.id}
              className={`relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 border ${isUpcoming ? "border-emerald-300" : "border-transparent"
                }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {notice.img && (
                <motion.img
                  src={notice.img}
                  alt={notice.title}
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                />
              )}

              {isNew && (
                <span className="absolute top-3 right-3 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Sparkles size={12} /> New
                </span>
              )}

              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-emerald-800">
                    {notice.title}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                    {notice.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 text-sm">
                  {notice.description}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={14} />
                    {notice.date}
                  </div>

                  {daysLeft !== null && (
                    <div className="flex items-center gap-1 text-emerald-600">
                      <Clock size={14} />
                      {daysLeft === 0
                        ? "Today!"
                        : `${daysLeft} day${daysLeft > 1 ? "s" : ""} left`}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() =>
                      handleSpeak(`${notice.title}. ${notice.description}`)
                    }
                    className="text-emerald-500 hover:text-yellow-500 transition"
                    title="Read aloud"
                  >
                    <Volume2 size={16} />
                  </button>

                  {notice.link && (
                    <button
                      onClick={() => navigate(notice.link!)}
                      className="text-yellow-500 font-semibold hover:underline text-sm"
                    >
                      See More →
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredNotices.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-sm">
          No notices found matching your search.
        </p>
      )}
    </div>
  );
};

export default NoticePage;
