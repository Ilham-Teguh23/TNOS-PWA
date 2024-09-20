import React from "react";
import { Fragment } from "react";
// import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function ButtonWelcomePage() {
  // const { t } = useTranslation();

  return (
    <Fragment>
      <div className="button-welcome-page text-center">
        <Link to="/login" className="btn btn-layanan btn-login w-100 mb-2">
          MASUK
        </Link>
        <Link to="/register" className="btn btn-layanan btn-daftar w-100">
          DAFTAR
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
    </Fragment>
  );
}

export default ButtonWelcomePage;
