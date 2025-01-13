'use client';

import React, { useState, useEffect, useContext } from "react";
import Card from "@/components/productsCard/Card";
import { arrayProducts } from "@/helpers/arrayProducts"; 
import { categories } from "@/helpers/arrayProducts";
import { filterProducts } from "@/helpers/filterProducts"; 
import { IProducts } from "@/interfaces/IProducts";
import { getProducts } from "@/app/api/getProducts";
import { UserContext } from "@/context/UserContext"; 
import Breadcrumbs from "@/components/Breadcrumbs";
import { BreadcrumbItem } from "@/components/Breadcrumbs";
import Image from "next/image"; // Importación de Image de Next.js

export type CategoryName = "Fitness Equipment" | "Yoga Accessories" | "Supplements";

const categoryImages: Record<CategoryName, string> = {
    "Fitness Equipment": "/Pesa.png",
    "Yoga Accessories": "/mat.png",
    "Supplements": "/supplement.png",
};

const Products: React.FC<{ searchQuery: string }> = ({ searchQuery }) => { 

    const userSession = useContext(UserContext); 
    const [selectedCategory, setSelectedCategory] = useState<CategoryName | null>(null);
    const [filteredProducts, setFilteredProducts] = useState(arrayProducts);
    const [products, setProducts] = useState<IProducts[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch products from the API
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

    // Find selected category name for breadcrumb
    const selectedCategoryName = categories.find(category => category.name === selectedCategory)?.name;

    // Filter products based on category and search query
    useEffect(() => {
        const filteredByCategory = selectedCategory
            ? products.filter(product => product.category === selectedCategoryName)
            : products;

        const finalFiltered = filterProducts(filteredByCategory, searchQuery);
        setFilteredProducts(finalFiltered);
    }, [searchQuery, selectedCategory, selectedCategoryName, products]);

    const breadcrumbItems: BreadcrumbItem[] = [
        { name: "Home", url: "/" },
        { name: "Products", url: "/products" },
        ...(selectedCategoryName ? [{ name: selectedCategoryName, url: `/products/${selectedCategoryName.toLowerCase()}` }] : []),
    ];

    console.log("Breadcrumb items:", breadcrumbItems);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <Breadcrumbs items={breadcrumbItems} />

            <h1 className="mt-11 text-3xl font-semibold text-center text-white mb-8">
                Everything for your favorite sports
            </h1>

            {loading ? (
                <div className="flex justify-center items-center text-white">
                    <div className="animate-spin h-8 w-8 border-t-2 border-yellow-400 border-solid rounded-full"></div>
                    <p className="ml-4">Loading...</p>
                </div>
            ) : (
                <>
                    {/* Category selection */}
                    <div className="flex justify-center space-x-10 mb-8">
                        {categories.map((category) => (
                            <div 
                                key={category.name} 
                                className={`flex flex-col items-center cursor-pointer ${
                                    selectedCategory === category.name ? "opacity-100" : "opacity-50"
                                }`}
                                onClick={() => setSelectedCategory(category.name as CategoryName)}
                            >
                                <Image
                                    src={categoryImages[category.name as CategoryName]}
                                    alt={category.name}
                                    className="w-20 h-20 object-contain mb-2 hover:opacity-80"
                                    width={80} // Añadido
                                    height={80} // Añadido
                                />
                                <span className="text-white">{category.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Product listing */}
                    <div>
                        {filteredProducts.length === 0 ? (
                            <p className="text-white">No products found</p>
                        ) : (
                            <Card 
                                products={filteredProducts} 
                                onProductSelect={(product) => console.log("Producto seleccionado:", product)}
                                isUserLoggedIn={!!userSession} 
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Products;