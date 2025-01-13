import { IProducts } from "@/interfaces/IProducts";

export const filterProducts = (products: IProducts[], searchQuery: string): IProducts[] => {
  if (!searchQuery) return products;
  return products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
};