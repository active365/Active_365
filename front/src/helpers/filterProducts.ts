import { IProducts } from "@/interfaces/IProducts";

export const filterProducts = (products: IProducts[], query: string): IProducts[] => {
  console.log("Filter query:", query); // Verifica el valor de query
  if (!query) return products; // Si no hay query, retorna todos los productos
  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
  console.log("Filtered products:", filtered); // Verifica los productos filtrados
  return filtered;
};
