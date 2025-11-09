# Sistem Informasi Portal - Perumahan Sejahtera Desa Hajimena

Website sistem informasi portal untuk Perumahan Sejahtera Desa Hajimena yang menampilkan status buka/tutup 4 portal perumahan dengan halaman admin untuk mengelola status portal.

## 🌟 Fitur Utama

### 📱 Halaman Publik
- **Beranda** - Sambutan dan navigasi utama
- **Status Portal** - Tampilan real-time status 4 portal
- **Tentang Kami** - Profil perumahan dan kontak pengurus

### 🔐 Halaman Admin
- **Login Admin** - Autentikasi yang aman
- **Dashboard Admin** - Kontrol penuh status portal
- **Log Aktivitas** - Pencatatan semua perubahan status

### ⚡ Fitur Tambahan
- **Dark Mode** - Tema gelap/terang
- **Responsive Design** - Optimal di semua perangkat
- **Real-time Updates** - Auto refresh setiap 30 detik
- **Toast Notifications** - Notifikasi interaktif
- **Loading States** - Indikator proses yang jelas
- **Keyboard Shortcuts** - Pintasan keyboard

## 🏗️ Struktur Portal

### 4 Portal yang Dikelola:
1. **Portal Utama** - Akses masuk utama perumahan
2. **Portal Belakang 1** - Akses alternatif belakang
3. **Portal Belakang 2** - Akses alternatif belakang
4. **Portal Belakang 3** - Akses alternatif belakang

### Status Portal:
- ✅ **Dibuka** (Hijau) - Portal dapat dilalui
- 🔒 **Ditutup** (Merah) - Portal tidak dapat dilalui

## 🛠️ Teknologi yang Digunakan

### Frontend
- **HTML5** - Struktur halaman
- **Tailwind CSS** - Styling modern
- **JavaScript (Vanilla)** - Fungsionalitas interaktif
- **Font Awesome** - Ikon profesional
- **Google Fonts (Inter)** - Tipografi modern

### Storage
- **LocalStorage** - Penyimpanan data client-side
- **Session Management** - Manajemen sesi admin

### Hosting
- **Netlify** - Hosting gratis (direkomendasikan)
- **Vercel** - Alternatif hosting
- **GitHub Pages** - Hosting statis gratis

## 📁 Struktur File

```
perumahan-hajimena/
├── index.html              # Halaman beranda
├── status-portal.html      # Halaman status portal
├── login.html              # Halaman login admin
├── tentang.html            # Halaman tentang kami
├── admin/
│   └── dashboard.html      # Dashboard admin
├── styles.css              # Custom CSS styles
├── script.js               # Main JavaScript file
├── README.md               # Dokumentasi
└── package.json            # Project metadata
```

## 🚀 Cara Menggunakan

### 1. Clone/Download Repository
```bash
git clone <repository-url>
cd perumahan-hajimena
```

### 2. Buka Halaman Utama
Buka `index.html` di browser untuk melihat halaman beranda.

### 3. Akses Halaman Status Portal
Klik menu "Status Portal" atau buka `status-portal.html`.

### 4. Login Admin
- Buka halaman `login.html`
- Gunakan kredensial demo:
  - Username: `admin`
  - Password: `admin123`

### 5. Kelola Portal
Setelah login, Anda dapat:
- Mengubah status individual portal
- Membuka/menutup semua portal sekaligus
- Melihat log aktivitas
- Memantau status real-time

## 📱 Akun Demo

### Admin Credentials:
- **Username:** `admin`
- **Password:** `admin123`

### Additional Accounts:
- **Username:** `hajimena` | **Password:** `portal2025`
- **Username:** `rt` | **Password:** `rt123`
- **Username:** `rw` | **Password:** `rw123`

## 🎨 Desain & UI/UX

### Tema Warna
- **Primary:** Blue (#2563eb)
- **Success:** Green (#10b981)
- **Error:** Red (#ef4444)
- **Warning:** Yellow (#f59e0b)

### Font
- **Primary:** Inter (Google Fonts)
- **Icons:** Font Awesome 6

### Responsive Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🔧 Konfigurasi

### Mengubah Nama Perumahan
Edit file HTML dan ubah:
```html
<h1>Perumahan Sejahtera Desa Hajimena</h1>
```

### Mengubah Portal
Edit `script.js` di fungsi `initializePortalsData()`:
```javascript
const defaultPortals = [
    {
        id: 'portal-utama',
        name: 'Portal Utama',
        status: 'tutup',
        // ...
    }
    // Tambah portal lainnya
];
```

### Mengubah Admin Credentials
Edit `script.js` di fungsi `validateCredentials()`:
```javascript
const adminCredentials = [
    { username: 'admin', password: 'admin123' },
    // Tambah kredensial lainnya
];
```

## 🌐 Deployment

### Netlify (Recommended)
1. Push code ke GitHub repository
2. Hubungkan dengan Netlify
3. Deploy otomatis akan terjadi

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow instruksi

### GitHub Pages
1. Push code ke GitHub
2. Go to Settings > Pages
3. Select source branch
4. Site akan tersedia di `https://username.github.io/repo`

## 🔒 Keamanan

### Fitur Keamanan:
- Session timeout (24 jam)
- Input validation
- XSS protection
- CSRF protection (basic)
- Secure password handling

### Best Practices:
- Ganti password default di production
- Gunakan HTTPS di production
- Regular backup data
- Monitor activity logs

## 📊 Data Management

### LocalStorage Structure:
```javascript
// Portals Data
{
    "portals": [
        {
            "id": "portal-utama",
            "name": "Portal Utama",
            "status": "tutup",
            "lastUpdated": "2025-01-01T00:00:00.000Z",
            "updatedBy": "admin"
        }
    ]
}

// Admin Session
{
    "adminSession": {
        "username": "admin",
        "loginTime": "2025-01-01T00:00:00.000Z",
        "rememberMe": false
    }
}

// Activity Logs
{
    "activityLogs": [
        {
            "id": "1234567890",
            "portalName": "Portal Utama",
            "action": "Portal Utama diubah dari Ditutup menjadi Dibuka",
            "admin": "admin",
            "timestamp": "2025-01-01T00:00:00.000Z"
        }
    ]
}
```

## 🎯 Keyboard Shortcuts

- **Ctrl/Cmd + D** - Toggle dark mode
- **Ctrl/Cmd + K** - Focus search (jika ada)
- **Escape** - Tutup modal/menu

## 🐛 Troubleshooting

### Common Issues:

1. **Data tidak tersimpan**
   - Pastikan browser mendukung LocalStorage
   - Cek browser console untuk error

2. **Login gagal**
   - Periksa username dan password
   - Clear browser cache dan cookies

3. **Tampilan tidak responsif**
   - Refresh halaman
   - Cek internet connection
   - Update browser

4. **Dark mode tidak berfungsi**
   - Clear LocalStorage
   - Refresh halaman

## 📝 Changelog

### v1.0.0 (2025-01-01)
- Initial release
- 4 portal management system
- Admin dashboard
- Real-time status updates
- Dark mode support
- Mobile responsive design
- Activity logging
- Toast notifications

## 🤝 Kontribusi

1. Fork repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 Lisensi

MIT License - feel free to use for personal or commercial projects.

## 📞 Kontak

### Perumahan Sejahtera Desa Hajimena
- **Alamat:** Jl. Sejahtera No. 1, Desa Hajimena
- **Phone:** +62 721-123456
- **Email:** info@hajimena.com

### Developer
- **Nama:** Portal Informasi Team
- **Email:** dev@hajimena.com

---

🏠 **Dibuat dengan ❤️ untuk warga Perumahan Sejahtera Desa Hajimena**