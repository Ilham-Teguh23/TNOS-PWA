import React from "react";
import { Fragment } from "react";

function KetentuanComponent({ show, setShow, kode }) {
  const kodeBadanHukum = () => {
    if (kode === "1") {
      return "PT";
    } else if (kode === "2") {
      return "CV";
    } else if (kode === "3") {
      return "Yayasan";
    } else if (kode === "4") {
      return "Perkumpulan";
    } else if (kode === "5") {
      return "Asosiasi";
    } else {
      return "error";
    }
  };

  return localStorage.getItem("code") === "en" ? (
    <Fragment>
      <div
        className={`card-syarat-ketentuan-jjs ${
          show ? "" : "show-ketentuan-jsd"
        }`}
      >
        <b>Terms of Establishment {kodeBadanHukum()}</b>
        <br />
        1. Provisions for the name {kodeBadanHukum()}
        <br />
        For {kodeBadanHukum()} names, please submit 3 (three) {kodeBadanHukum()}{" "}
        names With rule:
        <br />
        <ul>
          <li>Consists of a minimum of 3 (three) syllables</li>
          <li>Written in Latin letters</li>
          <li>
            It should not be the same as other {kodeBadanHukum()} in terms of
            writing and pronunciation (example: PT Sukses Jaya Utama with{" "}
            {kodeBadanHukum()}
            Sukses Djaja Oetama)
          </li>
          <li>Not contrary to public order and/or decency</li>
          <li>
            Has nothing in common with the name of a state institution,
            government agencies or international organizations
          </li>
          <li>
            Does not consist of numbers or series of numbers, letters or letters
            that do not form words <br />
            (contoh: {kodeBadanHukum()} 14045, {kodeBadanHukum()} Qwerty)
          </li>
          <li>
            Does not mean as a company, legal entity, or civil partnership
            (using the words Foundation, Ltd, Inc., Co., etc.)
          </li>
        </ul>
        <div className={`${show ? "hide-ketentuan-ssdbb" : ""}`}>
          <br />
          <br />
          ........
        </div>
        <div className="btn-position-sjs">
          <button
            className={`btn btn-layanan ${show ? "hide-ketentuan-ssdbb" : ""}`}
            style={{ fontSize: "12px" }}
            onClick={() => {
              if (show) {
                setShow(false);
              } else {
                setShow(true);
              }
            }}
          >
            More complete...
          </button>
        </div>
        If the names of the 3 {kodeBadanHukum()} submitted are not available, we
        will inform to file a different name.
        <br />
        2. Selection of KBLI/Business Field
        <ul>
          <li>
            KBLI (Indonesian Business Field Standard Classification) is
            classification code system which will then be inputted on Deed and
            NIB
          </li>
          <li>
            KBLI yang dipilih harus satu turunan dengan kegiatan usaha(untuk
            menghindari perusahaan palugada, perusahaan yang memiliki kegiatan
            usaha yang berbeda-beda mengikuti demand)
          </li>
          <li>
            The selected KBLI must have the same derivative as the activity
            effort(to avoid the palugada company, company who have different
            business activities follow demand)
            <a
              href="https://oss.go.id/informasi/kbli-berbasis-risiko"
              target="_blank"
              rel="noreferrer"
            >
              https://oss.go.id/informasi/kbli-berbasis-risiko
            </a>
          </li>
        </ul>
        {kode === "3" ? (
          <>
            3. Husband and wife are not allowed to set up a {kodeBadanHukum()}
            <br />
            4. {kodeBadanHukum()} has a minimum capital of Rp.
            <br />
            50,000,000 (Fifty Million Rupiah) and make a deposit 25% of the
            capital (fictitious deposit)
          </>
        ) : (
          <>
            <div>3. Shareholders and Directors</div>
            <ul>
              <li>{kodeBadanHukum()} has at least 2 shareholders</li>
              <li>
                {kodeBadanHukum()} must have at least 1 director and 1
                commissioner
              </li>
              <li>
                If there are more than 1 director and commissioner respectively,
                one of them was appointed director and President Commissioner
              </li>
            </ul>
            4. Husband and wife are not allowed to set up a {kodeBadanHukum()}
            <br />
            5. {kodeBadanHukum()} has a minimum capital of Rp.
            <br />
            50,000,000 (Fifty Million Rupiah) and make a deposit 25% of the
            capital (fictitious deposit)
          </>
        )}
        <div className="btn-position-sjs">
          <button
            className={`btn btn-layanan  ${show ? "" : ""}`}
            style={{ fontSize: "12px" }}
            onClick={() => {
              if (show) {
                setShow(false);
              } else {
                setShow(true);
              }
            }}
          >
            More complete...
          </button>
        </div>
      </div>
      <br />
      <div className={`${show ? "" : "hide-ketentuan-ssdbb"}`}>
        <div className="alert alert-danger" role="alert">
          Before filling out the form, please read the terms and conditions
          terms first
        </div>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div
        className={`card-syarat-ketentuan-jjs ${
          show ? "" : "show-ketentuan-jsd"
        }`}
      >
        <b>Ketentuan Pendirian {kodeBadanHukum()}</b>
        <br />
        1. Ketentuan nama {kodeBadanHukum()} <br />
        Untuk nama {kodeBadanHukum()}, mohon untuk mengajukan 3 (tiga) nama{" "}
        {kodeBadanHukum()}. Dengan aturan:
        <br />
        <ul>
          <li>Terdiri dari minimal 3 (tiga) suku kata</li>
          <li>Ditulis dengan huruf latin</li>
          <li>
            Tidak boleh sama dengan {kodeBadanHukum()} lain dari sisi penulisan
            dan pengucapan (contoh: {kodeBadanHukum()} Sukses Jaya Utama dengan
            {` ` + kodeBadanHukum()} Sukses Djaja Oetama)
          </li>
          <li>Tidak bertentangan dengan ketertiban umum dan/atau kesusilaan</li>
          <li>
            Tidak memiliki kesamaan dengan nama lembaga negara, lembaga
            pemerintahan, atau lembaga internasional
          </li>
          <li>
            Tidak terdiri atas angka atau rangkaian angka, huruf atau huruf yang
            tidak membentuk kata <br />
            (contoh: {kodeBadanHukum()} 14045, {kodeBadanHukum()} Qwerty)
          </li>
          <li>
            Tidak memiliki artian sebagai perseroan, badan hukum, atau
            persekutuan perdata (menggunakan kata Yayasan, Ltd, Inc., Co., dll)
          </li>
        </ul>
        <div className={`${show ? "hide-ketentuan-ssdbb" : ""}`}>........</div>
        <div className="btn-position-sjs">
          <button
            className={`btn btn-layanan ${show ? "hide-ketentuan-ssdbb" : ""}`}
            style={{ fontSize: "12px" }}
            onClick={() => {
              if (show) {
                setShow(false);
              } else {
                setShow(true);
              }
            }}
          >
            Lebih lengkap...
          </button>
        </div>
        Jika dari 3 nama {kodeBadanHukum()} yang diajukan tidak tersedia, akan
        kami informasikan untuk mengajukan nama yang berbeda.
        <br />
        2. Pemilihan KBLI/Bidang Usaha
        <ul>
          <li>
            KBLI (Klasifikasi Baku Lapangan Usaha Indonesia) adalah sistem kode
            klasifikasi yang kemudian akan diinput pada Akta dan NIB
          </li>
          <li>
            KBLI yang dipilih harus satu turunan dengan kegiatan usaha(untuk
            menghindari perusahaan palugada, perusahaan yang memiliki kegiatan
            usaha yang berbeda-beda mengikuti demand)
          </li>
          <li>
            Pemilihan KBLI dapat dilakukan pada link{" "}
            <a
              href="https://oss.go.id/informasi/kbli-berbasis-risiko"
              target="_blank"
              rel="noreferrer"
            >
              https://oss.go.id/informasi/kbli-berbasis-risiko
            </a>
          </li>
        </ul>
        {kode === "3" ? (
          <>
            3. Suami Istri tidak diperbolehkan untuk mendirikan{" "}
            {kodeBadanHukum()}
            <br />
            4. {kodeBadanHukum()} memiliki modal minimal Rp.
            <br />
            50.000.000 (Lima Puluh Juta Rupiah) dan melakukan penyetoran
            sejumlah 25% dari modal (penyetoran fiktif)
          </>
        ) : (
          <>
            3. Pemegang Saham dan Direksi
            <ul>
              <li>{kodeBadanHukum()} minimal memiliki 2 pemegang saham</li>
              <li>
                {kodeBadanHukum()} minimal memiliki 1 direktur dan 1 komisaris{" "}
              </li>
              <li>
                Apabila terdapat lebih dari 1 direktur dan komisaris
                masing-masing, salah satunya diangkat menjadi direktur dan
                komisaris utama
              </li>
            </ul>
            4. Suami Istri tidak diperbolehkan untuk mendirikan{" "}
            {kodeBadanHukum()}
            <br />
            5. {kodeBadanHukum()} memiliki modal minimal Rp.
            <br />
            50.000.000 (Lima Puluh Juta Rupiah) dan melakukan penyetoran
            sejumlah 25% dari modal (penyetoran fiktif)
          </>
        )}
        <div className="btn-position-sjs">
          <button
            className={`btn btn-layanan  ${show ? "" : ""}`}
            style={{ fontSize: "12px" }}
            onClick={() => {
              if (show) {
                setShow(false);
              } else {
                setShow(true);
              }
            }}
          >
            Lebih lengkap...
          </button>
        </div>
      </div>
      <br />
      <div className={`${show ? "" : "hide-ketentuan-ssdbb"}`}>
        <div className="alert alert-danger" role="alert">
          Sebelum Mengisi form dimohon untuk membaca syarat dan ketentuan
          terlebih dahulu
        </div>
      </div>
    </Fragment>
  );
}

export default KetentuanComponent;
