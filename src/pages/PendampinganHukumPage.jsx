import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import PendampinganHukumMenu from "../components/dashboard/PendampinganHukumMenu";

function PendampinganHukumPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Pendampingan Hukum Page";
    // fetchDetailProduct();
  }, []);

  

  return (
    <Fragment>
      <PendampinganHukumMenu />
      {/* <MenuFooter /> */}
    </Fragment>
  );
}

export default PendampinganHukumPage;
