
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, Plus, Edit, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SortOptions from '@/components/SortOptions';
import { Checkbox } from '@/components/ui/checkbox';
import { getShoppingList, removeFromShoppingList, updateShoppingListItemQuantity, ShoppingListItem } from '@/utils/shoppingListUtils';

const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  
  // Load shopping list from localStorage
  useEffect(() => {
    const loadShoppingList = () => {
      const list = getShoppingList();
      setItems(list);
    };
    
    loadShoppingList();
    
    // Listen for storage changes
    window.addEventListener('storage', loadShoppingList);
    window.addEventListener('shoppingListUpdated', loadShoppingList);
    
    return () => {
      window.removeEventListener('storage', loadShoppingList);
      window.removeEventListener('shoppingListUpdated', loadShoppingList);
    };
  }, []);
  
  const handleToggleCheck = (productId: string) => {
    if (checkedItems.includes(productId)) {
      setCheckedItems(checkedItems.filter(id => id !== productId));
    } else {
      setCheckedItems([...checkedItems, productId]);
    }
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromShoppingList(productId);
    // Refresh list
    setItems(getShoppingList());
  };
  
  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateShoppingListItemQuantity(productId, newQuantity);
    // Refresh list
    setItems(getShoppingList());
  };
  
  // Calculate total price
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Count unique supermarkets
  const uniqueSupermarkets = new Set(items.map(item => item.supermarket)).size;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Lista de compra</h1>
        <div className="flex gap-2">
          <Button className="bg-[#27AE60] hover:bg-[#219653] text-white rounded-full">
            <Plus className="mr-2" size={18} />
            Añadir producto
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-800 p-4 rounded-xl">
        <div className="flex items-center gap-4">
          <span className="text-white font-medium">Supermercados:</span>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-zinc-700 text-white border-zinc-600 hover:bg-zinc-600 hover:text-white">
              Todos
            </Button>
            <Button variant="outline" className="bg-zinc-700 text-white border-zinc-600 hover:bg-zinc-600 hover:text-white">
              Mercadona
            </Button>
            <Button variant="outline" className="bg-zinc-700 text-white border-zinc-600 hover:bg-zinc-600 hover:text-white">
              +
            </Button>
          </div>
        </div>
        <SortOptions sortBy="price-asc" onSortChange={(option) => console.log(option)} />
      </div>
      
      {items.length > 0 ? (
        <div className="bg-zinc-800 rounded-xl overflow-hidden">
          {items.map((item, index) => (
            <div key={item.productId} className={`${index !== 0 ? 'border-t border-zinc-700' : ''} p-4`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Checkbox 
                    id={`item-${item.productId}`} 
                    className="border-zinc-600" 
                    checked={checkedItems.includes(item.productId)}
                    onCheckedChange={() => handleToggleCheck(item.productId)}
                  />
                  <div>
                    <label 
                      htmlFor={`item-${item.productId}`} 
                      className={`${checkedItems.includes(item.productId) ? 'line-through text-gray-400' : 'text-white'} font-medium cursor-pointer`}
                    >
                      {item.name} ({item.quantity} {item.quantity > 1 ? 'uds' : 'ud'})
                    </label>
                    <p className="text-sm text-gray-400">{item.supermarket}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-400 hover:text-white"
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                    >
                      <ChevronDown size={16} />
                    </Button>
                    <span className="text-white min-w-[1.5rem] text-center">{item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-400 hover:text-white"
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                    >
                      <ChevronUp size={16} />
                    </Button>
                  </div>
                  <span className="text-green-500 font-medium">{(item.price * item.quantity).toFixed(2)}€</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-400 hover:text-red-300"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-800 rounded-xl p-8 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <ShoppingCart size={48} className="text-gray-500" />
            <h3 className="text-xl font-medium text-white">Tu lista de compra está vacía</h3>
            <p className="text-gray-400 max-w-md">
              Añade productos a tu lista de compra para ver aquí la mejor combinación de precios entre supermercados
            </p>
            <Button className="bg-supermarket-green hover:bg-supermarket-lightGreen mt-2">
              <Plus size={16} className="mr-2" />
              Añadir productos
            </Button>
          </div>
        </div>
      )}
      
      {items.length > 0 && (
        <div className="bg-zinc-800 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Total productos: {items.length}</p>
              <p className="text-gray-400">Supermercados: {uniqueSupermarkets}</p>
            </div>
            <div className="text-right">
              <p className="text-white">Total: <span className="text-green-500 font-bold text-xl">{totalPrice.toFixed(2)}€</span></p>
              {/* You could calculate savings here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
