"use client"
import React, { useState, useEffect, useContext } from "react";
import { GeneralContext } from "@/context/GeneralContext"; 
import DetailCard from "@/components/detailCard/DetailCard";
import { arrayProducts } from "@/helpers/arrayProducts";
import { IProducts } from "@/interfaces/IProducts";
import toast, { Toaster } from 'react-hot-toast';

const Detail = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params); 

    const { addToCart } = useContext(GeneralContext); 
    const [product, setProduct] = useState<IProducts | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const foundProduct = arrayProducts.find((product) => product.id.toString() === id) || null;
        setProduct(foundProduct);
    }, [id]);

    const handleIncrement = () => setQuantity((prev) => prev + 1);

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                ...product,
                quantity,
            });
            toast.success(`${quantity} units of ${product.name} added to the cart.`)
        }
    };

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-red-500">
                    {id ? "Product not found" : "Invalid Product ID"}
                </h1>
            </div>
        );
    }

    const currentDate = new Date();
    const deadline = new Date("2025-01-01");

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-black">
            {currentDate < deadline && (
                <div
                    className="relative w-full py-20"
                    style={{
                        backgroundImage: "url('/bannerSanta.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        height: "400px",
                    }}
                ></div>
            )}

            <div className="flex w-full max-w-7xl px-4 py-10 space-x-8">
                <div className="flex-1 bg-black shadow-lg rounded-lg p-6">
                    <DetailCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imgUrl={product.imgUrl}
                        price={product.price}
                        stock={product.stock}
                        description={product.description}
                        category={product.category}
                    />

                    <div className="mt-6">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleDecrement}
                                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                                disabled={quantity <= 1}
                            >
                                - 
                            </button>
                            <span className="text-xl font-semibold text-white">{quantity}</span>
                            <button
                                onClick={handleIncrement}
                                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="mt-4 w-full px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                <div className="lg:w-1/4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-3">
                        Transform your body with our training plans!
                    </h2>
                    <p className="text-base mb-4">
                        Join our personalized training plans to reach your goals. Whether you are looking to increase
                        strength, flexibility, or overall wellness, we have the perfect plan for you.
                    </p>
                    <button className="w-full px-4 py-2 bg-white text-yellow-600 font-semibold rounded-md hover:bg-gray-100">
                        Explore the plans!
                    </button>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Detail;
