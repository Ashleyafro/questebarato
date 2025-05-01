
import { Routes, Route } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import Home from '@/pages/Home';
import FeaturedOffers from '@/pages/FeaturedOffers';
import NotFound from '@/pages/NotFound';
import ProductDetail from '@/pages/ProductDetail';
import Favorites from '@/pages/Favorites';
import RecentSearches from '@/pages/RecentSearches'; 
import Alerts from '@/pages/Alerts';
import UserAccount from '@/pages/UserAccount';
import QrScanner from '@/pages/QrScanner';
import ShoppingList from '@/pages/ShoppingList';

import { Toaster } from 'sonner';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="ofertas" element={<FeaturedOffers />} />
          <Route path="producto/:id" element={<ProductDetail />} />
          <Route path="favoritos" element={<Favorites />} />
          <Route path="busquedas-recientes" element={<RecentSearches />} />
          <Route path="alertas" element={<Alerts />} />
          <Route path="cuenta" element={<UserAccount />} />
          <Route path="escanear" element={<QrScanner />} />
          <Route path="lista-compra" element={<ShoppingList />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster richColors closeButton position="top-right" />
    </>
  );
}

export default App;
