
import { IProducts } from "./IProducts";

export interface IGeneralContext {
    cart: IProducts[];
    fetchProducts: () => Promise<void>;
    addToCart: (product: IProducts) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}

