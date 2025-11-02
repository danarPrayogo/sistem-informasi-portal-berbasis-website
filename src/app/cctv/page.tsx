export const revalidate = 0; // Nonaktifkan ISR untuk halaman ini
import prisma from '@/lib/prisma';

// 2. Fungsi untuk mengambil data dari Database
// (Ini akan berjalan di server, aman!)
async function getCctvConfig() {
  try {
    const config = await prisma.cCTVConfig.findFirst({
      // Anda bisa menambahkan 'where' atau 'orderBy' di sini jika perlu
    });
    return config;
  } catch (error) {
    console.error("Gagal mengambil konfigurasi CCTV:", error);
    return null;
  }
}

// 3. Komponen Halaman (React Server Component)
export default async function CctvPage() {

  // 4. Panggil fungsi data-fetching
  const cctvConfig = await getCctvConfig();

  // 5. Salin-tempel HTML Anda & ubah menjadi JSX
  return (
    <section className="py-12 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <i className="fas fa-video text-primary mr-3"></i>
            CCTV Livestream
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Pantau keamanan perumahan secara real-time melalui kamera CCTV
          </p>
        </div>

        {/* CCTV Stream Container */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 shadow-lg">
          <div className="aspect-video w-full max-w-4xl mx-auto">

            {/* INI BAGIAN DINAMISNYA */}
            {cctvConfig && cctvConfig.url ? (
              <iframe
                id="cctvIframe"
                // 6. Gunakan data dari database!
                src={cctvConfig.url}
                title="CCTV Livestream Perumahan Sejahtera"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            ) : (
              // Tampilkan pesan jika link tidak ditemukan di database
              <div className="w-full h-full rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-300">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Link CCTV tidak ditemukan di database.
                </p>
              </div>
            )}
          </div>

          {/* Stream Info */}
          {cctvConfig && cctvConfig.url && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                <i className="fas fa-circle text-green-500 mr-2 animate-pulse"></i>
                Live Stream Aktif
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm">
                Stream diperbarui secara real-time • Kualitas HD tersedia
              </p>
            </div>
          )}
        </div>

        {/* ... (Sisa HTML statis Anda, seperti "Additional Info") ... */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center">
            {/* ... Konten Kartu 1 ... */}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center">
            {/* ... Konten Kartu 2 ... */}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center">
            {/* ... Konten Kartu 3 ... */}
          </div>
        </div>
      </div>
    </section>
  );
}
