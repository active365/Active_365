'use client';

import React, { useState, useMemo } from 'react';
import { arrayProducts } from '@/helpers/arrayProducts';  // Lista de productos
import { filterProducts } from '@/helpers/filterProducts';  // Función para filtrar productos
import SearchBar from '@/components/SearchBar';  // Barra de búsqueda
import { IProducts } from '@/interfaces/IProducts';
import Card from '@/components/productsCard/Card'; // Asegúrate de importar el componente Card

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');  // Estado para el término de búsqueda

  // Filtrar productos según el término de búsqueda
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return arrayProducts;  // Devuelve todos los productos si no hay término de búsqueda
    return filterProducts(arrayProducts, searchTerm);  // Filtra solo cuando hay un término de búsqueda
  }, [searchTerm]);

  // Maneja la búsqueda en la barra, actualiza el término de búsqueda en tiempo real
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Maneja el clic en un producto y limpia el término de búsqueda
  const handleProductClick = (product: IProducts) => {
    setSearchTerm('');  // Limpia el término de búsqueda al hacer clic en un producto
    console.log(product);  // Aquí puedes agregar lógica adicional, como redirigir a la página del producto
  };

  // Limpiar el término de búsqueda si no hay resultados
  const handleClearSearch = () => {
    setSearchTerm('');  // Limpia el término de búsqueda manualmente
  };

  return (
    <div className="p-4">
      {/* Barra de búsqueda (solo la barra, los resultados se mostrarán aquí) */}
      <SearchBar onSearch={handleSearch} value={searchTerm} />

      {/* Mostrar productos solo después de haber ingresado algo en la barra de búsqueda */}
      {searchTerm && (
        <div className="mt-8">
          {/* Mostrar mensaje si no se encontraron productos */}
          {filteredProducts.length === 0 && (
            <div className="mt-4 text-red-600">
              No products found for "{searchTerm}"
              {/* Botón para limpiar la búsqueda cuando no hay resultados */}
              <button 
                className="ml-2 text-blue-600 hover:text-blue-800"
                onClick={handleClearSearch}>
                Clear search
              </button>
            </div>
          )}

          {/* Mostrar productos filtrados */}
          <div className="mt-4">
            {/* Pasamos los productos filtrados al componente Card */}
            <Card products={filteredProducts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
