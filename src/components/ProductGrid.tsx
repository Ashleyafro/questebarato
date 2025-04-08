
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { Badge } from "@/components/ui/badge";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading = false }) => {
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

  const groupBySupermarket = products.reduce((acc, product) => {
    if (!acc[product.supermarket]) {
      acc[product.supermarket] = [];
    }
    acc[product.supermarket].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

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

  return (
    <div className="space-y-8">
      {Object.entries(groupBySupermarket).map(([supermarket, products]) => (
        <div key={supermarket} className="bg-black rounded-lg p-4">
          <div className="flex items-center mb-4">
            <h2 className="text-white font-bold text-xl">{supermarket}</h2>
            <div className="ml-auto">
              <Badge className={`${getSupermarketColor(supermarket)} text-white`}>
                {products.length} productos
              </Badge>
            </div>
          </div>
          
          <div className="space-y-2">
            {products.map((product) => (
              <div key={product.id} className="bg-zinc-800 rounded-lg p-3 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/40?text=Img";
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-medium line-clamp-1">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-supermarket-green">{product.price.toFixed(2)} €</p>
                  <p className="text-xs text-gray-400">({product.unitPrice.toFixed(2)} €/{product.unitType})</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
