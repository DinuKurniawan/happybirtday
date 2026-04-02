# 🎨 Customization Guide

## Mengubah Warna Theme

### Background Gradient

Edit di `src/components/BirthdayPage.tsx`:

```typescript
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
```

**Alternatif warna:**
- Sunset: `linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)`
- Ocean: `linear-gradient(135deg, #30cfd0 0%, #330867 100%)`
- Forest: `linear-gradient(135deg, #11998e 0%, #38ef7d 100%)`
- Pink: `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`

### Admin Panel Colors

Edit di `src/admin/AdminPanel.tsx`:

```typescript
background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
```

## Mengubah Font

Edit di `src/styles/global.css`:

```css
body {
  font-family: 'Your Font', Tahoma, Geneva, Verdana, sans-serif;
}
```

**Untuk Google Fonts:**

1. Tambahkan di `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
```

2. Update CSS:
```css
font-family: 'Poppins', sans-serif;
```

## Mengubah Emoji/Icons

Edit di `src/components/BirthdayPage.tsx`:

**Floating Icons (background):**
```typescript
🎈 → 🌟 atau 💫
🎁 → 🎀 atau 🎪
🎉 → ✨ atau 🌈
🎂 → 🍰 atau 🧁
```

**Bottom Balloons:**
```typescript
🎈🎊🎁🎂🎉 → 💖💝💕💗💓
```

## Mengubah Animasi

### Kecepatan Floating

Edit `floatingAnimation`:
```typescript
duration: 3, // ubah ke 2 (lebih cepat) atau 5 (lebih lambat)
```

### Kecepatan Pulse

Edit `pulseAnimation`:
```typescript
duration: 2, // ubah sesuai keinginan
```

### Jarak Floating

```typescript
y: [0, -20, 0], // ubah -20 ke -40 (lebih jauh) atau -10 (lebih dekat)
```

### Durasi Confetti

Edit di `BirthdayPage.tsx`:
```typescript
const timer = setTimeout(() => setShowConfetti(false), 10000);
// 10000 = 10 detik, ubah sesuai keinginan
```

## Menambah Section Baru

Contoh menambah section foto:

```typescript
<motion.div
  variants={itemVariants}
  style={{
    marginBottom: '30px'
  }}
>
  <img 
    src="/path/to/photo.jpg" 
    alt="Birthday Photo"
    style={{
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '5px solid white',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    }}
  />
</motion.div>
```

## Mengubah Default Data

Edit di `src/utils.ts`:

```typescript
return {
  name: 'Nama Default Anda',
  date: new Date().toISOString().split('T')[0],
  message: 'Pesan default Anda di sini!',
  musicUrl: ''
};
```

## Menambah Field Baru di Admin

1. **Update interface** di `src/utils.ts`:
```typescript
export interface BirthdayData {
  name: string;
  date: string;
  message: string;
  musicUrl: string;
  age?: number; // field baru
}
```

2. **Tambah input** di `src/admin/AdminPanel.tsx`:
```typescript
<div style={{ marginBottom: '25px' }}>
  <label>Umur</label>
  <input
    type="number"
    value={formData.age || ''}
    onChange={(e) => setFormData({ 
      ...formData, 
      age: parseInt(e.target.value) 
    })}
  />
</div>
```

3. **Tampilkan** di `src/components/BirthdayPage.tsx`:
```typescript
<motion.p variants={itemVariants}>
  🎂 Umur: {data.age} tahun
</motion.p>
```

## Tips Customization

### 1. **Test di Browser**
Gunakan DevTools untuk experiment dengan style langsung

### 2. **Backup Code**
Selalu backup sebelum perubahan besar

### 3. **Gradasi Bertahap**
Ubah satu hal dalam satu waktu, test, lalu lanjut

### 4. **Resource Gradient**
- [uiGradients](https://uigradients.com/)
- [WebGradients](https://webgradients.com/)
- [CSS Gradient](https://cssgradient.io/)

### 5. **Resource Emoji**
- [Emojipedia](https://emojipedia.org/)
- [Get Emoji](https://getemoji.com/)

### 6. **Resource Font**
- [Google Fonts](https://fonts.google.com/)
- [Font Squirrel](https://www.fontsquirrel.com/)

## Advanced: Tema Gelap/Terang

Buat toggle theme dengan state:

```typescript
const [isDark, setIsDark] = useState(false);

// Gunakan conditional styling
background: isDark 
  ? 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
```

---

**Selamat berkreasi! 🎨**
