
import React from 'react';
import { User, Settings, LogOut, CreditCard, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UserAccount = () => {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#27AE60] rounded-full p-4">
            <User size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Mi cuenta</h1>
            <p className="text-gray-300">usuario@ejemplo.com</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-zinc-700 hover:text-white">
            <CreditCard className="mr-3" size={20} />
            Métodos de pago
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-zinc-700 hover:text-white">
            <History className="mr-3" size={20} />
            Historial de compras
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-zinc-700 hover:text-white">
            <Settings className="mr-3" size={20} />
            Configuración
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:bg-zinc-700 hover:text-red-300">
            <LogOut className="mr-3" size={20} />
            Cerrar sesión
          </Button>
        </div>
      </div>
      
      <div className="bg-zinc-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Preferencias</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white">Notificaciones</h3>
              <p className="text-sm text-gray-400">Recibir alertas sobre ofertas y descuentos</p>
            </div>
            <Button variant="outline" className="bg-[#27AE60] hover:bg-[#219653] text-white border-none">
              Activadas
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white">Supermercados favoritos</h3>
              <p className="text-sm text-gray-400">Personaliza tus supermercados preferidos</p>
            </div>
            <Button variant="outline" className="bg-zinc-700 hover:bg-zinc-600 text-white border-zinc-600">
              Configurar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
