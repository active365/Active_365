"use client"
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Image from "next/image";

const stripePromise = loadStripe("clave");

const PaymentForm: React.FC = () => {
    const [paymentMethod, setPaymentMethod] = useState<"creditCard" | "paypal">("creditCard");
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (paymentMethod === "creditCard" && stripe && elements) {
            const cardElement = elements.getElement(CardElement);

            if (cardElement) {
                const { error, paymentMethod } = await stripe.createPaymentMethod({
                    type: "card",
                    card: cardElement,
                });

                if (error) {
                    console.error("Error al procesar el pago:", error.message);
                } else {
                    console.log("Método de pago creado:", paymentMethod);
                }
            }
        } else {
            console.log("Redirigiendo a PayPal...");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="creditCard"
                            checked={paymentMethod === "creditCard"}
                            onChange={() => setPaymentMethod("creditCard")}
                            className="mr-2"
                        />
                        <span className="text-gray-800 font-medium">Credit card</span>
                    </label>
                    <div className="flex items-center space-x-2">
                        <Image
                            src="/visa.png"
                            alt="Visa"
                            width={40}
                            height={20}
                            className="object-contain"
                        />
                        <Image
                            src="/mastercard.png"
                            alt="MasterCard"
                            width={40}
                            height={20}
                            className="object-contain"
                        />
                        <Image
                            src="/amex.png"
                            alt="American Express"
                            width={40}
                            height={20}
                            className="object-contain"
                        />
                    </div>
                </div>

                {paymentMethod === "creditCard" && (
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Card number *</label>
                            <div className="p-3 border border-gray-300 rounded-lg bg-white">
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: "16px",
                                                color: "#424770",
                                                "::placeholder": { color: "#aab7c4" },
                                            },
                                            invalid: { color: "#9e2146" },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label className="block mb-2 text-sm font-medium text-gray-700">Expiry (MM/YY) *</label>
                                <input
                                    type="text"
                                    placeholder="MM / AA"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2 text-sm font-medium text-gray-700">CVV *</label>
                                <input
                                    type="text"
                                    placeholder="CVV"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-yellow-400 text-white rounded-lg hover:bg-yellow-600 transition"
                    disabled={!stripe}
                >
                    Place your order
                </button>
            </form>
        </div>
    );
};

const PaymentPage: React.FC = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
};

export default PaymentPage;
