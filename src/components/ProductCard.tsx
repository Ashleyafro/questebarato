
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from '@/types/product';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // Check if this product is in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(product.id));
  }, [product.id]);
  
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
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to detail
    
    // Get current favorites from local storage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((id: string) => id !== product.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
      toast.success('Producto eliminado de favoritos');
    } else {
      // Add to favorites
      favorites.push(product.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      toast.success('Producto añadido a favoritos');
    }
  };

  const addToShoppingList = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to detail
    
    // Get current shopping list from local storage
    const shoppingList = JSON.parse(localStorage.getItem('shoppingList') || '[]');
    
    // Add product to list if not already there
    if (!shoppingList.some((item: any) => item.id === product.id)) {
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity || "1 ud",
        supermarket: product.supermarket
      };
      shoppingList.push(newItem);
      localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
      toast.success('Producto añadido a la lista de compra');
    } else {
      toast.info('Este producto ya está en tu lista de compra');
    }
  };

  return (
    <Card 
      className="h-full flex flex-col transition-shadow hover:shadow-md cursor-pointer"
      onClick={() => navigate(`/producto/${product.id}`)}
    >
      <div className="relative h-48 flex items-center justify-center bg-gray-100">
        <div className="text-6xl">
          {getCategoryEmoji(product.category)}
        </div>
        <Badge 
          className={`absolute top-2 right-2 ${getSupermarketColor(product.supermarket)}`}
        >
          {product.supermarket}
        </Badge>
        <div className="absolute top-2 left-2 flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 p-0 bg-white/80 hover:bg-white ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
            onClick={toggleFavorite}
          >
            <Heart className={isFavorite ? 'fill-red-500' : ''} size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 p-0 bg-white/80 hover:bg-white text-gray-600 hover:text-supermarket-green"
            onClick={addToShoppingList}
          >
            <ShoppingCart size={18} />
          </Button>
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
        <Button 
          className="w-full bg-supermarket-green hover:bg-supermarket-lightGreen"
          onClick={addToShoppingList}
        >
          Añadir a la lista
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
