'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeToggle } from './theme-toggle';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gray-100 dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo dan Nama */}
          <div className="flex items-center">
            <i className="fas fa-door-open text-gray-900 dark:text-white text-2xl mr-3" aria-hidden="true"></i>
            <div>
              <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">Portal Informasi</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Perumahan Sejahtera</p>
            </div>
          </div>

          {/* Menu Navigasi (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md px-2 py-1 transition-colors" onClick={() => window.location.reload()}>
              <span className="fas fa-home mr-2"></span>Beranda
            </Link>
            <Link href="/status-portal" className="text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md px-2 py-1 transition-colors">
              <span className="fas fa-gate mr-2"></span>Status Portal
            </Link>
            <Link href="/cctv" className="text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md px-2 py-1 transition-colors">
              <span className="fas fa-video mr-2"></span>CCTV Livestream
            </Link>
            <Link href="/login" className="text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md px-2 py-1 transition-colors">
              <span className="fas fa-user-shield mr-2"></span>Login Admin
            </Link>
            <Link href="/tentang" className="text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md px-2 py-1 transition-colors">
              <span className="fas fa-info-circle mr-2"></span>Tentang Kami
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="text-gray-800 dark:text-gray-100 hover:text-primary dark:hover:text-primary-light focus:outline-none focus:text-primary">
                  <span className="fas fa-bars text-xl"></span>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <ScrollArea className="h-full">
                  <div className="flex flex-col space-y-4 mt-8">
                    <Link
                      href="/"
                      className="flex items-center px-3 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="fas fa-home mr-3"></span>Beranda
                    </Link>
                    <Link
                      href="/status-portal"
                      className="flex items-center px-3 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="fas fa-gate mr-3"></span>Status Portal
                    </Link>
                    <Link
                      href="/cctv"
                      className="flex items-center px-3 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="fas fa-video mr-3"></span>CCTV Livestream
                    </Link>
                    <Link
                      href="/login"
                      className="flex items-center px-3 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="fas fa-user-shield mr-3"></span>Login Admin
                    </Link>
                    <Link
                      href="/tentang"
                      className="flex items-center px-3 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="fas fa-info-circle mr-3"></span>Tentang Kami
                    </Link>
                     <div className="px-3 py-2">
                      <ThemeToggle />
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
