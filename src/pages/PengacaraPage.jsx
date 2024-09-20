import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import PengacaraMenu from "../components/dashboard/PengacaraMenu";

function PengacaraPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Pengacara Page";
    // fetchDetailProduct();
  }, []);

  return (
    <Fragment>
      <PengacaraMenu />
      {/* <MenuFooter /> */}
    </Fragment>
  );
}

export default PengacaraPage;
