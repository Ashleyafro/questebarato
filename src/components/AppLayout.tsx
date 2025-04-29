
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import Sidebar from './Sidebar';
import Header from './Header';

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-grow p-4 bg-zinc-900">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
