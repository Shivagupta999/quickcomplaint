import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import API from "./api/axios";

const MaintenanceForm = () => {
  const location = useLocation();
  const { rollNumber } = location.state || { rollNumber: "User" };

  const [selectedIssue, setSelectedIssue] = useState("");
  const [customIssue, setCustomIssue] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (roomNumber.trim() === "") {
      setError("⚠️ Room number is required.");
      setSuccess("");
      return;
    }
    if (!selectedIssue) {
      setError("⚠️ Please select an issue.");
      setSuccess("");
      return;
    }
    if (selectedIssue === "other" && customIssue.trim() === "") {
      setError("⚠️ Please describe your issue.");
      setSuccess("");
      return;
    }

    try {
      setLoading(true);

      const newComplaint = {
        roomNumber,
        text: selectedIssue === "other" ? customIssue : selectedIssue,
      };

      const token = localStorage.getItem("authToken");

      const response = await API.post("/complaints", newComplaint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setSuccess("✅ Complaint submitted successfully!");
        setError("");
        setRoomNumber("");
        setSelectedIssue("");
        setCustomIssue("");
      }
    } catch (err) {
      setError("❌ Failed to submit the complaint. Please try again.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-xl max-w-md mx-auto mt-12 font-poppins">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        🛠️ Maintenance Complaint Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Room Number */}
        <div className="text-left">
          <label
            htmlFor="room-number"
            className="block text-gray-700 font-medium mb-2"
          >
            Room Number:
          </label>
          <input
            type="text"
            id="room-number"
            placeholder="Enter your room number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </div>

        {/* Issue Selection */}
        <div className="text-left">
          <label
            htmlFor="maintenance-issue"
            className="block text-gray-700 font-medium mb-2"
          >
            Choose an issue:
          </label>
          <select
            id="maintenance-issue"
            value={selectedIssue}
            onChange={(e) => setSelectedIssue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">-- Select an issue --</option>
            <option value="Fan not Working">Fan not Working</option>
            <option value="Bulb Fused/Flickering">Bulb Fused/Flickering</option>
            <option value="Poor Wi-Fi">Poor Wi-Fi</option>
            <option value="Defective Charging Port">
              Defective Charging Port
            </option>
            <option value="Electric Shocks">Electric Shocks</option>
            <option value="Carpentry">Carpentry</option>
            <option value="General Repairs">General Repairs</option>
            <option value="Outdoor Maintenance">Outdoor Maintenance</option>
            <option value="Safety Concerns">Safety Concerns</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Custom Issue */}
        {selectedIssue === "other" && (
          <input
            type="text"
            placeholder="Describe your issue"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={customIssue}
            onChange={(e) => setCustomIssue(e.target.value)}
          />
        )}

        {/* Error / Success messages */}
        {error && (
          <div className="p-3 rounded-lg bg-red-100 text-red-700 font-medium border border-red-300">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 rounded-lg bg-green-100 text-green-700 font-medium border border-green-300">
            {success}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
};

export default MaintenanceForm;
