import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export class buttonWelcomePage extends Component {
  render() {
    return (
      <Fragment>
        <div id="#login-menu" className="responsive-class">
          <div className="res-class">
            <div className="button-welcome-page text-center">
              <Link
                to="/login"
                className="btn btn-layanan btn-login w-100 mb-2"
              >
                MASUK
              </Link>
              <Link to="/register" className="btn btn-layanan btn-daftar w-100">
                {" "}
                DAFTAR{" "}
              </Link>
              <p className="p-button-welcoma-page">
                Dengan masuk atau mendaftar, kamu telah menyetujui{" "}
                <span
                  style={{ cursor: "pointer" }}
                  className="orange"
                  onClick={() =>
                    window.open(
                      "https://tnosbantuan.freshdesk.com/support/solutions/articles/150000024969-syarat-dan-ketentuan-pengguna",
                      "_blank"
                    )
                  }
                >
                  Ketentuan layanan
                </span>{" "}
                dan{" "}
                <span
                  className="orange"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    window.open(
                      "https://tnosbantuan.freshdesk.com/support/solutions/articles/150000024967-kebijakan-privasi",
                      "_blank"
                    )
                  }
                >
                  Kebijakan privasi
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default buttonWelcomePage;
