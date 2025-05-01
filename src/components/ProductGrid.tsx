
import React, { useState } from 'react';
import { Product } from '@/types/product';
import { toast } from 'sonner';
import ProductGroup from './ProductGroup';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading = false }) => {
  // Add state to track favorites
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]')
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

  return (
    <div className="space-y-6">
      {Object.entries(groupByProductName).map(([productName, products]) => (
        <ProductGroup
          key={productName}
          productName={productName}
          products={products}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
