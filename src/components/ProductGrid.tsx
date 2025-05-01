import React, { useState } from 'react';
import { Product } from '@/types/product';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from 'sonner';
import { isInShoppingList, addToShoppingList } from '@/utils/shoppingListUtils';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading = false }) => {
  // Add state to track favorites
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );
  
  // Add state to track shopping list items
  const [shoppingListItems, setShoppingListItems] = useState<string[]>(
    JSON.parse(localStorage.getItem('shoppingList') || '[]').map((item: any) => item.productId)
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, index) => (
          <div key={index} className="h-28 bg-gray-100 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-600">No se encontraron productos</h3>
        <p className="text-gray-500 mt-2">Intenta con otra búsqueda o filtros diferentes</p>
      </div>
    );
  }

  const groupByProductName = products.reduce((acc, product) => {
    const productNameKey = product.name;
    
    if (!acc[productNameKey]) {
      acc[productNameKey] = [];
    }
    acc[productNameKey].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  Object.keys(groupByProductName).forEach(productName => {
    groupByProductName[productName].sort((a, b) => {
      const order = { 'Mercadona': 1, 'Dia': 2, 'Carrefour': 3 };
      return order[a.supermarket as keyof typeof order] - order[b.supermarket as keyof typeof order];
    });
  });

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

  // Add function to toggle favorites
  const toggleFavorite = (productId: string) => {
    const currentFavorites = [...favorites];
    
    if (currentFavorites.includes(productId)) {
      // Remove from favorites
      const updatedFavorites = currentFavorites.filter(id => id !== productId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      toast.success('Producto eliminado de favoritos');
    } else {
      // Add to favorites
      currentFavorites.push(productId);
      localStorage.setItem('favorites', JSON.stringify(currentFavorites));
      setFavorites(currentFavorites);
      toast.success('Producto añadido a favoritos');
    }
  };

  // Function to check if a product is in favorites
  const isFavorite = (productId: string): boolean => {
    return favorites.includes(productId);
  };

  // Function to add product to shopping list
  const handleAddToShoppingList = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    
    // Add to shopping list
    addToShoppingList(product);
    
    // Update local state
    setShoppingListItems(prev => {
      if (!prev.includes(product.id)) {
        return [...prev, product.id];
      }
      return prev;
    });
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupByProductName).map(([productName, products]) => (
        <div key={productName} className="bg-black rounded-lg p-4">
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
                <div key={supermarket} className={`bg-zinc-800 rounded-lg p-3 text-white ${!productInSupermarket ? 'opacity-50' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`${getSupermarketColor(supermarket)} text-white`}>
                      {supermarket}
                    </Badge>
                    
                    {productInSupermarket?.discount && (
                      <Badge variant="outline" className="text-supermarket-orange border-supermarket-orange">
                        -{productInSupermarket.discount}%
                      </Badge>
                    )}
                  </div>
                  
                  {productInSupermarket ? (
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="font-bold text-lg text-supermarket-green">
                            {productInSupermarket.price.toFixed(2)} €
                          </p>
                          <p className="text-xs text-gray-400">
                            ({productInSupermarket.reference_price.toFixed(2)} €/{productInSupermarket.reference_unit.replace('€/', '')})
                          </p>
                        </div>
                        <div className="flex items-center">
                          <div className="text-sm text-gray-400 mr-2">
                            {Array(Math.floor(productInSupermarket.rating || 0)).fill(0).map((_, i) => (
                              <span key={i} className="text-yellow-400">★</span>
                            ))}
                            {Array(5 - Math.floor(productInSupermarket.rating || 0)).fill(0).map((_, i) => (
                              <span key={i}>☆</span>
                            ))}
                          </div>
                          
                          {/* Add favorite button */}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`h-8 w-8 p-0 ${isFavorite(productInSupermarket.id) ? 'text-red-500' : 'text-gray-400'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(productInSupermarket.id);
                            }}
                          >
                            <Heart 
                              className={isFavorite(productInSupermarket.id) ? 'fill-red-500' : ''} 
                              size={16} 
                            />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Add shopping list button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-gray-600 text-supermarket-green hover:bg-gray-700 hover:text-supermarket-lightGreen"
                        onClick={(e) => handleAddToShoppingList(e, productInSupermarket)}
                      >
                        <ShoppingCart size={16} className="mr-1" />
                        Añadir a la lista
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full justify-center items-center py-4 text-gray-400">
                      <span>No disponible</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
