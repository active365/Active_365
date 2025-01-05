'use client'

import React, { useState, useEffect } from "react";
import { filterProducts } from "@/helpers/filterProducts"; 
import { IProducts } from "@/interfaces/IProducts";
import { ICategory } from "@/interfaces/ICategory";
import Card from "@/components/productsCard/Card";
import SearchBar from "@/components/SearchBar"; 
import { categories } from "@/helpers/arrayProducts";

const categoryImages: Record<string, string> = {
    "Fitness Equipment": "/Pesa.png",
    "Yoga Accessories": "/mat.png",
    "Supplements": "/supplement.png",
};

interface ProductsProps {
  searchQuery: string;  
}

const Products: React.FC<ProductsProps> = ({ searchQuery }) => { 
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<IProducts[]>([]);
    const [products, setProducts] = useState<IProducts[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const fetchProductsByCategory = async (categoryId: string) => {
                try {
                    const response = await fetch(`http://localhost:3000/products/category/${categoryId}`);
                    const data = await response.json();
                    setProducts(data);
                } catch (error) {
                    console.error("Error fetching products for category:", error);
                }
            };

            fetchProductsByCategory(selectedCategory);
        }
    }, [selectedCategory]);

    useEffect(() => {
        const filteredBySearch = filterProducts(products, searchQuery);
        setFilteredProducts(filteredBySearch);
    }, [searchQuery, products]);

    const handleProductSelect = (product: IProducts) => {
        console.log("Producto seleccionado:", product);
    };

    const handleSearch = (query: string) => {
        setFilteredProducts(filterProducts(products, query));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <SearchBar onSearch={handleSearch} />
            <h1 className="mt-11 text-3xl font-semibold text-center text-white mb-8">
                Everything for your favorite sports
            </h1>

            <div className="flex justify-center space-x-10 mb-8">
                {categories.map((category: ICategory) => (
                    <div 
                        key={category.id} 
                        className={`flex flex-col items-center cursor-pointer ${
                            selectedCategory === category.id ? "opacity-100" : "opacity-50"
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        <img
                            src={categoryImages[category.name] || "/default-category.png"}
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
