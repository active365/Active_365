// Componente principal donde se usa DropdownMenu

import DropdownMenu from '@/components/DropdownMenu';  // Ajusta la ruta si es necesario
import { categories } from '@/helpers/arrayProducts';  // Ajusta la ruta si es necesario

const ProductPage = () => {
  return (
    <div className="container mx-auto p-4">
      <DropdownMenu categories={categories} />
    </div>
  );
};

export default ProductPage;
