import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import berandaBlack from "../../assets/images/beranda-black.png";
import riwayatBlack from "../../assets/images/riwayat-black.png";
import pesanBlack from "../../assets/images/pesan-black.png";
import profileBlack from "../../assets/images/profile-black.png";
import profileActive from "../../assets/images/profile-active.png";
import berandaActive from "../../assets/images/berandaActive.png";
import riwayatActive from "../../assets/images/riwayatActive.png";
import pesanActive from "../../assets/images/pesanActive.png";
import website from "../../assets/images/website.png";
import websiteActive from "../../assets/images/websiteActive.png";
import { FaWindowMaximize, FaWindowMinimize } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function MenuFooter(props) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [footer, setFooter] = useState(props.footer);

  const handleFooter = () => {
    if (footer === true) {
      setFooter(false);
    } else {
      setFooter(true);
    }
  };

  return (
    <Fragment>
      <div className={`navMenuFooter ${footer ? "" : "footer-hide"}`}>
        <div className="navMenu">
          <div
            className="minimaze-menu-footer-ks"
            onClick={() => handleFooter()}
          >
            {footer ? <FaWindowMinimize /> : <FaWindowMaximize />}
          </div>
          <div className="navMenuBottom">
            {/* <Link className="btnNavMenu" to="/">
              <FaHome className="zx" />
              <br /> <span>Home</span>
            </Link> */}
            <Link
              className={`btnNavMenu ${
                pathname === "/dashboard" ? "active" : ""
              }`}
              to="/dashboard"
            >
              {pathname === "/dashboard" ? (
                <img className="img-menu-footer-s" src={berandaActive} alt="" />
              ) : (
                <img className="img-menu-footer-s" src={berandaBlack} alt="" />
              )}
              <br /> <span>{t("beranda")} </span>{" "}
            </Link>
            <Link
              className={`btnNavMenu ${
                pathname === "/riwayat-transaksi" ? "active" : ""
              }`}
              to="/riwayat-transaksi"
            >
              {pathname === "/riwayat-transaksi" ? (
                <img className="img-menu-footer-s" src={riwayatActive} alt="" />
              ) : (
                <img className="img-menu-footer-s" src={riwayatBlack} alt="" />
              )}
              <br /> <span>{t("riwayat")}</span>
            </Link>
            <Link
              className={`btnNavMenu ${
                pathname === "/website" ? "active" : ""
              }`}
              onClick={() => (window.location.href = "https://tnos.co.id")}
            >
              {pathname === "/website" ? (
                <img className="img-menu-footer-s" src={websiteActive} alt="" />
              ) : (
                <img className="img-menu-footer-s" src={website} alt="" />
              )}
              <br /> <span>Website</span>
              {/* {props?.unread > 0 ? (
                <div className="kdawkdaw">{props?.unread}</div>
              ) : (
                ""
              )} */}
            </Link>
            <Link
              className={`btnNavMenu ${
                pathname === "/message" ? "active" : ""
              }`}
              to="/message"
            >
              {pathname === "/message" ? (
                <img className="img-menu-footer-s" src={pesanActive} alt="" />
              ) : (
                <img className="img-menu-footer-s" src={pesanBlack} alt="" />
              )}
              <br /> <span>{t("Pesan")}</span>
              {/* {props?.unread > 0 ? (
                <div className="kdawkdaw">{props?.unread}</div>
              ) : (
                ""
              )} */}
            </Link>
            <Link
              className={`btnNavMenu ${
                pathname === "/profile" ? "active" : ""
              }`}
              to="/profile"
            >
              {pathname === "/profile" ? (
                <img className="img-menu-footer-s" src={profileActive} alt="" />
              ) : (
                <img className="img-menu-footer-s" src={profileBlack} alt="" />
              )}
              <br /> <span>{t("Akun")}</span>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default MenuFooter;
