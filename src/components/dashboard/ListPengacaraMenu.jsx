import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import abc from "../../assets/images/abc.png";

function ListPengacaraMenu() {
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
            <Link to="/pengacara-menu" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
            </Link>
          </div>

          <div className="njwdjhwk">
            <h5 className="title-kasnadkw">Daftar Pengacara</h5>
            <p className="kdowdk">Cari pengacara terbaik mu disini</p>
            <hr />
            <div className="nbjdawj">
              <div className="w-100">
                <form action="">
                  <div className="input-group">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control text-center"
                      placeholder="Ketika nama pengacara"
                    />
                    <button className="btn-kladml">
                      <FaSearch />
                    </button>
                  </div>
                </form>
              </div>
              <div
                className="list-pengacara-kdoadmw "
                onClick={() => onClickUrlLayanan("/detail-profil-pengacara")}
              >
                <div className="img-wea">
                  <img src={abc} alt="" width="75px" />
                </div>
                <div className="detail-lswdij">
                  <h5 className="name-kadnn">Chellia Bader Djohan, S.H.</h5>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="ajdw">
                      <div className="pjdwj">Konsentrasi Hukum</div>
                      <div className="njndajh">Perdata</div>
                    </div>
                    <div className="span-jdwk">pengalaman</div>
                  </div>
                </div>
              </div>
              <div
                className="list-pengacara-kdoadmw "
                onClick={() => onClickUrlLayanan("/detail-profil-pengacara")}
              >
                <div className="img-wea">
                  <img src={abc} alt="" width="75px" />
                </div>
                <div className="detail-lswdij">
                  <h5 className="name-kadnn">Chellia Bader Djohan, S.H.</h5>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="ajdw">
                      <div className="pjdwj">Konsentrasi Hukum</div>
                      <div className="njndajh">Perdata</div>
                    </div>
                    <div className="span-jdwk">pengalaman</div>
                  </div>
                </div>
              </div>
              <div
                className="list-pengacara-kdoadmw "
                onClick={() => onClickUrlLayanan("/detail-profil-pengacara")}
              >
                <div className="img-wea">
                  <img src={abc} alt="" width="75px" />
                </div>
                <div className="detail-lswdij">
                  <h5 className="name-kadnn">Chellia Bader Djohan, S.H.</h5>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="ajdw">
                      <div className="pjdwj">Konsentrasi Hukum</div>
                      <div className="njndajh">Perdata</div>
                    </div>
                    <div className="span-jdwk">pengalaman</div>
                  </div>
                </div>
              </div>
              <div
                className="list-pengacara-kdoadmw "
                onClick={() => onClickUrlLayanan("/detail-profil-pengacara")}
              >
                <div className="img-wea">
                  <img src={abc} alt="" width="75px" />
                </div>
                <div className="detail-lswdij">
                  <h5 className="name-kadnn">Chellia Bader Djohan, S.H.</h5>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="ajdw">
                      <div className="pjdwj">Konsentrasi Hukum</div>
                      <div className="njndajh">Perdata</div>
                    </div>
                    <div className="span-jdwk">pengalaman</div>
                  </div>
                </div>
              </div>
              <div
                className="list-pengacara-kdoadmw "
                onClick={() => onClickUrlLayanan("/detail-profil-pengacara")}
              >
                <div className="img-wea">
                  <img src={abc} alt="" width="75px" />
                </div>
                <div className="detail-lswdij">
                  <h5 className="name-kadnn">Chellia Bader Djohan, S.H.</h5>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="ajdw">
                      <div className="pjdwj">Konsentrasi Hukum</div>
                      <div className="njndajh">Perdata</div>
                    </div>
                    <div className="span-jdwk">pengalaman</div>
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

export default ListPengacaraMenu;
