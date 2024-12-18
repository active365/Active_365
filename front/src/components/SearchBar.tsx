// components/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void; // Callback para manejar la búsqueda
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value); // Actualiza el estado
    onSearch(value); // Llama a la función de búsqueda en tiempo real
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query); // Opción adicional para búsquedas al presionar "Enter"
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="p-2 rounded-md border border-gray-300 focus:outline-none focus:border-yellow-500"
      />
      
    </form>
  );
};

export default SearchBar;
