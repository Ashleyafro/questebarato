
import React from 'react';
import { ShoppingCart, Trash2, Plus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SortOptions from '@/components/SortOptions';
import { Checkbox } from '@/components/ui/checkbox';

const ShoppingList = () => {
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
      
      <div className="bg-zinc-800 rounded-xl overflow-hidden">
        <div className="border-b border-zinc-700 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Checkbox id="item1" className="border-zinc-600" />
              <div>
                <label htmlFor="item1" className="text-white font-medium cursor-pointer">Leche desnatada (6 uds)</label>
                <p className="text-sm text-gray-400">Mercadona</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-500 font-medium">4,14€</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                  <Edit size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-2 ml-8 text-yellow-400 text-sm">
            ¡Ahorra 0,30€! En Carrefour está a 3,84€
          </div>
        </div>
        
        <div className="border-b border-zinc-700 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Checkbox id="item2" className="border-zinc-600" />
              <div>
                <label htmlFor="item2" className="text-white font-medium cursor-pointer">Pan de molde</label>
                <p className="text-sm text-gray-400">Carrefour</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-500 font-medium">1,20€</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                  <Edit size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Checkbox id="item3" className="border-zinc-600" />
              <div>
                <label htmlFor="item3" className="text-white font-medium cursor-pointer">Aceite de oliva (1L)</label>
                <p className="text-sm text-gray-400">Dia</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-500 font-medium">4,35€</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                  <Edit size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-zinc-800 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400">Total productos: 3</p>
            <p className="text-gray-400">Supermercados: 3</p>
          </div>
          <div className="text-right">
            <p className="text-white">Total: <span className="text-green-500 font-bold text-xl">9,69€</span></p>
            <p className="text-yellow-400 text-sm">¡Ahorro estimado: 0,30€!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
