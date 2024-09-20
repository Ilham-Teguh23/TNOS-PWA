import React, { useEffect, useState } from "react";
import pt from "../../../assets/images/new pwa icon/badan/pt.svg";
import cv from "../../../assets/images/new pwa icon/badan/cv.svg";
import yayasan from "../../../assets/images/new pwa icon/badan/yayasan.svg";
import perkumpulan from "../../../assets/images/new pwa icon/badan/perkumpulan.svg";
import lainnya from "../../../assets/images/new pwa icon/badan/lainnya.svg";
import PaddingPwa from "../../moleculars/PaddingPwa";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../utils/TitleHeader";
import { getParams } from "../../moleculars/GetParams";
import { decode as base64_decode } from "base-64";
import construction from "../../../../src/assets/images/under-construction.png"
var CryptoJS = require("crypto-js");
const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

function OptionMobile() {
  const [getP, setP] = useState(null);
  TitleHeader("Halaman pilihan");
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  
  useEffect(() => {
    checkParams();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkParams = () => {
    let checkP = getParams(["query"]);

    if (!checkP) {
      console.log("params tidak ditemukan");
    } else {
      var base64regex =
        /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
      if (!base64regex.test(checkP.query)) {
        console.log("data base64 tidak cocok");
        navigate("/not-found");
      } else {
        let string = base64_decode(checkP.query);
        let cryptdata = string;
        const info2x = CryptoJS.AES.decrypt(cryptdata, secretKey).toString(
          CryptoJS.enc.Utf8
        );

        if (!info2x) {
          console.log("data base64 not match when decrypt");
        } else {
          var paramValue = JSON.parse(info2x);
          console.log(paramValue);
          setUser(paramValue);
          setP(checkP.query)
          localStorage.setItem("data", JSON.stringify(paramValue));
        }
        if (!localStorage.getItem("data")) {
          if (!paramValue.user_id) {
            console.log("salah");
            navigate("/not-found");
          }
        }
      }
    }
  };
  return (
    <>
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="dashboard-container-f" style={{ marginTop: "0px", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <img className src={construction} style={{width: '70%'}} />
              {/* <PaddingPwa padding={15}>
                <div className="card-option">
                  <div
                    className="card-option_img"
                    onClick={() => navigate(`/badan-usaha-pt-m/?query=${getP}`)}
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
                    onClick={() => navigate(`/badan-usaha-cv-m/?query=${getP}`)}
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
                    onClick={() => navigate(`/badan-usaha-yayasan-m/?query=${getP}`)}
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
                    onClick={() => navigate(`/badan-usaha-perkumpulan-m/?query=${getP}`)}
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
                    onClick={() => navigate(`/badan-usaha-lainnya-m/?query=${getP}`)}
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

export default OptionMobile;
