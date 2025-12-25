import axios from "axios";
import React, { useEffect, useState } from "react";
import { Facebook, Instagram } from "lucide-react";

interface User {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  presentAddress?: string;
  permanentAddress?: string;
  profession?: string;
  bloodGroup?: string;
  image?: string;
  facebook?: string;
  instagram?: string;
  createdAt?: string;
}

const AboutUs: React.FC = () => {
  const [profiles, setProfiles] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        const sorted = res.data.data.sort(
          (a: User, b: User) =>
            new Date(a.createdAt || "").getTime() -
            new Date(b.createdAt || "").getTime()
        );
        setProfiles(sorted);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <section className="min-h-screen bg-white py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Heading in dark green */}
        <h2 className="text-5xl font-extrabold mb-6 tracking-tight text-[#044039]">
          Meet Our Team
        </h2>

        <p className="text-lg text-gray-700 mb-14 max-w-3xl mx-auto">
          <span className="font-semibold text-[#044039]">TEAM ATS-16</span> is
          a passionate group working for social development and a brighter
          future.
        </p>

        {profiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {profiles.map((p) => {
              const fbLink =
                p.facebook && !/^https?:\/\//i.test(p.facebook)
                  ? `https://${p.facebook}`
                  : p.facebook || "https://www.facebook.com/imrul.islam.39501/";

              const instaLink =
                p.instagram && !/^https?:\/\//i.test(p.instagram)
                  ? `https://${p.instagram}`
                  : p.instagram || "https://www.instagram.com/imrul_br0/";

              return (
                <div
                  key={p._id}
                  className="bg-white rounded-lg shadow border overflow-hidden flex flex-col items-center text-center"
                >
                  {/* TOP DARK GREEN AREA */}
                  <div className="bg-[#044039] w-full h-44 flex justify-center items-center">
                    <img
                      src={
                        p.image ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt={p.name}
                      className="h-36 w-36 object-cover rounded-md"
                    />
                  </div>

                  {/* NAME + PROFESSION */}
                  <div className="mt-4">
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    {p.profession && (
                      <p className="text-gray-600 text-sm mt-1">{p.profession}</p>
                    )}
                  </div>

                  {/* ORIGINAL INFO */}
                  <div className="mt-4 grid grid-cols-1 gap-2 text-gray-700 text-sm text-left px-4 w-full">
                    <p className="flex items-center gap-2">📧 {p.email}</p>
                    <p className="flex items-center gap-2">📱 {p.phone}</p>

                    {p.presentAddress && (
                      <p className="flex items-center gap-2">🏠 {p.presentAddress}</p>
                    )}

                    {p.permanentAddress && (
                      <p className="flex items-center gap-2">🌍 {p.permanentAddress}</p>
                    )}

                    {p.bloodGroup && (
                      <p className="flex items-center gap-2">🩸 {p.bloodGroup}</p>
                    )}
                  </div>

                  {/* SOCIAL ICONS */}
                  <div className="border-t w-full px-4 py-3 flex justify-center gap-6 mt-4">
                    <a
                      href={fbLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Facebook size={24} />
                    </a>

                    <a
                      href={instaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-800 transition"
                    >
                      <Instagram size={24} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-700">No profiles found.</p>
        )}
      </div>
    </section>
  );
};

export default AboutUs;
