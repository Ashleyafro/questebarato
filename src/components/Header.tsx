
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Save search to history
      try {
        await supabase
          .from('search_history')
          .insert({ search_term: searchTerm.trim() });
      } catch (error) {
        console.error('Error saving search history:', error);
      }

      // Navigate to home with search params
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="bg-zinc-800 py-3 border-b border-zinc-700 mb-5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-xl">QuesteBarato</Link>
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-zinc-700 text-white border-zinc-600 focus-visible:ring-supermarket-green focus-visible:border-supermarket-green"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-4 w-4" />
            </div>
          </form>
          <Link to="/favoritos" className="flex items-center text-white hover:text-supermarket-green transition-colors">
            <Heart className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Favoritos</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
