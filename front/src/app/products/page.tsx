'use client'

import { getProducts } from "../api/getProducts";
import { filterProducts } from "@/helpers/filterProducts"; 
import { IProducts } from "@/interfaces/IProducts";
import { ICategory } from "@/interfaces/ICategory";
import Card from "@/components/productsCard/Card";
import SearchBar from "@/components/SearchBar"; // Correcta importación
import { useEffect, useState } from "react";


// Importamos las categorías pre-cargadas
import categoriesToPreLoad from "@/helpers/categories";

// Ajustamos la estructura de categorías con la interfaz ICategory
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

    const currentDate = new Date();
    const deadline = new Date("2024-12-31");

    const [products, setProducts] = useState<IProducts[]>([]);

    // Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setFilteredProducts(data);  // Initialize filtered products with all products
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    // Update filtered products whenever searchQuery, selectedCategory, or products change
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

    // Handle search query update
    const handleSearch = (query: string) => {
        setFilteredProducts(filterProducts(products, query));  // Filter products based on query
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            {/* SearchBar now accepts the handleSearch function */}
            <SearchBar onSearch={handleSearch} />

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
                {categoriesToPreLoad.map((category: ICategory) => (
                    <div 
                        key={category.id} 
                        className={`flex flex-col items-center cursor-pointer ${
                            selectedCategory === category.name ? "opacity-100" : "opacity-50"
                        }`}
                        onClick={() => setSelectedCategory(category.name)}
                    >
                        <img
                            src={categoryImages[category.name]}
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
