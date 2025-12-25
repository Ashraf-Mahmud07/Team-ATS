import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const [activeBars, setActiveBars] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    presentAddress: "",
    permanentAddress: "",
    profession: "",
    bloodGroup: "",
    facebook: "",
    instagram: "",
  });

  // Animated Bars
  const numBars = 50;
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBars((prev) => prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert("⚠️ Please fill required fields!");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        let val = value as string;
        if (
          (key === "facebook" || key === "instagram") &&
          val &&
          !/^https?:\/\//i.test(val)
        ) {
          val = "https://" + val;
        }
        formData.append(key, val);
      });
      if (image) formData.append("image", image);

      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.data));
      alert("✅ Profile created!");
      navigate("/about");
    } catch (err: any) {
      alert(err.response?.data?.message || "❌ Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white overflow-hidden p-4">

      {/* Rotating Bars Background */}
      <div className="relative w-[250px] h-[250px] sm:w-[340px] sm:h-[340px]">
        <div className="absolute w-full h-full animate-[spin_20s_linear_infinite]">
          {[...Array(numBars)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-1.5 h-7 sm:w-2 sm:h-9 rounded-lg top-0 left-1/2 origin-[center_125px] sm:origin-[center_170px]
                transition-all duration-300
                ${activeBars % numBars === i ||
                  (activeBars - 8) % numBars === i
                  ? "bg-gradient-to-b from-[#044039] to-[#026f4b] shadow-[0_0_15px_rgba(4,64,57,0.8)] sm:shadow-[0_0_20px_rgba(4,64,57,0.8)]"
                  : "bg-gray-300"
                }
              `}
              style={{
                transform: `rotate(${(360 / numBars) * i}deg) translateY(-125px)`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* FORM CARD */}
      <div className="absolute z-10 bg-white p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

        <h2 className="text-center text-[#044039] mb-6 sm:mb-8 text-2xl sm:text-3xl font-semibold tracking-[1px] sm:tracking-[2px] uppercase">
          Create Profile
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">

          {/* Dynamic Fields */}
          {[
            { name: "name", placeholder: "Full Name" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "phone", placeholder: "Phone" },
            { name: "password", placeholder: "Password", type: "password" },
            { name: "presentAddress", placeholder: "Present Address" },
            { name: "permanentAddress", placeholder: "Permanent Address" },
            { name: "profession", placeholder: "Profession" },
          ].map((f) => (
            <input
              key={f.name}
              name={f.name}
              type={f.type || "text"}
              placeholder={f.placeholder}
              value={(form as any)[f.name]}
              onChange={handleChange}
              required={["name", "email", "password"].includes(f.name)}
              className="w-full px-4 py-2 sm:py-3 bg-gray-100 border border-gray-300 rounded-full text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#044039] focus:shadow-[0_0_10px_rgba(4,64,57,0.3)] sm:focus:shadow-[0_0_15px_rgba(4,64,57,0.3)] transition text-sm sm:text-base"
            />
          ))}

          {/* Blood Group */}
          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            className="w-full px-4 py-2 sm:py-3 bg-gray-100 border border-gray-300 rounded-full text-gray-900 outline-none focus:border-[#044039] focus:shadow-[0_0_10px_rgba(4,64,57,0.3)] sm:focus:shadow-[0_0_15px_rgba(4,64,57,0.3)] text-sm sm:text-base"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((g) => (
              <option value={g} key={g}>
                {g}
              </option>
            ))}
          </select>

          {/* Social Links */}
          <input
            name="facebook"
            placeholder="Facebook Profile Link"
            value={form.facebook}
            onChange={handleChange}
            className="w-full px-4 py-2 sm:py-3 bg-gray-100 border border-gray-300 rounded-full text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#044039] text-sm sm:text-base"
          />
          <input
            name="instagram"
            placeholder="Instagram Profile Link"
            value={form.instagram}
            onChange={handleChange}
            className="w-full px-4 py-2 sm:py-3 bg-gray-100 border border-gray-300 rounded-full text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#044039] text-sm sm:text-base"
          />

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full px-4 py-2 sm:py-3 bg-gray-100 border border-gray-300 rounded-full text-gray-900 cursor-pointer text-sm sm:text-base"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 sm:py-3 bg-gradient-to-r from-[#044039] to-[#026f4b] text-white text-base sm:text-lg font-semibold rounded-full uppercase tracking-wide transition hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(4,64,57,0.3)] sm:hover:shadow-[0_10px_30px_rgba(4,64,57,0.5)]"
          >
            {loading ? "Processing..." : "Create Profile"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
