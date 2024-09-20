import React from "react";

function KetentuanComponentNew({ type }) {
  const ketentuan = () => {
    switch (type) {
      case "Badan Usaha PT":
        return (
          <div className="container-ketentuan-f">
            <b>Ketentuan Pendirian PT</b>
            <p>
              1. Ketentuan nama PT
              <br />
              Untuk nama PT, mohon untuk mengajukan 3 (tiga) nama PT dengan
              aturan:
            </p>
            <ul>
              <li>Terdiri dari minimal 3 (tiga) suku kata</li>
              <li>Ditulis dengan huruf latin</li>
              <li>
                Tidak boleh sama dengan PT lain dari sisi penulisan dan
                pengucapan (contoh: PT Sukses Jaya Utama dengan PT Sukses Djaja
                Oetama)
              </li>
              <li>
                Tidak bertentangan dengan ketertiban umum dan/atau kesusilaan
              </li>
              <li>
                Tidak memiliki kesamaan dengan nama lembaga negara, lembaga
                pemerintahan, atau lembaga internasional
              </li>
              <li>
                Tidak terdiri atas angka atau rangkaian angka, huruf atau huruf
                yang tidak membentuk kata (contoh: PT 14045, PT Qwerty)
              </li>
              <li>
                Tidak memiliki artian sebagai perseroan, badan hukum, atau
                persekutuan perdata (menggunakan kata Yayasan, Ltd, Inc., Co.,
                dll)
              </li>
            </ul>
            <p>
              Jika dari 3 nama PT yang diajukan tidak tersedia, akan kami
              informasikan untuk mengajukan nama yang berbeda. <br />
              <br />
              2. Pemilihan KBLI/Bidang Usaha
            </p>
            <ul>
              <li>
                KBLI (Klasifikasi Baku Lapangan Usaha Indonesia) adalah sistem
                kode klasifikasi yang kemudian akan diinput pada Akta dan NIB.
              </li>
              <li>
                KBLI yang dipilih harus satu turunan dengan kegiatan usaha(untuk
                menghindari perusahaan palugada, perusahaan yang memiliki
                kegiatan usaha yang berbeda-beda mengikuti demand)
              </li>
              <li>
                Pemilihan KBLI dapat dilakukan pada link
                https://oss.go.id/informasi/kbli-berbasis-risiko
              </li>
            </ul>
            <p>3. Pemegang Saham dan Direksi</p>
            <ul>
              <li>PT minimal memiliki 2 pemegang saham</li>
              <li>PT minimal memiliki 1 direktur dan 1 komisaris</li>
              <li>
                Apabila terdapat lebih dari 1 direktur dan komisaris
                masing-masing, salah satunya diangkat menjadi direktur dan
                komisaris utama
              </li>
            </ul>
            <p>4. Suami Istri tidak diperbolehkan untuk mendirikan PT</p>
            <br />
            <p>
              5. PT memiliki modal minimal Rp. 50.000.000 (Lima Puluh Juta
              Rupiah) dan melakukan penyetoran sejumlah 25% dari modal
              (penyetoran fiktif)
            </p>
          </div>
        );
      case "Badan Usaha CV":
        return (
          <div className="container-ketentuan-f">
            <b>Ketentuan Pendirian CV</b>
            <p>
              1. Ketentuan nama CV
              <br />
              Untuk nama CV, mohon untuk mengajukan 3 (tiga) nama CV dengan
              aturan:
            </p>
            <ul>
              <li>Terdiri dari minimal 3 (tiga) suku kata</li>
              <li>Ditulis dengan huruf latin</li>
              <li>
                Tidak boleh sama dengan CV lain dari sisi penulisan dan
                pengucapan (contoh: CV Sukses Jaya Utama dengan CV Sukses Djaja
                Oetama)
              </li>
              <li>
                Tidak bertentangan dengan ketertiban umum dan/atau kesusilaan
              </li>
              <li>
                Tidak memiliki kesamaan dengan nama lembaga negara, lembaga
                pemerintahan, atau lembaga internasional
              </li>
              <li>
                Tidak terdiri atas angka atau rangkaian angka, huruf atau huruf
                yang tidak membentuk kata (contoh: CV 14045, CV Qwerty)
              </li>
              <li>
                Tidak memiliki artian sebagai perseroan, badan hukum, atau
                persekutuan perdata (menggunakan kata Yayasan, Ltd, Inc., Co.,
                dll)
              </li>
            </ul>
            <p>
              Jika dari 3 nama CV yang diajukan tidak tersedia, akan kami
              informasikan untuk mengajukan nama yang berbeda. <br />
              <br />
              2. Pemilihan KBLI/Bidang Usaha
            </p>
            <ul>
              <li>
                KBLI (Klasifikasi Baku Lapangan Usaha Indonesia) adalah sistem
                kode klasifikasi yang kemudian akan diinput pada Akta dan NIB.
              </li>
              <li>
                KBLI yang dipilih harus satu turunan dengan kegiatan usaha(untuk
                menghindari perusahaan palugada, perusahaan yang memiliki
                kegiatan usaha yang berbeda-beda mengikuti demand)
              </li>
              <li>
                Pemilihan KBLI dapat dilakukan pada link
                https://oss.go.id/informasi/kbli-berbasis-risiko
              </li>
            </ul>
            <p>3. Pemegang Saham dan Direksi</p>
            <ul>
              <li>CV minimal memiliki 2 pemegang saham</li>
              <li>CV minimal memiliki 1 direktur dan 1 komisaris</li>
              <li>
                Apabila terdapat lebih dari 1 direktur dan komisaris
                masing-masing, salah satunya diangkat menjadi direktur dan
                komisaris utama
              </li>
            </ul>
            <p>4. Suami Istri tidak diperbolehkan untuk mendirikan CV</p>
            <br />
            <p>
              5. CV memiliki modal minimal Rp. 50.000.000 (Lima Puluh Juta
              Rupiah) dan melakukan penyetoran sejumlah 25% dari modal
              (penyetoran fiktif)
            </p>
          </div>
        );
      case "Badan Hukum Yayasan":
        return (
          <div className="container-ketentuan-f">
            <b>Ketentuan Pendirian Yayasan</b>
            <p>
              1. Ketentuan nama Yayasan
              <br />
              Untuk nama Yayasan, mohon untuk mengajukan 3 (tiga) nama Yayasan
              dengan aturan:
            </p>
            <ul>
              <li>Terdiri dari minimal 3 (tiga) suku kata</li>
              <li>Ditulis dengan huruf latin</li>
              <li>
                Tidak boleh sama dengan Yayasan lain dari sisi penulisan dan
                pengucapan (contoh: Yayasan Sukses Jaya Utama dengan Yayasan
                Sukses Djaja Oetama)
              </li>
              <li>
                Tidak bertentangan dengan ketertiban umum dan/atau kesusilaan
              </li>
              <li>
                Tidak memiliki kesamaan dengan nama lembaga negara, lembaga
                pemerintahan, atau lembaga internasional
              </li>
              <li>
                Tidak terdiri atas angka atau rangkaian angka, huruf atau huruf
                yang tidak membentuk kata (contoh: Yayasan 14045, Yayasan
                Qwerty)
              </li>
              <li>
                Tidak memiliki artian sebagai perseroan, badan hukum, atau
                persekutuan perdata (menggunakan kata Yayasan, Ltd, Inc., Co.,
                dll)
              </li>
            </ul>
            <p>
              Jika dari 3 nama Yayasan yang diajukan tidak tersedia, akan kami
              informasikan untuk mengajukan nama yang berbeda. <br />
              <br />
              2. Pemilihan KBLI/Bidang Usaha
            </p>
            <ul>
              <li>
                KBLI (Klasifikasi Baku Lapangan Usaha Indonesia) adalah sistem
                kode klasifikasi yang kemudian akan diinput pada Akta dan NIB.
              </li>
              <li>
                KBLI yang dipilih harus satu turunan dengan kegiatan usaha(untuk
                menghindari perusahaan palugada, perusahaan yang memiliki
                kegiatan usaha yang berbeda-beda mengikuti demand)
              </li>
              <li>
                Pemilihan KBLI dapat dilakukan pada link
                https://oss.go.id/informasi/kbli-berbasis-risiko
              </li>
            </ul>
            <p>3. Pemegang Saham dan Direksi</p>
            <ul>
              <li>Yayasan minimal memiliki 2 pemegang saham</li>
              <li>Yayasan minimal memiliki 1 direktur dan 1 komisaris</li>
              <li>
                Apabila terdapat lebih dari 1 direktur dan komisaris
                masing-masing, salah satunya diangkat menjadi direktur dan
                komisaris utama
              </li>
            </ul>
            <p>4. Suami Istri tidak diperbolehkan untuk mendirikan Yayasan</p>
            <br />
            <p>
              5. Yayasan memiliki modal minimal Rp. 50.000.000 (Lima Puluh Juta
              Rupiah) dan melakukan penyetoran sejumlah 25% dari modal
              (penyetoran fiktif)
            </p>
          </div>
        );
      case "Badan Hukum Perkumpulan":
        return (
          <div className="container-ketentuan-f">
            <b>Ketentuan Pendirian Perkumpulan</b>
            <p>
              1. Ketentuan nama Perkumpulan
              <br />
              Untuk nama Perkumpulan, mohon untuk mengajukan 3 (tiga) nama
              Perkumpulan dengan aturan:
            </p>
            <ul>
              <li>Terdiri dari minimal 3 (tiga) suku kata</li>
              <li>Ditulis dengan huruf latin</li>
              <li>
                Tidak boleh sama dengan Perkumpulan lain dari sisi penulisan dan
                pengucapan (contoh: Perkumpulan Sukses Jaya Utama dengan
                Perkumpulan Sukses Djaja Oetama)
              </li>
              <li>
                Tidak bertentangan dengan ketertiban umum dan/atau kesusilaan
              </li>
              <li>
                Tidak memiliki kesamaan dengan nama lembaga negara, lembaga
                pemerintahan, atau lembaga internasional
              </li>
              <li>
                Tidak terdiri atas angka atau rangkaian angka, huruf atau huruf
                yang tidak membentuk kata (contoh: Perkumpulan 14045,
                Perkumpulan Qwerty)
              </li>
              <li>
                Tidak memiliki artian sebagai perseroan, badan hukum, atau
                persekutuan perdata (menggunakan kata Perkumpulan, Ltd, Inc.,
                Co., dll)
              </li>
            </ul>
            <p>
              Jika dari 3 nama Perkumpulan yang diajukan tidak tersedia, akan
              kami informasikan untuk mengajukan nama yang berbeda. <br />
              <br />
              2. Pemilihan KBLI/Bidang Usaha
            </p>
            <ul>
              <li>
                KBLI (Klasifikasi Baku Lapangan Usaha Indonesia) adalah sistem
                kode klasifikasi yang kemudian akan diinput pada Akta dan NIB.
              </li>
              <li>
                KBLI yang dipilih harus satu turunan dengan kegiatan usaha(untuk
                menghindari perusahaan palugada, perusahaan yang memiliki
                kegiatan usaha yang berbeda-beda mengikuti demand)
              </li>
              <li>
                Pemilihan KBLI dapat dilakukan pada link
                https://oss.go.id/informasi/kbli-berbasis-risiko
              </li>
            </ul>
            <p>3. Pemegang Saham dan Direksi</p>
            <ul>
              <li>Perkumpulan minimal memiliki 2 pemegang saham</li>
              <li>Perkumpulan minimal memiliki 1 direktur dan 1 komisaris</li>
              <li>
                Apabila terdapat lebih dari 1 direktur dan komisaris
                masing-masing, salah satunya diangkat menjadi direktur dan
                komisaris utama
              </li>
            </ul>
            <p>
              4. Suami Istri tidak diperbolehkan untuk mendirikan Perkumpulan
            </p>
            <br />
            <p>
              5. Perkumpulan memiliki modal minimal Rp. 50.000.000 (Lima Puluh
              Juta Rupiah) dan melakukan penyetoran sejumlah 25% dari modal
              (penyetoran fiktif)
            </p>
          </div>
        );
      default:
        return;
    }
  };
  return ketentuan();
}

export default KetentuanComponentNew;
