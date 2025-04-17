
import React from 'react';
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  return (
    <header className="bg-zinc-800 py-3 border-b border-zinc-700 mb-5">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-white text-lg font-bold">QuesteBarato</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
