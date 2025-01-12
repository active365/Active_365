import { getProductsByCategoryOrName } from '@/app/api/getProducts';
import Card from '@/components/productsCard/Card';
import React from 'react';

const Products: React.FC<{ params: { categoryorname: string } }> = async ({ params }) => {
  const products = await getProductsByCategoryOrName(params.categoryorname);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Our Products</h1>
      <div className="flex flex-wrap justify-center">
        {products.length ? (
          <Card
            products={products}
            onProductSelect={() => {
            }}
          /> // Ahora se define como una función vacía sin parámetros no utilizados
        ) : (
          <div>Products not found</div>
        )}
      </div>
    </div>
  );
};

export default Products;
