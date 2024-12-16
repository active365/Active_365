import Image from "next/image";
import { categories } from "@/helpers/arrayProducts";

const Category = () => {
    const Pesa = "/Pesa.png";
    const Mat = "/mat.png";
    const Suplement = "/suplement.png";

    return (
        <div className="flex justify-center flex-wrap gap-20 mt-1">
            {categories.map((category) => {
                const getImage = (categoryName: string) => {
                    switch (categoryName) {
                        case "Fitness Equipment":
                            return Pesa;
                        case "Yoga Accessories":
                            return Mat;
                        case "Supplements":
                            return Suplement;
                        default:
                            return "/default.png";
                    }
                };

                return (
                    <div key={category.id} className="flex flex-col items-center">
                        <Image
                            src={getImage(category.name)}
                            alt={category.name}
                            width={80}
                            height={70}
                            className="mb-2"
                        />
                        <span className="text-white text-sm text-center font-medium mb-8">
                            {category.name}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default Category;
