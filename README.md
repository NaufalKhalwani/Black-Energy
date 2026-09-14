# Coal Import Company Profile — Full Stack
**License: NPL-KK**

Proyek ini adalah hasil perbaikan (bug fix) dan penyelesaian dari blueprint awal
`model_project_company_profile.md`. Semua file yang tadinya hanya disebut namanya
tapi belum ada isinya (server.js, routes, App.jsx, AdminPanel.jsx, ProductCatalog.jsx,
Navbar.jsx, tailwind.config.js, package.json, dst.) sudah dibuat lengkap dan
saling terhubung end-to-end.

## Catatan instalasi ke `D:\fullstack\batubara`
Saya membangun proyek ini di lingkungan sandbox saya (Linux), bukan langsung di
komputer Anda — saya tidak punya akses ke drive `D:\` Anda. Silakan:
1. Download & ekstrak file zip yang saya berikan.
2. Salin (copy-paste) folder `backend/` dan `frontend/` ke dalam `D:\fullstack\batubara\`.
3. Ikuti langkah instalasi di bawah dari folder tersebut.

## 🐛 Bug & kekurangan blueprint yang sudah dibenahi
1. `server.js`, `routes/productRoutes.js`, `middleware/errorHandler.js` — **belum ada sama sekali**, backend tidak akan bisa jalan tanpa ini.
2. `App.jsx`, `main.jsx`, `index.css`, `index.html`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js` — **belum ada**, frontend tidak akan bisa di-build.
3. `ProductCatalog.jsx`, `AdminPanel.jsx`, `Navbar.jsx` — diimport tapi filenya **tidak pernah dibuat** → langsung crash.
4. `createProduct`/`updateProduct` mengembalikan status `500` untuk error validasi; seharusnya `400`.
5. `updateProduct` tidak memakai `runValidators`, jadi validasi schema Mongoose diabaikan saat update.
6. `deleteProduct`/`updateProduct` tidak mengecek apakah dokumen ditemukan → selalu balas sukses walau ID salah. Sekarang balas `404`.
7. Tidak ada validasi format ObjectId → sekarang dicek dengan `mongoose.Types.ObjectId.isValid`.
8. `FloatingCoal.jsx` memanggil `Math.random()` langsung di JSX, menyebabkan posisi partikel berubah acak setiap re-render. Sekarang dikunci dengan `useMemo`.
9. `OrderForm.jsx` tidak pernah reset setelah submit, dan tidak ada validasi minimum tonase. Sekarang sudah diperbaiki + di-scroll otomatis saat produk dipilih dari katalog.
10. Tidak ada CORS/body-parser di backend — request dari frontend akan gagal (CORS error). Sudah ditambahkan.
11. Tidak ada endpoint `GET /api/products/:id` untuk detail produk.
12. Tidak ada `.env.example` untuk backend maupun frontend.
13. URL API di-hardcode berulang-ulang di komponen berbeda → sekarang disatukan lewat `src/services/api.js` + `VITE_API_URL`.
14. Tidak ada Admin Panel UI sama sekali walau disebut sebagai "Fitur Utama" di deskripsi proyek — sekarang sudah ada CRUD penuh (tambah/edit/hapus/list) di `/admin`.
15. Tidak ada routing (`react-router-dom`) — Landing Page dan Admin Panel tidak bisa diakses sebagai halaman terpisah.

## 🚀 Cara Menjalankan

### Backend
```bash
cd backend
npm install
cp .env.example .env    # lalu sesuaikan MONGO_URI jika perlu
npm run dev             # atau: npm start
```
Server berjalan di `http://localhost:5000`.

### Frontend
```bash
cd frontend
npm install
cp .env.example .env    # sesuaikan VITE_API_URL jika backend beda port
npm run dev
```
Buka `http://localhost:5173`. Halaman admin ada di `http://localhost:5173/admin`.

### Sebelum dipakai produksi
- Ganti nomor WhatsApp admin di `frontend/src/components/OrderForm.jsx` (`ADMIN_WHATSAPP`).
- Ganti `MONGO_URI` di `.env` sesuai database Anda (lokal atau Atlas).

---
**License: NPL-KK**
