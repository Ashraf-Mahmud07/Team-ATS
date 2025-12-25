import React from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  { id: 1, title: "Community Program", desc: "Helping local people with social work.", img: slide1, longDesc: "This program focuses on supporting vulnerable groups, organizing workshops, and building community resilience. We collaborate with local leaders to ensure sustainable impact." },
  { id: 2, title: "Tree Plantation", desc: "We care for the environment and nature.", img: slide2, longDesc: "Our plantation drives involve schools, volunteers, and NGOs. We plant thousands of trees annually to combat climate change and promote biodiversity." },
  { id: 3, title: "Education Support", desc: "Providing educational help to students.", img: slide3, longDesc: "We provide scholarships, free books, and mentoring sessions to underprivileged students. Education is the foundation of a brighter future." },
  { id: 4, title: "Clean City Project", desc: "Keeping our city clean and green.", img: slide4, longDesc: "Our volunteers organize cleaning drives, awareness campaigns, and recycling initiatives to promote a cleaner environment." },
  { id: 5, title: "Blood Donation Camp", desc: "Regular donation events for health aid.", img: slide5, longDesc: "We arrange blood donation camps with hospitals and NGOs. Hundreds of lives are saved each year thanks to our donors." },
  { id: 6, title: "Youth Empowerment", desc: "Encouraging young people to lead change.", img: slide6, longDesc: "We train young leaders through workshops, seminars, and community projects. Empowered youth are the key to sustainable development." },
];

const ActivityDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const activity = activities.find((act) => act.id === Number(id));
  if (!activity) return <div className="p-8 text-center">Activity not found</div>;

  return (
    <div className="min-h-screen bg-emerald-50 p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-3 py-1 bg-yellow-400 text-black rounded-md text-sm hover:bg-yellow-500 transition"
      >
        ← Back
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <img src={activity.img} alt={activity.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-emerald-700 mb-4">{activity.title}</h1>
          <p className="text-gray-700 text-lg">{activity.desc}</p>
          <p className="mt-4 text-gray-500">{activity.longDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;

