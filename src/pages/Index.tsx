
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SupermarketFilters from '@/components/SupermarketFilters';
import SortOptions, { SortOption } from '@/components/SortOptions';
import ProductGrid from '@/components/ProductGrid';
import { getProducts } from '@/services/productService';
import { Product } from '@/types/product';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupermarkets, setSelectedSupermarkets] = useState<string[]>(['mercadona', 'dia', 'carrefour']);
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts(searchTerm, selectedSupermarkets, sortBy);
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, [searchTerm, selectedSupermarkets, sortBy]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (supermarkets: string[]) => {
    setSelectedSupermarkets(supermarkets);
  };

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />
      
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Compara productos por mejor precio</h2>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <SupermarketFilters 
              selectedSupermarkets={selectedSupermarkets}
              onFilterChange={handleFilterChange}
            />
            
            <SortOptions 
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />
          </div>
          
          <Separator className="my-6" />
          
          <ProductGrid products={products} loading={loading} />
        </div>
      </main>
      
      <footer className="bg-white py-6 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; 2025 PrecioVersus - Comparador de precios de supermercados</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
