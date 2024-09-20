import React from "react";
import { Fragment } from "react";
import FormDetailTransactionPtMenu from "../components/dashboard/FormDetailTransactionPtMenu";

import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function FormDetailTransactionPtPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Form Detail Transaction Badan PT Page";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!localStorage.getItem("isAuthenticated")) {
    return <Navigate to="/login" />;
  }


  return (
    <Fragment>
      <FormDetailTransactionPtMenu />
    </Fragment>
  );
}

export default FormDetailTransactionPtPage;
