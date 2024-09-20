import React from "react";
import { Fragment } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import pt from "../../assets/images/pt-option.png";
import cv from "../../assets/images/cv-option.png";
import yayasan from "../../assets/images/yayasan-option.png";
import perkumpulan from "../../assets/images/perkumpulan-option.png";
// import asosiasi from "../../assets/images/asosiasi-option.png";
import lain from "../../assets/images/lainnya-option.png";
import TitleHeader from "../utils/TitleHeader";
import MenuFooter from "../../components/cummon/MenuFooter";

function BadanUsahaOption() {
  TitleHeader("Menu Badan Usaha atau Hukum");
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/dashboard" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw ml-2">Badan Usaha</h5>
            </Link>
          </div>
          <div className="njwdjhwk">
            <div className="row">
              <div className="col-12 mb-3">
                <div
                  className="layanan-badan-usaha-dwd"
                  style={{ backgroundImage: `url('${pt}')` }}
                  onClick={() => navigate("/badan-usaha-pt")}
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
                  onClick={() => navigate("/badan-usaha-cv")}
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
                  onClick={() => navigate("/badan-usaha-yayasan")}
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
                  onClick={() => navigate("/badan-hukum-perkumpulan")}
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
                  onClick={() => navigate("/badan-usaha-asosiasi")}
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
                  onClick={() => navigate("/badan-usaha-lainnya")}
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
      <MenuFooter footer={false} />
    </Fragment>
  );
}

export default BadanUsahaOption;
