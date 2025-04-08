
import React from 'react';
import { Check, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CategoryFilterProps {
  selectedCategories: string[];
  availableCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategories, 
  availableCategories,
  onCategoryChange 
}) => {
  const handleToggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const handleSelectAll = () => {
    onCategoryChange([...availableCategories]);
  };

  const handleClearAll = () => {
    onCategoryChange([]);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 items-center">
        <h3 className="text-lg font-medium text-white">Categorías:</h3>
        
        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-zinc-800 border-none hover:bg-zinc-700 text-white">
                <Tag size={16} />
                <span>Categorías</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-zinc-800 border-zinc-700">
              <div className="space-y-4">
                <div className="flex justify-between mb-2">
                  <Button 
                    variant="link" 
                    onClick={handleSelectAll}
                    className="text-[#27AE60] p-0 h-auto"
                  >
                    Seleccionar todo
                  </Button>
                  <Button 
                    variant="link" 
                    onClick={handleClearAll}
                    className="text-white p-0 h-auto"
                  >
                    Limpiar
                  </Button>
                </div>
                
                {availableCategories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`cat-mobile-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleToggleCategory(category)}
                      className="data-[state=checked]:bg-[#27AE60] data-[state=checked]:border-[#27AE60]"
                    />
                    <Label 
                      htmlFor={`cat-mobile-${category}`} 
                      className="text-white capitalize"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="hidden md:flex flex-wrap gap-2">
          <Button
            variant={selectedCategories.length === availableCategories.length ? "default" : "outline"}
            className={selectedCategories.length === availableCategories.length
              ? `bg-[#27AE60] hover:bg-[#219653] text-white` 
              : 'border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700'
            }
            onClick={handleSelectAll}
          >
            Todas
          </Button>
          
          {availableCategories.map(category => (
            <Button
              key={category}
              variant={selectedCategories.includes(category) ? "default" : "outline"}
              className={selectedCategories.includes(category) 
                ? `bg-[#27AE60] hover:bg-[#219653] text-white` 
                : 'border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700'
              }
              onClick={() => handleToggleCategory(category)}
            >
              {selectedCategories.includes(category) && <Check size={16} className="mr-1" />}
              <span className="capitalize">{category}</span>
            </Button>
          ))}
          
          {selectedCategories.length > 0 && selectedCategories.length !== availableCategories.length && (
            <Button
              variant="outline"
              className="border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700"
              onClick={handleClearAll}
            >
              Limpiar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
