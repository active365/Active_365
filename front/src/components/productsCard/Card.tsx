// components/productsCard/Card.tsx
import Link from "next/link";
import { IProducts } from "@/interfaces/IProducts";

interface CardProps {
  products: IProducts[];
  onProductSelect: (product: IProducts) => void;
}

const Card: React.FC<CardProps> = ({ products, onProductSelect }) => {
  if (products.length === 0) {
    return <p className="text-white">No products found.</p>;
  }

  return (
    <div className="bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
            onClick={() => onProductSelect(product)}
          >
            <img
              src={product.imgUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
              <p className="text-sm text-black my-2">Lorem ipsum dolor sit amet.</p>
              <p className="text-lg font-semibold text-gray-900">Price: ${product.price}</p>
              <Link href={`/product/${product.id}`}>
                <button
                  type="button"
                  className="mt-4 bg-yellow-400 text-black py-2 px-4 rounded-md w-full hover:bg-yellow-600"
                >
                  Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
