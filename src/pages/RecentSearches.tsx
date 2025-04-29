
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type SearchRecord = {
  id: string;
  search_term: string;
  created_at: string;
};

const RecentSearches = () => {
  const [searches, setSearches] = useState<SearchRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        const { data, error } = await supabase
          .from('search_history')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        setSearches(data || []);
      } catch (error) {
        console.error('Error fetching recent searches:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las búsquedas recientes",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecentSearches();
  }, [toast]);

  const handleSearchClick = (searchTerm: string) => {
    navigate(`/?search=${encodeURIComponent(searchTerm)}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-6">Búsquedas recientes</h1>
      <div className="bg-[#1E1E1E] rounded-lg p-5">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-supermarket-green border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : searches.length > 0 ? (
          <ul className="space-y-4">
            {searches.map((search) => (
              <li 
                key={search.id} 
                className="flex items-center justify-between p-3 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
              >
                <div className="flex items-center">
                  <Search className="h-5 w-5 text-supermarket-green mr-3" />
                  <div>
                    <p className="text-white font-medium">{search.search_term}</p>
                    <p className="text-zinc-400 text-sm">{formatDate(search.created_at)}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-zinc-700 hover:bg-zinc-600 text-white border-zinc-600"
                  onClick={() => handleSearchClick(search.search_term)}
                >
                  Buscar
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No tienes búsquedas recientes aún.</p>
        )}
      </div>
    </div>
  );
};

export default RecentSearches;
