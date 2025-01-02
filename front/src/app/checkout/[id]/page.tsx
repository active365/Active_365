"use client";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

const CheckoutPage: React.FC = () => {
    const router = useRouter();
    const [orderId, setOrderId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (router.query.id) {
            setOrderId(router.query.id as string);
        }
    }, [router.query.id]); 

    const handlePayment = async () => {
        if (!orderId) {
            setError("Order ID not found in the URL.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${APIURL}/checkout/${orderId}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to create Stripe Checkout session.");
            }

            const session = await response.json();

            if (!session.url) {
                throw new Error("Stripe session URL is missing.");
            }

            window.location.href = session.url;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
                onClick={handlePayment}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
                {loading ? <Loader /> : "Proceed to Payment"}
            </button>
        </div>
    );
};

export default CheckoutPage;
