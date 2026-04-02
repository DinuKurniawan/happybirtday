# 🎉 Happy Birthday Landing Page - Quick Start

## 🚀 Menjalankan Project

### Development Mode:

```bash
npm run dev
```

Server akan berjalan di: **http://localhost:5173** (atau port lain jika 5173 sedang digunakan)

### Production Build:

```bash
# Build project
npm run build

# Preview hasil build
npm run preview
```

Preview akan berjalan di: **http://localhost:4173**

## 🎮 Cara Menggunakan

### 1. Akses Landing Page Birthday:
```
http://localhost:5173
```

### 2. Akses Admin Panel (2 cara):

**Cara 1 - Via URL:**
```
http://localhost:5173?admin=true
```

**Cara 2 - Keyboard Shortcut:**
- Buka landing page
- Tekan `Ctrl + Shift + A`

## 🔧 Di Admin Panel:

1. **Nama** - Masukkan nama yang berulang tahun
2. **Tanggal** - Pilih tanggal lahir
3. **Upload Musik** - Upload file audio (MP3, WAV, OGG, dll)
4. **Upload Gambar** - Upload sebanyak-banyaknya gambar! (TANPA BATASAN!)
   - Klik "Choose Files" dan pilih multiple gambar (Ctrl+Click atau Shift+Click)
   - Preview langsung muncul
   - Klik tombol ❌ untuk hapus gambar yang tidak diinginkan
   - Bisa upload lagi untuk tambah lebih banyak gambar
5. **Kata-kata** - Tulis ucapan selamat ulang tahun
6. Klik **"Simpan & Tampilkan"**

## 💾 Penyimpanan Data

- Data tersimpan otomatis di **LocalStorage** browser
- Tidak akan hilang saat refresh halaman
- Musik yang diupload akan tersimpan sebagai blob URL
- Untuk reset data: DevTools > Application > LocalStorage > hapus `birthday_data`

## ✨ Fitur Animasi

- 🎊 Confetti effect saat halaman dibuka
- 🎈 Floating icons dengan animasi naik-turun
- 💓 Pulse animation pada icons
- ✨ Smooth fade-in transitions
- 🎯 Hover effects pada buttons

## 🎵 Tentang Musik

- Format yang didukung: MP3, WAV, OGG, M4A
- Musik akan **auto-play** saat halaman dibuka
- Beberapa browser memerlukan interaksi user sebelum autoplay bekerja (klik di halaman)
- Musik akan loop terus menerus

## 🖼️ Tentang Upload Gambar

- **TANPA BATASAN!** Upload sebanyak apapun yang Anda mau
- Format yang didukung: JPG, PNG, GIF, WebP, BMP
- **Multiple selection** - Pilih banyak gambar sekaligus:
  - Windows: Ctrl+Click untuk pilih individual, Shift+Click untuk range
  - Mac: Cmd+Click untuk pilih individual, Shift+Click untuk range
- Preview langsung dengan thumbnail grid
- Tombol hapus (❌) di setiap gambar preview
- Bisa upload berkali-kali untuk tambah gambar lebih banyak
- Gambar ditampilkan dalam **gallery cantik** dengan animasi di landing page

## 📱 Responsive

- Tampil sempurna di desktop, tablet, dan mobile
- UI menyesuaikan dengan ukuran layar

---

**🎂 Selamat menggunakan! Semoga momen spesialnya berkesan!**
