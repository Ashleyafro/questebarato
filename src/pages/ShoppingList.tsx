
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, Plus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SortOptions from '@/components/SortOptions';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface ShoppingListItem {
  id: string;
  name: string;
  price: number;
  quantity: string;
  supermarket: string;
  checked?: boolean;
}

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [sortBy, setSortBy] = useState<string>("price-asc");
  const [selectedSupermarkets, setSelectedSupermarkets] = useState<string[]>(["Todos"]);
  
  // Load shopping list from local storage
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('shoppingList') || '[]');
    setShoppingList(storedList.map((item: any) => ({ ...item, checked: false })));
  }, []);
  
  // Save shopping list to local storage whenever it changes
  useEffect(() => {
    if (shoppingList.length > 0) {
      localStorage.setItem('shoppingList', JSON.stringify(
        shoppingList.map(({ checked, ...item }) => item) // Remove checked property when saving
      ));
    }
  }, [shoppingList]);
  
  // Toggle item checked status
  const toggleItemChecked = (id: string) => {
    setShoppingList(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  
  // Remove item from shopping list
  const removeItem = (id: string) => {
    setShoppingList(prev => prev.filter(item => item.id !== id));
    toast.success('Producto eliminado de la lista');
  };
  
  // Filter by supermarket
  const filterBySupermarket = (items: ShoppingListItem[]) => {
    if (selectedSupermarkets.includes("Todos")) {
      return items;
    }
    return items.filter(item => selectedSupermarkets.includes(item.supermarket));
  };
  
  // Sort items
  const sortItems = (items: ShoppingListItem[]) => {
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  };
  
  // Get filtered and sorted items
  const getFilteredAndSortedItems = () => {
    return sortItems(filterBySupermarket(shoppingList));
  };
  
  // Calculate totals
  const calculateTotals = () => {
    const filteredItems = getFilteredAndSortedItems();
    const total = filteredItems.reduce((sum, item) => sum + item.price, 0);
    const uniqueSupermarkets = [...new Set(filteredItems.map(item => item.supermarket))];
    
    return {
      totalItems: filteredItems.length,
      totalAmount: total,
      supermarketCount: uniqueSupermarkets.length
    };
  };
  
  const totals = calculateTotals();
  
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
            <Button 
              variant="outline" 
              className={`${selectedSupermarkets.includes("Todos") ? "bg-supermarket-green text-white" : "bg-zinc-700 text-white border-zinc-600"} hover:bg-zinc-600 hover:text-white`}
              onClick={() => setSelectedSupermarkets(["Todos"])}
            >
              Todos
            </Button>
            <Button 
              variant="outline" 
              className={`${selectedSupermarkets.includes("Mercadona") ? "bg-supermarket-green text-white" : "bg-zinc-700 text-white border-zinc-600"} hover:bg-zinc-600 hover:text-white`}
              onClick={() => {
                if (selectedSupermarkets.includes("Todos")) {
                  setSelectedSupermarkets(["Mercadona"]);
                } else if (selectedSupermarkets.includes("Mercadona")) {
                  const filtered = selectedSupermarkets.filter(s => s !== "Mercadona");
                  setSelectedSupermarkets(filtered.length ? filtered : ["Todos"]);
                } else {
                  setSelectedSupermarkets([...selectedSupermarkets, "Mercadona"]);
                }
              }}
            >
              Mercadona
            </Button>
            <Button 
              variant="outline" 
              className="bg-zinc-700 text-white border-zinc-600 hover:bg-zinc-600 hover:text-white"
            >
              +
            </Button>
          </div>
        </div>
        <SortOptions sortBy={sortBy} onSortChange={(option) => setSortBy(option)} />
      </div>
      
      {getFilteredAndSortedItems().length > 0 ? (
        <div className="bg-zinc-800 rounded-xl overflow-hidden">
          {getFilteredAndSortedItems().map((item, index) => (
            <div key={item.id} className={`${index !== getFilteredAndSortedItems().length - 1 ? "border-b border-zinc-700" : ""} p-4`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Checkbox 
                    id={`item-${item.id}`} 
                    className="border-zinc-600" 
                    checked={item.checked}
                    onCheckedChange={() => toggleItemChecked(item.id)}
                  />
                  <div>
                    <label 
                      htmlFor={`item-${item.id}`} 
                      className={`${item.checked ? "line-through text-gray-400" : "text-white"} font-medium cursor-pointer`}
                    >
                      {item.name} ({item.quantity})
                    </label>
                    <p className="text-sm text-gray-400">{item.supermarket}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-500 font-medium">{item.price.toFixed(2)}€</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-400 hover:text-red-300"
                      onClick={() => removeItem(item.id)}
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
          <ShoppingCart className="mx-auto mb-4 text-gray-500" size={48} />
          <h3 className="text-xl font-medium text-white mb-2">Tu lista de compra está vacía</h3>
          <p className="text-gray-400">Añade productos desde el catálogo haciendo clic en el icono de la cesta</p>
        </div>
      )}
      
      <div className="bg-zinc-800 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400">Total productos: {totals.totalItems}</p>
            <p className="text-gray-400">Supermercados: {totals.supermarketCount}</p>
          </div>
          <div className="text-right">
            <p className="text-white">Total: <span className="text-green-500 font-bold text-xl">{totals.totalAmount.toFixed(2)}€</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
