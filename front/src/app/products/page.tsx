/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from "react";
import Card from "@/components/productsCard/Card";
import { filterProducts } from "@/helpers/filterProducts"; 
import { IProducts } from "@/interfaces/IProducts";
import SearchBar from "@/components/SearchBar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BreadcrumbItem } from "@/components/Breadcrumbs";


interface Category {
  id: string;
  name: string;
}

const categoryImages: Record<string, string> = {
    "Nutritional Supplements": "/Pesa.png",
    "Sports Apparel": "/mat.png",
    "Home Equipment": "/supplement.png",
    "Health & Wellness": "/Health.png",
    "Training Accessories": "/Training Accessories.png",
    
};

interface ProductsProps {
  searchQuery: string;  
}

const Products: React.FC<ProductsProps> = ({ searchQuery }) => { 

    const [categories, setCategories] = useState<Category[]>([]); // Guardar categorías
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Guardar el ID de la categoría seleccionada
    const [filteredProducts, setFilteredProducts] = useState<IProducts[]>([]);
    const [products, setProducts] = useState<IProducts[]>([]);

    // Obtener las categorías desde la API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:3000/categories");
                const data = await response.json();
                setCategories(data); // Establecer categorías en el estado
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Obtener todos los productos (si no hay categoría seleccionada)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/products");
                const data = await response.json();
                setProducts(data); // Establecer todos los productos en el estado
            } catch (error) {
                console.error("Error fetching all products:", error);
            }
        };

        if (!selectedCategory) {
            fetchProducts(); // Obtener todos los productos si no hay categoría seleccionada
        }
    }, [selectedCategory]);

    // Obtener los productos filtrados por categoría (si hay una categoría seleccionada)
    useEffect(() => {
        if (selectedCategory) {
            const fetchProductsByCategory = async (categoryId: string) => {
                try {
                    const response = await fetch(`http://localhost:3000/products/category/${categoryId}`);
                    const data = await response.json();
                    setProducts(data); // Establecer los productos filtrados por categoría
                } catch (error) {
                    console.error("Error fetching products for category:", error);
                }
            };

            fetchProductsByCategory(selectedCategory); // Obtener productos de la categoría seleccionada
        }
    }, [selectedCategory]);

    // Filtrar productos por búsqueda
    useEffect(() => {
        const filteredBySearch = filterProducts(products, searchQuery); // Filtrar por búsqueda
        setFilteredProducts(filteredBySearch); // Establecer los productos filtrados por búsqueda
    }, [searchQuery, products]);

    const handleProductSelect = (product: IProducts) => {
        console.log("Producto seleccionado:", product);
    };

    // Función para manejar el evento de búsqueda
    const handleSearch = (query: string) => {
        setFilteredProducts(filterProducts(products, query)); // Filtrar los productos con la nueva búsqueda
    };

    const breadcrumbItems: BreadcrumbItem[] = [
            { name: "Home", url: "/" },
            { name: "Products", url: "/products" },
            ...(selectedCategory ? [{ name: selectedCategory, url: `/products/${selectedCategory.toLowerCase()}` }] : []),
          ];
    
          console.log("Breadcrumb items:", breadcrumbItems);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
                        <Breadcrumbs items={breadcrumbItems} />

            <SearchBar onSearch={handleSearch} /> {/* Pasamos handleSearch al componente SearchBar */}

            <h1 className="mt-11 text-3xl font-semibold text-center text-white mb-8">
                Everything for your favorite sports
            </h1>

            {/* Barra de selección de categorías */}
            <div className="flex justify-center space-x-10 mb-8">
                {categories.map((category) => (
                    <div 
                        key={category.id} 
                        className={`flex flex-col items-center cursor-pointer ${
                            selectedCategory === category.id ? "opacity-100" : "opacity-50"
                        }`}
                        onClick={() => setSelectedCategory(category.id)} // Actualizar categoría seleccionada con el ID
                    >
                        <img
                            src={categoryImages[category.name] || "/default-category.png"} // Usar una imagen por defecto si no se encuentra la categoría
                            alt={category.name}
                            className="w-20 h-20 object-contain mb-2 hover:opacity-80"
                        />
                        <span className="text-white">{category.name}</span>
                    </div>
                ))}
            </div>

            {/* Mostrar los productos filtrados */}
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
