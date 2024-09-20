import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import FormTransactionPeroranganMenu from "../components/dashboard/FormTransactionPeroranganMenu";

function FormTransactionPeroranganPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Form Pengamanan Perorangan Page";
    // fetchDetailProduct();
  }, []);

  return (
    <Fragment>
      <FormTransactionPeroranganMenu />
    </Fragment>
  );
}

export default FormTransactionPeroranganPage;
