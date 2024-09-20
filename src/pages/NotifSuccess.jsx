import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import Success from "../components/notif/Success";

function NotifSuccess() {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = "TNOS | Form Detail Konsultasi Page";
    // fetchDetailProduct();
  }, []);

  return (
    <Fragment>
      <Success />
    </Fragment>
  );
}

export default NotifSuccess;
