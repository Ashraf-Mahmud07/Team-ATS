import React, { useState } from "react";
import { FiPhone, FiMapPin, FiMail } from "react-icons/fi";

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      alert("Please fill all fields.");
      return;
    }

    alert("Message sent successfully!");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  // ✅ Coordinates of Daganbhuiyan, Feni
  const lat = 22.9372;
  const lng = 91.3027;

  // Google Maps link for clickable overlay
  const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 pt-28">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#044039]">
        Contact Us
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT: Contact Form */}
        <div className="flex-1">
          <div className="bg-[#044039] rounded-2xl shadow-xl p-6">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 rounded"
              />
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded"
              />
              <input
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="p-2 rounded"
              />
              <textarea
                rows={5}
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="p-2 rounded"
              />
              <button className="bg-yellow-400 py-2 rounded font-semibold">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT: Map + Contact Info */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Map iframe */}
          <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
            <iframe
              title="Daganbhuiyan, Feni Map"
              src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>

            {/* Clickable overlay */}
            <div
              onClick={() => window.open(mapLink, "_blank")}
              className="absolute inset-0 cursor-pointer bg-transparent"
            />
          </div>

          {/* Contact Info */}
          <div className="bg-[#044039] rounded-2xl shadow-xl p-4 text-white space-y-2">
            <p className="flex items-center gap-2">
              <FiPhone /> +880 1828-738521
            </p>

            <p className="flex items-center gap-2">
              <FiMapPin />
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Daganbhuiyan, Feni, Bangladesh
              </a>
            </p>

            <p className="flex items-center gap-2">
              <FiMail /> Atatuk16@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
