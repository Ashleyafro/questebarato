
export const getSupermarketColor = (supermarket: string) => {
  switch (supermarket.toLowerCase()) {
    case 'mercadona':
      return 'bg-supermarket-green';
    case 'dia':
      return 'bg-supermarket-red';
    case 'carrefour':
      return 'bg-supermarket-blue';
    default:
      return 'bg-gray-500';
  }
};

export const getCategoryEmoji = (category: string) => {
  const categoryMap: Record<string, string> = {
    'lácteos': '🥛',
    'bebidas': '🥤',
    'despensa': '🍚',
    'carnes': '🥩',
    'pescados': '🐟',
    'frutas': '🍎',
    'verduras': '🥦',
    'congelados': '❄️',
    'limpieza': '🧼',
    'higiene': '🧴',
    'mascotas': '🐾',
    'panadería': '🍞',
    'dulces': '🍫',
    'embutidos': '🥓',
    'snacks': '🍿',
    'bebés': '👶',
    'vinos': '🍷',
    'cervezas': '🍺'
  };
  
  return categoryMap[category.toLowerCase()] || '🛒';
};
