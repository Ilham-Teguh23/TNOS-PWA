import React, { Fragment } from "react";
import success from "../../assets/images/success.png";

function SuccessSendLinkOvo() {
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
                Selamat notifikasi pembayaran kamu sudah terkirim
              </h5>
              <p className="p-keterangan-notif">
                Selanjutnya silahkan cek aplikasi ovo kamu kemedian lakukan
                pembayaran untuk melanjutkan order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SuccessSendLinkOvo;
