// components/AddToCartButton.tsx
import React, { useContext } from "react";
import { GeneralContext } from "@/context/GeneralContext";
import toast from "react-hot-toast";
import { IProducts } from "@/interfaces/IProducts";
import { FaShoppingCart } from "react-icons/fa";  

interface AddToCartButtonProps {
    product: IProducts;
}

const AddToCart: React.FC<AddToCartButtonProps> = ({ product }) => {
    const { addToCart } = useContext(GeneralContext);

    const handleAddToCart = () => {
        addToCart({
            ...product,
        });
        toast.success(`${product.name} added to the cart.`);
    };

    return (
        <>
        
        <button
            onClick={handleAddToCart}
            className="mt-4 w-full px-4 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-600 flex items-center justify-center gap-2"
        >
            Add to Cart
            <FaShoppingCart size={24} color="black" />
        </button>

        </>
    );
};

export default AddToCart;
