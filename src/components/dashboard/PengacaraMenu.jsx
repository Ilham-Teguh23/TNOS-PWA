import React from "react";
import { Fragment } from "react";
import { FaArrowLeft, FaUser, FaVideo } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import welcome from "../../assets/images/welcome.png";
import { useState } from "react";

function PengacaraMenu() {
  const [url, setUrl] = useState("");

  const onClickUrlLayanan = (url) => {
    console.log(url);
    setUrl(url);
  };
  if (url) {
    return <Navigate to={url} replace />;
  }
  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/dashboard" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
            </Link>
            <Link to="/dashboard" className="btn nav-back-arrow">
              <FaUser />
            </Link>
          </div>
          <div className="njwdjhwk">
            <h5 className="title-kasnadkw">Pengacara</h5>
            <p className="kdowdk">Lorem ipsum dolor sit amet.</p>
            <hr />
            <div className="content-pengacara-menu">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                  <div
                    className="card-pengacara-menu"
                    onClick={() => onClickUrlLayanan("/daftar-pengacara")}
                  >
                    <img src={welcome} alt="" className="img-card-menu" />
                    <div className="kadjl">
                      <h5 className="tiekad">Konsultasi Hukum</h5>
                      <FaVideo /> VIDEO CALL
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12">
                  <div
                    className="card-pengacara-menu"
                    onClick={() => onClickUrlLayanan("/pendampingan-hukum")}
                  >
                    <img src={welcome} alt="" className="img-card-menu" />
                    <div className="kadjl">
                      <h5 className="tiekad">Pendampingan Hukum</h5>
                      {/* <FaPhotoVideo /> VIDEO CALL */}
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

export default PengacaraMenu;
