import React, { useState } from "react";

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
  longDesc: string;
}

const activities: Activity[] = [
  {
    id: 1,
    title: "Community Program",
    desc: "Helping local people with social work.",
    img: slide1,
    longDesc:
      "This program focuses on supporting vulnerable groups, organizing workshops, and building community resilience. We collaborate with local leaders to ensure sustainable impact.",
  },
  {
    id: 2,
    title: "Tree Plantation",
    desc: "We care for the environment and nature.",
    img: slide2,
    longDesc:
      "Our plantation drives involve schools, volunteers, and NGOs. We plant thousands of trees annually to combat climate change and promote biodiversity.",
  },
  {
    id: 3,
    title: "Education Support",
    desc: "Providing educational help to students.",
    img: slide3,
    longDesc:
      "We provide scholarships, free books, and mentoring sessions to underprivileged students. Education is the foundation of a brighter future.",
  },
  {
    id: 4,
    title: "Clean City Project",
    desc: "Keeping our city clean and green.",
    img: slide4,
    longDesc:
      "Our volunteers organize cleaning drives, awareness campaigns, and recycling initiatives to promote a cleaner environment.",
  },
  {
    id: 5,
    title: "Blood Donation Camp",
    desc: "Regular donation events for health aid.",
    img: slide5,
    longDesc:
      "We arrange blood donation camps with hospitals and NGOs. Hundreds of lives are saved each year thanks to our donors.",
  },
  {
    id: 6,
    title: "Youth Empowerment",
    desc: "Encouraging young people to lead change.",
    img: slide6,
    longDesc:
      "We train young leaders through workshops, seminars, and community projects. Empowered youth are the key to sustainable development.",
  },
];

const ActivitiesPage: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showAll, setShowAll] = useState(false);

  const gridActivities = showAll ? activities : activities.slice(0, 3);

  return (
    <div className="min-h-screen bg-emerald-50 p-8">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center">Activities</h1>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {gridActivities.map((act) => (
          <div
            key={act.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <img src={act.img} alt={act.title} className="w-full h-40 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-emerald-600">{act.title}</h3>
              <p className="text-sm text-gray-600 flex-grow">{act.desc}</p>
              <button
                onClick={() => setSelectedActivity(act)}
                className="mt-2 px-3 py-1 bg-yellow-400 text-black rounded-md text-xs font-medium hover:bg-yellow-500 transition self-start"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      {!showAll && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
          >
            See More
          </button>
        </div>
      )}

      {/* Selected Activity Detail Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-8 relative">
            <button
              onClick={() => setSelectedActivity(null)}
              className="absolute top-5 right-5 text-gray-500 hover:text-black text-2xl font-bold"
            >
              ×
            </button>
            <img
              src={selectedActivity.img}
              alt={selectedActivity.title}
              className="w-full h-96 object-cover rounded-xl mb-6"
            />
            <h2 className="text-4xl font-bold text-emerald-700 mb-4">{selectedActivity.title}</h2>
            <p className="text-lg text-gray-700 mb-4">{selectedActivity.desc}</p>
            <p className="text-gray-600 text-lg">{selectedActivity.longDesc}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitiesPage;
