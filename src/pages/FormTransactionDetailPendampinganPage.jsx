import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import FormTransactionDetailPendampinganMenu from "../components/dashboard/FormTransactionDetailPendampinganMenu";

function FormTransactionDetailPendampinganPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Form Detail Pendampingan Hukum Page";
    // fetchDetailProduct();
  }, []);

  return (
    <Fragment>
      <FormTransactionDetailPendampinganMenu />
    </Fragment>
  );
}

export default FormTransactionDetailPendampinganPage;
