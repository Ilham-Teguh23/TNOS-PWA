import React from "react";
import { Fragment } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import abc from "../../assets/images/abc.png";
import kta from "../../assets/images/kta.png";

function DetailProfilPengacaraMenu() {
  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/daftar-pengacara" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
            </Link>
          </div>
          <div className="njwdjhwk">
            <h5 className="title-kasnadkw">Konsultasi Hukum</h5>
            <p className="kdowdk">Lorem ipsum dolor sit amet.</p>
            <hr />
            <div className="profil-pengacara-dadka">
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
            <div className="profil-mitra-dwdb">
              <h5 className="dwjnwjnd">PROFIL MITRA PENGACARA</h5>
              <table className="w-100">
                <thead>
                  <tr>
                    <td>Jenis Kelamin:</td>
                  </tr>
                  <tr>
                    <th>Laki-laki</th>
                  </tr>
                  <tr>
                    <td>Pendididkan Formasi Hukum:</td>
                  </tr>
                  <tr>
                    <th>S1</th>
                  </tr>
                  <tr>
                    <td>Konsentrasi Hukum</td>
                  </tr>
                  <tr>
                    <th>Perdata</th>
                  </tr>
                  <tr>
                    <td>KTA:</td>
                  </tr>
                  <tr>
                    <div className="kdwd">
                      <img src={kta} alt="" width="100%" height="150px" />
                    </div>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DetailProfilPengacaraMenu;
