
import React, { useEffect, useState } from 'react';
import { getProducts } from '@/services/productService';
import { Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import { BadgePercent } from 'lucide-react';

const FeaturedOffers = () => {
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      setLoading(true);
      try {
        // Get all products and filter for ones with discounts
        const products = await getProducts();
        const withDiscounts = products
          .filter(product => product.discount && product.discount > 0)
          .sort((a, b) => (b.discount || 0) - (a.discount || 0)) // Sort by highest discount first
          .slice(0, 8); // Get top 8 discounted products
        
        setDiscountedProducts(withDiscounts);
      } catch (error) {
        console.error('Error fetching discounted products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountedProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-6">Ofertas destacadas</h1>

      {loading ? (
        <div className="bg-zinc-800 rounded-lg p-5">
          <p className="text-gray-400">Cargando ofertas...</p>
        </div>
      ) : discountedProducts.length > 0 ? (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BadgePercent className="text-supermarket-orange" size={24} />
            <h2 className="text-xl font-semibold text-white">Descuentos populares</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {discountedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-zinc-800 rounded-lg p-5">
          <p className="text-gray-400">No hay ofertas destacadas en este momento.</p>
        </div>
      )}
    </div>
  );
};

export default FeaturedOffers;
