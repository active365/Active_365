'use client';
import { useState, useEffect } from 'react';
import { arrayProducts } from '@/helpers/arrayProducts'; // Ajusta la ruta si es necesario
import DetailCard from '@/components/detailCard/DetailCard'; // Asegúrate de que la ruta sea correcta

interface Category {
  id: number;
  name: string;
}

const DropdownMenu = ({ categories }: { categories: Category[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [showProducts, setShowProducts] = useState(false);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setShowProducts(true);
    setSelectedProduct(null);
    setIsOpen(false);
  };

  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setSelectedCategoryId(null);
      setShowProducts(false);
    }
  };

  useEffect(() => {
    if (!selectedCategoryId) {
      setShowProducts(false);
    }
  }, [selectedCategoryId]);

  const filteredProducts = selectedCategoryId
    ? arrayProducts.filter((product) => product.category_id === selectedCategoryId)
    : [];

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    setShowProducts(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleMenuToggle}
        className="p-2 rounded bg-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-64"
      >
        Categorías
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-48 bg-white shadow-lg rounded-md z-10">
          {categories.map((category) => (
            <a
              key={category.id}
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
                handleCategorySelect(category.id);
              }}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
            >
              {category.name}
            </a>
          ))}
        </div>
      )}

      {showProducts && !selectedProduct && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">
            Productos en la categoría: {categories.find((cat) => cat.id === selectedCategoryId)?.name}
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 border rounded cursor-pointer hover:bg-gray-100"
                  onClick={() => handleProductSelect(product)}
                >
                  <img src={product.imgUrl} alt={product.name} className="w-full h-48 object-cover" />
                  <h4 className="font-semibold mt-2">{product.name}</h4>
                  <p className="text-sm mt-1">{product.description}</p>
                  <p className="text-green-500 mt-2">${product.price}</p>
                </div>
              ))
            ) : (
              <p>No hay productos en esta categoría.</p>
            )}
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="mt-8 p-4 border rounded bg-white shadow-md">
          <DetailCard {...selectedProduct} />
          <button
            onClick={() => setSelectedProduct(null)}
            className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Volver a la lista de productos
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
