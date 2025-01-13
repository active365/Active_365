/* eslint-disable @next/next/no-img-element */
import styles from "@/components/detailCard/detail.module.css";
import { categories } from "@/helpers/arrayProducts";
import { IProducts } from "@/interfaces/IProducts";
import Link from "next/link";

const DetailCard: React.FC<IProducts> = ({
    id,
    name,
    description,
    price,
    stock,
    imgUrl,
    category,  
}) => {
    const categoryName = categories.find((cat) => cat.name === category)?.name || "Unknown";

    return (
        <div key={id} className={`${styles["card-container"]} p-4 sm:p-6 lg:p-8`}>
            <div className={styles["image-container"]}>
                <img src={imgUrl} alt={`${name} image`} className={styles["product-image"]} />
            </div>

            <div className={styles["details-container"]}>
                <h1 className={styles["detail-header"]}>{name}</h1>
                <p className={styles["description"]}>
                    <strong>Description:</strong> {description}
                </p>
                <h4 className={styles["price"]}>
                    <strong>Price:</strong> ${price}
                </h4>
                <h4 className={styles["stock"]}>
                    <strong>Stock:</strong> {stock}
                </h4>
                <h4 className={styles["category"]}>
                    <strong>Category:</strong> {categoryName}
                </h4>

                <Link href="/products" className="mt-4 bg-yellow-400 text-black py-2 px-4 rounded-md w-full hover:bg-yellow-600">
                    Back to Products
                </Link>
            </div>
        </div>
    );
};

export default DetailCard;
