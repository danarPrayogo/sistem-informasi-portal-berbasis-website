'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import LogoutButton from './LogoutButton';

interface AdminNavigationProps {
  username: string;
}

export default function AdminNavigation({ username }: AdminNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Admin */}
          <div className="flex items-center">
            <i className="fas fa-user-shield text-white text-2xl mr-3"></i>
            <div>
              <h1 className="text-lg font-bold text-white">Admin Portal</h1>
              <p className="text-xs text-primary-foreground/80">Perumahan Sejahtera</p>
            </div>
          </div>

          {/* Menu Navigasi Admin (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/admin/dashboard" className="text-primary-foreground font-medium hover:text-primary-foreground/80 transition-colors">
              <i className="fas fa-tachometer-alt mr-2"></i>Dashboard
            </Link>
            <Link href="/status-portal" target="_blank" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <i className="fas fa-eye mr-2"></i>Lihat Status
            </Link>
          </div>

          {/* User Info & Logout (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
                <i className="fas fa-user text-primary text-sm"></i>
              </div>
              <span className="text-sm font-medium text-white">
                {username}
              </span>
            </div>
            <LogoutButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="text-white hover:text-blue-100 focus:outline-none focus:text-blue-100">
                  <i className="fas fa-bars text-xl"></i>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-primary text-primary-foreground">
                <ScrollArea className="h-full">
                  <div className="flex flex-col space-y-4 mt-8">
                    <Link
                      href="/admin/dashboard"
                      className="flex items-center px-3 py-2 text-primary-foreground font-medium hover:text-primary-foreground/80 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <i className="fas fa-tachometer-alt mr-3"></i>Dashboard
                    </Link>
                    <Link
                      href="/status-portal"
                      target="_blank"
                      className="flex items-center px-3 py-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <i className="fas fa-eye mr-3"></i>Lihat Status
                    </Link>
                    <div className="border-t border-primary-foreground/20 mt-6 pt-6">
                      <div className="flex items-center space-x-2 px-3 py-2">
                        <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
                          <i className="fas fa-user text-primary text-sm"></i>
                        </div>
                        <span className="text-sm font-medium text-primary-foreground">
                          {username}
                        </span>
                      </div>
                      <div className="px-3 py-2">
                        <LogoutButton />
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
