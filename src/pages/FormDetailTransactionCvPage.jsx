import React from "react";
import { Fragment } from "react";
import FormDetailTransactionCvMenu from "../components/dashboard/FormDetailTransactionCvMenu";

import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { useEffect } from "react";

function FormDetailTransactionCvPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Form Detail Transaction Badan CV Page";
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
      <FormDetailTransactionCvMenu />
    </Fragment>
  );
}

export default FormDetailTransactionCvPage;
