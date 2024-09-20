import React from "react";
import NotificationContent from "../moleculars/NotificationContent";
import "../../assets/css/paymentStyle.css";
import Gap from "../moleculars/Gap";
import ButtonNotif from "../moleculars/ButtonNotif";
import failure from "../../assets/images/logo_notif/failure.svg";

function PaymentFailure() {
  return (
    <>
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="container-notification-f">
              <Gap height={100} />
              <NotificationContent
                image={failure}
                title="Pembayaran Gagal"
                description=""
              />
              <Gap height={60} />
              <ButtonNotif title="Coba lagi" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentFailure;
