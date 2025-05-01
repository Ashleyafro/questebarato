import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';
import { addToShoppingList } from '@/utils/shoppingListUtils';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Format product data same as in productService
          const formattedProduct = {
            ...data,
            quantity: getQuantityFromName(data.name),
            unitPrice: data.reference_price,
            unitType: data.reference_unit.replace('€/', ''),
            image: `https://via.placeholder.com/300x300?text=${encodeURIComponent(data.name)}`,
            rating: Math.floor(Math.random() * 3) + 3, // Random rating between 3-5
            reviews: Math.floor(Math.random() * 150) + 50, // Random number of reviews
            discount: Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 5 : undefined
          };
          
          setProduct(formattedProduct);
          
          // Check local storage to see if this product is a favorite
          const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
          setIsFavorite(favorites.includes(id));
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const getQuantityFromName = (name: string): string => {
    const quantityRegex = /\d+(\.\d+)?(L|l|kg|g|ml|pack|Pack|unidades|ud)/;
    const match = name?.match(quantityRegex);
    
    if (match) {
      return match[0];
    }

    // Default quantities based on common products
    if (name?.includes('Leche')) return '1L';
    if (name?.includes('Aceite')) return '1L';
    if (name?.includes('Pasta')) return '500g';
    if (name?.includes('Arroz')) return '1kg';
    if (name?.includes('Yogur')) return '4x125g';
    if (name?.includes('Agua')) return '6x1.5L';
    if (name?.includes('Zumo')) return '1L';
    if (name?.includes('Coca Cola')) return '2L';
    
    return '1 ud';
  };

  const getSupermarketColor = (supermarket: string) => {
    switch (supermarket?.toLowerCase()) {
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
    
    return categoryMap[category?.toLowerCase()] || '🛒';
  };

  const toggleFavorite = () => {
    // Get current favorites from local storage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((favId: string) => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
      toast.success('Producto eliminado de favoritos');
    } else {
      // Add to favorites
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      toast.success('Producto añadido a favoritos');
    }
  };

  const handleAddToShoppingList = () => {
    if (product) {
      addToShoppingList(product);
      
      // Dispatch event to update the header count
      window.dispatchEvent(new Event('shoppingListUpdated'));
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2" /> Volver
        </Button>
        <Skeleton className="h-64 w-full mb-4" />
        <Skeleton className="h-10 w-2/3 mb-2" />
        <Skeleton className="h-6 w-1/3 mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2" /> Volver
        </Button>
        <h2 className="text-2xl font-bold text-white mb-2">Producto no encontrado</h2>
        <p className="text-gray-400">El producto que buscas no existe o ha sido eliminado.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2" /> Volver
      </Button>
      
      <div className="bg-zinc-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image/Emoji */}
          <div className="w-full md:w-1/3 flex items-center justify-center bg-zinc-700 rounded-lg p-10">
            <span className="text-9xl">{getCategoryEmoji(product.category)}</span>
          </div>
          
          {/* Product Details */}
          <div className="w-full md:w-2/3">
            <div className="flex justify-between items-start">
              <div>
                <Badge className={`${getSupermarketColor(product.supermarket)} text-white mb-2`}>
                  {product.supermarket}
                </Badge>
                <h1 className="text-3xl font-bold text-white">{product.name}</h1>
                <p className="text-gray-400 mb-2">Marca: {product.brand}</p>
                <p className="text-gray-400 mb-4">Categoría: {product.category}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleFavorite}
                className={isFavorite ? "text-red-500" : "text-gray-500"}
              >
                <Heart className={isFavorite ? "fill-red-500" : ""} size={24} />
              </Button>
            </div>
            
            <div className="flex items-center mb-4">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  size={20} 
                  className={(i < (product.rating || 0)) ? "text-yellow-400 fill-yellow-400" : "text-gray-500"} 
                />
              ))}
              <span className="ml-2 text-gray-400">({product.reviews} reseñas)</span>
            </div>
            
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-white">{product.price.toFixed(2)} €</span>
              {product.discount && (
                <Badge variant="outline" className="text-supermarket-orange border-supermarket-orange">
                  -{product.discount}%
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="bg-zinc-700 border-zinc-600">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">Cantidad</h3>
                  <p className="text-gray-400">{product.quantity}</p>
                </CardContent>
              </Card>
              <Card className="bg-zinc-700 border-zinc-600">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">Precio Referencia</h3>
                  <p className="text-gray-400">{product.reference_price.toFixed(2)} €/{product.reference_unit.replace('€/', '')}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-supermarket-green hover:bg-supermarket-lightGreen"
                onClick={handleAddToShoppingList}
              >
                <ShoppingCart size={18} className="mr-2" />
                Añadir a la lista
              </Button>
              <Button 
                variant="outline" 
                className={isFavorite ? "text-red-500 border-red-500" : ""}
                onClick={toggleFavorite}
              >
                <Heart className={`mr-2 ${isFavorite ? "fill-red-500" : ""}`} size={18} />
                {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
