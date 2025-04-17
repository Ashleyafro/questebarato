
import React from 'react';
import { PlusCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Alerts = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Alertas</h1>
        <Button className="bg-[#27AE60] hover:bg-[#219653] text-white rounded-full">
          <PlusCircle className="mr-2" size={18} />
          Nueva alerta
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white flex items-center">
              <Bell size={18} className="mr-2 text-[#27AE60]" />
              Aceite de oliva
            </h3>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Activa</span>
          </div>
          <p className="text-sm text-gray-300 mb-2">Precio objetivo: 4,50€</p>
          <p className="text-sm text-gray-300 mb-2">Supermercados: Mercadona, Carrefour</p>
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-zinc-700 mr-2">Editar</Button>
            <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-zinc-700">Eliminar</Button>
          </div>
        </div>
        
        <div className="bg-zinc-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white flex items-center">
              <Bell size={18} className="mr-2 text-[#27AE60]" />
              Leche desnatada
            </h3>
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Activa</span>
          </div>
          <p className="text-sm text-gray-300 mb-2">Precio objetivo: 0,75€</p>
          <p className="text-sm text-gray-300 mb-2">Supermercados: Todos</p>
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-zinc-700 mr-2">Editar</Button>
            <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-zinc-700">Eliminar</Button>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-bold text-white mb-4">Notificaciones</h2>
        <div className="bg-zinc-800 rounded-xl p-4">
          <div className="space-y-4">
            <div className="border-b border-zinc-700 pb-3">
              <div className="flex items-start">
                <Bell className="text-[#27AE60] mr-3 mt-1" size={18} />
                <div>
                  <p className="text-white">¡El aceite de oliva ha bajado a 4,35€ en Mercadona!</p>
                  <p className="text-sm text-gray-400">Hace 2 horas</p>
                </div>
              </div>
            </div>
            <div className="border-b border-zinc-700 pb-3">
              <div className="flex items-start">
                <Bell className="text-[#27AE60] mr-3 mt-1" size={18} />
                <div>
                  <p className="text-white">La leche desnatada está en oferta a 0,69€ en Carrefour</p>
                  <p className="text-sm text-gray-400">Ayer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
