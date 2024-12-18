import { IProducts } from "@/interfaces/IProducts"

const APIURL = process.env.NEXT_PUBLIC_API_URL

export const getProducts = async(): Promise<IProducts[]> =>{
    const response = await fetch(`${APIURL}/products`, {
        next: {revalidate: 1200}})
    const products = await response.json()
    return products;
}

export const getProductById = async (id: string): Promise<IProducts> => {
    try {
        const response = await fetch(`${APIURL}/products/${id}`, {
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