# SCF01 — Semakan Fakta (DRAF) · Shariah Status of FCPO & Selected Global Futures

Status video: **DRAF untuk semakan** — belum dimuktamadkan. Fail: `episodes/scf01/build/SCF01_DRAFT.mp4`.
Narasi English (TTS `en-US-ChristopherNeural`), sari kata Bahasa Melayu, susun atur mengikut video rujukan (header, kicker/tajuk, panel, sari kata bawah, bar progres). Durasi 9:27.

## Had semakan
Persekitaran produksi ini **tidak dapat membuka** laman sumber rasmi secara terus (sc.com.my, cgsi.com.my, emusykil.muftiselangor.gov.my, bernama.com disekat oleh dasar rangkaian). Semakan dibuat melalui carian web (petikan sekunder) dan maklumat yang dibekalkan dalam brief. Item bertanda ⚠ **mesti disahkan secara manual** sebelum video dimuktamadkan.

## Kenyataan berkaitan Syariah
| # | Kenyataan dalam video | Babak | Sumber | Status |
|---|---|---|---|---|
| 1 | MPS SC, mesyuarat ke-11, 26 Nov 1997: kontrak niaga hadapan minyak sawit mentah diharuskan kerana selaras dengan prinsip Syariah | 4, 19 | SC — Resolutions of the SAC | ✅ Tarikh, mesyuarat & lafaz disokong oleh petikan sekunder bagi teks SC; ⚠ semak lafaz tepat dalam dokumen SC |
| 2 | CGSI merujuk resolusi MPS SC bagi FCPO, FPKO, FEPO | 4, 16 | CGSI SCF page | ✅ Disokong (brief + carian). Video **tidak** menyatakan tarikh resolusi FPKO/FEPO (tidak ditemui) |
| 3 | Penasihat Syariah CGSI bersetuju produk asing tertentu mempunyai spesifikasi serupa, termasuk kemungkinan penghantaran fizikal & komoditi yang diiktiraf patuh Syariah | 12, 16 | CGSI SCF page | ✅ Disokong petikan carian. ⚠ Satu halaman CGSI lain dilaporkan menyebut "International Shariah Advisor" dan "excluding interest-based elements" — semak lafaz terkini |
| 4 | Senarai 13 kontrak asing: NYMEX 2 (WTI Light Sweet Crude Oil, Natural Gas) · CBOT 10 · SGX 1 (SICOM TSR20 Rubber) | 13, 14, 16 | CGSI SCF page | ⚠ **Perlu pengesahan.** Mengikut brief. Carian menunjukkan percanggahan: satu ringkasan halaman produk utama mungkin tidak menyenaraikan Natural Gas, manakala halaman iTrade & T&C kempen SCF 3.0 menyenaraikannya; satu artikel sekunder menyebut 16 produk, Bernama menyebut 11. Sahkan senarai semasa di halaman CGSI |
| 5 | Global Futures konvensional CGSI (cth. emas, Nasdaq, indeks saham) ≠ senarai SCF | 14 | Brief / CGSI | ⚠ Sahkan contoh produk |
| 6 | FAQ CGSI: menerima pakai resolusi MPS SC; melantik penasihat Syariah bebas yang diluluskan SC; menyemak struktur produk, dokumentasi, borang & pelaksanaan | 16 | CGSI FAQ | ⚠ Mengikut brief; laman tidak dapat dibuka. Nama penasihat **tidak** dinyatakan dalam video |
| 7 | T&C: akaun SCF terhad kepada kontrak yang diluluskan patuh Syariah oleh MPS SC dan/atau penasihat Syariah yang diberi kuasa | 17 | CGSI T&C PDF | ⚠ Mengikut brief; PDF tidak dapat dibuka |
| 8 | Penilaian Syariah perlu melihat struktur kontrak, dokumentasi, kaedah pelaksanaan & mekanisme penyelesaian | 17 | Mufti Selangor (tambahan) | ⚠ Mengikut brief; jawapan e-Musykil tidak dapat dibaca. Video tidak memetik keputusan/fatwa tertentu |
| 9 | Lima aspek (aset pendasar, spesifikasi, penghantaran fizikal, pengurusan risiko, tadbir urus) — dinyatakan **bukan** senarai semak lengkap | 7 | Penerangan pendidikan | ✅ Dibingkaikan secara berhati-hati mengikut brief |
| 10 | Contoh LONG/SHORT RM4,000 → RM4,050 / RM3,950 = +RM50 seunit harga, sebelum kos & pengganda | 10 | Ilustrasi | ✅ Aritmetik betul; dilabel ilustrasi |
| 11 | Spesifikasi FCPO: 25 tan metrik, sebut harga RM/tan, penghantaran fizikal | 5 | Bursa (lihat `02_TECHNICAL_VALIDATION.md` V-04) | ✅ Saiz kontrak disokong; ⚠ semak spesifikasi terkini Bursa |

## Perkara yang sengaja TIDAK dibuat
- Tiada nama/kelayakan penasihat Syariah CGSI.
- Tiada dakwaan bahawa SC meluluskan setiap kontrak asing, atau Bursa mensijilkannya.
- Tiada dakwaan bahawa semua futures / semua posisi SHORT adalah patuh Syariah.
- Tiada perbandingan dengan CFD, forex, opsyen atau saham; tiada promosi akaun/pulangan.
- Tiada rakaman stok atau tangkapan skrin dokumen rasmi — visual ialah grafik gerakan ikon/diagram sahaja.
- Rujukan Bernama (sejarah pelancaran) tidak digunakan dalam narasi kerana tarikh/butiran tidak dapat disahkan.

## Sebelum dimuktamadkan
1. Sahkan item ⚠ terhadap laman/dokumen rasmi (terutamanya senarai produk #4).
2. Jika senarai berubah, kemas kini `episodes/scf01/spec.js` (babak 13, 14, 16) dan jalankan semula `tools/produce.sh scf01`.
3. Sahkan jenama penerbit pada header ("Capital Market Institute · Islamic Finance Series").
