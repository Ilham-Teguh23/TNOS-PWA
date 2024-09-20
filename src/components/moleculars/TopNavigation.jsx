import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function TopNavigation({ path, title }) {
  return (
    <div className="nav-top-login">
      <Link to={path} className="btn nav-back-arrow">
        <FaArrowLeft className="hhagwd" />
        <h5 className="title-kasnadkw">{title}</h5>
      </Link>
    </div>
  );
}

export default TopNavigation;
