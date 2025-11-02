'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo dan Nama */}
          <div className="flex items-center">
            <i className="fas fa-door-open text-primary text-2xl mr-3"></i>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Portal Hajimena</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Perumahan Sejahtera</p>
            </div>
          </div>

          {/* Menu Navigasi (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              <i className="fas fa-home mr-2"></i>Beranda
            </Link>
            <Link href="/status-portal" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              <i className="fas fa-gate mr-2"></i>Status Portal
            </Link>
            <Link href="/cctv" className="text-primary font-medium hover:text-primary-dark transition-colors">
              <i className="fas fa-video mr-2"></i>CCTV Livestream
            </Link>
            <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              <i className="fas fa-user-shield mr-2"></i>Login Admin
            </Link>
            <Link href="/tentang" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              <i className="fas fa-info-circle mr-2"></i>Tentang Kami
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="text-gray-700 dark:text-gray-300 hover:text-primary focus:outline-none focus:text-primary">
                  <i className="fas fa-bars text-xl"></i>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <ScrollArea className="h-full">
                  <div className="flex flex-col space-y-4 mt-8">
                    <Link
                      href="/"
                      className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <i className="fas fa-home mr-3"></i>Beranda
                    </Link>
                    <Link
                      href="/status-portal"
                      className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <i className="fas fa-gate mr-3"></i>Status Portal
                    </Link>
                    <Link
                      href="/cctv"
                      className="flex items-center px-3 py-2 text-primary font-medium hover:text-primary-dark transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <i className="fas fa-video mr-3"></i>CCTV Livestream
                    </Link>
                    <Link
                      href="/login"
                      className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <i className="fas fa-user-shield mr-3"></i>Login Admin
                    </Link>
                    <Link
                      href="/tentang"
                      className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <i className="fas fa-info-circle mr-3"></i>Tentang Kami
                    </Link>
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
