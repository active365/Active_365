'use client';

import React, { useState, useEffect } from "react";
import Card from "@/components/productsCard/Card";
import { arrayProducts } from "@/helpers/arrayProducts"; 
import { categories } from "@/helpers/arrayProducts";
import { filterProducts } from "@/helpers/filterProducts"; 



export type CategoryName = "Fitness Equipment" | "Yoga Accessories" | "Supplements";

const categoryImages: Record<CategoryName, string> = {
    "Fitness Equipment": "/Pesa.png",
    "Yoga Accessories": "/mat.png",
    "Supplements": "/supplement.png",
};

interface ProductsProps {
  searchQuery: string;  
}

const Products: React.FC<ProductsProps> = ({ searchQuery }) => { 
    const [selectedCategory, setSelectedCategory] = useState<CategoryName | null>(null);
    const [filteredProducts, setFilteredProducts] = useState(arrayProducts);

    const currentDate = new Date();
    const deadline = new Date("2024-12-31");

    useEffect(() => {
        const filteredByCategory = selectedCategory
            ? arrayProducts.filter(product => product.category === selectedCategory)
            : arrayProducts;

        const finalFiltered = filterProducts(filteredByCategory, searchQuery);
        setFilteredProducts(finalFiltered);
    }, [searchQuery, selectedCategory]);

    const handleProductSelect = (product: any) => {
        console.log("Producto seleccionado:", product);
    };

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
                    <div 
                        key={category.id} 
                        className={`flex flex-col items-center cursor-pointer ${
                            selectedCategory === category.name ? "opacity-100" : "opacity-50"
                        }`}
                        onClick={() => setSelectedCategory(category.name as CategoryName)}
                    >
                        <img
                            src={categoryImages[category.name as CategoryName]}
                            alt={category.name}
                            className="w-20 h-20 object-contain mb-2 hover:opacity-80"
                        />
                        <span className="text-white">{category.name}</span>
                    </div>
                ))}
            </div>

            <div>
                {filteredProducts.length === 0 ? (
                    <p className="text-white">No products found</p>
                ) : (
                    <Card products={filteredProducts} onProductSelect={handleProductSelect} />
                )}
            </div>
        </div>
    );
};

export default Products;
