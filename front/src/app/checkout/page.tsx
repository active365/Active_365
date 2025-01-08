"use client";
import React, { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";

const PaymentForm: React.FC = () => {
  const { userSession, isLoggedIn } = useContext(UserContext);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const APIURL = process.env.NEXT_PUBLIC_API_URL 

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!isLoggedIn) {
      setError("You must be logged in to proceed with the payment.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${APIURL}/checkout/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userSession?.token}`, 
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session.");
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      setError("There was an issue processing your payment. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">Complete Your Payment</h2>
        {isLoggedIn ? (
          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
                Order ID
              </label>
              <input
                type="text"
                id="orderId"
                name="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                placeholder="Enter your order ID"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full px-4 py-2 text-white font-bold bg-yellow-500 rounded-md hover:bg-yellow-600 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        ) : (
          <p className="text-center text-red-500">
            You must log in to make a payment. Please log in and try again.
          </p>
        )}
        {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
      </div>
    </div>
  );
};

export default PaymentForm;
