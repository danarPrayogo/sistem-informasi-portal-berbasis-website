import Link from 'next/link';
import prisma from '@/lib/prisma';

async function ManagementCards() {
  const management = [
    {
      id: 1,
      name: "Ahmad Sholeh S.Kom",
      position: "Ketua RT 09",
      phone: "0822-8161-61661"
    },
    {
      id: 2,
      name: "Admin",
      position: "pengelola Sistem Portal",
      phone: "0881-3298-588"
    },
    {
      id: 3,
      name: "Satpam",
      position: "Petugas Keamanan",
      phone: "0814-5678-9012"
    }
  ];

  return (
    <>
      {management.map((person) => (
        <div key={person.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-user text-2xl text-primary"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{person.name}</h3>
          <p className="text-primary font-medium mb-2">{person.position}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <i className="fas fa-phone mr-1"></i>{person.phone}
          </p>
        </div>
      ))}
    </>
  );
}

export default async function TentangPage() {
  return (
    <>
      {/* Bagian Header Hero */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <i className="fas fa-info-circle mr-4"></i>Tentang Kami
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Mengenal lebih dekat Perumahan Sejahtera Desa Hajimena
            </p>
          </div>
        </div>
      </section>

      {/* Bagian Deskripsi Perumahan */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Perumahan Sejahtera Desa Hajimena
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p className="leading-relaxed">
                  Perumahan Sejahtera Desa Hajimena adalah kompleks perumahan modern yang terletak di heart of Desa Hajimena. 
                  Didirikan dengan visi menciptakan lingkungan hunian yang aman, nyaman, dan harmonis bagi seluruh warga.
                </p>
                <p className="leading-relaxed">
                  Dengan konsep "One Gate System", kami memastikan keamanan dan ketertiban lingkungan melalui pengelolaan 
                  4 portal utama yang dapat dipantau secara real-time. Sistem portal ini dirancang untuk memberikan kenyamanan 
                  maksimal bagi warga sekaligus menjaga keamanan lingkungan.
                </p>
                <p className="leading-relaxed">
                  Perumahan kami dilengkapi dengan berbagai fasilitas umum seperti taman bermain, area olahraga, dan ruang 
                  komunitas yang mendukung gaya hidup sehat dan interaksi sosial yang positif antar warga.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                {/* ... (Konten 4 Poin Keunggulan) ... */}
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <i className="fas fa-shield-alt text-green-600 dark:text-green-400"></i>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Keamanan 24/7</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">System portal terpadu</p>
                    </div>
                </div>
                {/* ... (Tambahkan 3 poin lainnya di sini) ... */}
              </div>
            </div>
            
            <div className="relative">
              {/* ... (Konten Kartu Perumahan Sejahtera) ... */}
              <div className="bg-gradient-to-br from-primary/20 to-primary-dark/20 rounded-2xl p-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                    <i className="fas fa-building text-6xl text-primary mb-4"></i>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Perumahan Sejahtera
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Desa Hajimena
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian Lokasi & Akses */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              <i className="fas fa-map-marker-alt mr-3 text-primary"></i>Lokasi & Akses
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Strategis dan mudah diakses dari berbagai arah
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              {/* ... (Konten Info Lokasi, Alamat, GPS, Aksesibilitas) ... */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Informasi Lokasi
              </h3>
              <div className="space-y-4">
                {/* (Detail Alamat) */}
                <div className="flex items-start space-x-3">
                    <i className="fas fa-map-pin text-primary mt-1"></i>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Alamat Lengkap</p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Jl. H. Komarudin, Perumahan Sejahtera, Desa Hajimena, Kecamatan Natar, Kabupaten Lampung Selatan, Provinsi Lampung
                        </p>
                    </div>
                </div>

                {/* (Detail Koordinat GPS) */}
                <div className="flex items-start space-x-3">
                    <i className="fas fa-globe text-primary mt-1"></i>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Koordinat GPS</p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Latitude: -5.34685° S | Longitude: 105.24001° E
                        </p>
                    </div>
                </div>

                {/* (Detail Aksesibilitas) */}
                <div className="flex items-start space-x-3">
                    <i className="fas fa-route text-primary mt-1"></i>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Aksesibilitas</p>
                        <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• 15 menit dari pusat kota</li>
                            <li>• 10 menit dari rumah sakit terdekat</li>
                            <li>• 5 menit dari pasar tradisional</li>
                            <li>• 10 menit dari Mall terdekat</li>
                        </ul>
                    </div>
                </div>
              </div>
            </div>
            
            {/* Google Maps Embed */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4887.990913659389!2d105.23730257538722!3d-5.34615741588907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c56a23b742c3%3A0x7ea5a172a10e46c5!2sSEJAHTERA!5e1!3m2!1sid!2sid!4v1761714222490!5m2!1sid!2sid" 
              className="w-full h-[450px] lg:h-full rounded-xl shadow-md" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </section>

      {/* Bagian Pengurus Perumahan */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              <i className="fas fa-users-cog mr-3 text-primary"></i>Pengurus Perumahan
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Tim pengurus yang berdedikasi untuk kemajuan perumahan
            </p>
          </div>

          {/* Bagian Struktur Pengurus - Static 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ManagementCards />
          </div>
        </div>
      </section>

    </>
  );
}
