
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
    { id: 'mercadona', name: 'Mercadona', color: 'supermarket-green' },
    { id: 'dia', name: 'Dia', color: 'supermarket-red' },
    { id: 'carrefour', name: 'Carrefour', color: 'supermarket-blue' }
  ];

  const handleToggleSupermarket = (id: string) => {
    if (selectedSupermarkets.includes(id)) {
      onFilterChange(selectedSupermarkets.filter(s => s !== id));
    } else {
      onFilterChange([...selectedSupermarkets, id]);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-3 items-center">
        <h3 className="text-lg font-medium">Filtrar por supermercado:</h3>
        
        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                <span>Filtrar</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-4">
                {supermarkets.map(supermarket => (
                  <div key={supermarket.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`sm-mobile-${supermarket.id}`}
                      checked={selectedSupermarkets.includes(supermarket.id)}
                      onCheckedChange={() => handleToggleSupermarket(supermarket.id)}
                    />
                    <Label htmlFor={`sm-mobile-${supermarket.id}`}>{supermarket.name}</Label>
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
              className={`flex items-center gap-2 ${selectedSupermarkets.includes(supermarket.id) ? `bg-${supermarket.color} hover:bg-${supermarket.color}/90` : ''}`}
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
