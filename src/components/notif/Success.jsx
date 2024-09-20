import React from "react";
import { Fragment } from "react";
// import { useNavigate } from "react-router-dom";
import success from "../../assets/images/success.png";

function Success() {
  // const navigate = useNavigate();
  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="njwdjhwk">
            <div className="img-success-kdd">
              <img src={success} alt="" className="w-100" />
            </div>
            <div className="keterangan-notif">
              <h5 className="title-keterangan-notif">
                Selamat pembayaran mu telah terkonfirmasi
              </h5>
              <p className="p-keterangan-notif">
                Selanjutnya Agent TNOS akan menghubungi melalui WhatsApp Chat
                untuk konfirmasi pesanan Anda.
              </p>
              <button className="btn btn-layanan">Kembali ke menu utama</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Success;
