
import React from 'react';
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  return (
    <header className="bg-zinc-800 py-3 border-b border-zinc-700 mb-5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-white font-bold text-xl">QuesteBarato</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
