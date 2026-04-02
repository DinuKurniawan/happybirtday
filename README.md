# 🎉 Happy Birthday Landing Page

Landing page ulang tahun yang modern dan interaktif dengan animasi keren dan admin panel untuk kontrol penuh!

## ✨ Fitur

- 🎨 **UI Modern & Keren** - Desain gradient yang indah dengan glassmorphism
- 🎭 **Animasi Populer** - Menggunakan Framer Motion untuk animasi smooth
- 🎊 **Confetti Effect** - Efek confetti yang meriah saat halaman dibuka
- 🎵 **Musik Fleksibel** - Upload file audio ATAU paste link YouTube/Spotify
- 🖼️ **Upload Gambar Unlimited** - Upload sebanyak-banyaknya gambar kenangan
- 🔗 **Shareable Link** - Generate link yang bisa langsung di-share
- 🔧 **Admin Panel** - Kontrol penuh untuk:
  - Nama penerima ucapan
  - Tanggal ulang tahun
  - Upload musik file atau paste link (YouTube, Spotify, SoundCloud, dll)
  - Upload multiple gambar (tanpa batasan)
  - Kata-kata ucapan
  - Generate & copy shareable link
- 💾 **Penyimpanan Lokal** - Data tersimpan di browser (LocalStorage)
- 🎈 **Floating Icons** - Ikon-ikon yang mengambang dengan animasi
- 📱 **Responsive** - Tampil sempurna di semua ukuran layar
- 🎬 **Image Gallery** - Gallery foto yang cantik dengan animasi (tanpa counter)

## 🚀 Cara Menjalankan

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Jalankan development server:**
   ```bash
   npm run dev
   ```

3. **Buka browser:**
   - Landing page: `http://localhost:5173`
   - Admin panel: `http://localhost:5173?admin=true`

## 🎮 Cara Menggunakan

### Mengakses Admin Panel

Ada 2 cara untuk masuk ke admin panel:

1. **Via URL:**
   ```
   http://localhost:5173?admin=true
   ```

2. **Keyboard Shortcut:**
   - Tekan `Ctrl + Shift + A` di halaman birthday

### Mengatur Konten

Di admin panel, Anda bisa:
1. Masukkan nama penerima ucapan
2. Pilih tanggal lahir
3. **Musik** - Pilih salah satu:
   - Upload file musik (MP3, WAV, dll), ATAU
   - Paste link dari YouTube, Spotify, SoundCloud, dll
4. Upload gambar sebanyak yang Anda mau (TANPA BATASAN!)
   - Bisa pilih multiple gambar sekaligus
   - Preview langsung sebelum disimpan
   - Bisa hapus gambar yang tidak diinginkan
5. Tulis kata-kata ucapan sesuai keinginan
6. Klik "Simpan & Tampilkan" untuk melihat hasilnya
7. **Copy shareable link** dari section di bawah form untuk dibagikan!

### Upload Musik

**Cara 1 - Upload File:**
- Format yang didukung: MP3, WAV, OGG, dll
- Musik akan otomatis diputar saat halaman dibuka (loop)
- Beberapa browser memerlukan interaksi user sebelum autoplay bekerja

**Cara 2 - Paste Link (BARU!):**
- **YouTube** - Paste link video, akan diputar **audio-only background** (tanpa tampilan video)
- **Spotify** - Paste link track, diputar sebagai **background audio** (tidak tampil di halaman)
- **SoundCloud** - Paste link track
- **Platform lain** - Akan muncul tombol link untuk membuka di tab baru
- Contoh link YouTube: `https://www.youtube.com/watch?v=...`
- Contoh link Spotify: `https://open.spotify.com/track/...`

### Generate Shareable Link

- Setelah mengisi data di admin panel, scroll ke bawah
- Ada section "Shareable Link" dengan tombol "Copy"
- Klik tombol Copy dan share link tersebut
- Penerima bisa langsung buka link tanpa perlu masuk admin panel

### Upload Gambar

- **TANPA BATASAN** - Upload sebanyak apapun yang Anda mau!
- Format yang didukung: JPG, PNG, GIF, WebP, dll
- Bisa pilih multiple gambar sekaligus (Ctrl+Click atau Shift+Click)
- Preview langsung dengan tombol hapus
- Gambar ditampilkan dalam gallery yang cantik dengan animasi

## 🏗️ Build untuk Production

```bash
npm run build
```

File build akan ada di folder `dist/`

## 🎨 Teknologi yang Digunakan

- **React 19** - Library UI
- **TypeScript** - Type safety
- **Vite** - Build tool super cepat
- **Framer Motion** - Animasi smooth dan modern
- **React Confetti** - Efek confetti
- **React Icons** - Icon library

## 📁 Struktur Project

```
happy-birtday/
├── src/
│   ├── components/
│   │   └── BirthdayPage.tsx    # Halaman birthday utama
│   ├── admin/
│   │   └── AdminPanel.tsx      # Panel admin
│   ├── styles/
│   │   └── global.css          # Style global
│   ├── App.tsx                 # Main app component
│   ├── main.tsx               # Entry point
│   └── utils.ts               # Utility functions
├── public/                     # Static files
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🎯 Tips

- Data disimpan di LocalStorage browser, jadi tidak akan hilang saat refresh
- Untuk reset data, buka DevTools > Application > LocalStorage > hapus `birthday_data`
- Gunakan file musik dengan ukuran kecil untuk loading yang lebih cepat
- Tekan `Ctrl + Shift + A` untuk quick access ke admin panel

## 🎈 Animasi yang Digunakan

1. **Confetti** - Efek hujan confetti di awal
2. **Floating Icons** - Ikon yang mengambang naik-turun
3. **Pulse Animation** - Ikon yang berdenyut
4. **Fade In** - Konten muncul dengan smooth
5. **Scale Animation** - Efek zoom pada hover
6. **Stagger Children** - Animasi berurutan dari atas ke bawah

---

Dibuat dengan ❤️ untuk merayakan momen spesial!
