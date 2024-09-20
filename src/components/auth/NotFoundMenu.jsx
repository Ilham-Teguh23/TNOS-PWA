import React from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import notFound from "../../assets/images/notFound.svg";
function NotFoundMenu() {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="img-success-kdd">
            <img src={notFound} alt="" className="w-100" />
          </div>
          <div className="keterangan-notif">
            <h5 className="title-keterangan-notif">
              Maaf halaman yang anda cari tidak ditemukan
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

export default NotFoundMenu;
