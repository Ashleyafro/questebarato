
import React from 'react';
import { Product } from '@/types/product';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { getSupermarketColor } from '@/utils/productUtils';

interface ProductItemProps {
  supermarket: string;
  product: Product | undefined;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  supermarket,
  product,
  isFavorite,
  toggleFavorite
}) => {
  return (
    <div className={`bg-zinc-800 rounded-lg p-3 text-white ${!product ? 'opacity-50' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <Badge className={`${getSupermarketColor(supermarket)} text-white`}>
          {supermarket}
        </Badge>
        
        {product?.discount && (
          <Badge variant="outline" className="text-supermarket-orange border-supermarket-orange">
            -{product.discount}%
          </Badge>
        )}
      </div>
      
      {product ? (
        <div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-lg text-supermarket-green">
                {product.price.toFixed(2)} €
              </p>
              <p className="text-xs text-gray-400">
                ({product.reference_price.toFixed(2)} €/{product.reference_unit.replace('€/', '')})
              </p>
            </div>
            <div className="flex items-center">
              <div className="text-sm text-gray-400 mr-2">
                {Array(Math.floor(product.rating || 0)).fill(0).map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
                {Array(5 - Math.floor(product.rating || 0)).fill(0).map((_, i) => (
                  <span key={i}>☆</span>
                ))}
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 p-0 ${isFavorite(product.id) ? 'text-red-500' : 'text-gray-400'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product.id);
                }}
              >
                <Heart 
                  className={isFavorite(product.id) ? 'fill-red-500' : ''} 
                  size={16} 
                />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full justify-center items-center py-4 text-gray-400">
          <span>No disponible</span>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
