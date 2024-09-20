import React from "react";
import Iframe from "react-iframe";
import { useParams } from "react-router-dom";

function IframeCummon() {
  const params = useParams();
  return (
    <div className="responsive-class">
      <div className="res-class">
        <div className="njwdjhwk" style={{ padding: "20px 20px 50px 20px" }}>
          <Iframe
            url={`${process.env.REACT_APP_API_INVOICE_URL}${params.id}`}
            width="100%"
            styles={{ minHeight: "600px" }}
            id=""
            className=""
            display="block"
            position="relative"
          />
        </div>
      </div>
    </div>
  );
}

export default IframeCummon;
