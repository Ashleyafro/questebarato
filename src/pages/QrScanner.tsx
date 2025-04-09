
import React from 'react';
import { QrCode, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QrScanner = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 max-w-md mx-auto text-center">
      <div className="bg-zinc-800 rounded-xl p-8 w-full">
        <QrCode size={100} className="text-[#27AE60] mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-4">Escanear código QR</h1>
        <p className="text-gray-300 mb-6">
          Escanea un código QR en el supermercado para desbloquear descuentos exclusivos en tus compras.
        </p>
        <Button className="w-full bg-[#27AE60] hover:bg-[#219653] text-white rounded-full">
          <Camera className="mr-2" size={18} />
          Abrir cámara
        </Button>
      </div>
      
      <div className="bg-zinc-800 rounded-xl p-4 w-full">
        <h2 className="text-xl font-bold text-white mb-2">¿Cómo funciona?</h2>
        <ol className="text-left text-gray-300 space-y-2">
          <li className="flex items-start">
            <span className="bg-[#27AE60] text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1">1</span>
            <p>Busca los códigos QR en los pasillos del supermercado</p>
          </li>
          <li className="flex items-start">
            <span className="bg-[#27AE60] text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1">2</span>
            <p>Escanea el código con tu cámara</p>
          </li>
          <li className="flex items-start">
            <span className="bg-[#27AE60] text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-1">3</span>
            <p>¡Desbloquea descuentos exclusivos en tus productos favoritos!</p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default QrScanner;
