
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Bell, ShoppingCart, QrCode, User, Search, Heart, Star, X } from 'lucide-react';
import { 
  Sidebar as ShadcnSidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import LoginForm from '@/components/LoginForm';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Sidebar = () => {
  const isMobile = useIsMobile();

  return (
    <ShadcnSidebar className="bg-[#00D37A] border-r-0">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/b7322861-20d0-467b-8400-448cc488269c.png" 
            alt="QuesteBarato Logo" 
            className="h-16 w-16 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/64x64/00D37A/FFFFFF?text=QB";
            }}
          />
          {!isMobile && (
            <div>
              <h1 className="text-xl font-bold text-white">
                Queste<span className="text-black">Barato</span>
              </h1>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Inicio">
              <Link to="/" className="text-white hover:bg-[#33E29B] hover:text-white">
                <Home size={20} />
                <span>Inicio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Alertas">
              <Link to="/alertas" className="text-white hover:bg-[#8BC34A] hover:text-white">
                <Bell size={20} />
                <span>Alertas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Lista de compra">
              <Link to="/lista" className="text-white hover:bg-[#8BC34A] hover:text-white">
                <ShoppingCart size={20} />
                <span>Lista de compra</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Escanear QR">
              <Link to="/qr" className="text-white hover:bg-[#8BC34A] hover:text-white">
                <QrCode size={20} />
                <span>Escanear QR</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        {/* New "Para ti" section */}
        <div className="mt-4">
          <h2 className="px-3 text-sm font-semibold text-white/80 mb-2">Para ti</h2>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Búsquedas recientes">
                <Link to="/recientes" className="text-white hover:bg-[#33E29B] hover:text-white">
                  <Search size={20} />
                  <span>Búsquedas recientes</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Favoritos">
                <Link to="/favoritos" className="text-white hover:bg-[#33E29B] hover:text-white">
                  <Heart size={20} />
                  <span>Favoritos</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Ofertas destacadas">
                <Link to="/ofertas" className="text-white hover:bg-[#33E29B] hover:text-white">
                  <Star size={20} />
                  <span>Ofertas destacadas</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="mt-auto p-4">
        <SidebarMenuButton asChild tooltip="Mi cuenta">
          <Link to="/cuenta" className="text-white hover:bg-[#33E29B] hover:text-white">
            <User size={20} />
            <span>Mi cuenta</span>
          </Link>
        </SidebarMenuButton>
        <div className="mt-4 flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full bg-purple-700 hover:bg-purple-800 text-white border-none rounded-xl">
                <span>Iniciar sesión</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-700">
              <LoginForm />
            </DialogContent>
          </Dialog>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default Sidebar;
