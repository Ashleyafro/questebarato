import { Product } from '@/types/product';
import { supabase } from '@/integrations/supabase/client';

// Helper function to format products from Supabase to maintain compatibility with existing UI
export const formatProduct = (product: Product): Product => {
  return {
    ...product,
    quantity: getQuantityFromName(product.name),
    unitPrice: product.reference_price,
    unitType: product.reference_unit.replace('€/', ''),
    image: `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}`,
    rating: Math.floor(Math.random() * 3) + 3, // Random rating between 3-5
    reviews: Math.floor(Math.random() * 150) + 50, // Random number of reviews
    discount: Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 5 : undefined
  };
};

// Helper to extract quantity from product name
const getQuantityFromName = (name: string): string => {
  const quantityRegex = /\d+(\.\d+)?(L|l|kg|g|ml|pack|Pack|unidades|ud)/;
  const match = name.match(quantityRegex);
  
  if (match) {
    return match[0];
  }

  // Default quantities based on common products
  if (name.includes('Leche')) return '1L';
  if (name.includes('Aceite')) return '1L';
  if (name.includes('Pasta')) return '500g';
  if (name.includes('Arroz')) return '1kg';
  if (name.includes('Yogur')) return '4x125g';
  if (name.includes('Agua')) return '6x1.5L';
  if (name.includes('Zumo')) return '1L';
  if (name.includes('Coca Cola')) return '2L';
  
  return '1 ud';
};

// Function specifically for product search that prioritizes name, brand and category matches
export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    if (!searchTerm || searchTerm.trim() === '') {
      return [];
    }
    
    console.log(`Searching for products with term: ${searchTerm}`);
    
    // Get products that match the search term in name, brand, or category
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
      .limit(12); // Limit to 12 products for the carousel
    
    if (error) {
      console.error('Error searching products:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log('No products found for search term:', searchTerm);
      return [];
    }
    
    console.log(`Found ${data.length} products for search term: ${searchTerm}`);
    
    // Sort results to prioritize exact matches in name, brand, or category
    const formattedProducts = data.map(formatProduct).sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ? 2 : 0;
      const bNameMatch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ? 2 : 0;
      const aBrandMatch = a.brand.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0;
      const bBrandMatch = b.brand.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0;
      const aCategoryMatch = a.category.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0;
      const bCategoryMatch = b.category.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0;
      
      // Calculate total match score
      const aScore = aNameMatch + aBrandMatch + aCategoryMatch;
      const bScore = bNameMatch + bBrandMatch + bCategoryMatch;
      
      // Sort by total score (descending)
      if (aScore !== bScore) return bScore - aScore;
      
      // If scores are equal, sort by price
      return a.price - b.price;
    });
    
    return formattedProducts;
  } catch (error) {
    console.error('Error in searchProducts:', error);
    return [];
  }
};

export const getProducts = async (
  searchTerm = '',
  supermarkets: string[] = ['mercadona', 'dia', 'carrefour'],
  sortBy = 'price-asc',
  categories: string[] = []
): Promise<Product[]> => {
  try {
    // Build the query
    let query = supabase
      .from('products')
      .select('*');

    // Filter by search term - improved search logic
    if (searchTerm && searchTerm.trim() !== '') {
      // Use ilike for case-insensitive search on name and category
      query = query.or(`name.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%`);
    }
    
    // Filter by supermarkets
    if (supermarkets.length > 0) {
      query = query.in('supermarket', supermarkets.map(s => 
        s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
      ));
    }
    
    // Filter by categories
    if (categories.length > 0) {
      query = query.in('category', categories);
    }
    
    // Execute the query
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }
    
    if (!data) {
      return [];
    }
    
    // Format products to maintain compatibility with existing UI
    let formattedProducts = data.map(formatProduct);
    
    // Sort products
    switch (sortBy) {
      case 'price-asc':
        formattedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        formattedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'unit-price-asc':
        formattedProducts.sort((a, b) => (a.reference_price || 0) - (b.reference_price || 0));
        break;
      case 'unit-price-desc':
        formattedProducts.sort((a, b) => (b.reference_price || 0) - (a.reference_price || 0));
        break;
      default:
        formattedProducts.sort((a, b) => a.price - b.price);
    }
    
    return formattedProducts;
  } catch (error) {
    console.error('Error in getProducts:', error);
    return [];
  }
};

// This function is used to get all available categories from the database
export const getCategories = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .order('category');
    
    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
    
    if (!data) {
      return [];
    }
    
    // Extract unique categories
    const categories = [...new Set(data.map(item => item.category))];
    return categories;
  } catch (error) {
    console.error('Error in getCategories:', error);
    return [];
  }
};
