'use client';

import React, { useState } from "react";
import Products from "@/app/products/page";  
import SearchBar from "@/components/SearchBar"; 

const searchPage: React.FC = () => {
    const [search, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} /> 
            <Products searchQuery={search} /> 
        </div>
    );
};

export default searchPage;

