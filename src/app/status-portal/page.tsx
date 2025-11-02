import Link from 'next/link';
import prisma from '@/lib/prisma';

export const revalidate = 0; // Revalidate halaman setiap 60 detik
// 2. Fungsi untuk mengambil data dari Database
// (Ini berjalan di server)
async function getPortalData() {
  const portals = await prisma.portalStatus.findMany({
    orderBy: { portalId: 'asc' }, // Urutkan berdasarkan nama/ID
  });

  // Hitung statistik di server
  const openCount = portals.filter(p => p.status === true).length;
  const closedCount = portals.filter(p => p.status === false).length;
  const totalCount = portals.length;

  // Dapatkan data update terakhir
  const lastUpdate = await prisma.portalStatus.findFirst({
    orderBy: { lastUpdated: 'desc' },
    select: { lastUpdated: true },
  });

  return {
    portals,
    stats: {
      openCount,
      closedCount,
      totalCount,
      lastUpdate: lastUpdate?.lastUpdated || new Date(),
    },
  };
}

// 3. Komponen Halaman (React Server Component)
export default async function StatusPortalPage() {

  // 4. Ambil data saat halaman dimuat
  const { portals, stats } = await getPortalData();

  return (
    <>
      {/* Header Section (dari HTML Anda) */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <i className="fas fa-gate mr-3"></i>Status Portal Perumahan
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Informasi real-time status keempat portal Perumahan Sejahtera Desa Hajimena
            </p>
          </div>
        </div>
      </section>

      {/* Last Updated Info (Data dari Prisma) */}
      <section className="bg-white dark:bg-gray-800 py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <i className="fas fa-sync-alt mr-2"></i>
              <span>
                Terakhir diperbarui:{' '}
                <span className="font-medium">
                  {stats.lastUpdate.toLocaleString('id-ID', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </span>
              </span>
            </div>
            {/* Tombol refresh manual & auto-refresh akan kita tambahkan nanti jika perlu,
                karena itu memerlukan Client Component.
            */}
          </div>
        </div>
      </section>

      {/* Portal Status Grid (Data dari Prisma) */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* INI ADALAH PENGGANTI `document.getElementById('portalStatusContainer')`
            Kita me-render langsung di server menggunakan .map()
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portals.map((portal) => (
              <div
                key={portal.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                {/* Header Kartu */}
                <div
                  className={`bg-gradient-to-r ${
                    portal.status
                      ? 'from-green-500 to-green-600'
                      : 'from-red-500 to-red-600'
                  } p-4`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">
                      {portal.portalId} {/* Asumsi nama ada di portalId */}
                    </h3>
                    <div className="text-3xl text-white">
                      {portal.status ? (
                        <i className="fas fa-lock-open"></i>
                      ) : (
                        <i className="fas fa-lock"></i>
                      )}
                    </div>
                  </div>
                </div>

                {/* Konten Kartu */}
                <div className="p-6">
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                        portal.status
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      <span className="mr-2">{portal.status ? '✅' : '🔒'}</span>
                      {portal.status ? 'DIBUKA' : 'DITUTUP'}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {portal.status
                      ? 'Portal saat ini dalam kondisi dibuka. Kendaraan dan pejalan kaki dapat melalui portal ini.'
                      : 'Portal saat ini dalam kondisi ditutup. Tidak ada kendaraan atau pejalan kaki yang dapat melalui portal ini.'}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <i className="fas fa-clock mr-2"></i>
                      <span>
                        Terakhir diperbarui:{' '}
                        {portal.lastUpdated.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <i className="fas fa-user mr-2"></i>
                      <span>
                        Diupdate oleh: {portal.updatedBy || 'System'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section (Data dari Prisma) */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              <i className="fas fa-chart-pie mr-3 text-primary"></i>Ringkasan Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {stats.openCount}
                </div>
                <div className="text-sm text-green-800 dark:text-green-300 mt-1">
                  Portal Dibuka
                </div>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {stats.closedCount}
                </div>
                <div className="text-sm text-red-800 dark:text-red-300 mt-1">
                  Portal Ditutup
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.totalCount}
                </div>
                <div className="text-sm text-blue-800 dark:text-blue-300 mt-1">
                  Total Portal
                </div>
              </div>
            </div>
          </div>

          {/* Bagian Auto Refresh telah dihapus karena logic-nya ada di client-side.
              Kita bisa menambahkannya kembali menggunakan Client Component jika perlu.
          */}
        </div>
      </section>

      {/* Quick Actions (Gunakan <Link>) */}
      <section className="py-8 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow"
            >
              <i className="fas fa-home mr-2"></i>
              Kembali ke Beranda
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors shadow"
            >
              <i className="fas fa-user-shield mr-2"></i>
              Login Admin
            </Link>
            <Link
              href="/tentang"
              className="flex items-center justify-center bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow"
            >
              <i className="fas fa-info-circle mr-2"></i>
              Tentang Kami
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
