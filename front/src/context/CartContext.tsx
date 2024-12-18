"use client"

import React, { createContext, useContext, useReducer } from "react";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

type CartAction =
    | { type: "ADD_TO_CART"; payload: CartItem }
    | { type: "REMOVE_FROM_CART"; payload: string };

const initialState: CartState = {
    items: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    ),
                };
            }
            return { ...state, items: [...state.items, action.payload] };
        }
        case "REMOVE_FROM_CART": {
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
            };
        }
        default:
            return state;
    }
};

const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
