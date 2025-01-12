'use client'

import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;  // Propiedad para enviar la búsqueda al componente padre
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery);  // Llamamos al callback pasado por props
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..."
        className="p-2 rounded bg-gray-300 text-gray-800 placeholder-gray-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
