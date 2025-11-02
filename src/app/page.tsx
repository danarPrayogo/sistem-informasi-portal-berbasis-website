import Link from 'next/link';
import prisma from '@/lib/prisma';

export const revalidate = 0;
// 2. Fungsi untuk mengambil data dari Database
// (Ini berjalan di server)
async function getQuickPortalStatus() {
  try {
    const portals = await prisma.portalStatus.findMany({
      orderBy: { portalId: 'asc' }, // Urutkan berdasarkan nama/ID
      select: {
        id: true,
        portalId: true, // Asumsi ini adalah nama portal
        status: true,
        lastUpdated: true,
      },
    });
    return portals;
  } catch (error) {
    console.error('Gagal mengambil status portal:', error);
    return []; // Kembalikan array kosong jika gagal
  }
}

// 3. Komponen Halaman (React Server Component)
export default async function HomePage() {

  // 4. Ambil data saat halaman dimuat
  const portals = await getQuickPortalStatus();

  return (
    <>
      {/* Hero Section (dari HTML Anda) */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Selamat Datang di
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Perumahan Sejahtera Desa Hajimena
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Sistem informasi portal untuk keamanan dan kenyamanan bersama warga perumahan
            </p>
            {/* Menggunakan <Link> */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/status-portal" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                <i className="fas fa-eye mr-2"></i>Lihat Status Portal
              </Link>
              <Link href="/tentang" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all transform hover:scale-105">
                <i className="fas fa-info-circle mr-2"></i>Tentang Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Status Preview (Data dari Prisma) */}
      <section className="py-12 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Status Portal Saat Ini
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Informasi real-time status portal perumahan
            </p>
          </div>

          {/* INI PENGGANTI `loadQuickStatusPortal()` */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portals.map((portal) => (
              <div
                key={portal.id}
                className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all transform hover:scale-105 border-l-4 ${
                  portal.status ? 'border-green-500' : 'border-red-500'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {portal.portalId}
                  </h3>
                  <span className="text-2xl">
                    {portal.status ? (
                      <i className="fas fa-lock-open text-green-500"></i>
                    ) : (
                      <i className="fas fa-lock text-red-500"></i>
                    )}
                  </span>
                </div>
                <div className="mb-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      portal.status
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {portal.status ? '✅ Dibuka' : '🔒 Ditutup'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  <i className="fas fa-clock mr-1"></i>
                  {portal.lastUpdated.toLocaleString('id-ID', { timeStyle: 'short', dateStyle: 'short' })}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/status-portal" className="inline-flex items-center text-primary hover:text-primary-dark font-semibold transition-colors">
              Lihat Detail Status Portal
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section (Static) */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Fitur Sistem Portal
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Sistem informasi portal yang modern, mudah digunakan, dan dapat diandalkan
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-sync text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Update Real-Time
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Status portal diperbarui secara real-time untuk informasi yang akurat
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-mobile-alt text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Responsif
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Diakses dengan mudah melalui berbagai perangkat, mobile friendly
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-shield-alt text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Aman Terpercaya
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sistem keamanan berbasis website untuk menjaga keamanan perumahan menjadi lebih baik
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section (Static) */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Butuh Bantuan?</h2>
          <p className="text-xl mb-8 opacity-90">
            Hubungi pengurus perumahan untuk informasi lebih lanjut
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tentang" className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              <i className="fas fa-phone mr-2"></i>Kontak Kami
            </Link>
            <Link href="/status-portal" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
              <i className="fas fa-gate mr-2"></i>Status Portal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
