
import { Product } from '@/types/product';
import { toast } from 'sonner';

// Interface for shopping list items
export interface ShoppingListItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  supermarket: string;
}

// Get shopping list from localStorage
export const getShoppingList = (): ShoppingListItem[] => {
  return JSON.parse(localStorage.getItem('shoppingList') || '[]');
};

// Add product to shopping list
export const addToShoppingList = (product: Product, quantity: number = 1): void => {
  const shoppingList = getShoppingList();
  
  // Check if product already exists in the shopping list
  const existingItemIndex = shoppingList.findIndex(item => item.productId === product.id);
  
  if (existingItemIndex >= 0) {
    // Update quantity if product already exists
    shoppingList[existingItemIndex].quantity += quantity;
    toast.success('Cantidad actualizada en la lista de compra');
  } else {
    // Add new product to shopping list
    shoppingList.push({
      productId: product.id,
      quantity,
      name: product.name,
      price: product.price,
      supermarket: product.supermarket,
    });
    toast.success('Producto añadido a la lista de compra');
  }
  
  // Save updated shopping list to localStorage
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
};

// Remove product from shopping list
export const removeFromShoppingList = (productId: string): void => {
  const shoppingList = getShoppingList();
  const updatedList = shoppingList.filter(item => item.productId !== productId);
  localStorage.setItem('shoppingList', JSON.stringify(updatedList));
  toast.success('Producto eliminado de la lista de compra');
};

// Update product quantity in shopping list
export const updateShoppingListItemQuantity = (productId: string, quantity: number): void => {
  if (quantity <= 0) {
    removeFromShoppingList(productId);
    return;
  }
  
  const shoppingList = getShoppingList();
  const itemIndex = shoppingList.findIndex(item => item.productId === productId);
  
  if (itemIndex >= 0) {
    shoppingList[itemIndex].quantity = quantity;
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    toast.success('Cantidad actualizada en la lista de compra');
  }
};

// Get the total number of items in shopping list
export const getShoppingListCount = (): number => {
  const shoppingList = getShoppingList();
  return shoppingList.reduce((total, item) => total + item.quantity, 0);
};

// Check if a product is in the shopping list
export const isInShoppingList = (productId: string): boolean => {
  const shoppingList = getShoppingList();
  return shoppingList.some(item => item.productId === productId);
};
