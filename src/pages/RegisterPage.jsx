import React from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import ContentRegister from "../components/auth/ContentRegister";
// import RegisterMenu from "../components/auth/RegisterMenu";

function RegisterPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Register Page";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      <ContentRegister />
    </Fragment>
  );
}

export default RegisterPage;
