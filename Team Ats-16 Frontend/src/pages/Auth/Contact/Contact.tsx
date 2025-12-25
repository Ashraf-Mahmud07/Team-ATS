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

    console.log({ name, email, subject, message });
    alert("Message sent successfully!");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 pt-28">
      {/* kept pt-28 so content sits below fixed navbar */}

      <h2 className="text-3xl font-bold text-center mb-8 text-[#044039]">
        Contact Us
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side - Form */}
        <div className="flex-1">
          <div className="bg-[#044039] shadow-xl rounded-2xl p-6 md:p-8">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-green-300 p-2 rounded-lg bg-white text-[#044039] placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-green-300 p-2 rounded-lg bg-white text-[#044039] placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border border-green-300 p-2 rounded-lg bg-white text-[#044039] placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <textarea
                rows={5}
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border border-green-300 p-2 rounded-lg bg-white text-[#044039] placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded-lg shadow transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Map */}
          <div className="h-64 w-full rounded-2xl overflow-hidden shadow-xl">
            <iframe
              title="Ataturk School Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.283027755943!2d91.36051581500376!3d23.106184484577853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0e2b8058b9d%3A0x5b862a6b4cfdd4e3!2sAtaturk%20Government%20Model%20High%20School%2C%20Daganbhuiyan%2C%20Feni%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1697300000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* Contact Info */}
          <div className="bg-[#044039] rounded-2xl shadow-xl p-4 flex flex-col gap-2">
            <h3 className="text-xl font-semibold mb-2 text-white">
              Our Contact Info
            </h3>

            <p className="text-green-200 flex items-center gap-2">
              <FiPhone className="text-yellow-400" />
              <a
                href="tel:+8801828738521"
                className="text-yellow-300 hover:underline"
              >
                01828738521
              </a>
            </p>

            <p className="text-green-200 flex items-center gap-2">
              <FiMapPin className="text-yellow-400" />
              <a
                href="https://www.google.com/maps/place/Ataturk+Government+Model+High+School,+Daganbhuiyan,+Feni,+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 hover:underline"
              >
                Atatürk Government Model High School, Daganbhuiyan, Feni
              </a>
            </p>

            <p className="text-green-200 flex items-center gap-2">
              <FiMail className="text-yellow-400" />
              <a
                href="mailto:Atatuk16@gmail.com"
                className="text-yellow-300 hover:underline"
              >
                Atatuk16@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
