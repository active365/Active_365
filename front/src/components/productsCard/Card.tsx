import Link from "next/link";
import { IProducts } from "@/interfaces/IProducts";

// Recibe productos como props
const Card: React.FC<{ products: IProducts[] }> = ({ products }) => {
  return (
    <div className="bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {products.map((product: IProducts) => {
          return (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              <img
                src={product.imgUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600 my-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  Price: ${product.price}
                </p>
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
          );
        })}
      </div>
    </div>
  );
};

export default Card;
