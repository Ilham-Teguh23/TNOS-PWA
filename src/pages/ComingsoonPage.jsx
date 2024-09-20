import React from "react";
import { Fragment } from "react";
import ComingsoonMenu from "../components/dashboard/ComingsoonMenu";

import { useEffect } from "react";

function ComingsoonPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Update Page";
    // fetchDetailProduct();
  }, []);

  return (
    <Fragment>
      <ComingsoonMenu />
    </Fragment>
  );
}

export default ComingsoonPage;
