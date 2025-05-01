
import React from 'react';
import { Product } from '@/types/product';
import ProductItem from './ProductItem';
import { getCategoryEmoji } from '@/utils/productUtils';

interface ProductGroupProps {
  productName: string;
  products: Product[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
}

const ProductGroup: React.FC<ProductGroupProps> = ({
  productName,
  products,
  isFavorite,
  toggleFavorite
}) => {
  return (
    <div className="bg-black rounded-lg p-4">
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center text-2xl">
          {getCategoryEmoji(products[0]?.category)}
        </div>
        <div className="ml-3">
          <h2 className="text-white font-bold text-lg">{productName}</h2>
          <p className="text-sm text-gray-400">{products[0]?.quantity || products[0]?.reference_unit}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {['Mercadona', 'Dia', 'Carrefour'].map((supermarket) => {
          const productInSupermarket = products.find(p => p.supermarket === supermarket);
          
          return (
            <ProductItem 
              key={supermarket}
              supermarket={supermarket}
              product={productInSupermarket}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductGroup;
