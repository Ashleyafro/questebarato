
// Map category names to emoji icons
export const getCategoryEmoji = (category: string): string => {
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
  
  return categoryMap[category?.toLowerCase()] || '🛒';
};
