import React, { useState } from "react";
import OrderDetailModal from "./OrderDetail";

const OrderHistory: React.FC = () => {
  const orders = [
    { id: 1, date: "2024-04-01" },
    { id: 2, date: "2024-03-25" },
  ]

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleDetailClick = (id: string) => {
    setSelectedOrderId(id);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="px-6 py-4">
      <ul className="divide-y divide-gray-300">
        {orders.map((order) => (
          <li key={order.id} className="py-3 text-gray-700 flex justify-between items-center">
            <div>
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Date:</strong> {order.date}
              </p>
            </div>
            <button
              className="btn bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => handleDetailClick(order.id.toString())}
            >
              Detail
            </button>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {isDetailModalOpen && selectedOrderId && (
        <OrderDetailModal
          orderId={selectedOrderId}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrderHistory;
