import React, { Fragment } from "react";
import { Accordion } from "react-bootstrap";

function AccordionInstructionPayment({ payment, account_number }) {
  const accordionPaymentRender = () => {
    switch (payment) {
      case "MANDIRI":
        return (
          <Accordion defaultActiveKey={"0"} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>MBANKING YELLOW LIVIN APP</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
                  <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                  <ul>
                    <li>
                      Buka aplikasi Livin by Mandiri, masukkan PASSWORD atau
                      lakukan verifikasi wajah
                    </li>
                    <li>Pilih "Bayar"</li>
                    <li>Cari "Xendit 88908"</li>
                  </ul>
                  <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                  <ul>
                    <li>Pilih Xendit 88908 sebagai penyedia jasa</li>
                    <li>
                      Masukkan Nomor Virtual Account{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>ATM</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
                  <b>LANGKAH 1: TEMUKAN ATM TERDEKAT</b>
                  <ul>
                    <li>Masukkan ATM dan tekan "Bahasa Indonesia"</li>
                    <li>Masukkan PIN, lalu tekan "Benar"</li>
                    <li>Pilih "Pembayaran", lalu pilih "Multi Payment"</li>
                  </ul>
                  <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                  <ul>
                    <li>
                      Masukkan kode perusahaan '88908' (88908 XENDIT), lalu
                      tekan 'BENAR'
                    </li>
                    <li>
                      Masukkan Nomor Virtual Account{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>
                      , lalu tekan 'BENAR'
                    </li>
                    <li>
                      Masukkan nominal yang ingin di transfer, lalu tekan
                      "BENAR"
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>IBANKING</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
                  <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                  <ul>
                    <li>
                      Buka situs Mandiri Internet Banking
                      <span style={{ color: "blue" }}>
                        {" "}
                        https://ibank.bankmandiri.co.id
                      </span>
                    </li>
                    <li>Masuk menggunakan USER ID dan PASSWORD anda</li>
                    <li>Buka halaman beranda, kemudian pilih "Pembayaran"</li>
                    <li>Pilih "Multi Payment"</li>
                  </ul>
                  <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                  <ul>
                    <li>Pilih 88908 XENDIT sebagai penyedia jasa</li>
                    <li>
                      Masukkan Nomor Virtual Account{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      case "BRI":
        return (
          <Accordion defaultActiveKey={"0"} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>ATM</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
                  <b>LANGKAH 1: TEMUKAN ATM TERDEKAT</b>
                  <ul>
                    <li>
                      Masukkan kartu, kemudian pilih bahasa dan masukkan PIN
                      anda
                    </li>
                    <li>Pilih "Transaksi Lain" dan pilih "Pembayaran"</li>
                    <li>Pilih menu "Lainnya" dan pilih "Briva"</li>
                  </ul>
                  <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                  <ul>
                    <li>
                      Masukkan Nomor Virtual Account{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>{" "}
                      dan jumlah yang ingin anda bayarkan
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>IBANKING</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
                  <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                  <ul>
                    <li>
                      Buka situs{" "}
                      <span style={{ color: "blue" }}>
                        {" "}
                        https://ib.bri.co.id/ib-bri/
                      </span>
                      , dan masukkan USER ID dan PASSWORD anda
                    </li>
                    <li>Pilih "Pembayaran" dan pilih "Briva"</li>
                  </ul>
                  <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                  <ul>
                    <li>
                      Masukkan Nomor Virtual Account{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>{" "}
                      dan jumlah yang ingin anda bayarkan
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>MBANKING</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
                  <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                  <ul>
                    <li>
                      Buka aplikasi BRI Mobile Banking, masukkan USER ID dan PIN
                      anda
                    </li>
                    <li>Pilih "Pembayaran" dan pilih "Briva"</li>
                  </ul>
                  <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                  <ul>
                    <li>
                      Masukkan Nomor Virtual Account anda{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>{" "}
                      dan jumlah yang ingin anda bayarkan
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      case "BCA":
        return (
          <Accordion defaultActiveKey={"0"} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>ATM</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
                  <b>LANGKAH 1: TEMUKAN ATM TERDEKAT</b>
                  <ul>
                    <li>Masukkan Kartu ATM BCA</li>
                    <li>Masukkan PIN</li>
                  </ul>
                  <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                  <ul>
                    <li>Pilih menu "Transaksi Lainnya"</li>
                    <li>Pilih menu "Transfer"</li>
                    <li>Pilih menu "ke Rekening BCA Virtual Account"</li>
                    <li>
                      Masukkan Nomor Virtual Account Anda{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>
                      . Tekan "Benar" untuk melanjutkan
                    </li>
                    <li>
                      Di halaman konfirmasi, pastikan detil pembayaran sudah
                      sesuai seperti No VA, Nama, Perus/Produk dan Total
                      Tagihan, tekan "Benar" untuk melanjutkan
                    </li>
                    <li>Pastikan nama kamu dan Total Tagihannya benar</li>
                    <li>Tekan "Ya" jika sudah benar</li>
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>IBANKING</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
                  <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                  <ul>
                    <li>
                      Lakukan log in pada aplikasi KlikBCA Individual{" "}
                      <span style={{ color: "blue" }}>
                        https://ibank.klikbca.com
                      </span>{" "}
                    </li>
                    <li>Masukkan User ID dan PIN</li>
                  </ul>
                  <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                  <ul>
                    <li>
                      Pilih "Transfer Dana", kemudian pilih "Transfer ke BCA
                      Virtual Account"
                    </li>
                    <li>
                      Masukkan Nomor Virtual Account{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>
                    </li>
                    <li>Pilih "Lanjutkan"</li>
                    <li>
                      Masukkan "RESPON KEYBCA APPLI 1" yang muncul pada Token
                      BCA anda, kemudian tekan tombol "Kirim"
                    </li>
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>MBANKING</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
                  <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                  <ul>
                    <li>Buka aplikasi BCA Mobile</li>
                    <li>
                      Pilih menu "m-BCA", kemudian masukkan kode akses m-BCA
                    </li>
                  </ul>
                  <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                  <ul>
                    <li>
                      Pilih "m-Transfer", kemudian pilih "BCA Virtual Account"
                    </li>
                    <li>
                      Masukkan Nomor Virtual Account anda{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>
                      , kemudian tekan "OK"
                    </li>
                    <li>
                      Tekan tombol "Kirim" yang berada di sudut kanan atas
                      aplikasi untuk melakukan transfer
                    </li>
                    <li>Tekan "OK" untuk melanjutkan pembayaran</li>
                    <li>Masukkan PIN Anda untuk meng-otorisasi transaksi</li>
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      case "BNI":
        return (
          <Accordion defaultActiveKey={"0"} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>ATM</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
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
                      Masukkan Nomor Virtual Account anda{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>
                    </li>
                    <li>
                      {" "}
                      Tagihan yang harus dibayarkan akan muncul pada layar
                      konfirmasi
                    </li>
                    <li>
                      Konfirmasi, apabila telah sesuai, lanjutkan transaksi
                    </li>
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>IBANKING</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
                  <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                  <ul>
                    <li>
                      Buka situs{" "}
                      <span style={{ color: "blue" }}>
                        https://ibank.bni.co.id
                      </span>
                    </li>
                    <li>Masukkan User ID dan Password</li>
                  </ul>
                  <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                  <ul>
                    <li>Pilih menu "Transfer"</li>
                    <li>Pilih menu "Virtual Account Billing"</li>
                    <li>
                      Masukkan Nomor Virtual Account{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>MBANKING</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
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
                      Masukkan Nomor Virtual Account anda{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>{" "}
                      pada menu "Input Baru"
                    </li>
                    <li>
                      Tagihan yang harus dibayarkan akan muncul pada layar
                      konfirmasi
                    </li>
                    <li>
                      Konfirmasi transaksi dan masukkan Password Transaksi
                    </li>
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      case "BSI":
        return (
          <Accordion defaultActiveKey={"0"} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>ATM BELUM DISESUAIKAN</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
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
                      Masukkan Nomor Virtual Account anda{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>
                    </li>
                    <li>
                      {" "}
                      Tagihan yang harus dibayarkan akan muncul pada layar
                      konfirmasi
                    </li>
                    <li>
                      Konfirmasi, apabila telah sesuai, lanjutkan transaksi
                    </li>
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>IBANKING</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
                  <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                  <ul>
                    <li>
                      Buka situs{" "}
                      <span style={{ color: "blue" }}>
                        https://new.permatanet.com
                      </span>
                    </li>
                    <li>Masukkan User ID dan Password</li>
                  </ul>
                  <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                  <ul>
                    <li>Pilih "Pembayaran Tagihan"</li>
                    <li>Pilih "Virtual Account"</li>
                    <li>
                      Masukk Nomor Virtual Account{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>
                    </li>
                    <li>Periksa kembali detail pembayaran anda</li>
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>MBANKING</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
                  <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                  <ul>
                    <li>Buka aplikasi PermataMobile Internet</li>
                    <li>Masukkan User ID dan Password</li>
                  </ul>
                  <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                  <ul>
                    <li>Pilih "Pembayaran Tagihan"</li>
                    <li>Pilih "Virtual Account"</li>
                    <li>
                      Masukkan Nomor Virtual Account Anda{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>
                    </li>
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      case "PERMATA":
        return (
          <Accordion defaultActiveKey={"0"} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>ATM</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
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
                    <li>
                      Masukkan Nomor Virtual Account{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>
                    </li>
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>IBANKING</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
                  <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                  <ul>
                    <li>
                      Buka situs{" "}
                      <span style={{ color: "blue" }}>
                        https://ibank.bni.co.id
                      </span>
                    </li>
                    <li>Masukkan User ID dan Password</li>
                  </ul>
                  <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                  <ul>
                    <li>Pilih menu "Transfer"</li>
                    <li>Pilih menu "Virtual Account Billing"</li>
                    <li>
                      Masukkan Nomor Virtual Account{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>MBANKING</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
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
                      Masukkan Nomor Virtual Account anda{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>{" "}
                      pada menu "Input Baru"
                    </li>
                    <li>
                      Tagihan yang harus dibayarkan akan muncul pada layar
                      konfirmasi
                    </li>
                    <li>
                      Konfirmasi transaksi dan masukkan Password Transaksi
                    </li>
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      case "SAHABAT_SAMPOERNA":
        return (
          <Accordion defaultActiveKey={"0"} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>ATM belum di isi</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
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
                    <li>
                      Masukkan Nomor Virtual Account{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>
                    </li>
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>IBANKING</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
                  <b>LANGKAH 1: MASUK KE AKUN ANDA</b>
                  <ul>
                    <li>
                      Buka situs{" "}
                      <span style={{ color: "blue" }}>
                        https://ibank.bni.co.id
                      </span>
                    </li>
                    <li>Masukkan User ID dan Password</li>
                  </ul>
                  <b>LANGKAH 2: DETAIL PEMBAYARAN</b>
                  <ul>
                    <li>Pilih menu "Transfer"</li>
                    <li>Pilih menu "Virtual Account Billing"</li>
                    <li>
                      Masukkan Nomor Virtual Account{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>MBANKING</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
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
                      Masukkan Nomor Virtual Account anda{" "}
                      <span style={{ color: "#bf9a30" }}>{account_number}</span>{" "}
                      pada menu "Input Baru"
                    </li>
                    <li>
                      Tagihan yang harus dibayarkan akan muncul pada layar
                      konfirmasi
                    </li>
                    <li>
                      Konfirmasi transaksi dan masukkan Password Transaksi
                    </li>
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
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      case "QR_CODE":
        return (
          <Accordion defaultActiveKey={"0"} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Lihat panduan</Accordion.Header>
              <Accordion.Body>
                <div className="accordion-f">
                  <ul>
                    <li>Scan atau screenshot QR code</li>
                    <li>
                      Buka aplikasi bank/dompet digital (Gojek, OVO, Dana, QRIS
                      BCA, dll).
                    </li>
                    <li>Pilih ‘Pay’ atau ‘Scan’</li>
                    <li>Upload tangkapan layar (hasil screenshot) QR Code.</li>
                    <li>Masukkan kode PIN dompet digitalmu.</li>
                    <li>
                      Jika pembayaran telah selesai dan berhasil, kamu akan
                      mendapat notifikasi.
                    </li>
                  </ul>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );

      default:
        return <div>error</div>;
    }
  };

  return <Fragment>{accordionPaymentRender()}</Fragment>;
}

export default AccordionInstructionPayment;
