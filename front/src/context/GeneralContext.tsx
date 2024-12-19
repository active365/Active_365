"use client";
import React, { createContext, useState, useMemo, useEffect } from "react";
import { IProducts } from "@/interfaces/IProducts";
import { IGeneralContext } from "@/interfaces/IGeneralContext";


export const GeneralContext = createContext<IGeneralContext>({
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<IProducts[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedCart = localStorage.getItem("cart");
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = (product: IProducts) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart, product];
            return updatedCart;
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((product) => product.id.toString() !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const value = useMemo(() => ({
        cart,
        addToCart,
        removeFromCart,
        clearCart,
    }), [cart]);

    return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};
