
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Alerts from "./pages/Alerts";
import ShoppingList from "./pages/ShoppingList";
import QrScanner from "./pages/QrScanner";
import UserAccount from "./pages/UserAccount";
import RecentSearches from "./pages/RecentSearches";
import Favorites from "./pages/Favorites";
import FeaturedOffers from "./pages/FeaturedOffers";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="alertas" element={<Alerts />} />
            <Route path="lista" element={<ShoppingList />} />
            <Route path="qr" element={<QrScanner />} />
            <Route path="cuenta" element={<UserAccount />} />
            <Route path="recientes" element={<RecentSearches />} />
            <Route path="favoritos" element={<Favorites />} />
            <Route path="ofertas" element={<FeaturedOffers />} />
            <Route path="producto/:id" element={<ProductDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
