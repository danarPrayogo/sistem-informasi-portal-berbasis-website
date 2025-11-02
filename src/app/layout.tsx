import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Script from 'next/script'; // ✅ Tambahan penting untuk Font Awesome

// Konfigurasi Font
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Portal Hajimena',
  description: 'Sistem Informasi Portal - Perumahan Sejahtera Desa Hajimena',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        {/* ✅ Tambahkan Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>

      <body className="font-inter bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* ✅ Navbar responsif */}
        <Navigation />

        {/* ✅ Konten halaman */}
        <main>{children}</main>

        {/* ✅ Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <i className="fas fa-door-open text-primary text-2xl mr-3"></i>
                <h3 className="text-lg font-semibold">Portal Hajimena</h3>
              </div>
              <p className="text-gray-400 mb-4">
                © 2025 Sistem Informasi Portal – Perumahan Sejahtera Desa Hajimena
              </p>
            </div>
          </div>
        </footer>

        {/* ✅ Script Font Awesome agar ikon tampil sempurna */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/js/all.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
