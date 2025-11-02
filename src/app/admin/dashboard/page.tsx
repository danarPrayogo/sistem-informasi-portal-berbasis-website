import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';

// --- FUNGSI PENGAMBILAN DATA ---
async function getDashboardData() {
  const portals = await prisma.portalStatus.findMany({
    orderBy: { portalId: 'asc' }, // Urutkan agar konsisten
  });

  const openCount = portals.filter((p) => p.status === true).length;
  const closedCount = portals.filter((p) => p.status === false).length;

  const lastUpdate = await prisma.portalStatus.findFirst({
    orderBy: { lastUpdated: 'desc' },
    select: { lastUpdated: true },
  });

  return {
    portals,
    stats: {
      openCount,
      closedCount,
      lastUpdate: lastUpdate?.lastUpdated || new Date(),
    },
  };
}

async function getActivityLogs() {
  const logs = await prisma.activityLog.findMany({
    take: 10,
    orderBy: { timestamp: 'desc' },
  });
  return logs;
}

async function getCCTVConfig() {
  const config = await prisma.cCTVConfig.findFirst();
  return config;
}



// --- FUNGSI AKSI SERVER ---
async function updatePortalStatus(formData: FormData) {
  'use server';

  const portalId = formData.get('portalId') as string;
  const newStatus = formData.get('status') === 'true';
  const adminUsername = 'Admin';

  try {
    await prisma.portalStatus.update({
      where: { id: portalId },
      data: {
        status: newStatus,
        lastUpdated: new Date(),
        updatedBy: adminUsername,
      },
    });

    await prisma.activityLog.create({
      data: {
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        portalId: portalId,
        action: `Portal ${portalId} ${newStatus ? 'dibuka' : 'ditutup'} oleh ${adminUsername}`,
        adminUsername: adminUsername,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error('Gagal update status portal:', error);
  }

  revalidatePath('/admin/dashboard');
  revalidatePath('/'); // ✅ Tambahkan ini agar beranda ikut diperbarui
  revalidatePath('/status-portal'); // ✅ Tambahkan ini juga jika halaman /status-portal menampilkan data portal
}

async function updateAllPortals(formData: FormData) {
  'use server';

  const newStatus = formData.get('status') === 'true';
  const adminUsername = 'Admin';

  try {
    await prisma.portalStatus.updateMany({
      data: {
        status: newStatus,
        lastUpdated: new Date(),
        updatedBy: adminUsername,
      },
    });

    await prisma.activityLog.create({
      data: {
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        action: `Semua portal ${newStatus ? 'dibuka' : 'ditutup'} oleh ${adminUsername}`,
        adminUsername: adminUsername,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error('Gagal update semua portal:', error);
  }

  revalidatePath('/admin/dashboard');
  revalidatePath('/'); // ✅ Tambahkan ini agar beranda ikut diperbarui
  revalidatePath('/status-portal'); // ✅ Tambahkan ini juga
}

async function updateCCTVConfig(formData: FormData) {
  'use server';

  const url = formData.get('url') as string;
  const adminUsername = 'Admin';

  try {
    const existingConfig = await prisma.cCTVConfig.findFirst();

    if (existingConfig) {
      await prisma.cCTVConfig.update({
        where: { id: existingConfig.id },
        data: { url: url || null },
      });
    } else {
      await prisma.cCTVConfig.create({
        data: {
          url: url || null,
        },
      });
    }

    await prisma.activityLog.create({
      data: {
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        action: `Link CCTV diperbarui oleh ${adminUsername}`,
        adminUsername: adminUsername,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error('Gagal update konfigurasi CCTV:', error);
  }

  revalidatePath('/admin/dashboard');
  revalidatePath('/cctv');
}

// --- KOMPONEN HALAMAN UTAMA (JSX) ---
export default async function DashboardPage() {
  const session = await requireAuth();
  const { portals, stats } = await getDashboardData();
  const logs = await getActivityLogs();
  const cctvConfig = await getCCTVConfig();


  return (
    <>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                <i className="fas fa-tachometer-alt mr-3"></i>Dashboard Admin
              </h1>
              <p className="opacity-90">Kelola status portal perumahan secara real-time</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-75">Login sebagai:</p>
              <p className="font-semibold">{session.username}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard icon="fa-door-open" color="blue" title="Total Portal" value={portals.length.toString()} />
            <StatCard icon="fa-lock-open" color="green" title="Dibuka" value={stats.openCount.toString()} />
            <StatCard icon="fa-lock" color="red" title="Ditutup" value={stats.closedCount.toString()} />
            <StatCard icon="fa-clock" color="purple" title="Update Terakhir" value={stats.lastUpdate.toLocaleTimeString('id-ID', { timeZone: 'Asia/jakarta'})} />
          </div>
        </div>
      </section>

      {/* Portal Control Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              <i className="fas fa-sliders-h mr-2 text-primary"></i>Kontrol Portal
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portals.map((portal) => (
                <div
                  key={portal.id}
                  className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border-l-4 ${
                    portal.status ? 'border-green-500' : 'border-red-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{portal.portalId}</h3>
                    <span className="text-2xl">
                      {portal.status ? (
                        <i className="fas fa-lock-open text-green-500"></i>
                      ) : (
                        <i className="fas fa-lock text-red-500"></i>
                      )}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Terakhir update: {portal.lastUpdated.toLocaleString('id-ID', {timeZone: 'Asia/Jakarta'})} oleh {portal.updatedBy}
                  </p>

                  <div className="flex space-x-2">
                    <form action={updatePortalStatus}>
                      <input type="hidden" name="portalId" value={portal.id} />
                      <input type="hidden" name="status" value="true" />
                      <button
                        type="submit"
                        disabled={portal.status === true}
                        className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center disabled:bg-gray-300 disabled:dark:bg-gray-600 disabled:cursor-not-allowed"
                      >
                        <i className="fas fa-lock-open mr-2"></i>Buka
                      </button>
                    </form>

                    <form action={updatePortalStatus}>
                      <input type="hidden" name="portalId" value={portal.id} />
                      <input type="hidden" name="status" value="false" />
                      <button
                        type="submit"
                        disabled={portal.status === false}
                        className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center disabled:bg-gray-300 disabled:dark:bg-gray-600 disabled:cursor-not-allowed"
                      >
                        <i className="fas fa-lock mr-2"></i>Tutup
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CCTV Configuration Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              <i className="fas fa-video mr-2 text-primary"></i>Konfigurasi CCTV
            </h2>
            <form action={updateCCTVConfig} className="space-y-4">
              <div>
                <label htmlFor="cctvUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Link Embed CCTV Livestream
                </label>
                <input
                  type="url"
                  id="cctvUrl"
                  name="url"
                  defaultValue={cctvConfig?.url || ''}
                  placeholder="https://example.com/embed/cctv"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Masukkan URL embed untuk livestream CCTV (misalnya dari YouTube, Vimeo, atau platform CCTV lainnya)
                </p>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors flex items-center"
              >
                <i className="fas fa-save mr-2"></i>Simpan Konfigurasi
              </button>
            </form>
          </div>
        </div>
      </section>



      {/* Quick Actions */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              <i className="fas fa-bolt mr-2 text-primary"></i>Aksi Cepat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <form action={updateAllPortals}>
                <input type="hidden" name="status" value="true" />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group"
                >
                  <i className="fas fa-lock-open text-green-600 dark:text-green-400 text-xl mr-3"></i>
                  <div className="text-left">
                    <p className="font-semibold text-green-800 dark:text-green-300">Buka Semua</p>
                  </div>
                </button>
              </form>

              <form action={updateAllPortals}>
                <input type="hidden" name="status" value="false" />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors group"
                >
                  <i className="fas fa-lock text-red-600 dark:text-red-400 text-xl mr-3"></i>
                  <div className="text-left">
                    <p className="font-semibold text-red-800 dark:text-red-300">Tutup Semua</p>
                  </div>
                </button>
              </form>

              <Link
                href="/status-portal"
                target="_blank"
                className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
              >
                <i className="fas fa-external-link-alt text-blue-600 dark:text-blue-400 text-xl mr-3"></i>
                <div className="text-left">
                  <p className="font-semibold text-blue-800 dark:text-blue-300">Lihat Publik</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Komponen StatCard
function StatCard({ icon, color, title, value }: { icon: string; color: string; title: string; value: string }) {
  const colors = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
    red: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 ${colors[color] || colors.blue} rounded-lg`}>
          <i className={`fas ${icon} text-xl`}></i>
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p
            className={`text-2xl font-bold ${
              title === 'Dibuka'
                ? 'text-green-600'
                : title === 'Ditutup'
                ? 'text-red-600'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
