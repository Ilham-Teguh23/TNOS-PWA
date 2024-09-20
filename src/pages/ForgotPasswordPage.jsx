import React from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import ForgotPasswordMenu from "../components/auth/ForgotPasswordMenu";

function ForgotPasswordPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Forgot Password Page";
  }, []);

  return (
    <Fragment>
      <ForgotPasswordMenu />
    </Fragment>
  );
}

export default ForgotPasswordPage;
