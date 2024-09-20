import React from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import { t } from "i18next";
import pt from "../../../assets/images/new pwa icon/badan/pt.svg";
import cv from "../../../assets/images/new pwa icon/badan/cv.svg";
import yayasan from "../../../assets/images/new pwa icon/badan/yayasan.svg";
import perkumpulan from "../../../assets/images/new pwa icon/badan/perkumpulan.svg";
import lainnya from "../../../assets/images/new pwa icon/badan/lainnya.svg";
import PaddingPwa from "../../moleculars/PaddingPwa";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../utils/TitleHeader";
import construction from "../../../../src/assets/images/under-construction.png"

function Option() {
  TitleHeader(t("layanan1"));
  const navigate = useNavigate();
  return (
    <>
      <TopNewNav title={t("layanan1")} path={`/dashboard`} />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="dashboard-container-f" style={{ marginTop: "0px", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <img className src={construction} style={{ width: '70%' }} />
              {/* <PaddingPwa padding={15}>
                <div className="card-option">
                  <div
                    className="card-option_img"
                    onClick={() => navigate("/pt")}
                  >
                    <img src={pt} alt="" />
                  </div>
                  <div className="card-option_content">
                    <div className="card-option_title">PT</div>
                    <div className="card-option_list-menu">
                      <div className="card-option_subtitle">Perorangan</div>
                      <div className="card-option_list">
                        <ul>
                          <li>SK Kementerian Hukum dan HAM</li>
                          <li>NPWP PT</li>
                          <li>NIB</li>
                          <li>Free Konsultasi (+)</li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-option_list-menu">
                      <div className="card-option_subtitle">Start Up</div>
                      <div className="card-option_list">
                        <ul>
                          <li>Pengecekan dan Pemesanan nama PT</li>
                          <li>Akta Pendirian PT</li>
                          <li>SK Kemenkumham</li>
                          <li>NPWP PT</li>
                          <li>Nomor Izin Berusaha (NIB)</li>
                          <li>Konsultasi Pembuatan PT (+)</li>
                          <li>Ratusan SOP Perusahaan (+)</li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-option_list-menu">
                      <div className="card-option_subtitle">Scale Up</div>
                      <div className="card-option_list">
                        <ul>
                          <li>Pengecekan dan Pemesanan Nama PT</li>
                          <li>Akta Pendirian PT</li>
                          <li>SK Kemenkumham</li>
                          <li>NPWP PT</li>
                          <li>Nomor Induk Berusaha (NIB)</li>
                          <li>Logo Perusahaan dan Stationary Design (+)</li>
                          <li>Stempel Perusahaan (+)</li>
                          <li>Design Stempel (+)</li>
                          <li>Email Perusahaan (+)</li>
                          <li>Rekening Perusahaan dari Bank UOB (+)</li>
                          <li>Ratusan SOP Perusahaan (+)</li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-option_list-menu">
                      <div className="card-option_subtitle">All In</div>
                      <div className="card-option_list">
                        <ul>
                          <li>Pengecekan dan Pemesanan Nama PT</li>
                          <li>Akta Pendirian PT</li>
                          <li>SK Kemenkumham</li>
                          <li>NPWP PT</li>
                          <li>Nomor Induk Berusaha (NIB)</li>
                          <li>Logo Perusahaan dan Stationary Design</li>
                          <li>Stempel Perusahaan</li>
                          <li>Design Stempel</li>
                          <li>Email Perusahaan</li>
                          <li>Rekening Perusahaan dari Bank UOB</li>
                          <li>Ratusan SOP Perusahaan</li>
                          <li>Virtual Office (1 tahun) (+)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-option">
                  <div
                    className="card-option_img"
                    onClick={() => navigate("/cv")}
                  >
                    <img src={cv} alt="" />
                  </div>
                  <div className="card-option_content">
                    <div className="card-option_title">CV</div>
                    <div className="card-option_list-menu">
                      <div className="card-option_list">
                        <ul>
                          <li>Pengecekan dan Pemesanan Nama CV</li>
                          <li>Akta Notaris</li>
                          <li>SK Kemenkumham</li>
                          <li>NPWP CV</li>
                          <li>Nomor Induk Berusaha</li>
                          <li>Free Konsultasi (+)</li>
                          <li>Free Ratusan Template SOP Perusahaan (+)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-option">
                  <div
                    className="card-option_img"
                    onClick={() => navigate("/foundation")}
                  >
                    <img src={yayasan} alt="" />
                  </div>
                  <div className="card-option_content">
                    <div className="card-option_title">Yayasan</div>
                    <div className="card-option_list-menu">
                      <div className="card-option_list">
                        <ul>
                          <li>Pengechekan dan Pemesanan Nama Yayasan</li>
                          <li>Akta Pendirian</li>
                          <li>Surat Keputusan Kemenkumham</li>
                          <li>Free Konsultasi (+)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-option">
                  <div
                    className="card-option_img"
                    onClick={() => navigate("/association")}
                  >
                    <img src={perkumpulan} alt="" />
                  </div>
                  <div className="card-option_content">
                    <div className="card-option_title">Perkumpulan</div>
                    <div className="card-option_list-menu">
                      <div className="card-option_list">
                        <ul>
                          <li>Pengechekan dan Pemesanan Nama Perkumpulan</li>
                          <li>Akta Pendirian</li>
                          <li>Surat Keputusan Kemenkumham</li>
                          <li>Free Konsultasi (+)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-option">
                  <div
                    className="card-option_img"
                    onClick={() => navigate("/others")}
                  >
                    <img src={lainnya} alt="" />
                  </div>
                  <div className="card-option_content">
                    <div className="card-option_title">Lainnya</div>
                    <div className="card-option_list-menu">
                      <div className="card-option_list">
                        <ul>
                          <li>SBU</li>
                          <li>SIUJK</li>
                          <li>IMB</li>
                          <li>SIUP-MB</li>
                          <li>Pembayaran lainnya.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-option">
                  <div
                    className="card-option_img"
                    onClick={() => navigate("/limited-company-dissolution")}
                  >
                    <img src={lainnya} alt="" />
                  </div>
                  <div className="card-option_content">
                    <div className="card-option_title">
                      Pembubaran Perseroan Terbatas
                    </div>
                    <div className="card-option_list-menu">
                      <div className="card-option_list">
                        <ul>
                          <li>-</li>
                          <li>-</li>
                          <li>-</li>
                          <li>-</li>
                          <li>-</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </PaddingPwa> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Option;
