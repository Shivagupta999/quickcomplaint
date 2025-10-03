import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 font-poppins flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">QuickComplaint</h1>
        <button
          onClick={() => navigate("/register")}
          className="bg-white text-blue-600 font-semibold px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Login / Register
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
          Simplify Hostel Maintenance with QuickComplaint 🚀
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mb-8">
          QuickComplaint is your one-stop solution to quickly raise, track, and resolve
          hostel maintenance issues. Say goodbye to manual registers and delayed
          responses — everything is digital, fast, and transparent.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          Get Started → Login
        </button>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16 px-6 md:px-12 shadow-inner">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">
          🔑 Key Features
        </h3>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-600 mb-3">
              📝 Easy Complaint Submission
            </h4>
            <p className="text-gray-600">
              Raise complaints in just a few clicks with details like room number,
              issue type, and custom descriptions.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-600 mb-3">
              📊 Real-Time Tracking
            </h4>
            <p className="text-gray-600">
              Stay updated on the status of your complaints with transparent progress
              tracking.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-600 mb-3">
              ✅ Faster Resolutions
            </h4>
            <p className="text-gray-600">
              Administrators and staff can efficiently resolve complaints and update
              statuses instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4 mt-10">
        <p className="text-sm">
          © {new Date().getFullYear()} QuickComplaint. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
