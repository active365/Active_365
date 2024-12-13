import React from "react";
import Card from "@/components/productsCard/Card";
import { arrayProducts } from "@/helpers/arrayProducts"; // Ajusta la ruta según tu estructura de archivos

const Products: React.FC = () => {
    const currentDate = new Date();
    const deadline = new Date("2025-01-01");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
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

            <h1 className="mt-11 text-3xl font-semibold text-center text-white mb-8">
                Everything for your favorite sports
            </h1>

            {/* Pasa el array de productos al componente Card */}
            <div>
                <Card products={arrayProducts} />
            </div>
        </div>
    );
};

export default Products;