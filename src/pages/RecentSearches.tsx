
import React from 'react';

const RecentSearches = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-6">Búsquedas recientes</h1>
      <div className="bg-[#1E1E1E] rounded-lg p-5">
        <p className="text-gray-400">No tienes búsquedas recientes aún.</p>
      </div>
    </div>
  );
};

export default RecentSearches;
