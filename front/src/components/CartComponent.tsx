/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useContext, useState } from "react";
import { GeneralContext } from "@/context/GeneralContext";
import Link from "next/link";

const CartComponent: React.FC = () => {
    const { cart, removeFromCart, clearCart } = useContext(GeneralContext);

    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    const isMember = true;
    const shippingCost = isMember ? 0 : 10;

    const totalProductsPrice = cart.reduce((total, item) => {
        const quantity = quantities[item.id] || 1;
        return total + item.price * quantity;
    }, 0);

    const totalPrice = totalProductsPrice + shippingCost;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="space-y-4">
                {cart.map((item) => (
                    <div key={item.id} className="flex items-start justify-between border-b pb-4">
                        <img
                            src={item.imgUrl}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex-grow ml-4">
                            <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                            <div className="flex items-center space-x-2 mt-2">
                                <p className="text-lg text-black">${item.price}</p>
                            </div>
                            <p className="text-sm text-gray-500">{item.stock} disponibles</p>
                            <div className="flex items-center mt-2">
                                <button
                                    onClick={() => {
                                        const currentQty = quantities[item.id] || 1;
                                        if (currentQty > 1) {
                                            setQuantities({
                                                ...quantities,
                                                [item.id]: currentQty - 1,
                                            });
                                        }
                                    }}
                                    className="px-2 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantities[item.id] || 1}
                                    onChange={(e) =>
                                        setQuantities({
                                            ...quantities,
                                            [item.id]: Math.max(
                                                1,
                                                Math.min(parseInt(e.target.value, 10) || 1, item.stock)
                                            ),
                                        })
                                    }
                                    className="w-12 text-center mx-2 p-1 border border-gray-300 rounded-md text-black"
                                />
                                <button
                                    onClick={() => {
                                        const currentQty = quantities[item.id] || 1;
                                        if (currentQty < item.stock) {
                                            setQuantities({
                                                ...quantities,
                                                [item.id]: currentQty + 1,
                                            });
                                        }
                                    }}
                                    className="px-2 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => removeFromCart(item.id.toString())}
                            className="ml-4 text-red-600 hover:text-red-700 text-sm flex items-center space-x-1"
                        >
                            <span>Eliminar</span>
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-6 border-t pt-4">
                <div className="flex justify-between text-gray-800">
                    <p>Productos ({cart.length})</p>
                    <p>${totalProductsPrice}</p>
                </div>
                <div className="flex justify-between text-gray-800">
                    <p>Costo de envío</p>
                    <p>${shippingCost}</p>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 mt-2">
                    <p>Total</p>
                    <p>${totalPrice}</p>
                </div>
            </div>

            <div className="mt-6 flex justify-between">
                <button
                    onClick={clearCart}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                    Vaciar carrito
                </button>
                <Link href="/products">
                    <button className="bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500">
                        Continuar compra
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CartComponent;
