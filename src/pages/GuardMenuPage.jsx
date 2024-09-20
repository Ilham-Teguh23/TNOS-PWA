import React, { Fragment } from "react";
import { useEffect } from "react";
import MenuFooter from "../components/cummon/MenuFooter";
// import NavDesktop from "../components/cummon/NavDesktop";
import GuardMenu from "../components/dashboard/GuardMenu";

function GuardMenuPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Guard Page";
    // fetchDetailProduct();
  }, []);
  return (
    <Fragment>
      <GuardMenu />
      <MenuFooter />
    </Fragment>
  );
}

export default GuardMenuPage;
