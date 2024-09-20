import React, { useEffect } from "react";
import NotificationContent from "../moleculars/NotificationContent";
import "../../assets/css/paymentStyle.css";
import Gap from "../moleculars/Gap";
import ButtonNotif from "../moleculars/ButtonNotif";
import success from "../../assets/images/logo_notif/success.svg";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/action/globalAction";

function PaymentSuccess() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 4000);

    return () => clearTimeout(timer);
    //eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="container-notification-f">
              <Gap height={100} />
              <NotificationContent
                image={success}
                title="Pembayaran Berhasil"
                description=""
              />
              <Gap height={60} />
              <ButtonNotif title="Lanjut ke Mitra" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;
