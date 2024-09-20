import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import ForgotPasswordLinkMenu from "../components/auth/ForgotPasswordLinkMenu";

function ForgotPasswordLinkPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Forgot Password Link Page";
  }, []);

  return (
    <Fragment>
      <ForgotPasswordLinkMenu />
    </Fragment>
  );
}

export default ForgotPasswordLinkPage;
