
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from '@/types/product';
import { addToShoppingList } from '@/utils/shoppingListUtils';

interface ProductGridItemProps {
  product: Product | undefined;
  supermarket: string;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (e: React.MouseEvent, productId: string) => void;
}

const ProductGridItem: React.FC<ProductGridItemProps> = ({
  product,
  supermarket,
  isFavorite,
  toggleFavorite,
}) => {
  const getSupermarketColor = (supermarket: string) => {
    switch (supermarket.toLowerCase()) {
      case 'mercadona':
        return 'bg-supermarket-green';
      case 'dia':
        return 'bg-supermarket-red';
      case 'carrefour':
        return 'bg-supermarket-blue';
      default:
        return 'bg-gray-500';
    }
  };

  const handleAddToShoppingList = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToShoppingList(product);
  };

  if (!product) {
    return (
      <div className="bg-zinc-800 rounded-lg p-3 text-white opacity-50">
        <div className="flex items-center justify-between mb-2">
          <Badge className={`${getSupermarketColor(supermarket)} text-white`}>
            {supermarket}
          </Badge>
        </div>
        <div className="flex flex-col h-full justify-center items-center py-4 text-gray-400">
          <span>No disponible</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800 rounded-lg p-3 text-white">
      <div className="flex items-center justify-between mb-2">
        <Badge className={`${getSupermarketColor(supermarket)} text-white`}>
          {supermarket}
        </Badge>
        
        {product.discount && (
          <Badge variant="outline" className="text-supermarket-orange border-supermarket-orange">
            -{product.discount}%
          </Badge>
        )}
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-3">
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
              onClick={(e) => toggleFavorite(e, product.id)}
            >
              <Heart 
                className={isFavorite(product.id) ? 'fill-red-500' : ''} 
                size={16} 
              />
            </Button>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full border-gray-600 text-supermarket-green hover:bg-gray-700 hover:text-supermarket-lightGreen"
          onClick={(e) => handleAddToShoppingList(e, product)}
        >
          <ShoppingCart size={16} className="mr-1" />
          Añadir a la lista
        </Button>
      </div>
    </div>
  );
};

export default ProductGridItem;
