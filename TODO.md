# TODO - Perbaikan API (Cannot GET /api/events)

## Rencana
1. Ubah `src/index.ts` untuk menambahkan prefix `/api` ke semua router: category, event, speaker.
2. (Opsional) Tambahkan route `/` atau healthcheck agar root tidak membingungkan.
3. Jalankan server dan verifikasi endpoint:
   - `GET http://localhost:3000/events`
   - `GET http://localhost:3000/categories`
   - `GET http://localhost:3000/speakers`

## Status

- [x] Step 2: Verifikasi runtime
- [x] Step 3: Tes endpoint via browser/postman (GET /api/events sekarang mengembalikan 200)

