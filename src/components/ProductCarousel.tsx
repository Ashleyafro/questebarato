
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Product } from '@/types/product';
import { toast } from 'sonner';

interface ProductCarouselProps {
  products: Product[];
  title: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, title }) => {
  const navigate = useNavigate();
  
  const getFavorites = (): string[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  };
  
  const isFavorite = (productId: string): boolean => {
    return getFavorites().includes(productId);
  };
  
  const toggleFavorite = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    
    const favorites = getFavorites();
    
    if (isFavorite(productId)) {
      const updatedFavorites = favorites.filter((id: string) => id !== productId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      toast.success('Producto eliminado de favoritos');
    } else {
      favorites.push(productId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      toast.success('Producto añadido a favoritos');
    }
    
    const forceUpdate = useState({})[1];
    forceUpdate({});
  };
  
  const addToShoppingList = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    
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
  
  if (products.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <Card 
                className="h-full bg-zinc-800 border-zinc-700 hover:border-zinc-500 transition-all cursor-pointer"
                onClick={() => navigate(`/producto/${product.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className={getSupermarketColor(product.supermarket)}>
                      {product.supermarket}
                    </Badge>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 p-0 text-gray-400 hover:text-supermarket-green"
                        onClick={(e) => addToShoppingList(e, product)}
                      >
                        <ShoppingCart size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`h-8 w-8 p-0 ${isFavorite(product.id) ? 'text-red-500' : 'text-gray-400'}`}
                        onClick={(e) => toggleFavorite(e, product.id)}
                      >
                        <Heart className={isFavorite(product.id) ? 'fill-red-500' : ''} size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center text-5xl mb-4 h-20">
                    {getCategoryEmoji(product.category)}
                  </div>
                  
                  <h3 className="font-semibold text-white mb-1 line-clamp-2" title={product.name}>
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-400 mb-1">{product.brand}</p>
                  <p className="text-sm text-gray-400 mb-3">{product.quantity}</p>
                  
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-lg font-bold text-supermarket-green">{product.price.toFixed(2)} €</p>
                      <p className="text-xs text-gray-400">
                        ({product.reference_price.toFixed(2)} €/{product.reference_unit.replace('€/', '')})
                      </p>
                    </div>
                    
                    {product.discount && (
                      <Badge variant="outline" className="text-supermarket-orange border-supermarket-orange">
                        -{product.discount}%
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-black/50 text-white hover:bg-black/70" />
        <CarouselNext className="right-2 bg-black/50 text-white hover:bg-black/70" />
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
