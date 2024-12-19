"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { GeneralContext } from "@/context/GeneralContext";
import { IProducts } from "@/interfaces/IProducts";

const CartComponent: React.FC = () => {
    const { cart, removeFromCart, clearCart } = useContext(GeneralContext);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    const totalPrice = cart.reduce((total, product) => {
        const quantity = quantities[product.id.toString()] || 1;
        return total + product.price * quantity;
    }, 0);

    const shippingCost = totalPrice > 0 ? (totalPrice >= 100 ? 0 : 10) : 0;
    const isMember = true; 

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>

            <div className="space-y-4">
                {cart.length === 0 ? (
                    <p className="text-center text-gray-600">Your cart is empty!</p>
                ) : (
                    cart.map((product: IProducts) => (
                        <div key={product.id} className="flex items-center justify-between border-b pb-4">
                            <img
                                src={product.imgUrl || "/logo.png"}
                                alt={product.name}
                                className="w-20 h-20 object-cover rounded-md"
                            />
                            <div className="flex flex-col ml-4 flex-grow">
                                <p className="text-lg font-semibold text-gray-700">{product.name}</p>
                                <p className="text-gray-500">${product.price.toFixed(2)}</p>
                                <div className="flex items-center mt-2">
                                    <button
                                        onClick={() => {
                                            const currentQty = quantities[product.id.toString()] || 1;
                                            if (currentQty > 1) {
                                                setQuantities({
                                                    ...quantities,
                                                    [product.id.toString()]: currentQty - 1,
                                                });
                                            }
                                        }}
                                        className="px-2 py-1 bg-yellow-400 text-white rounded-full hover:bg-yellow-500"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={quantities[product.id.toString()] || 1}
                                        onChange={(e) => {
                                            const value = Math.min(
                                                parseInt(e.target.value),
                                                product.stock 
                                            );
                                            setQuantities({
                                                ...quantities,
                                                [product.id.toString()]: value,
                                            });
                                        }}
                                        className="w-12 text-center mx-2 p-1 border border-gray-300 rounded-md"
                                    />
                                    <button
                                        onClick={() => {
                                            const currentQty = quantities[product.id.toString()] || 1;
                                            if (currentQty < product.stock) {
                                                setQuantities({
                                                    ...quantities,
                                                    [product.id.toString()]: currentQty + 1,
                                                });
                                            }
                                        }}
                                        className="px-2 py-1 bg-yellow-400 text-white rounded-full hover:bg-yellow-500"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromCart(product.id.toString())}
                                className="ml-4 text-red-600 hover:text-red-700"
                            >
                                <FaTrash size={20} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-6 flex justify-between items-center">
                <div className="text-lg font-semibold text-gray-800">
                    <p>Total: ${totalPrice.toFixed(2)}</p>
                    <p>Shipping: ${shippingCost === 0 ? "Free" : shippingCost.toFixed(2)}</p>
                    {isMember && <p className="text-green-500">You are a member, shipping is free!</p>}
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={clearCart}
                        className="bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500"
                    >
                        Clear Cart
                    </button>
                    <Link href="/checkout">
                        <button className="bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500">
                            Checkout
                        </button>
                    </Link>
                </div>
            </div>

            <div className="mt-4 text-center">
                <Link href="/products">
                    <button className="bg-yellow-400 text-white py-2 px-6 rounded-md hover:bg-yellow-500">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CartComponent;
