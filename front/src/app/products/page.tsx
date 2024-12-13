import React from "react";
import Card from "@/components/productsCard/Card";
import { arrayProducts } from "@/helpers/arrayProducts"; 

const Products: React.FC = () => {
    const currentDate = new Date();
    const deadline = new Date("2025-01-01");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black px-0">
            {currentDate < deadline && (
                <div
                    className="relative text-white text-center w-full py-20"
                    style={{
                        backgroundImage: "url('/bannerSanta.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        height: "400px",
                    }}
                >
                </div>
            )}

            <h1 className="mt-11 text-3xl font-semibold text-center text-white mb-8 sm:text-4xl md:text-5xl">
                Everything for your favorite sports
            </h1>
            <h1 className="mt-11 text-3xl font-semibold text-center text-white mb-8">
                Everything for your favorite sports
            </h1>

            <div>
                <Card products={arrayProducts} />
            </div>
        </div>
    );
};

export default Products;
