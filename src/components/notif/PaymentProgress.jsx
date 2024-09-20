import React from "react";
import pending from "../../assets/images/logo_notif/pending.svg";
import "../../assets/css/paymentStyle.css";
import Gap from "../moleculars/Gap";
import ButtonNotif from "../moleculars/ButtonNotif";
import NotificationContent from "../moleculars/NotificationContent";

function PaymentProgress() {
  return (
    <>
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="container-notification-f">
              <Gap height={100} />
              <NotificationContent
                image={pending}
                title="Menunggu pembayaran"
                description="Jangan tutup aplikasi saat melakukan pembayaran"
              />
              <Gap height={60} />
              <ButtonNotif title="Batalkan" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentProgress;
