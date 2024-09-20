import React from "react";
import { useEffect } from "react";
import { Fragment } from "react";

import { Navigate } from "react-router-dom";
import { useContext } from "react";
import FormTransactionCvMenu from "../components/dashboard/FormTransactionCvMenu";

function FormTransactionCvPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Form Transaction Badan CV Page";
    // fetchDetailProduct();
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
      <FormTransactionCvMenu />
    </Fragment>
  );
}

export default FormTransactionCvPage;
