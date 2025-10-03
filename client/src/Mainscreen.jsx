import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ComplaintList from "./ComplaintList";
import StatusUpdate from "./StatusUpdate";
import Guidelines from "./Guidelines";

function MainScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const [activeTab, setActiveTab] = useState("StatusUpdate");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const role = localStorage.getItem("userRole");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const openTab = (tabName) => {
    setActiveTab(tabName);
    setNavOpen(false);
  };

  const toggleProfileMenu = () => setProfileMenuOpen((prev) => !prev);

  const myProfile = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      alert("User ID not found. Please log in again.");
      navigate("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    sessionStorage.removeItem("userSession");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".profile-menu") &&
        !event.target.closest(".profile-icon")
      ) {
        setProfileMenuOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const navTabs =
    role === "admin"
      ? [
          { key: "StatusUpdate", label: "All Complaints" },
          { key: "Announcements", label: "Announcements" },
          { key: "Guidelines", label: "Guidelines" },
          { key: "Support", label: "Support" },
        ]
      : [
          { key: "StatusUpdate", label: "My Complaints" },
          { key: "Announcements", label: "Announcements" },
          { key: "Guidelines", label: "Guidelines" },
          { key: "Support", label: "Support" },
          { key: "AddComplaints", label: "Add Complaints" },
        ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "StatusUpdate":
        return <StatusUpdate />;
      case "Announcements":
        return <p>📢 Saturday & Sunday Off</p>;
      case "Guidelines":
        return <Guidelines />;
      case "Support":
        return (
          <p>
            If your issue is not resolved within 7 days of submitting a
            complaint, please reach us at{" "}
            <a
              href="mailto:electricissue@krlebhai.com"
              className="text-blue-600 underline"
            >
              electricissue@krlebhai.com
            </a>
            . We're here to help!
          </p>
        );
      case "AddComplaints":
        return role === "student" ? <ComplaintList /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-r from-[#003366] via-[#004080] via-[#0059b3] to-[#0073e6]">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#2980b9] p-4 shadow-md">
        <h1 className="text-white font-bold text-lg">Hostel Management</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-2">
          {navTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => openTab(tab.key)}
              className={`px-5 py-2 text-white rounded-md transition-all ${
                activeTab === tab.key
                  ? "bg-[#1f639f] scale-105 font-semibold underline"
                  : "bg-transparent hover:bg-[#3b9fcf]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setNavOpen((prev) => !prev)}
            className="text-white text-2xl focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Profile Menu */}
        <div className="relative ml-4 profile-menu">
          <button
            className="profile-icon flex items-center gap-2 px-5 py-2 text-white bg-transparent rounded-md hover:bg-[#3b9fcf] transition"
            onClick={toggleProfileMenu}
          >
            <i className="fas fa-user"></i> Profile
          </button>
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 bg-[#2980b9] rounded-md shadow-lg z-10 w-40">
              <button
                onClick={myProfile}
                className="block w-full text-left px-4 py-2 text-white hover:bg-[#1f639f]"
              >
                My Profile
              </button>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-white hover:bg-[#1f639f]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      {navOpen && (
        <div className="md:hidden flex flex-col bg-[#2980b9]">
          {navTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => openTab(tab.key)}
              className={`px-5 py-3 text-white text-left transition-all ${
                activeTab === tab.key
                  ? "bg-[#1f639f] font-semibold underline"
                  : "bg-transparent hover:bg-[#3b9fcf]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Tab Content */}
      <div className="flex-1 p-5">
        <div className="p-5 bg-white rounded-lg shadow-lg">
          <h3 className="text-[#2980b9] border-b-2 border-[#2980b9] pb-2 mb-4 text-lg font-semibold">
            {navTabs.find((tab) => tab.key === activeTab)?.label}
          </h3>
          {renderTabContent()}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2980b9] text-white text-center p-3 shadow-inner">
        <p>&copy; Hostel Management System. All Rights Reserved.</p>
        <p>Designed by SHIVA</p>
      </footer>
    </div>
  );
}

export default MainScreen;
