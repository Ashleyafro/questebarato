
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
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="PrecioVersus Logo" 
              className="h-12 w-auto"
              onError={(e) => {
                // Fallback if the image doesn't exist
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/120x48/4CAF50/FFFFFF?text=PrecioVersus";
              }}
            />
            <h1 className="text-2xl font-bold text-supermarket-green">PrecioVersus</h1>
          </div>
          
          <form onSubmit={handleSearch} className="flex w-full md:w-1/2 gap-2">
            <div className="relative flex-grow">
              <Input 
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-supermarket-green"
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </div>
            </div>
            <Button type="submit" className="bg-supermarket-green hover:bg-supermarket-lightGreen">
              Buscar
            </Button>
          </form>
          
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <ShoppingCart size={18} />
              <span>Mi Lista</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
