"use client"

import MyClasses from "@/components/MyClasses";
import OrderHistory from "@/components/OrderHistory";
import ProfileSection from "@/components/ProfileSection";
import React, { useState } from "react";


const DashboardPage: React.FC = () => {

  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [isMyClassesOpen, setIsMyClassesOpen] = useState(false);
  const [isGymTrackerOpen, setIsGymTrackerOpen] = useState(false);


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Dashboard Header */}
      <h1 className="text-3xl font-bold mb-6 text-gray-700">User Dashboard</h1>

      <ProfileSection/>

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

      <div className="bg-white rounded-lg shadow-md mb-6">
        <button
          onClick={() => setIsMyClassesOpen(!isMyClassesOpen)}
          className="w-full text-left px-6 py-4 text-2xl font-semibold text-gray-600 hover:bg-gray-200 transition"
        >
          My Classes
        </button>
        {isMyClassesOpen && (
          <MyClasses/>
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
