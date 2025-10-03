import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "./api/axios";

function Profile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    hall: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await API.get(`/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          phoneNumber: response.data.phoneNumber || "",
          hall: response.data.hall || "",
          password: "",
          confirmPassword: "",
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserData();
  }, [userId, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        hall: formData.hall,
      };
      if (formData.password) payload.password = formData.password;

      await API.put(`/update-profile`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("Profile updated successfully!");
      setEditMode(false);
      setUserData({ ...userData, ...payload });
      setFormData({ ...formData, password: "", confirmPassword: "" });
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(
        err.response?.data?.message || "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 font-medium">
        ⚠️ {error}
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 font-medium">
        ⚠️ User data not available
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-2">
          My Profile
        </h2>

        {!editMode ? (
          <>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong className="text-gray-900">Name:</strong> {userData.name}
              </p>
              <p>
                <strong className="text-gray-900">Roll Number:</strong>{" "}
                {userData.rollNumber}
              </p>
              <p>
                <strong className="text-gray-900">Hall:</strong> {userData.hall}
              </p>
              <p>
                <strong className="text-gray-900">Phone Number:</strong>{" "}
                {userData.phoneNumber}
              </p>
              <p>
                <strong className="text-gray-900">Email:</strong> {userData.email}
              </p>
            </div>
            <button
              onClick={() => setEditMode(true)}
              className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            {success && (
              <div className="p-2 bg-green-100 text-green-700 rounded">{success}</div>
            )}
            {error && (
              <div className="p-2 bg-red-100 text-red-700 rounded">{error}</div>
            )}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              name="hall"
              value={formData.hall}
              onChange={handleChange}
              placeholder="Hall"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New Password (optional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm New Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="w-full py-2 mt-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
