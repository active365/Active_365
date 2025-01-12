"use client";
import React, { useState, useEffect, useContext } from "react";
import { use } from "react";
import DetailCard from "@/components/detailCard/DetailCard";
import { IProducts } from "@/interfaces/IProducts";
import { Toaster } from "react-hot-toast";
import { getProductById, getProductsByCategory } from "@/app/api/getProducts";  // Importamos la función getProductsByCategory
import AddToCart from "@/components/AddToCart";
import { UserContext } from "@/context/UserContext";
import Loader from "@/components/Loader";
import Link from "next/link";

const Detail = ({ params }: { params: Promise<{ id: string }> }) => {
    // Usamos la promesa de los parámetros resueltos
    const resolvedParams = use(params);
    const productId = resolvedParams.id;

    const [product, setProduct] = useState<IProducts | null>(null);
    const [allProducts, setAllProducts] = useState<IProducts[]>([]); // Para almacenar todos los productos
    const [selectedCategory, setSelectedCategory] = useState<string>(""); // Categoría seleccionada
    const [loading, setLoading] = useState<boolean>(true);

    const user = useContext(UserContext);
    const isUserLoggedIn = Boolean(user);

    // Efecto para obtener un producto específico basado en el ID
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Llamamos al servicio para obtener el producto
                const fetchedProduct = await getProductById(productId);
                setProduct(fetchedProduct); // Guardamos el producto en el estado
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        };

        // Llamamos a la función fetchProduct
        fetchProduct();
    }, [productId]); // Dependencia del ID del producto

    // Efecto para obtener todos los productos y las categorías
    useEffect(() => {
        const fetchProductsByCategory = async (category: string) => {
            try {
                const products = await getProductsByCategory(category);
                setAllProducts(products); // Actualizamos los productos filtrados
            } catch (error) {
                console.error("Failed to fetch products by category:", error);
            }
        };

        if (selectedCategory) {
            fetchProductsByCategory(selectedCategory); // Obtenemos productos por categoría
        } else {
            setAllProducts([]); // Si no hay categoría seleccionada, no mostramos productos
        }
    }, [selectedCategory]); // Dependencia de la categoría seleccionada

    // Si no hay producto, mostramos un mensaje de "Producto no encontrado"
    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-red-500">Product not found</h1>
            </div>
        );
    }

    // Configuración de fechas (por ejemplo, para mostrar un banner navideño)
    const currentDate = new Date();
    const deadline = new Date("2025-01-01");

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-black">
            {currentDate < deadline && (
                <div
                    className="relative w-full py-20"
                    style={{
                        backgroundImage: "url('/bannerSanta.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        height: "400px",
                    }}
                ></div>
            )}

            {/* Sección para seleccionar categorías */}
            <div className="w-full max-w-7xl px-4 py-6">
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => setSelectedCategory("")}
                        className={`px-4 py-2 rounded-md text-white ${selectedCategory === "" ? "bg-yellow-500" : "bg-black hover:bg-gray-700"}`}
                    >
                        All Products
                    </button>
                    <button
                        onClick={() => setSelectedCategory("category1")}
                        className={`px-4 py-2 rounded-md text-white ${selectedCategory === "category1" ? "bg-yellow-500" : "bg-black hover:bg-gray-700"}`}
                    >
                        Category 1
                    </button>
                    <button
                        onClick={() => setSelectedCategory("category2")}
                        className={`px-4 py-2 rounded-md text-white ${selectedCategory === "category2" ? "bg-yellow-500" : "bg-black hover:bg-gray-700"}`}
                    >
                        Category 2
                    </button>
                    {/* Agregar más categorías aquí */}
                </div>
            </div>

            <div className="flex w-full max-w-7xl px-4 py-10 space-x-8">
                <div className="flex-1 bg-black shadow-lg rounded-lg p-6">
                    {/* Mostrar el producto principal seleccionado */}
                    <DetailCard
                        key={`${product.id}-${Math.random()}`} // Utilizamos una clave única
                        id={product.id}
                        name={product.name}
                        imgUrl={product.imgUrl}
                        price={product.price}
                        stock={product.stock}
                        description={product.description}
                        category={product.category}
                    />

                    <AddToCart product={product} isUserLoggedIn={isUserLoggedIn} />
                </div>

                <div className="lg:w-1/4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-3">
                        Transform your body with our training plans!
                    </h2>
                    <p className="text-base mb-4">
                        Join our personalized training plans to reach your goals. Whether you are looking to increase
                        strength, flexibility, or overall wellness, we have the perfect plan for you.
                    </p>
                    <Link href="/membership">
                        <button className="w-full px-4 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-600">
                            Explore the plans!
                        </button>
                    </Link>

                </div>
            </div>

            {/* Mostrar productos según la categoría seleccionada */}
            <div className="flex flex-wrap gap-8 w-full max-w-7xl px-4 py-10">
                {allProducts.length === 0 ? (
                    <div className="w-full text-center text-white">No products found in this category.</div>
                ) : (
                    allProducts.map((product) => (
                        <div key={product.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                            <DetailCard
                                key={`${product.id}-${Math.random()}`}
                                id={product.id}
                                name={product.name}
                                imgUrl={product.imgUrl}
                                price={product.price}
                                stock={product.stock}
                                description={product.description}
                                category={product.category}
                            />
                            <AddToCart product={product} />
                        </div>
                    ))
                )}
            </div>

            <Toaster />
        </div>
    );
};

export default Detail;
