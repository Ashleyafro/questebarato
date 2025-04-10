
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="bg-zinc-800 py-3 border-b border-zinc-700">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSearch} className="flex w-full gap-2">
          <div className="relative flex-grow">
            <Input 
              className="w-full pl-10 pr-4 py-2 bg-zinc-700 border-zinc-600 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
          </div>
          <Button type="submit" className="bg-[#4CAF50] hover:bg-[#8BC34A] text-white rounded-full">
            Buscar
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
