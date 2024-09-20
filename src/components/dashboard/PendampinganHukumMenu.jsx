import React from "react";
import {
  FaArrowAltCircleRight,
  FaArrowLeft,
  FaClock,
  FaCreditCard,
  FaMinus,
  FaPlus,
  FaRegClock,
  FaShieldAlt,
  FaTimesCircle,
  FaUser,
  FaWindowMaximize,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import searchGuard from "../../assets/images/search-guard.svg";
import garisGuard from "../../assets/images/garis_guard-mnu.svg";
import ReactTooltip from "react-tooltip";
import { useState, Fragment } from "react";

function PendampinganHukumMenu() {
  const [fullsize, setFullSize] = useState(false);

  const fullSizeMenu = async () => {
    if (fullsize) {
      // console.log("full");
      setFullSize(false);
    } else {
      // console.log("hide");
      setFullSize(true);
    }
  };
  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="position-abs-dawj">
            <div className="w-100">
              <div className="nav-top-login">
                <Link to="/pengacara-menu" className="btn nav-back-arrow">
                  <FaArrowLeft className="hhagwd" />
                </Link>
                <Link to="/dashboard" className="btn nav-back-arrow">
                  <FaUser />
                </Link>
              </div>
            </div>
          </div>
          <div className={`box-maps-andk ${fullsize ? "full-size" : ""}`}>
            <iframe
              className={`map-style-dadjdwkl ${fullsize ? "full-size" : ""}`}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.016872947096!2d106.77011531476926!3d-6.261507295467826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9ec5a4f6c21fe8e5!2zNsKwMTUnNDEuNCJTIDEwNsKwNDYnMjAuMyJF!5e0!3m2!1sid!2sid!4v1666608598632!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: "0px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="map"
            ></iframe>
            <div className="p-dadj">
              <div className="position-btn-full-size-sj">
                <button
                  onClick={() => fullSizeMenu()}
                  className="btn-full-size-menu-sj"
                >
                  {fullsize ? <FaWindowMaximize /> : <FaTimesCircle />}
                </button>
              </div>
              <div className="search-destination-ajd">
                {/* <div className="tombol-hide-show-dkw">
                <FaTimesCircle />
              </div> */}
                <span className="group-jkan">
                  <img src={searchGuard} alt="" />
                </span>
                <input
                  type="text"
                  className="form-control klda text-center"
                  placeholder="Atur lokasi titik temu"
                />
              </div>
            </div>
          </div>
          <div
            className={`box-content-guard-menu-adn ${fullsize ? "hide" : ""}`}
          >
            <div className={`box-show-hide-sj ${fullsize ? "hide" : ""}`}>
              <div className="detail-location-jsan">
                <h5 className="title-detail-sj">Detail Lokasi :</h5>
                <p className="p-detail-lokasi-sj">
                  Jl. Sultan Iskandar Muda No. 100 C, RT.05/RW.4, Kby. Lama
                  Utara, Kec. Kby. Lama, Kota Jakarta Selatan, Daerah Khusus
                  Ibukota Jakarta 12240, Indonesia.
                </p>
              </div>
              <div className="garis-guard-menu-sj">
                <img src={garisGuard} alt="" width="100%" />
              </div>
              <div className="menu-guard-form text-center">
                <h5 className="title-pilih-layanan-sj">
                  <FaShieldAlt /> Jenis Perkara
                </h5>
                <div className="btn-group">
                  <button
                    data-type="info"
                    data-delay-show="500"
                    data-delay-hide="500"
                    data-effect="solid"
                    data-place="top"
                    data-tip="PLATINUM CLASS adalah memiliki beberapa keunggulan dibanding yang lain"
                    className="btn-layanan-guard-sj active"
                  >
                    Pidana
                  </button>
                  <button
                    data-delay-show="500"
                    data-delay-hide="500"
                    data-tip="SILVER CLASS adalah memiliki beberapa keunggulan dibanding yang lain"
                    className="btn-layanan-guard-sj"
                  >
                    <ReactTooltip place="top" effect="solid" />
                    Perkara
                  </button>
                </div>
              </div>
              <div className="garis-guard-menu-sj">
                <img src={garisGuard} alt="" width="100%" />
              </div>
              <div className="jam-bertugas-sj text-center">
                <h5 className="title-jam-bertugas-sj">
                  <FaClock /> Pendampingan Sebagai :
                </h5>
                <div className="form-group">
                  <select name="" className="p-sebagai-dwdn" id="">
                    <option value="">Pelapor</option>
                    <option value="">Terlapor</option>
                    <option value="">Tersangka</option>
                    <option value="">Saksi</option>
                  </select>
                </div>
                <h5 className="title-durasi-bertugas-sj">
                  <FaRegClock /> Pilih durasi lama bertugas :
                </h5>
                <div className="btn-group mb-4">
                  <button className="btn-min-durasi-bertugas">
                    <FaMinus />
                  </button>
                  <button className="btn-title-durasi-ska">3 jam</button>
                  <button className="btn-plus-durasi-bertugas">
                    <FaPlus />
                  </button>
                </div>
                <br />
                <div className="btn-submit text-center">
                  <button className="btn-submit-form-guard-menu">
                    <FaCreditCard className="icon-tn-submit-form-l" />
                    <span className="money-center">Rp. 630.000,-</span>
                    <FaArrowAltCircleRight className="icon-tn-submit-form-r" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default PendampinganHukumMenu;
