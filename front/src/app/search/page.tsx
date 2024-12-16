// pages/productsPage.tsx (o donde tengas la página de productos)
'use client';

import React, { useState } from "react";
import Products from "@/app/products/page";  // Ajusta la importación según sea necesario
import SearchBar from "@/components/SearchBar"; 

const searchPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Callback para actualizar el query
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} /> {/* Componente SearchBar */}
            <Products searchQuery={searchQuery} /> {/* Pasar el query a Products */}
        </div>
    );
};

export default searchPage;
