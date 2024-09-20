import React from "react";
import AccordionCustom from "./AccordionCustom";

function AccordionContent({ isShow, code, account_number, merchant_code }) {
  switch (code) {
    case "MANDIRI":
      return (
        <>
          <AccordionCustom
            isShow={isShow}
            title="MBANKING YELLOW LIVIN APP"
            body={
              <>
                <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                <ul>
                  <li>
                    Buka aplikasi Livin by Mandiri, masukkan PASSWORD atau
                    lakukan verifikasi wajah
                  </li>
                  <li>Pilih "Bayar"</li>
                  <li>Cari "Xendit {merchant_code}"</li>
                </ul>
                <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                <ul>
                  <li>Pilih Xendit 88908 sebagai penyedia jasa</li>
                  <li>
                    Masukkan Nomor Virtual Account <b>{account_number}</b>
                  </li>
                  <li>Nominal pembayaran akan terisi secara otomatis</li>
                  <li>
                    Tinjau dan konfirmasi detail transaksi anda, lalu tekan
                    Konfirmasi
                  </li>
                  <li>Selesaikan transaksi dengan memasukkan MPIN anda</li>
                </ul>
                <b>LANGKAH 3: TRANSAKSI BERHASIL</b>
                <ul>
                  <li>
                    Setelah transaksi pembayaran Anda selesai, simpan bukti
                    pembayaran
                  </li>
                  <li>
                    Invoice ini akan diperbarui secara otomatis. Ini bisa
                    memakan waktu hingga 5 menit
                  </li>
                </ul>
              </>
            }
          />
          <AccordionCustom
            isShow={isShow}
            title="ATM langsung"
            body={
              <>
                <b>LANGKAH 1: TEMUKAN ATM TERDEKAT</b>
                <ul>
                  <li>Masukkan ATM dan tekan "Bahasa Indonesia"</li>
                  <li>Masukkan PIN, lalu tekan "Benar"</li>
                  <li>Pilih "Pembayaran", lalu pilih "Multi Payment"</li>
                </ul>
                <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                <ul>
                  <li>
                    Masukkan kode perusahaan '{merchant_code}' ({merchant_code}{" "}
                    XENDIT), lalu tekan 'BENAR'
                  </li>
                  <li>
                    Masukkan Nomor Virtual Account <b>{account_number}</b>, lalu
                    tekan 'BENAR'
                  </li>
                  <li>
                    Masukkan nominal yang ingin di transfer, lalu tekan "BENAR"
                  </li>
                  <li>
                    Informasi pelanggan akan ditampilkan, pilih nomor 1 sesuai
                    dengan nominal pembayaran kemudian tekan "YA"
                  </li>
                  <li>
                    Konfirmasi pembayaran akan muncul, tekan "YES", untuk
                    melanjutkan
                  </li>
                </ul>
                <b>LANGKAH 3: TRANSAKSI BERHASIL</b>
                <ul>
                  <li>Simpan bukti transaksi anda</li>
                  <li>Transaksi anda berhasil</li>
                  <li>
                    Setelah transaksi anda selesai, invoice ini akan diupdate
                    secara otomatis. Proses ini mungkin memakan waktu hingga 5
                    menit
                  </li>
                </ul>
              </>
            }
          />
          <AccordionCustom
            isShow={isShow}
            title="IBANKING"
            body={
              <>
                <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                <ul>
                  <li>
                    Buka situs Mandiri Internet Banking{" "}
                    <b>https://ibank.bankmandiri.co.id</b>
                  </li>
                  <li>Masuk menggunakan USER ID dan PASSWORD anda</li>
                  <li>Buka halaman beranda, kemudian pilih "Pembayaran"</li>
                </ul>
                <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                <ul>
                  <li>Pilih 88908 XENDIT sebagai penyedia jasa</li>
                  <li>
                    Masukkan Nomor Virtual Account <b>{account_number}</b>
                  </li>
                  <li>Lalu pilih Lanjut</li>
                  <li>Apabila semua detail benar tekan "KONFIRMASI"</li>
                  <li>Masukkan PIN / Challenge Code Token</li>
                </ul>
                <b>LANGKAH 3: TRANSAKSI BERHASIL</b>
                <ul>
                  <li>
                    Setelah transaksi pembayaran Anda selesai, simpan bukti
                    pembayaran
                  </li>
                  <li>
                    Invoice ini akan diperbarui secara otomatis. Ini bisa
                    memakan waktu hingga 5 menit
                  </li>
                </ul>
              </>
            }
          />
        </>
      );
    case "BNI":
      return (
        <>
          <AccordionCustom
            isShow={isShow}
            title="ATM"
            body={
              <>
                <b>LANGKAH 1: TEMUKAN ATM TERDEKAT</b>
                <ul>
                  <li>Masukkan kartu ATM anda</li>
                  <li>Pilih bahasa</li>
                  <li>Masukkan PIN ATM anda</li>
                </ul>
                <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                <ul>
                  <li>Pilih "Menu Lainnya"</li>
                  <li>Pilih "Transfer"</li>
                  <li>
                    Pilih jenis rekening yang akan anda gunakan (contoh: "Dari
                    Rekening Tabungan")
                  </li>
                  <li>Pilih "Virtual Account Billing"</li>
                  <li>
                    Masukkan Nomor Virtual Account anda <b>{account_number}</b>
                  </li>
                  <li>
                    Tagihan yang harus dibayarkan akan muncul pada layar
                    konfirmasi
                  </li>
                  <li>Konfirmasi, apabila telah sesuai, lanjutkan transaksi</li>
                </ul>
                <b>LANGKAH 3: TRANSAKSI BERHASIL</b>
                <ul>
                  <li>Transaksi Anda telah selesai</li>
                  <li>
                    Setelah transaksi anda selesai, invoice ini akan diupdate
                    secara otomatis. Proses ini mungkin memakan waktu hingga 5
                    menit
                  </li>
                </ul>
              </>
            }
          />
          <AccordionCustom
            isShow={isShow}
            title="IBANKING"
            body={
              <>
                <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                <ul>
                  <li>
                    Buka situs <b>https://ibank.bni.co.id</b>
                  </li>
                  <li>Masukkan User ID dan Password</li>
                </ul>
                <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                <ul>
                  <li>Pilih menu "Transfer"</li>
                  <li>Pilih menu "Virtual Account Billing"</li>
                  <li>
                    Masukkan Nomor Virtual Account <b>{account_number}</b>
                  </li>
                  <li>
                    Lalu pilih rekening debet yang akan digunakan. Kemudian
                    tekan "Lanjut"
                  </li>
                  <li>
                    Tagihan yang harus dibayarkan akan muncul pada layar
                    konfirmasi
                  </li>
                  <li>Masukkan Kode Otentikasi Token</li>
                </ul>
                <b>LANGKAH 3: TRANSAKSI BERHASIL</b>
                <ul>
                  <li>Transaksi Anda telah selesai</li>
                  <li>
                    Setelah transaksi anda selesai, invoice ini akan diupdate
                    secara otomatis. Proses ini mungkin memakan waktu hingga 5
                    menit
                  </li>
                </ul>
              </>
            }
          />
          <AccordionCustom
            isShow={isShow}
            title="MBANKING"
            body={
              <>
                <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                <ul>
                  <li>Akses BNI Mobile Banking melalui handphone</li>
                  <li>Masukkan User ID dan Password</li>
                  <li>Pilih menu "Transfer"</li>
                </ul>
                <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                <ul>
                  <li>
                    Pilih menu "Virtual Account Billing", lalu pilih rekening
                    debet
                  </li>
                  <li>
                    Masukkan Nomor Virtual Account anda <b>{account_number}</b>{" "}
                    pada menu "Input Baru"
                  </li>
                  <li>
                    Tagihan yang harus dibayarkan akan muncul pada layar
                    konfirmasi
                  </li>
                  <li>Konfirmasi transaksi dan masukkan Password Transaksi</li>
                </ul>
                <b>LANGKAH 3: TRANSAKSI BERHASIL</b>
                <ul>
                  <li>Transaksi Anda telah selesai</li>
                  <li>
                    Setelah transaksi anda selesai, invoice ini akan diupdate
                    secara otomatis. Proses ini mungkin memakan waktu hingga 5
                    menit
                  </li>
                </ul>
              </>
            }
          />
        </>
      );
    case "BRI":
      return (
        <>
          <AccordionCustom
            isShow={isShow}
            title="ATM"
            body={
              <>
                <b>LANGKAH 1: TEMUKAN ATM TERDEKAT</b>
                <ul>
                  <li>
                    Masukkan kartu, kemudian pilih bahasa dan masukkan PIN anda
                  </li>
                  <li>Pilih "Transaksi Lain" dan pilih "Pembayaran"</li>
                  <li>Pilih menu "Lainnya" dan pilih "Briva"</li>
                </ul>
                <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                <ul>
                  <li>
                    Masukkan Nomor Virtual Account {account_number} dan jumlah
                    yang ingin anda bayarkan
                  </li>
                  <li>Periksa data transaksi dan tekan "YA"</li>
                </ul>
                <b>LANGKAH 3: TRANSAKSI BERHASIL</b>
                <ul>
                  <li>
                    Setelah transaksi anda selesai, invoice ini akan diupdate
                    secara otomatis. Proses ini mungkin memakan waktu hingga 5
                    menit
                  </li>
                </ul>
              </>
            }
          />
          <AccordionCustom
            isShow={isShow}
            title="IBANKING"
            body={
              <>
                <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                <ul>
                  <li>
                    Buka situs <b>https://ib.bri.co.id/ib-bri/</b>, dan masukkan
                    USER ID dan PASSWORD anda
                  </li>
                  <li>Pilih "Pembayaran" dan pilih "Briva"</li>
                </ul>
                <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                <ul>
                  <li>
                    Masukkan Nomor Virtual Account {account_number} dan jumlah
                    yang ingin anda bayarkan
                  </li>
                  <li>
                    Masukkan password anda kemudian masukkan mToken internet
                    banking
                  </li>
                </ul>
                <b>LANGKAH 3: TRANSAKSI BERHASIL</b>
                <ul>
                  <li>
                    Setelah transaksi anda selesai, invoice ini akan diupdate
                    secara otomatis. Proses ini mungkin memakan waktu hingga 5
                    menit
                  </li>
                </ul>
              </>
            }
          />
          <AccordionCustom
            isShow={isShow}
            title="MBANKING"
            body={
              <>
                <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                <ul>
                  <li>
                    Buka aplikasi BRI Mobile Banking, masukkan USER ID dan PIN
                    anda
                  </li>
                  <li>Pilih "Pembayaran" dan pilih "Briva"</li>
                  <li>Pilih menu "Transfer"</li>
                </ul>
                <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                <ul>
                  <li>
                    Masukkan Nomor Virtual Account anda {account_number} dan
                    jumlah yang ingin anda bayarkan
                  </li>
                  <li>Masukkan PIN Mobile Banking BRI</li>
                </ul>
                <b>LANGKAH 3: TRANSAKSI BERHASIL</b>
                <ul>
                  <li>
                    Setelah transaksi anda selesai, invoice ini akan diupdate
                    secara otomatis. Proses ini mungkin memakan waktu hingga 5
                    menit
                  </li>
                </ul>
              </>
            }
          />
        </>
      );
    case "PERMATA":
      return (
        <>
          <AccordionCustom
            isShow={isShow}
            title="ATM"
            body={
              <>
                <b>LANGKAH 1: TEMUKAN ATM TERDEKAT</b>
                <ul>
                  <li>Masukkan kartu ATM Permata anda</li>
                  <li>Masukkan PIN</li>
                </ul>
                <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                <ul>
                  <li>Pilih menu "Transaksi Lainnya"</li>
                  <li>Pilih menu "Pembayaran"</li>
                  <li>Pilih menu "Pembayaran Lainnya"</li>
                  <li>Pilih menu "Virtual Account"</li>
                  <li>Masukkan Nomor Virtual Account {account_number}</li>
                  <li>Lalu pilih rekening debet yang akan digunakan</li>
                  <li>Konfirmasi detail transaksi anda</li>
                </ul>
                <b>LANGKAH 3: TRANSAKSI BERHASIL</b>
                <ul>
                  <li>Transaksi Anda telah selesai</li>
                  <li>
                    Setelah transaksi anda selesai, invoice ini akan diupdate
                    secara otomatis. Proses ini mungkin memakan waktu hingga 5
                    menit
                  </li>
                </ul>
              </>
            }
          />
          <AccordionCustom
            isShow={isShow}
            title="IBANKING"
            body={
              <>
                <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                <ul>
                  <li>
                    Buka situs <b>https://ib.bri.co.id/ib-bri/</b>, dan masukkan
                    USER ID dan PASSWORD anda
                  </li>
                  <li>Pilih "Pembayaran" dan pilih "Briva"</li>
                </ul>
                <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                <ul>
                  <li>
                    Masukkan Nomor Virtual Account {account_number} dan jumlah
                    yang ingin anda bayarkan
                  </li>
                  <li>
                    Masukkan password anda kemudian masukkan mToken internet
                    banking
                  </li>
                </ul>
                <b>LANGKAH 3: TRANSAKSI BERHASIL</b>
                <ul>
                  <li>
                    Setelah transaksi anda selesai, invoice ini akan diupdate
                    secara otomatis. Proses ini mungkin memakan waktu hingga 5
                    menit
                  </li>
                </ul>
              </>
            }
          />
          <AccordionCustom
            isShow={isShow}
            title="MBANKING"
            body={
              <>
                <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                <ul>
                  <li>
                    Buka aplikasi BRI Mobile Banking, masukkan USER ID dan PIN
                    anda
                  </li>
                  <li>Pilih "Pembayaran" dan pilih "Briva"</li>
                  <li>Pilih menu "Transfer"</li>
                </ul>
                <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                <ul>
                  <li>
                    Masukkan Nomor Virtual Account anda {account_number} dan
                    jumlah yang ingin anda bayarkan
                  </li>
                  <li>Masukkan PIN Mobile Banking BRI</li>
                </ul>
                <b>LANGKAH 3: TRANSAKSI BERHASIL</b>
                <ul>
                  <li>
                    Setelah transaksi anda selesai, invoice ini akan diupdate
                    secara otomatis. Proses ini mungkin memakan waktu hingga 5
                    menit
                  </li>
                </ul>
              </>
            }
          />
        </>
      );
    case "BSI":
      return (
        <>
          <AccordionCustom
            isShow={isShow}
            title="ATM"
            body={
              <>
                <b>LANGKAH 1: TEMUKAN ATM TERDEKAT</b>
                <ul>
                  <li>Masukkan kartu ATM BSI anda</li>
                  <li>Masukkan PIN</li>
                </ul>
                <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                <ul>
                  <li>Pilih menu "Pembayaran/Pembelian"</li>
                  <li>Pilih menu "Institusi"</li>
                  <li>
                    Masukkan kode BSI VA Nomor Virtual Account {account_number}
                  </li>
                  <li>Detail yang ditampilkan: NIM, Nama, & Total Tagihan</li>
                  <li>Konfirmasi detail transaksi anda</li>
                </ul>
                <b>LANGKAH 3: TRANSAKSI BERHASIL</b>
                <ul>
                  <li>Transaksi Anda telah selesai</li>
                  <li>
                    Setelah transaksi anda selesai, invoice ini akan diupdate
                    secara otomatis. Proses ini mungkin memakan waktu hingga 5
                    menit
                  </li>
                </ul>
              </>
            }
          />
          <AccordionCustom
            isShow={isShow}
            title="IBANKING"
            body={
              <>
                <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                <ul>
                  <li>
                    Buka situs <b>https://bsinet.bankbsi.co.id</b>
                  </li>
                  <li>Masukkan User ID dan Password</li>
                </ul>
                <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                <ul>
                  <li>Pilih Menu "Pembayaran"</li>
                  <li>Pilih Nomor Rekening BSI Anda</li>
                  <li>Pilih menu "Institusi"</li>
                  <li>Nama institusi Xendit (kode {merchant_code})</li>
                  <li>Masukkan Nomor Virtual Account {account_number}</li>
                  <li>Konfirmasi detail transaksi anda</li>
                  <li>Masukkan otentikasi transaksi/token</li>
                </ul>
                <b>LANGKAH 3: TRANSAKSI BERHASIL</b>
                <ul>
                  <li>
                    Setelah transaksi anda selesai, invoice ini akan diupdate
                    secara otomatis. Proses ini mungkin memakan waktu hingga 5
                    menit
                  </li>
                </ul>
              </>
            }
          />
          <AccordionCustom
            isShow={isShow}
            title="MBANKING"
            body={
              <>
                <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                <ul>
                  <li>Buka aplikasi BSI Mobile</li>
                  <li>Masukkan User ID dan Password</li>
                </ul>
                <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                <ul>
                  <li>Pilih Menu "Pembayaran"</li>
                  <li>Pilih Nomor Rekening BSI Anda</li>
                  <li>Pilih menu "Institusi"</li>
                  <li>Nama institusi Xendit (kode {merchant_code})</li>
                  <li>Masukkan Nomor Virtual Account {account_number} </li>
                  <li>Konfirmasi detail transaksi anda</li>
                  <li>Masukkan otentikasi transaksi/token</li>
                </ul>
                <b>LANGKAH 3: TRANSAKSI BERHASIL</b>
                <ul>
                  <li>Transaksi Anda telah selesai</li>
                  <li>
                    Setelah transaksi anda selesai, invoice ini akan diupdate
                    secara otomatis. Proses ini mungkin memakan waktu hingga 5
                    menit
                  </li>
                </ul>
              </>
            }
          />
          <AccordionCustom
            isShow={isShow}
            title="INTERBANK"
            body={
              <>
                <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                <ul>
                  <li>Buka aplikasi Mobile bank Anda</li>
                  <li>Masukkan User ID dan Password</li>
                </ul>
                <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                <ul>
                  <li>Pilih Menu "Transfer"</li>
                  <li>Pilih Menu "Antar Bank"</li>
                  <li>
                    PMasukkan BSI VA Code "900" + Nomor Virtual Account{" "}
                    {account_number}
                    Catatan: Untuk transfer antar bank via ATM, Anda harus
                    memasukkan Kode Bank BSI "451" sebelum Kode BSI VA "900"
                  </li>
                  <li>Masukkan nominal yang ingin dibayarkan</li>
                  <li>Pilih tipe rekening</li>
                  <li>Konfirmasi detail transaksi Anda</li>
                </ul>
                <b>LANGKAH 3: TRANSAKSI BERHASIL</b>
                <ul>
                  <li>Transaksi Anda telah selesai</li>
                  <li>
                    Setelah transaksi anda selesai, invoice ini akan diupdate
                    secara otomatis. Proses ini mungkin memakan waktu hingga 5
                    menit
                  </li>
                </ul>
              </>
            }
          />
        </>
      );
    case "OVO":
      return (
        <>
          <AccordionCustom
            isShow={isShow}
            title="Perhatian"
            body={
              <>
                <b>JIKA PEMBAYARAN GAGAL, LAKUKAN LANGKAH BERIKUT INI:</b>
                <ul>
                  <li>
                    Masukkan nomor telepon anda dan coba lakukan pembayaran
                    kembali.
                  </li>
                  <li>Kosongkan cache aplikasi OVO anda.</li>
                  <li>jika tetap gagal, silahkan hubungi Xendit support.</li>
                  <li>
                    Anda{" "}
                    <b>
                      TIDAK akan dikenakan biaya dua kali karena mencoba ulang.
                    </b>
                  </li>
                </ul>
              </>
            }
          />
        </>
      );
    case "ASTRAPAY":
      return (
        <>
          <AccordionCustom isShow={isShow} title="Perhatian" body={<></>} />
        </>
      );
    case "QR_CODE":
      return (
        <>
          <AccordionCustom
            isShow={isShow}
            title="Panduan pembayaran"
            body={
              <>
                <ul>
                  <li>Scan atau screenshot QR Code</li>
                  <li>
                    Buka aplikasi bank/dompet digital (gojek, OVO, Dana, QRIS
                    BCA, dll)
                  </li>
                  <li>Pilih Pay atau Scan</li>
                  <li>Upload tangkapan layar (hasil screenshot) QR Code</li>
                  <li>Masukan kode PIN dompet digitalmu</li>
                  <li>
                    Jika pembayaran telah selesai dan berhasil, kamu akan
                    mendapat notifikasi
                  </li>
                </ul>
              </>
            }
          />
        </>
      );
    default:
      return <div>error</div>;
  }
}

export default AccordionContent;
