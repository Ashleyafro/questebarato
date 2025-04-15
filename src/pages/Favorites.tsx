
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';
import { formatProduct } from '@/services/productService';
import ProductGrid from '@/components/ProductGrid';
import { Skeleton } from '@/components/ui/skeleton';

const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavoriteProducts = async () => {
      setLoading(true);
      
      try {
        // Get favorite product IDs from localStorage
        const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        if (favoriteIds.length === 0) {
          setFavoriteProducts([]);
          setLoading(false);
          return;
        }
        
        // Fetch products from Supabase
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .in('id', favoriteIds);
        
        if (error) {
          console.error('Error fetching favorite products:', error);
          setFavoriteProducts([]);
        } else if (data) {
          // Format products
          const formatted = data.map(product => formatProduct(product as Product));
          setFavoriteProducts(formatted);
        }
      } catch (error) {
        console.error('Error loading favorite products:', error);
        setFavoriteProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadFavoriteProducts();
    
    // Add event listener for storage changes (if user adds/removes favorites in another tab)
    window.addEventListener('storage', loadFavoriteProducts);
    
    return () => {
      window.removeEventListener('storage', loadFavoriteProducts);
    };
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Tus Productos Favoritos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Tus Productos Favoritos</h1>
      
      {favoriteProducts.length === 0 ? (
        <div className="text-center py-12 bg-zinc-800 rounded-lg">
          <h2 className="text-xl font-medium text-white">No tienes productos favoritos</h2>
          <p className="text-gray-400 mt-2">
            Marca algunos productos como favoritos para verlos aquí
          </p>
        </div>
      ) : (
        <div className="bg-zinc-800 rounded-lg p-5">
          <ProductGrid products={favoriteProducts} />
        </div>
      )}
    </div>
  );
};

export default Favorites;
