import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import DetailProfilPengacaraMenu from "../components/dashboard/DetailProfilPengacaraMenu";

function DetailProfilPengacaraPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | List Pengacara Page";
    // fetchDetailProduct();
  }, []);

  return (
    <Fragment>
      <DetailProfilPengacaraMenu />
      {/* <MenuFooter /> */}
    </Fragment>
  );
}

export default DetailProfilPengacaraPage;
