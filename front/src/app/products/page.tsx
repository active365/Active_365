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

   
    const [categories, setCategories] = useState<Category[]>([]); 
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<IProducts[]>([]);
    const [products, setProducts] = useState<IProducts[]>([]);
    const [subcategories, setSubcategories] = useState<string[]>([]); // Cambio a string[]
    const [priceOrder, setPriceOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:3000/categories");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching all products:", error);
            }
        };

        // Solo traemos productos si no hay una categoría seleccionada
        if (!selectedCategory) {
            fetchProducts();
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (selectedCategory) {
            const fetchProductsByCategory = async (categoryId: string) => {
                try {
                    const response = await fetch(`http://localhost:3000/products/category/${categoryId}`);
                    const data = await response.json();
                    setProducts(data); // Actualizamos los productos según la categoría
                    // Aseguramos que `subcategory` es un string
                    const subcategories = new Set<string>(data.map((product: { subcategory: string }) => product.subcategory));
                    setSubcategories(Array.from(subcategories)); // Convertimos Set a array de string
                    // Limpiamos la subcategoría seleccionada al cambiar de categoría
                    setSelectedSubcategory(null);
                } catch (error) {
                    console.error("Error fetching products for category:", error);
                }
            };
            fetchProductsByCategory(selectedCategory);
        } else {
            setProducts([]); // Limpiamos los productos si no se ha seleccionado categoría
            setSubcategories([]); // Limpiamos las subcategorías si no hay categoría seleccionada
        }
    }, [selectedCategory]);

    useEffect(() => {
        const filteredBySearch = filterProducts(products, searchQuery);

        // Filtrar por subcategoría si está seleccionada
        const filteredBySubcategory = selectedSubcategory
            ? filteredBySearch.filter(product => product.subcategory === selectedSubcategory)
            : filteredBySearch;

        const sortedByPrice = filteredBySubcategory.sort((a, b) => {
            if (priceOrder === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });

        setFilteredProducts(sortedByPrice);
    }, [searchQuery, products, priceOrder, selectedSubcategory]);

    const handleSearch = (query: string) => {
        setFilteredProducts(filterProducts(products, query));
    };

    // Tipo explícito para el parámetro `product`
    const handleProductSelect = (product: IProducts) => {
        // Aquí puedes manejar la lógica cuando un producto es seleccionado
        console.log(product);
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

            <SearchBar onSearch={handleSearch} />

            <h1 className="mt-11 text-3xl font-semibold text-center text-white mb-8">
                Everything for your favorite sports
            </h1>

            <div className="flex justify-center space-x-10 mb-8">
                {categories.map((category) => (
                    <div 
                        key={category.id} 
                        className={`flex flex-col items-center cursor-pointer ${selectedCategory === category.id ? "opacity-100" : "opacity-50"}`}
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

            {/* Filtro de subcategoría */}
            {selectedCategory && (
                <div className="mb-8">
                    <h2 className="text-white mb-4">Select Subcategory</h2>
                    <select
                        className="px-4 py-2 rounded bg-white text-black"
                        value={selectedSubcategory || ''}
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                    >
                        <option value="">All Subcategories</option>
                        {subcategories.map((subcategory) => (
                            <option key={subcategory} value={subcategory}>
                                {subcategory}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="mb-8">
                <h2 className="text-white mb-4">Sort by price</h2>
                <select
                    className="px-4 py-2 rounded bg-white text-black"
                    value={priceOrder}
                    onChange={(e) => setPriceOrder(e.target.value as 'asc' | 'desc')}
                >
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
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

