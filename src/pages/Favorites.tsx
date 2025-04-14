
import React from 'react';

const Favorites = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-6">Tus favoritos</h1>
      <div className="bg-[#1E1E1E] rounded-lg p-5">
        <p className="text-gray-400">No tienes productos favoritos aún.</p>
      </div>
    </div>
  );
};

export default Favorites;
