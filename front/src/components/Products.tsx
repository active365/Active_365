/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useContext } from "react";
import Card from "@/components/productsCard/Card";
import { arrayProducts } from "@/helpers/arrayProducts"; 
import { categories } from "@/helpers/arrayProducts";
import { filterProducts } from "@/helpers/filterProducts"; 
import { IProducts } from "@/interfaces/IProducts";
import { getProducts } from "@/app/api/getProducts";
import { UserContext } from "@/context/UserContext"; // Importa el UserContext

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
    const  user  = useContext(UserContext); // Obtener el usuario del contexto
    const [selectedCategory, setSelectedCategory] = useState<CategoryName | null>(null);
    const [filteredProducts, setFilteredProducts] = useState(arrayProducts);

    const currentDate = new Date();
    const deadline = new Date("2024-12-31");

    const [products, setProducts] = useState<IProducts[]>([]);
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const filteredByCategory = selectedCategory
            ? products.filter(product => product.category === selectedCategory)
            : products;

        const finalFiltered = filterProducts(filteredByCategory, searchQuery);
        setFilteredProducts(finalFiltered);
    }, [searchQuery, selectedCategory, products]);

    const handleProductSelect = (product: IProducts) => {
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

            {loading ? (
                <div className="flex justify-center items-center text-white">
                    <div className="animate-spin h-8 w-8 border-t-2 border-yellow-400 border-solid rounded-full"></div> {/* Spinner */}
                    <p className="ml-4">Loading...</p>
                </div>
            ) : (
                <>
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
                            <Card 
                                products={filteredProducts} 
                                onProductSelect={handleProductSelect} 
                                isUserLoggedIn={!!user} 
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Products;
