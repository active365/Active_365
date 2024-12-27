import { IProducts } from "@/interfaces/IProducts"

const APIURL = process.env.NEXT_PUBLIC_API_URL

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
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};


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
    } catch (error) {
        console.error("Failed to fetch product:", error);
        throw error; 
    }
};