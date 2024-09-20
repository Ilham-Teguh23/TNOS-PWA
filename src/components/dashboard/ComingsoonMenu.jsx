import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import csoon from "../../assets/images/csoon.svg";

function ComingsoonMenu() {
  const navigate = useNavigate();

  // console.log(i18n);
  // console.log(t);

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="img-success-kdd">
            <img src={csoon} alt="" className="w-100" />
          </div>
          <div className="keterangan-notif">
            <h5 className="title-keterangan-notif">
              We worked hard to be ready soon. For now the fitur only available
              at tnos application
            </h5>
            <button
              onClick={() => navigate("/dashboard")}
              className="btn btn-layanan"
            >
              Kembali ke menu utama
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ComingsoonMenu;
