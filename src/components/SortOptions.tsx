
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
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-white">Ordenar por:</span>
      <Select
        value={sortBy}
        onValueChange={(value) => onSortChange(value as SortOption)}
      >
        <SelectTrigger className="w-[220px] bg-zinc-800 border-zinc-700 text-white focus:ring-[#27AE60]">
          <SelectValue placeholder="Seleccionar orden" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
          <SelectItem value="price-asc" className="focus:bg-[#27AE60] focus:text-white">Precio: más bajo primero</SelectItem>
          <SelectItem value="price-desc" className="focus:bg-[#27AE60] focus:text-white">Precio: más alto primero</SelectItem>
          <SelectItem value="unit-price-asc" className="focus:bg-[#27AE60] focus:text-white">Precio por unidad: más bajo primero</SelectItem>
          <SelectItem value="unit-price-desc" className="focus:bg-[#27AE60] focus:text-white">Precio por unidad: más alto primero</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortOptions;
