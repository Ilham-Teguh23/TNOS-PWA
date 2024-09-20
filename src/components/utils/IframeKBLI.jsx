import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Iframe from "react-iframe";
import { Link } from "react-router-dom";

function IframeKBLI() {
  return (
    <div className="responsive-class">
      <div className="res-class">
        <div className="nav-top-login">
          <Link to="/badan-usaha-m" className="btn nav-back-arrow">
            <FaArrowLeft className="hhagwd" />
            <h5 className="title-kasnadkw">Menu</h5>
          </Link>
        </div>
        <div className="njwdjhwk">
          <Iframe
            url={`https://oss.go.id/informasi/kbli-berbasis-risiko`}
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

export default IframeKBLI;
