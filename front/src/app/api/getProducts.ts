import { IProducts } from "@/interfaces/IProducts";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

// Obtener todos los productos
export const getProducts = async (): Promise<IProducts[]> => {
    try {
        console.log("Fetching products from:", `${APIURL}/products`);
        const response = await fetch(`${APIURL}/products`, {
            mode: 'cors',
            next: { revalidate: 1200 },
        });
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Unexpected content type, expected JSON");
        }

        const products: IProducts[] = await response.json();
        console.log("Fetched products:", products);
        return products;
    } catch (error: unknown) {
        // Verificamos si el error es una instancia de Error
        if (error instanceof Error) {
            console.error("Error fetching products:", error.message);
            throw new Error("Error loading products. Please try again later.");
        } else {
            console.error("Unknown error occurred:", error);
            throw new Error("An unknown error occurred while fetching products. Please try again later.");
        }
    }
};

// Obtener un producto específico por su ID
export const getProductById = async (id: string): Promise<IProducts> => {
    try {
        const response = await fetch(`${APIURL}/products/${id}`, {
            mode: 'cors',
            next: { revalidate: 1200 }
        });

        if (!response.ok) {
            throw new Error(`Error fetching product: ${response.status} ${response.statusText}`);
        }

        const product: IProducts = await response.json();
        return product;
    } catch (error: unknown) {
        // Verificamos si el error es una instancia de Error
        if (error instanceof Error) {
            console.error("Failed to fetch product:", error.message);
            throw new Error("Failed to load product. Please try again later.");
        } else {
            console.error("Unknown error occurred:", error);
            throw new Error("An unknown error occurred while fetching the product. Please try again later.");
        }
    }
};

// Obtener productos por categoría o nombre

export const getProductsByCategory = async (categoryId: string): Promise<IProducts[]> => {
    try {
        const res = await fetch(`${APIURL}/products?categoryId=${categoryId}`, {
            mode: 'cors',
            next: { revalidate: 1200 },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }

        const products: IProducts[] = await res.json();
        return products;
    } catch (error) {
        console.error("Error fetching products by category:", error);
        throw new Error("Failed to fetch products by category");
    }
};

export const getProductsByCategoryOrName = async (categoryOrName: string): Promise<IProducts[]> => {
    try {
      // Realizar la petición para obtener los productos filtrados por categoría o nombre
      const res = await fetch(`${APIURL}/products?category=${categoryOrName}`, {
        mode: 'cors',
        next: { revalidate: 1200 },
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch products by category or name");
      }
  
      const products: IProducts[] = await res.json();
      return products;
    } catch (error) {
      console.error("Error fetching products by category or name:", error);
      throw new Error("Failed to fetch products by category or name");
    }
  };