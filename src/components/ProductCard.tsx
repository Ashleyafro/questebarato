
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const getSupermarketColor = (supermarket: string) => {
    switch (supermarket.toLowerCase()) {
      case 'mercadona':
        return 'bg-supermarket-green text-white';
      case 'dia':
        return 'bg-supermarket-red text-white';
      case 'carrefour':
        return 'bg-supermarket-blue text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getCategoryEmoji = (category: string) => {
    const categoryMap: Record<string, string> = {
      'lácteos': '🥛',
      'bebidas': '🥤',
      'despensa': '🍚',
      'carnes': '🥩',
      'pescados': '🐟',
      'frutas': '🍎',
      'verduras': '🥦',
      'congelados': '❄️',
      'limpieza': '🧼',
      'higiene': '🧴',
      'mascotas': '🐾',
      'panadería': '🍞',
      'dulces': '🍫',
      'embutidos': '🥓',
      'snacks': '🍿',
      'bebés': '👶',
      'vinos': '🍷',
      'cervezas': '🍺'
    };
    
    return categoryMap[category.toLowerCase()] || '🛒';
  };

  return (
    <Card className="h-full flex flex-col transition-shadow hover:shadow-md">
      <div className="relative">
        <img 
          src={product.image || `https://via.placeholder.com/300x200?text=${encodeURIComponent(product.name)}`} 
          alt={product.name}
          className="w-full h-48 object-contain p-4"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/300x200?text=Sin+Imagen";
          }}
        />
        <Badge 
          className={`absolute top-2 right-2 ${getSupermarketColor(product.supermarket)}`}
        >
          {product.supermarket}
        </Badge>
        <div className="absolute top-2 left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">
          {getCategoryEmoji(product.category)}
        </div>
      </div>
      <CardContent className="flex-grow pt-4">
        <h3 className="font-medium text-lg mb-2 line-clamp-2">{product.name}</h3>
        <div className="text-sm text-gray-500 mb-2">{product.brand}</div>
        <div className="text-sm text-gray-500 mb-2">{product.quantity || product.reference_unit}</div>
        <div className="flex items-center mb-2">
          {Array(5).fill(0).map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={(i < (product.rating || 0)) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
            />
          ))}
          <span className="ml-1 text-sm text-gray-600">({product.reviews || 0})</span>
        </div>
        <div className="flex items-end justify-between mt-2">
          <div>
            <div className="text-2xl font-bold">{product.price.toFixed(2)} €</div>
            <div className="text-sm text-gray-600">
              ({product.reference_price.toFixed(2)} €/{product.reference_unit.replace('€/', '')})
            </div>
          </div>
          {product.discount && (
            <Badge variant="outline" className="text-supermarket-orange border-supermarket-orange">
              -{product.discount}%
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full bg-supermarket-green hover:bg-supermarket-lightGreen">
          Añadir a la lista
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
