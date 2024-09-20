import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import FormDetailTransactionKonsulMenu from "../components/dashboard/FormDetailTransactionKonsulMenu";

function FormDetailTransactionKonsulPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Form Detail Konsultasi Page";
    // fetchDetailProduct();
  }, []);

  return (
    <Fragment>
      <FormDetailTransactionKonsulMenu />
    </Fragment>
  );
}

export default FormDetailTransactionKonsulPage;
