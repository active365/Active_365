// pages/productsPage.tsx
'use client';

import React, { useState } from "react";
import Products from "@/app/products/page";  // Ajusta la importación según sea necesario
import SearchBar from "@/components/SearchBar"; 

const searchPage: React.FC = () => {
    const [search, setSearchQuery] = useState('');

    // Callback para actualizar el query
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} /> {/* Componente SearchBar */}
            <Products searchQuery={search} /> {/* Cambiar 'search' a 'searchQuery' */}
        </div>
    );
};

export default searchPage;
