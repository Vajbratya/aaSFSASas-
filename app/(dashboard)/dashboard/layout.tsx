'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Users, Settings, Shield, Activity, Menu } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', icon: Users, label: 'Equipe' },
    { href: '/dashboard/general', icon: Settings, label: 'Geral' },
    { href: '/dashboard/activity', icon: Activity, label: 'Atividades' },
    { href: '/dashboard/security', icon: Shield, label: 'Segurança' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#000000]">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-[#000000] border-b border-[#1d1d1d] p-4">
        <div className="flex items-center">
          <span className="font-medium text-[#fafafa]">Configurações</span>
        </div>
        <Button
          className="text-[#fafafa] hover:bg-[#1d1d1d]"
          variant="ghost"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-[#000000] border-r border-[#1d1d1d] transform transition-transform duration-300 ease-in-out z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="h-full pt-4 lg:pt-0">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant="ghost"
                  className={`w-full justify-start transition-all duration-200 text-[#888888] hover:text-[#fafafa]
                    ${pathname === item.href 
                      ? 'bg-[#1d1d1d] text-[#fafafa]' 
                      : 'hover:bg-[#1d1d1d]'}`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className={`mr-2 h-4 w-4`} />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-[#000000] pt-16 lg:pt-0">
        <div className="h-full p-6">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
