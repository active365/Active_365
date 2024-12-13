import React from "react";
import Card from "@/components/productsCard/Card";
import Category from "@/components/categories/Category";


const Products: React.FC = () => {
    const currentDate = new Date();
    const deadline = new Date("2025-01-01");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black px-0">
            {currentDate < deadline && (
                <div className="relative w-screen h-[300px] sm:h-[400px]">
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/mostPopular.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    
                </div>
            )}

            <h1 className="mt-11 text-3xl font-semibold text-center text-white mb-8 sm:text-4xl md:text-5xl">
                Everything for your favorite sports
            </h1>

            <Category />

            <div className="w-full px-4 sm:px-6 lg:px-8">
                <Card />

            </div>
        </div>
    );
};

export default Products;
