import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import ListPengacaraMenu from "../components/dashboard/ListPengacaraMenu";




function ListPengacaraPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | List Pengacara Page";
    // fetchDetailProduct();
  }, []);




  return (
    <Fragment>
      <ListPengacaraMenu />
      {/* <MenuFooter /> */}
    </Fragment>
  );
}

export default ListPengacaraPage;
