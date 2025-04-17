import React, { useState, useEffect } from 'react';
import SupermarketFilters from '@/components/SupermarketFilters';
import CategoryFilter from '@/components/CategoryFilter';
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
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts(searchTerm, selectedSupermarkets, sortBy, selectedCategories);
    setProducts(data);
    
    if (availableCategories.length === 0) {
      const categories = [...new Set(data.map(product => product.category))];
      setAvailableCategories(categories);
      setSelectedCategories(categories);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, [searchTerm, selectedSupermarkets, sortBy, selectedCategories]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (supermarkets: string[]) => {
    setSelectedSupermarkets(supermarkets);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
  };

  return (
    <div className="min-h-screen bg-[#111]">
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <div className="bg-[#00D37A] rounded-lg p-4">
              <div className="flex flex-col space-y-2">
                <a href="#" className="text-white font-bold py-2 px-4 rounded-lg hover:bg-[#8BC34A] flex items-center gap-2">
                  <span className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-[#4CAF50] text-xs">1</span>
                  Inicio
                </a>
                <a href="#" className="text-white font-bold py-2 px-4 rounded-lg hover:bg-[#8BC34A] flex items-center gap-2">
                  <span className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-[#4CAF50] text-xs">2</span>
                  Productos
                </a>
                <a href="#" className="text-white font-bold py-2 px-4 rounded-lg hover:bg-[#8BC34A] flex items-center gap-2">
                  <span className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-[#4CAF50] text-xs">3</span>
                  Precios
                </a>
                <a href="#" className="text-white font-bold py-2 px-4 rounded-lg hover:bg-[#8BC34A] flex items-center gap-2">
                  <span className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-[#4CAF50] text-xs">4</span>
                  Ayuda
                </a>
              </div>

              <div className="mt-auto pt-8">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <img 
                    src="/lovable-uploads/a341dc36-8a68-40c4-9c8b-d7f5204044aa.png" 
                    alt="QR Code" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <div className="bg-[#1E1E1E] rounded-lg p-5 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">PRODUCTOS MÁS BARATOS DISPONIBLES</h2>
              
              <div className="flex flex-col gap-4 mb-4">
                <SupermarketFilters 
                  selectedSupermarkets={selectedSupermarkets}
                  onFilterChange={handleFilterChange}
                />
                
                {availableCategories.length > 0 && (
                  <CategoryFilter
                    selectedCategories={selectedCategories}
                    availableCategories={availableCategories}
                    onCategoryChange={handleCategoryChange}
                  />
                )}
                
                <div className="flex justify-end">
                  <SortOptions 
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                  />
                </div>
              </div>
              
              <ProductGrid products={products} loading={loading} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#4A1D96] rounded-lg p-5">
                <h3 className="text-lg font-bold text-white mb-3">TUS SUPERMERCADOS DISPONIBLES EN TU UBICACIÓN</h3>
                <div className="text-white">
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Mercadona</span>
                      <span className="text-supermarket-green">Disponible</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Dia</span>
                      <span className="text-supermarket-green">Disponible</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Carrefour</span>
                      <span className="text-supermarket-green">Disponible</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#1E1E1E] rounded-lg p-5">
                <h3 className="text-lg font-bold text-white mb-3">PRODUCTOS POPULARES</h3>
                <div className="grid grid-cols-4 gap-4">
                  {['🍎', '🥛', '🍞', '🧀', '🥩', '🍗', '🍌', '🥚'].map((emoji, index) => (
                    <div key={index} className="h-12 w-12 bg-gray-800 rounded-full flex items-center justify-center text-2xl">
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-[#111] py-6 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>&copy; 2025 QuesteBarato - Comparador de precios de supermercados</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
