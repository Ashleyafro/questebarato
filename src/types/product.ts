
export interface Product {
  id: string;
  name: string;
  quantity: string;
  price: number;
  unitPrice: number;
  unitType: string;
  supermarket: string;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
  category: string;
}
