import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DonationCard: React.FC = () => {
  const [donationFund, setDonationFund] = useState("");
  const [contact, setContact] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentImage, setPaymentImage] = useState<File | null>(null);
  const [totalDonations, setTotalDonations] = useState(0);
  const [showPayment, setShowPayment] = useState(false);

  const PAYMENT_NUMBER = "01828738521";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!donationFund || !contact || !amount) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    navigator.clipboard.writeText(PAYMENT_NUMBER);
    setShowPayment(true);
  };

  const handlePaymentConfirm = () => {
    if (!transactionId && !paymentImage) {
      alert("Please enter Transaction ID or upload screenshot.");
      return;
    }

    const donationAmount = parseFloat(amount);
    setTotalDonations((prev) => prev + donationAmount);

    alert(`Donation Confirmed!`);

    setDonationFund("");
    setContact("");
    setAmount("");
    setTransactionId("");
    setPaymentImage(null);
    setShowPayment(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentImage(e.target.files[0]);
    }
  };

  return (
    <section
      id="donation"
      className="relative max-w-6xl mx-auto -mt-36 px-4 md:px-6 z-20"
    // Changed from -mt-28 to -mt-36 to move card slightly up
    >
      <div className="relative bg-[#044039] shadow-xl rounded-2xl p-5 sm:p-6 md:p-8 overflow-hidden">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-yellow-400">
          Make Your Donation
        </h2>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-yellow-400 text-sm">
              Donation Fund *
            </label>
            <select
              value={donationFund}
              onChange={(e) => setDonationFund(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select</option>
              <option value="Education Fund">Education Fund</option>
              <option value="Medical Aid">Medical Aid</option>
              <option value="Social Welfare">Social Welfare</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-yellow-400 text-sm">
              Phone / Email *
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Type mobile/email"
              className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-yellow-400 text-sm">
              Donation Amount *
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Write in number"
              className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-4 rounded-lg shadow transition"
            >
              Donate
            </button>
          </div>
        </form>

        {/* TOTAL */}
        <p className="text-center text-yellow-200 mt-4 font-semibold text-sm sm:text-base">
          Total Donations Collected:{" "}
          <span className="text-yellow-400">৳{totalDonations.toFixed(2)}</span>
        </p>

       
      </div>

      {/* POPUP */}
      <AnimatePresence>
        {showPayment && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#044039] rounded-2xl shadow-2xl p-5 w-full max-w-xs sm:max-w-sm text-center"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
            >
              <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-3">
                Complete Your Donation
              </h3>

              <p className="text-yellow-200 text-sm mb-3 leading-relaxed">
                Send money using <b>bKash</b> or <b>Nagad</b> to:
                <br />
                <span className="text-yellow-400 font-bold">{PAYMENT_NUMBER}</span>
              </p>

              <button
                onClick={() => navigator.clipboard.writeText(PAYMENT_NUMBER)}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-1.5 px-3 rounded-lg text-sm mb-4"
              >
                Copy Number 📋
              </button>

              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Transaction / Reference ID"
                className="border border-gray-300 rounded-lg p-2 text-sm w-full mb-3"
              />

              <label className="text-yellow-200 font-semibold text-sm mb-1 block">
                Or upload screenshot:
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full border rounded-lg p-2 text-sm mb-3"
              />

              {paymentImage && (
                <img
                  src={URL.createObjectURL(paymentImage)}
                  className="w-full h-32 object-contain border rounded-lg mb-3"
                />
              )}

              <div className="flex justify-center gap-4 mt-3">
                <button
                  onClick={handlePaymentConfirm}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowPayment(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DonationCard;
