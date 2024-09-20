import React from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import pt from "../../../assets/images/new pwa icon/badan/pt.svg";
import cv from "../../../assets/images/new pwa icon/badan/cv.svg";
import yayasan from "../../../assets/images/new pwa icon/badan/yayasan.svg";
import perkumpulan from "../../../assets/images/new pwa icon/badan/perkumpulan.svg";
import lainnya from "../../../assets/images/new pwa icon/badan/lainnya.svg";
import PaddingPwa from "../../moleculars/PaddingPwa";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../utils/TitleHeader";

function PengamananProvider() {
  TitleHeader("Halaman pilihan");
  const navigate = useNavigate();
  return (
    <>
      <TopNewNav title="Pembuatan Legalitas Usaha" path={`/corporate-security/1`} />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div
              className="dashboard-container-f"
              style={{ marginTop: "60px" }}
            >
              <PaddingPwa padding={15}>
                <div className="card-option">
                  <div
                    className="card-option_img"
                    onClick={() => navigate("/corporate-security/1")}
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
                  </div>
                </div>
                <div className="card-option">
                  <div
                    className="card-option_img"
                    onClick={() => navigate("/corporate-security/2")}
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
              </PaddingPwa>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PengamananProvider;
