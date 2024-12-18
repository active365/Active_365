"use client"

import OrderHistory from "@/components/OrderHistory";
import React, { useState } from "react";


const DashboardPage: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string>(
    "https://via.placeholder.com/150"
  );

  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [isGymTrackerOpen, setIsGymTrackerOpen] = useState(false);


  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setProfilePic(imageUrl);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Dashboard Header */}
      <h1 className="text-3xl font-bold mb-6 text-gray-700">User Dashboard</h1>

      {/* Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Profile</h2>
        <div className="flex items-center gap-6">
          <img
            src={profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-yellow-500"
          />
          <div>
            <p className="text-lg text-gray-700">
              <strong>Name:</strong> 
            </p>
            <p className="text-lg text-gray-700">
              <strong>Email:</strong> 
            </p>
            <label
              htmlFor="profile-pic"
              className="inline-block mt-4 btn"
            >
              Change Photo
            </label>
            <input
              id="profile-pic"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleProfilePicChange}
            />
          </div>
        </div>
      </div>

      {/* Membership Status Section */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <button
          onClick={() => setIsMembershipOpen(!isMembershipOpen)}
          className="w-full text-left px-6 py-4 text-2xl font-semibold text-gray-600 hover:bg-gray-200 transition"
        >
          Membership type
        </button>
        {isMembershipOpen && (
          <div className="px-6 py-4 text-lg text-gray-700">
            <p>
              <strong>Membership:</strong> 
            </p>
          </div>
        )}
      </div>

      {/* Order History Section */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <button
          onClick={() => setIsOrdersOpen(!isOrdersOpen)}
          className="w-full text-left px-6 py-4 text-2xl font-semibold text-gray-600 hover:bg-gray-200 transition"
        >
          Order History
        </button>
        {isOrdersOpen && (
          <OrderHistory/>
        )}
      </div>

      {/* Gym Tracker Section */}
      <div className="bg-white rounded-lg shadow-md">
        <button
          onClick={() => setIsGymTrackerOpen(!isGymTrackerOpen)}
          className="w-full text-left px-6 py-4 text-2xl font-semibold text-gray-600 hover:bg-gray-200 transition"
        >
          Gym Tracker
        </button>
        {isGymTrackerOpen && (
          <div className="px-6 py-4">

          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
