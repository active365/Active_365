
import { IProducts } from "./IProducts";

export interface IGeneralContext {
    cart: IProducts[];
    addToCart: (product: IProducts) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}

