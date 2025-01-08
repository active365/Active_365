import React from "react";

type CheckoutButtonProps = {
  orderId: string; 
};

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ orderId }) => {
    
  const handleCheckout = async () => {
    const APIURL = process.env.NEXT_PUBLIC_API_URL 

    try {
      const response = await fetch(`/${APIURL}/checkout/${orderId}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url; 
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Hubo un problema al procesar el pago. Inténtalo de nuevo.");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600"
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
