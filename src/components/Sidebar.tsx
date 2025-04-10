
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Bell, ShoppingCart, QrCode, User, Menu } from 'lucide-react';
import { 
  Sidebar as ShadcnSidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Sidebar = () => {
  const isMobile = useIsMobile();

  return (
    <ShadcnSidebar className="bg-[#22d87d] border-r-0">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/f22c54a3-dcd7-4299-93ba-4aa9058980f6.png" 
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
      </SidebarContent>
      <SidebarFooter className="mt-auto p-4">
        <SidebarMenuButton asChild tooltip="Mi cuenta">
          <Link to="/cuenta" className="text-white hover:bg-[#33E29B] hover:text-white">
            <User size={20} />
            <span>Mi cuenta</span>
          </Link>
        </SidebarMenuButton>
        <div className="mt-4 flex justify-center">
          <Button variant="outline" className="w-full bg-purple-700 hover:bg-purple-800 text-white border-none rounded-xl">
            <span>Iniciar sesión</span>
          </Button>
        </div>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default Sidebar;
