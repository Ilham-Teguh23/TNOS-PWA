import React from "react";
import home from "../../assets/images/new pwa icon/navigate/iconHome.svg";
import riwayat from "../../assets/images/new pwa icon/navigate/riwayat.svg";
import message from "../../assets/images/new pwa icon/navigate/message.svg";
import user from "../../assets/images/new pwa icon/navigate/user.svg";
import website from "../../assets/images/new pwa icon/navigate/website.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NavigateButtomNew({ messageCount }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <div className="outside-container-navigate-f">
      <div className="container-navigate-f">
        <div className="nav-inside-content">
          <div
            className={`btn-navigate-item ${
              pathname === "/dashboard" ? "active" : ""
            }`}
            onClick={() => navigate("/dashboard")}
          >
            <div className="image-icon-nav">
              <img src={home} alt="" />
            </div>
            <div className="name-nav">{t("menu1")}</div>
          </div>
          <div
            className={`btn-navigate-item ${
              pathname === "/history" ? "active" : ""
            }`}
            onClick={() => navigate("/history")}
          >
            <div className="image-icon-nav">
              <img src={riwayat} alt="" />
            </div>
            <div className="name-nav">{t("menu2")}</div>
          </div>
          <div 
            className="btn-navigate-item"
            onClick={() => window.open("https://tnos.co.id", "_blank")}
            >
            <div className="image-icon-nav">
              <img src={website} alt="" />
            </div>
            <div className="name-nav">{t("menu3")}</div>
          </div>
          <div
            className={`btn-navigate-item ${
              pathname === "/message" ? "active" : ""
            }`}
            onClick={() => navigate("/message")}
          >
            <div className="image-icon-nav">
              <img src={message} alt="" />
              {messageCount > 0 ? (
                <div className="notif">
                  <span>{messageCount}</span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="name-nav">{t("menu4")}</div>
          </div>
          <div
            className={`btn-navigate-item ${
              pathname === "/account" ? "active" : ""
            }`}
            onClick={() => navigate("/account")}
          >
            <div className="image-icon-nav">
              <img src={user} alt="" />
            </div>
            <div className="name-nav">{t("menu5")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigateButtomNew;
