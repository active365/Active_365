"use client";
import React from "react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import styles from "@/app/cart/Cart.module.css";

const Cart: React.FC = () => {
    return (
        <div className={styles["cart-container"]}>
            <h2 className={styles["cart-header"]}>Your Cart</h2>

            <div className={styles["cart-item"]}>
                <p className={styles["cart-item-name"]}>Product Name</p>
                <img src="/placeholder.jpg" alt="Product Name" />
                <button className={styles["cart-item-button"]}>Remove</button>
            </div>

            <div className={styles["cart-total"]}>
                <p className="text-lg font-semibold">
                    Total Price: <span className="text-green-600">$0.00</span>
                </p>
            </div>

            <div className={styles["cart-actions"]}>
                <div>
                    <button className={styles["clear-button"]}>
                        <FaTrash />
                    </button>
                </div>
                <button className={styles["checkout-button"]}>Checkout</button>
            </div>

            <Link href="/products">
                <button className={styles["cart-actions"]}>Continue Shopping</button>
            </Link>
        </div>
    );
};

export default Cart;
