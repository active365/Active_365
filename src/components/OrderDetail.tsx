import React from "react";

interface OrderDetailModalProps {
  orderId: string;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ orderId, onClose }) => {
  // Datos mock para los detalles de la orden
  const mockOrderDetail = {
    id: orderId,
    date: "2024-04-01",
    totalPrice: 150.0,
    products: [
      { name: "Product A", quantity: 2, price: 50.0 },
      { name: "Product B", quantity: 1, price: 50.0 },
    ],
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        <p>
          <strong>Order ID:</strong> {mockOrderDetail.id}
        </p>
        <p>
          <strong>Date:</strong> {mockOrderDetail.date}
        </p>
        <p>
          <strong>Total Price:</strong> ${mockOrderDetail.totalPrice.toFixed(2)}
        </p>
        <h3 className="mt-4 text-lg font-semibold">Products:</h3>
        <ul className="list-disc pl-4">
          {mockOrderDetail.products.map((product, index) => (
            <li key={index} className="mb-2">
              {product.name} - {product.quantity} x ${product.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="btn bg-gray-300 text-gray-700 hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>
          <button className="btn bg-blue-500 text-white hover:bg-blue-600">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
