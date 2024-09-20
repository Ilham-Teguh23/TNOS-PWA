import React, { Fragment } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import MenuFooter from "../components/cummon/MenuFooter";
import NavDesktop from "../components/cummon/NavDesktop";
import ContentDashboard from "../components/dashboard/ContentDashboard";

function DashboardPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Dashboard Page";
    // console.log(process.env.REACT_APP_SECRET_KEY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!localStorage.getItem("isAuthenticated")) {
    return <Navigate to="/login" />;
  }

  if (localStorage.getItem("isAuthenticated")) {
    var CryptoJS = require("crypto-js");
    const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;
    var bytes = CryptoJS.AES.decrypt(
      localStorage.getItem("isAuthenticated"),
      secretKey
    );
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    if (originalText !== "1") {
      dispatch({
        type: "LOGOUT",
      });
      return <Navigate to="/login" />;
    }
  }

  return (
    <Fragment>
      <NavDesktop />
      <ContentDashboard />
      <MenuFooter footer={true} />
    </Fragment>
  );
}

export default DashboardPage;
