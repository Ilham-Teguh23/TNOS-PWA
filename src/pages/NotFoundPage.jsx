import React from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import NotFoundMenu from "../components/auth/NotFoundMenu";

function NotFoundPage() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | 404 Page";
    // fetchDetailProduct();
  }, []);
  return (
    <Fragment>
      <NotFoundMenu />
    </Fragment>
  );
}

export default NotFoundPage;
