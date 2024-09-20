import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import FormTransactionPendampinganMenu from "../components/dashboard/FormTransactionPendampinganMenu";

function FormTransactionPendampinganPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Form Pendampingan Hukum Page";
    // fetchDetailProduct();
  }, []);

  return (
    <Fragment>
      <FormTransactionPendampinganMenu />
    </Fragment>
  );
}

export default FormTransactionPendampinganPage;
