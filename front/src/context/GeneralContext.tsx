"use client"
import React, { createContext, useState, useMemo } from "react";
import { getProducts } from "@/app/api/getProducts";
import { IProducts } from "@/interfaces/IProducts";
import { IGeneralContext } from "@/interfaces/IGeneralContext";

export const GeneralContext = createContext<IGeneralContext>({
    cart: [],
    fetchProducts: async () => { },
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [cart, setCart] = useState<IProducts[]>([]);

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const addToCart = (product: IProducts) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((product) => product.id.toString() !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const value = useMemo(() => ({
        products,
        cart, 
        fetchProducts,
        addToCart,
        removeFromCart,
        clearCart,
    }), [products, cart]);

    return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};
