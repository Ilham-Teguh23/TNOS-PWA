import React from "react";
import { Fragment } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import pt from "../../assets/images/pt-option.png";
import cv from "../../assets/images/cv-option.png";
import yayasan from "../../assets/images/yayasan-option.png";
import perkumpulan from "../../assets/images/perkumpulan-option.png";
// import asosiasi from "../../assets/images/asosiasi-option.png";
import lain from "../../assets/images/lainnya-option.png";
import { useEffect } from "react";
import { decode as base64_decode } from "base-64";
var CryptoJS = require("crypto-js");
const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

function BadanUsahaOptionMobile() {
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    handleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUser = () => {
    let str = searchParams.get("query");
    var base64regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    if (!base64regex.test(str)) {
      if (!localStorage.getItem("data")) {
        console.log("salah");
        localStorage.removeItem("data");
        navigate("/login");
      }
    } else {
      let string = base64_decode(str);
      let cryptdata = string;
      const info2x = CryptoJS.AES.decrypt(cryptdata, secretKey).toString(
        CryptoJS.enc.Utf8
      );
      var data = "";
      if (!info2x) {
        console.log("salah");
      } else {
        data = JSON.parse(info2x);
        localStorage.setItem("data", JSON.stringify(data));
      }
      if (!localStorage.getItem("data")) {
        if (!data.user_id) {
          console.log("salah");
          localStorage.removeItem("data");
          navigate("/login");
        }
      }
    }
  };

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="njwdjhwk" style={{ padding: "20px 20px 50px 20px" }}>
            <div className="row">
              <div className="col-12 mb-3">
                <div
                  className="layanan-badan-usaha-dwd"
                  style={{ backgroundImage: `url('${pt}')` }}
                  onClick={() => navigate("/badan-usaha-pt-m")}
                >
                  <div className="title-layanan-badan-usaha-dwd">
                    <div className="title-dawdaw">PT</div>
                    <div className="layanan-paket-dwad">
                      <b>PERORANGAN</b>
                      <ul>
                        <li>
                          1. SK Kementerian Hukum dan HAM{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          2. NPWP PT{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          3. NIB{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          4. Free Konsultasi (+){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>Rp. 1.500.000</li>
                      </ul>
                      <b>START UP</b>
                      <ul>
                        <li>
                          1. Pengecekan dan Pemesanan nama PT{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          2. Akta Pendirian PT{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          3. SK Kemenkumham{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          4. NPWP PT{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          5. Nomor Izin Berusaha (NIB){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          6. Konsultasi Pembuatan PT (+){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          6. Ratusan SOP Perusahaan (+){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>Rp 5.500.000</li>
                      </ul>
                      <b>SCALE UP</b>
                      <ul>
                        <li>
                          1. Pengecekan dan Pemesanan Nama PT{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          2. Akta Pendirian PT{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          3. SK Kemenkumham{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          4. NPWP PT{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          5. Nomor Induk Berusaha (NIB){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          6. Logo Perusahaan dan Stationary Design (+){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          7. Stempel Perusahaan (+){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          8. Design Stempel (+){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          9. Email Perusahaan (+){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          10. Rekening Perusahaan dari Bank UOB (+){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          11. Ratusan SOP Perusahaan (+){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>Rp 6.000.000</li>
                      </ul>
                      <b>ALL IN</b>
                      <ul>
                        <li>
                          1. Pengecekan dan Pemesanan Nama PT{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          2. Akta Pendirian PT{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          3. SK Kemenkumham{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          4. NPWP PT{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          5. Nomor Induk Berusaha (NIB){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          6. Logo Perusahaan dan Stationary Design{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          7. Stempel Perusahaan{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          8. Email Perusahaan{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          9. Rekening Perusahaan dari Bank UOB{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          10. Virtual Office (1 tahun) (+){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          11. Ratusan SOP Perusahaan (+){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>Rp 8.000.000</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-3">
                <div
                  className="layanan-badan-usaha-dwd"
                  style={{ backgroundImage: `url('${cv}')` }}
                  onClick={() => navigate("/badan-usaha-cv-m")}
                >
                  <div className="title-layanan-badan-usaha-dwd">
                    <div className="title-dawdaw">CV</div>
                    <div className="layanan-paket-dwad">
                      <ul style={{ marginTop: "45px" }}>
                        <li>
                          1. Pengecekan dan Pemesanan Nama CV{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          2. Akta Notaris{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          3. SK Kemenkumham{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          4. NPWP CV{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          5. Nomor Induk Berusaha{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          6. Free Konsultasi (+){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          7. Free Ratusan Template SOP Perusahaan (+){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>Rp 3.500.000</li>
                        <br />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-3">
                <div
                  className="layanan-badan-usaha-dwd"
                  style={{
                    backgroundImage: `url('${yayasan}')`,
                  }}
                  onClick={() => navigate("/badan-usaha-yayasan-m")}
                >
                  <div className="title-layanan-badan-usaha-dwd">
                    <div className="title-dawdaw">YAYASAN</div>
                    <div className="layanan-paket-dwad">
                      <ul style={{ marginTop: "60px" }}>
                        <li>
                          1. Pengechekan dan Pemesanan Nama Yayasan{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          2. Akta Pendirian{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          3. Surat Keputusan Kemenkumham{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          4. Free Konsultasi (+){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>Rp 5.000.000</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-3">
                <div
                  className="layanan-badan-usaha-dwd"
                  style={{ backgroundImage: `url('${perkumpulan}')` }}
                  onClick={() => navigate("/badan-usaha-perkumpulan-m")}
                >
                  <div className="title-layanan-badan-usaha-dwd">
                    <div className="title-dawdaw">PERKUMPULAN</div>
                    <div className="layanan-paket-dwad">
                      <ul style={{ marginTop: "60px" }}>
                        <li>
                          1. Pengechekan dan Pemesanan Nama Perkumpulan{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          2. Akta Pendirian{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          3. Surat Keputusan Kemenkumham{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          4. Free Konsultasi (+){" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>Rp 5.000.000</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-12 mb-3">
                <div
                  className="layanan-badan-usaha-dwd"
                  style={{ backgroundImage: `url('${asosiasi}')` }}
                  onClick={() => navigate("/badan-usaha-asosiasi-m")}
                >
                  <div className="title-layanan-badan-usaha-dwd">
                    <div className="title-dawdaw">Asosiasi</div>
                    <div className="layanan-paket-dwad">
                      <ul style={{ marginTop: "60px" }}>
                        <li>
                          1. Pengecekan nama Asosiasi{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          2. Akta Pendirian & SK Kemenkumham{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          3. NPWP Asosiasi{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          4. Nomor Izin Berusaha{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          5. Izin Lokasi{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          5. Konsultasi Online{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col-12 mb-3">
                <div
                  className="layanan-badan-usaha-dwd"
                  style={{
                    backgroundImage: `url('${lain}')`,
                    // opacity: "0.2",
                  }}
                  // onClick={() => navigate("/next-update")}
                  onClick={() => navigate("/badan-usaha-lainnya-m")}
                >
                  <div className="title-layanan-badan-usaha-dwd">
                    <div className="title-dawdaw">Lainnya</div>
                    <div className="layanan-paket-dwad">
                      <ul style={{ marginTop: "60px" }}>
                        <li>
                          1. SBU{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          2. SIUJK{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          3. IMB{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          4. SIUP-MB{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                        <li>
                          5. Pembayaran lainnya.{" "}
                          <span style={{ float: "right" }}>
                            <FaCheck />
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default BadanUsahaOptionMobile;
