'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/lib/auth';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();

  async function handleSignOut() {
    setUser(null);
    await signOut();
    router.push('/');
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/LOGOLAUDA.svg" 
              alt="Laudos.AI Logo" 
              width={40} 
              height={40}
              className="h-10 w-10"
            />
            <span className="ml-2 text-xl font-bold text-white">Laudos.AI</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              href="/pricing"
              className="text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-200"
            >
              Planos
            </Link>
            {user ? (
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full hover:bg-white/10"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage alt={user.name || ''} />
                      <AvatarFallback className="bg-white/10 text-white">
                        {user.email
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 mt-2 bg-black/95 backdrop-blur-sm border border-white/20"
                >
                  <DropdownMenuItem className="cursor-pointer text-white hover:bg-white/10 focus:bg-white/10">
                    <Link href="/dashboard" className="flex w-full items-center">
                      <Home className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-white hover:bg-white/10 focus:bg-white/10"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  asChild
                  variant="ghost"
                  className="text-white hover:bg-white/10 hover:text-white font-medium px-4 py-2 transition-all duration-200"
                >
                  <Link href="/sign-in">Entrar</Link>
                </Button>
                <Button
                  asChild
                  variant="default"
                  className="bg-white text-black hover:bg-white/90 font-medium px-4 py-2 transition-all duration-200"
                >
                  <Link href="/sign-up">Cadastro</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-16">{children}</main>
    </div>
  );
}
