import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import FormTransactionDetailPeroranganMenu from "../components/dashboard/FormTransactionDetailPeroranganMenu";

function FormTransactionDetailPeroranganPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Form Detail Pengamanan Perorangan Page";
    // fetchDetailProduct();
  }, []);

  return (
    <Fragment>
      <FormTransactionDetailPeroranganMenu />
    </Fragment>
  );
}

export default FormTransactionDetailPeroranganPage;
