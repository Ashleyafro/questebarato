
import React from 'react';
import { Product } from '@/types/product';
import ProductGridItem from './ProductGridItem';

interface ProductGroupCardProps {
  productName: string;
  products: Product[];
  getCategoryEmoji: (category: string) => string;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (e: React.MouseEvent, productId: string) => void;
}

const ProductGroupCard: React.FC<ProductGroupCardProps> = ({
  productName,
  products,
  getCategoryEmoji,
  isFavorite,
  toggleFavorite,
}) => {
  const supermarkets = ['Mercadona', 'Dia', 'Carrefour'];
  const productMap = products.reduce((acc, product) => {
    acc[product.supermarket] = product;
    return acc;
  }, {} as Record<string, Product>);

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
        {supermarkets.map((supermarket) => (
          <ProductGridItem
            key={supermarket}
            supermarket={supermarket}
            product={productMap[supermarket]}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGroupCard;
