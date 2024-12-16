import { CategoryName } from "@/app/products/page";

export interface IProducts {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
    category: CategoryName;
    
}

