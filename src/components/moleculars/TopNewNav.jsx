import React from "react";
import "../../assets/css/topnavbar.css";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/new pwa icon/home/logo.svg";

function TopNewNav({ title, path, nav = true, type, background }) {
  const navigate = useNavigate();
  const location = useLocation();

  const renderContent = () => {
    switch (type) {
      case "akun":
        return (
          <div className="outside-container" style={{ background: background }}>
            <div
              className="container-nav-top-f"
              style={{
                background: background,
                position: "relative",
                borderBottom: "none",
              }}
            >
              <div
                className="nav-button-f"
                style={{ zIndex: 10, position: "relative", color: "white" }}
              >
                {title}
              </div>
              <div className="sr-f"></div>
            </div>
          </div>
        );
      case "noNav":
        return (
          <div className="outside-container" style={{ background: background }}>
            <div
              className="container-nav-top-f"
              style={{
                background: "white",
                position: "relative",
                borderBottom: "1px solid var(--border-color1)",
              }}
            >
              <div
                className="nav-button-f"
                style={{ zIndex: 10, position: "relative" }}
              >
                {title}
              </div>
              <div className="sr-f"></div>
            </div>
          </div>
        );
      case "dashboard":
        return (
          <div className="outside-container" style={{ background: background }}>
            <div
              className="container-nav-top-f"
              style={{
                background: background,
                position: "relative",
                borderBottom: "none",
              }}
            >
              <div
                className="nav-button-f"
                style={{ zIndex: 10, position: "relative" }}
              >
                <img src={logo} alt="logo TNOS" />
              </div>
              <div className="sr-f"></div>
            </div>
          </div>
        );
      case "home":
        return (
          <div className="outside-container">
            <div
              className="container-nav-top-f"
              style={{
                background: "var(--bg-color6)",
                position: "relative",
                borderBottom: "none",
              }}
            >
              <div
                className="nav-button-f"
                style={{ zIndex: 10, position: "relative" }}
              >
                <img src={logo} alt="logo TNOS" />
              </div>
              <div className="sr-f"></div>
            </div>
          </div>
        );
      case "auth":
        return (
          <div className="outside-container">
            <div
              className="container-nav-top-f"
              style={{
                background: "var(--bg-color6)",
                position: "relative",
                borderBottom: "none",
              }}
            >
              <div
                className="nav-button-f"
                style={{ zIndex: 10, position: "relative" }}
              >
                {nav && (
                  <FaArrowLeft
                    onClick={() => navigate(path)}
                    color="var(--font-color9)"
                  />
                )}
                <div style={{ color: "var(--font-color9)" }}>{title}</div>
              </div>
              <div className="sr-f"></div>
            </div>
          </div>
        );
      default:
        return (
          <div className="outside-container">
            <div className="container-nav-top-f">
              <div className="nav-button-f">
                {location.pathname === "/pengamanan-korporat-m" || location.pathname.startsWith("/services-list-m/") || location.pathname.startsWith("/corporate-security-m/") ? '' : nav && <FaArrowLeft onClick={() => navigate(path)} /> }
                <div>{title}</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderContent();
}

export default TopNewNav;
