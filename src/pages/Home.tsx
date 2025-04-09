
import React from 'react';
import { ChevronRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Hola! Ahorra en tu compra</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-zinc-800 rounded-xl p-4">
            <h3 className="text-lg font-medium text-white mb-2">Búsquedas recientes</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between text-gray-300 p-2 hover:bg-zinc-700 rounded">
                <span>Leche</span>
                <ChevronRight size={16} />
              </li>
              <li className="flex items-center justify-between text-gray-300 p-2 hover:bg-zinc-700 rounded">
                <span>Arroz</span>
                <ChevronRight size={16} />
              </li>
              <li className="flex items-center justify-between text-gray-300 p-2 hover:bg-zinc-700 rounded">
                <span>Pan de molde</span>
                <ChevronRight size={16} />
              </li>
            </ul>
          </div>
          
          <div className="bg-zinc-800 rounded-xl p-4">
            <h3 className="text-lg font-medium text-white mb-2">Favoritos</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between text-gray-300 p-2 hover:bg-zinc-700 rounded">
                <span>Yogur natural</span>
                <span className="text-sm text-green-500">1,19€</span>
              </li>
              <li className="flex items-center justify-between text-gray-300 p-2 hover:bg-zinc-700 rounded">
                <span>Pasta</span>
                <span className="text-sm text-green-500">0,89€</span>
              </li>
              <li className="flex items-center justify-between text-gray-300 p-2 hover:bg-zinc-700 rounded">
                <span>Aceite de oliva</span>
                <span className="text-sm text-green-500">4,15€</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-zinc-800 rounded-xl p-4">
            <h3 className="text-lg font-medium text-white mb-2">Ofertas destacadas</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between text-gray-300 p-2 hover:bg-zinc-700 rounded">
                <div>
                  <span>Café</span>
                  <p className="text-xs text-gray-400">Mercadona</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-green-500">2,45€</span>
                  <p className="text-xs text-red-400 line-through">3,20€</p>
                </div>
              </li>
              <li className="flex items-center justify-between text-gray-300 p-2 hover:bg-zinc-700 rounded">
                <div>
                  <span>Pollo</span>
                  <p className="text-xs text-gray-400">Carrefour</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-green-500">3,99€</span>
                  <p className="text-xs text-red-400 line-through">5,50€</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Categorías</h2>
          <button className="text-sm text-[#27AE60]">Ver todas</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Lácteos', 'Carnicería', 'Panadería', 'Frutas', 'Bebidas', 'Limpieza'].map((category) => (
            <div key={category} className="bg-zinc-800 rounded-xl p-4 text-center hover:bg-zinc-700 cursor-pointer">
              <span className="text-white">{category}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
