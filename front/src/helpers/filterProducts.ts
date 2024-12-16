// src/helpers/filterProducts.ts
import { IProducts } from "@/interfaces/IProducts";

export const filterProducts = (products: IProducts[], searchTerm: string): IProducts[] => {
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
