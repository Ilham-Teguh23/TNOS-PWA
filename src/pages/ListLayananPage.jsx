import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import ListLayanan from "../components/dashboard/ListLayanan.jsx";

function ListLayananPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "Pengamanan Usaha dan Bisnis";
    // fetchDetailProduct();
  }, []);

  return (
    <Fragment>
      <ListLayanan />
    </Fragment>
  );
}

export default ListLayananPage;
