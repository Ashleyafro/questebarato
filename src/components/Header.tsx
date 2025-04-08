
import React from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSearch: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="bg-[#27AE60] py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/4bcbcdc7-6ee4-40b2-9916-8d7c5ed74b92.png" 
              alt="QuesteBarato Logo" 
              className="h-20 w-auto" // Increased height from h-14 to h-20
              onError={(e) => {
                // Fallback if the image doesn't exist
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=QB";
              }}
            />
            <div>
              <h1 className="text-3xl font-bold text-white">Queste<span className="text-black">Barato</span></h1>
              <p className="text-sm text-white/80">Compara precios entre supermercados</p>
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="flex w-full md:w-1/2 gap-2">
            <div className="relative flex-grow">
              <Input 
                className="w-full pl-10 pr-4 py-2 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </div>
            </div>
            <Button type="submit" className="bg-[#111] hover:bg-[#333] rounded-full">
              Buscar
            </Button>
          </form>
          
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white border-none rounded-full">
              <ShoppingCart size={18} />
              <span>Iniciar</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
