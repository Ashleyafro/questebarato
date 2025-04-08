
import { Product } from '@/types/product';

// Mock data for our products
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Leche Entera',
    quantity: '1L',
    price: 0.89,
    unitPrice: 0.89,
    unitType: 'L',
    supermarket: 'Mercadona',
    image: 'https://via.placeholder.com/300x300?text=Leche+Entera',
    rating: 4,
    reviews: 120,
    category: 'lácteos'
  },
  {
    id: '2',
    name: 'Leche Semidesnatada',
    quantity: '1L',
    price: 0.95,
    unitPrice: 0.95,
    unitType: 'L',
    supermarket: 'Dia',
    image: 'https://via.placeholder.com/300x300?text=Leche+Semidesnatada',
    rating: 4,
    reviews: 98,
    discount: 5,
    category: 'lácteos'
  },
  {
    id: '3',
    name: 'Leche Desnatada',
    quantity: '1L',
    price: 0.92,
    unitPrice: 0.92,
    unitType: 'L',
    supermarket: 'Carrefour',
    image: 'https://via.placeholder.com/300x300?text=Leche+Desnatada',
    rating: 3,
    reviews: 45,
    category: 'lácteos'
  },
  {
    id: '4',
    name: 'Huevos Camperos',
    quantity: '12 unidades',
    price: 2.55,
    unitPrice: 0.21,
    unitType: 'ud',
    supermarket: 'Mercadona',
    image: 'https://via.placeholder.com/300x300?text=Huevos+Camperos',
    rating: 5,
    reviews: 230,
    category: 'huevos'
  },
  {
    id: '5',
    name: 'Huevos Ecológicos',
    quantity: '10 unidades',
    price: 2.95,
    unitPrice: 0.30,
    unitType: 'ud',
    supermarket: 'Dia',
    image: 'https://via.placeholder.com/300x300?text=Huevos+Ecológicos',
    rating: 4,
    reviews: 86,
    category: 'huevos'
  },
  {
    id: '6',
    name: 'Pan de Molde Integral',
    quantity: '500g',
    price: 1.15,
    unitPrice: 2.30,
    unitType: 'kg',
    supermarket: 'Carrefour',
    image: 'https://via.placeholder.com/300x300?text=Pan+de+Molde',
    rating: 3,
    reviews: 42,
    discount: 10,
    category: 'panadería'
  },
  {
    id: '7',
    name: 'Espaguetis',
    quantity: '500g',
    price: 0.79,
    unitPrice: 1.58,
    unitType: 'kg',
    supermarket: 'Mercadona',
    image: 'https://via.placeholder.com/300x300?text=Espaguetis',
    rating: 4,
    reviews: 112,
    category: 'pasta'
  },
  {
    id: '8',
    name: 'Tomate Frito',
    quantity: '400g',
    price: 0.68,
    unitPrice: 1.70,
    unitType: 'kg',
    supermarket: 'Dia',
    image: 'https://via.placeholder.com/300x300?text=Tomate+Frito',
    rating: 3,
    reviews: 89,
    category: 'conservas'
  },
  {
    id: '9',
    name: 'Aceite de Oliva Virgen Extra',
    quantity: '1L',
    price: 4.95,
    unitPrice: 4.95,
    unitType: 'L',
    supermarket: 'Carrefour',
    image: 'https://via.placeholder.com/300x300?text=Aceite+Oliva',
    rating: 5,
    reviews: 176,
    category: 'aceites'
  },
  {
    id: '10',
    name: 'Arroz Redondo',
    quantity: '1kg',
    price: 1.20,
    unitPrice: 1.20,
    unitType: 'kg',
    supermarket: 'Mercadona',
    image: 'https://via.placeholder.com/300x300?text=Arroz',
    rating: 4,
    reviews: 134,
    discount: 15,
    category: 'arroz'
  },
  {
    id: '11',
    name: 'Azúcar Blanco',
    quantity: '1kg',
    price: 0.99,
    unitPrice: 0.99,
    unitType: 'kg',
    supermarket: 'Dia',
    image: 'https://via.placeholder.com/300x300?text=Azúcar',
    rating: 3,
    reviews: 56,
    category: 'edulcorantes'
  },
  {
    id: '12',
    name: 'Café Molido Natural',
    quantity: '250g',
    price: 2.35,
    unitPrice: 9.40,
    unitType: 'kg',
    supermarket: 'Carrefour',
    image: 'https://via.placeholder.com/300x300?text=Café',
    rating: 5,
    reviews: 221,
    category: 'café'
  },
];

// Creating more mock data by duplicating products for different supermarkets
const expandedMockProducts: Product[] = [];

mockProducts.forEach(product => {
  // Add the original product
  expandedMockProducts.push({...product});
  
  // Create variations for other supermarkets
  const otherSupermarkets = ['Mercadona', 'Dia', 'Carrefour'].filter(
    s => s !== product.supermarket
  );
  
  otherSupermarkets.forEach((supermarket, index) => {
    const priceFactor = 0.85 + Math.random() * 0.3; // random factor between 0.85 and 1.15
    const newPrice = Math.round(product.price * priceFactor * 100) / 100;
    const newUnitPrice = Math.round(product.unitPrice * priceFactor * 100) / 100;
    
    expandedMockProducts.push({
      ...product,
      id: `${product.id}-${index + 1}`,
      supermarket,
      price: newPrice,
      unitPrice: newUnitPrice,
      rating: Math.max(1, Math.min(5, Math.floor(product.rating + (Math.random() * 2 - 1)))),
      reviews: Math.floor(product.reviews * (0.7 + Math.random() * 0.6)),
      discount: Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 5 : undefined
    });
  });
});

export const getProducts = async (
  searchTerm = '',
  supermarkets: string[] = ['mercadona', 'dia', 'carrefour'],
  sortBy = 'price-asc'
): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredProducts = [...expandedMockProducts];
  
  // Filter by search term
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.category.toLowerCase().includes(term)
    );
  }
  
  // Filter by supermarkets
  if (supermarkets.length > 0) {
    filteredProducts = filteredProducts.filter(p => 
      supermarkets.includes(p.supermarket.toLowerCase())
    );
  }
  
  // Sort products
  switch (sortBy) {
    case 'price-asc':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'unit-price-asc':
      filteredProducts.sort((a, b) => a.unitPrice - b.unitPrice);
      break;
    case 'unit-price-desc':
      filteredProducts.sort((a, b) => b.unitPrice - a.unitPrice);
      break;
    default:
      filteredProducts.sort((a, b) => a.price - b.price);
  }
  
  return filteredProducts;
};
