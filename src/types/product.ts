
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  reference_price: number;
  reference_unit: string;
  supermarket: string;
  created_at: string;
  // Legacy fields to maintain compatibility with existing components
  quantity?: string;
  unitPrice?: number;
  unitType?: string;
  image?: string;
  rating?: number;
  reviews?: number;
  discount?: number;
}
