import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SupermarketFilters from '@/components/SupermarketFilters';
import CategoryFilter from '@/components/CategoryFilter';
import SortOptions, { SortOption } from '@/components/SortOptions';
import ProductGrid from '@/components/ProductGrid';
import { getProducts, getCategories } from '@/services/productService';
import { Product } from '@/types/product';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Home = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [selectedSupermarkets, setSelectedSupermarkets] = useState<string[]>(['mercadona', 'dia', 'carrefour']);
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { toast } = useToast();

  // Save search query to history if it exists
  useEffect(() => {
    const saveSearchToHistory = async () => {
      if (searchQuery) {
        try {
          await supabase
            .from('search_history')
            .insert({ search_term: searchQuery });
        } catch (error) {
          console.error('Error saving search history:', error);
        }
      }
    };
    
    saveSearchToHistory();
  }, [searchQuery]);

  const loadCategories = async () => {
    try {
      const categories = await getCategories();
      setAvailableCategories(categories);
      
      if (categories.length > 0) {
        setSelectedCategories(categories);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las categorías.",
        variant: "destructive"
      });
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts(searchQuery, selectedSupermarkets, sortBy, selectedCategories);
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [searchQuery, selectedSupermarkets, sortBy, selectedCategories]);

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
    <div className="container mx-auto p-4">
      {/* Main Products Section */}
      <div className="bg-[#1E1E1E] rounded-lg p-5 mb-6">
        <h2 className="text-xl font-bold text-white mb-4">
          {searchQuery ? `RESULTADOS PARA "${searchQuery}"` : "PRODUCTOS MÁS BARATOS DISPONIBLES"}
        </h2>
        
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

      {/* Information Sections */}
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
  );
};

export default Home;
