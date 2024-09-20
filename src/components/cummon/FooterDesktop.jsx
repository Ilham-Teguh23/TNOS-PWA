import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Google from "../../assets/images/google.png";
import Apple from "../../assets/images/apple.png";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";

export class FooterDesktop extends Component {
  render() {
    return (
      <Fragment>
        <div className="container-desktop-footer">
          <div className="footer-menu p-3">
            <div className="row text-center">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                <h5 className="title-footer">OFFICE ADDRESS</h5>
                <p className="p-footer">
                  Jl. DR. Sahardjo No. 181 A/B, Tebet, Jakarta Selatan, 12860
                  <br />
                  021-8307679
                  <br />
                  021-8308331
                  <br />
                  security@gmail.com <br />
                  <Link to="/" className="menu-sosmed">
                    <FaFacebookSquare />
                  </Link>
                  <Link to="/" className="menu-sosmed">
                    {" "}
                    <FaInstagramSquare />
                  </Link>
                  <Link to="/" className="menu-sosmed">
                    {" "}
                    <FaTwitterSquare />
                  </Link>
                </p>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                <h5 className="title-footer">THE COMPANY</h5>
                <Link className="menu-footer" to="/">
                  About us
                </Link>
                <br />
                <Link className="menu-footer" to="/">
                  Company Profile
                </Link>
                <br />
                <Link className="menu-footer" to="/">
                  AContact us
                </Link>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                <h5 className="title-footer">MORE INFO</h5>
                <Link className="menu-footer" to="/">
                  How To Purchase
                </Link>
                <br />
                <Link className="menu-footer" to="/">
                  Privacy Policy
                </Link>
                <br />
                <Link className="menu-footer" to="/">
                  Refund Policy
                </Link>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                <h5 className="title-footer">DOWNLOAD APPS</h5>
                <Link className="download-apps" to="/">
                  <img className="mb-2" src={Google} alt="" />
                </Link>
                <br />
                <Link className="download-apps" to="/">
                  <img src={Apple} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FooterDesktop;
