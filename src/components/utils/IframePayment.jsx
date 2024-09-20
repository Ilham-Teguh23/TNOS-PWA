import React, { Fragment } from "react";
import Iframe from "react-iframe";

function IframePayment({ url }) {
  return (
    <Fragment>
      <Iframe
        url={`${url}`}
        width="100%"
        styles={{ minHeight: "600px" }}
        id=""
        className=""
        display="block"
        position="relative"
      />
    </Fragment>
  );
}

export default IframePayment;
