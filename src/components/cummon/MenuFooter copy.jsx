import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import berandaBlack from "../../assets/images/beranda-black.png";
import riwayatBlack from "../../assets/images/riwayat-black.png";
import pesanBlack from "../../assets/images/pesan-black.png";
import profileBlack from "../../assets/images/profile-black.png";

export class MenuFooter extends Component {
  render() {
    return (
      <Fragment>
        <div className="navMenuFooter">
          <div className="navMenu">
            <div className="navMenuBottom">
              {/* <Link className="btnNavMenu" to="/">
                <FaHome className="zx" />
                <br /> <span>Home</span>
              </Link> */}
              <Link className="btnNavMenu" to="/dashboard">
                <img src={berandaBlack} alt="" />
                <br /> <span>Beranda</span>
              </Link>
              <Link className="btnNavMenu" to="/riwayat-transaksi">
                <img src={riwayatBlack} alt="" />
                <br /> <span>Riwayat</span>
              </Link>
              <Link className="btnNavMenu" to="/message">
                <img src={pesanBlack} alt="" />
                <br /> <span>Pesan</span>
              </Link>
              <Link className="btnNavMenu" to="/dashboard">
                <img src={profileBlack} alt="" />
                <br /> <span>Profil</span>
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MenuFooter;
