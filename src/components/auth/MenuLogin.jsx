import React, { Component, Fragment } from "react";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export class MenuLogin extends Component {
  render() {
    return (
      <Fragment>
        <div className="nav-top-login">
          <Link to="/" className="btn nav-back-arrow">
            <FaArrowLeft className="hhagwd" />
          </Link>
          <Link to="/" className="btn nav-back-arrow">
            <FaUser />
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default MenuLogin;
