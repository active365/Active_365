// components/SearchBar.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  value: string; // Añadir 'value' para sincronizar con el estado del componente padre
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, value }) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    onSearch(term); // Pasa el término de búsqueda al componente principal para que filtre los productos
  };

  return (
<div className="flex items-center justify-center top-4 left-0 right-0 z-10">
  <input
    type="text"
    value={value}
    onChange={handleInputChange}
    placeholder="Search products..."
    className="p-2 rounded bg-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-64 max-w-full" // Asegura que la búsqueda tenga un tamaño máximo
  />
</div>

  );
};

export default SearchBar;
