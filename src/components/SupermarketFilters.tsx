
import React from 'react';
import { Check, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SupermarketFiltersProps {
  selectedSupermarkets: string[];
  onFilterChange: (supermarkets: string[]) => void;
}

const SupermarketFilters: React.FC<SupermarketFiltersProps> = ({ 
  selectedSupermarkets, 
  onFilterChange 
}) => {
  const supermarkets = [
    { id: 'mercadona', name: 'Mercadona', color: 'bg-supermarket-green' },
    { id: 'dia', name: 'Dia', color: 'bg-supermarket-red' },
    { id: 'carrefour', name: 'Carrefour', color: 'bg-supermarket-blue' }
  ];

  const handleToggleSupermarket = (id: string) => {
    if (selectedSupermarkets.includes(id)) {
      onFilterChange(selectedSupermarkets.filter(s => s !== id));
    } else {
      onFilterChange([...selectedSupermarkets, id]);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 items-center">
        <h3 className="text-lg font-medium text-white">Supermercados:</h3>
        
        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-zinc-800 border-none hover:bg-zinc-700 text-white">
                <Filter size={16} />
                <span>Filtrar</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-zinc-800 border-zinc-700">
              <div className="space-y-4">
                {supermarkets.map(supermarket => (
                  <div key={supermarket.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`sm-mobile-${supermarket.id}`}
                      checked={selectedSupermarkets.includes(supermarket.id)}
                      onCheckedChange={() => handleToggleSupermarket(supermarket.id)}
                      className="data-[state=checked]:bg-[#27AE60] data-[state=checked]:border-[#27AE60]"
                    />
                    <Label htmlFor={`sm-mobile-${supermarket.id}`} className="text-white">{supermarket.name}</Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="hidden md:flex flex-wrap gap-2">
          {supermarkets.map(supermarket => (
            <Button
              key={supermarket.id}
              variant={selectedSupermarkets.includes(supermarket.id) ? "default" : "outline"}
              className={selectedSupermarkets.includes(supermarket.id) 
                ? `bg-[#27AE60] hover:bg-[#219653] text-white` 
                : 'border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700'
              }
              onClick={() => handleToggleSupermarket(supermarket.id)}
            >
              {selectedSupermarkets.includes(supermarket.id) && <Check size={16} />}
              {supermarket.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupermarketFilters;
