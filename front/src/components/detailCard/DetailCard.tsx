/* eslint-disable @next/next/no-img-element */
import styles from "@/components/detailCard/detail.module.css";
import { categories } from "@/helpers/arrayProducts";
import { IProducts } from "@/interfaces/IProducts";

const DetailCard: React.FC<IProducts> = ({
    id,
    name,
    description,
    price,
    stock,
    imgUrl,
    category_id,
}) => {
    const category = categories.find((cat) => cat.id === category_id)?.name || "Unknown";

    return (
        <div key={id} className={styles["card-container"]}>
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
                    <strong>Category:</strong> {category}
                </h4>
            </div>
        </div>
    );
};

export default DetailCard;
