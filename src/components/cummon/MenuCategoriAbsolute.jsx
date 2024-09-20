import React, { Component, Fragment } from "react";
import { FaBars, FaUser, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

export class MenuCategoriAbsolute extends Component {
  render() {
    return (
      <Fragment>
        <div className="categori-menu-absolute">
          <div className="resize-move">
            <div className="menu-relative">
              <ul className="categori-menu-ul">
                <li className="categori-menu-li">
                  <Link className="btn btn-menu-categori-absolute" to="/">
                    <FaUser /> User Page
                  </Link>
                </li>
                <li className="categori-menu-li">
                  <Link className="btn btn-menu-categori-absolute" to="/">
                    <FaBars /> Menu Page
                  </Link>
                </li>
                <li className="categori-menu-li">
                  <Link className="btn btn-menu-categori-absolute" to="/">
                    <FaHome /> Dashboard Page
                  </Link>
                </li>
                <li className="categori-menu-li">
                  <Link className="btn btn-menu-categori-absolute" to="/">
                    <FaUser /> User
                  </Link>
                </li>
                <li className="categori-menu-li">
                  <Link className="btn btn-menu-categori-absolute" to="/">
                    <FaUser /> User
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MenuCategoriAbsolute;
