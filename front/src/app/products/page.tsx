import React from "react";
import Card from "@/components/productsCard/Card";
import { arrayProducts } from "@/helpers/arrayProducts"; 
import { categories } from "@/helpers/arrayProducts";

type CategoryName = "Fitness Equipment" | "Yoga Accessories" | "Supplements";

const categoryImages: Record<CategoryName, string> = {
    "Fitness Equipment": "/Pesa.png",
    "Yoga Accessories": "/mat.png",
    "Supplements": "/supplement.png",
};

const Products: React.FC = () => {
    const currentDate = new Date();
    const deadline = new Date("2025-01-01");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            {currentDate < deadline && (
                <div className="relative text-white text-center w-full py-20">
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                    >
                        <source src="/mostPopular.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}

            <h1 className="mt-11 text-3xl font-semibold text-center text-white mb-8">
                Everything for your favorite sports
            </h1>

            <div className="flex justify-center space-x-10 mb-8">
                {categories.map((category) => (
                    <div key={category.id} className="flex flex-col items-center">
                        <img
                            src={categoryImages[category.name as CategoryName]}
                            alt={category.name}
                            className="w-20 h-20 object-contain mb-2"
                        />
                        <span className="text-white">{category.name}</span>
                    </div>
                ))}
            </div>

            <div>
                <Card products={arrayProducts} />
            </div>
        </div>
    );
};

export default Products;
