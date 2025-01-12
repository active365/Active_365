import React, { useContext } from "react";
import { GeneralContext } from "@/context/GeneralContext";
import toast from "react-hot-toast";
import { IProducts } from "@/interfaces/IProducts";
import { FaShoppingCart } from "react-icons/fa";  
import { UserContext } from "@/context/UserContext";

interface AddToCartButtonProps {
    product: IProducts;
    isUserLoggedIn: boolean;  
}

const AddToCart: React.FC<AddToCartButtonProps> = ({ product, isUserLoggedIn }) => {
    const { addToCart } = useContext(GeneralContext);
    const {isLoggedIn} = useContext(UserContext)

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            toast.error("Please log in to add items to the cart.");
            return;
        }
        
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
                disabled={!isUserLoggedIn}  
            >
                Add to Cart
                <FaShoppingCart size={24} color="black" />
            </button>
        </>
    );
};

export default AddToCart;
