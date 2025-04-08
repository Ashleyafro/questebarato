
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export type SortOption = 'price-asc' | 'price-desc' | 'unit-price-asc' | 'unit-price-desc';

interface SortOptionsProps {
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ sortBy, onSortChange }) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="text-sm font-medium">Ordenar por:</span>
      <Select
        value={sortBy}
        onValueChange={(value) => onSortChange(value as SortOption)}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Seleccionar orden" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price-asc">Precio: más bajo primero</SelectItem>
          <SelectItem value="price-desc">Precio: más alto primero</SelectItem>
          <SelectItem value="unit-price-asc">Precio por unidad: más bajo primero</SelectItem>
          <SelectItem value="unit-price-desc">Precio por unidad: más alto primero</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortOptions;
