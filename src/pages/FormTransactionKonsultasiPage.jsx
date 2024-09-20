import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import FormTransactionKonsultasiMenu from "../components/dashboard/FormTransactionKonsultasiMenu";

function FormTransactionKonsultasiPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Form Konsultasi Page";
  }, []);

  return (
    <Fragment>
      <FormTransactionKonsultasiMenu />
    </Fragment>
  );
}

export default FormTransactionKonsultasiPage;
