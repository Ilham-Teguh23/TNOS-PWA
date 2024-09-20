import React, { useEffect } from "react";
import TopNavigation from "../moleculars/TopNavigation";
import { useParams } from "react-router-dom";
import { getFetchPaymentByIdAction } from "../../redux/action/paymentAction";
import { useDispatch, useSelector } from "react-redux";
import PaymentContent from "../moleculars/PaymentContent";
import moment from "moment-timezone";

function PaymentCekStatus() {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params?.id;

  const storeData = useSelector((store) => store?.global);
  const { data } = storeData;

  useEffect(() => {
    const getPaymentById = async () => {
      dispatch(await getFetchPaymentByIdAction(id));
    };

    getPaymentById();
  }, [dispatch, id]);
  return (
    <>
      <div className="responsive-class">
        <div className="res-class">
          <TopNavigation
            path={`/payment/qr-code/${id}`}
            title="Payment QR Code"
          />
          <div className="payment-container">
            <div className="payment-content">
              <PaymentContent
                title={"ID Referensi"}
                value={data?.payment?.reference_id}
              />
              <PaymentContent title={"Harga"} value={data?.payment?.amount} />
              <PaymentContent title={"Metode Pembayaran"} value={"QRIS"} />
              <PaymentContent
                title={"Status Pembayaran"}
                value={
                  moment(data?.payment?.expiration_date).valueOf() -
                    new Date().getTime() >=
                  0
                    ? "ACTIVE"
                    : "EXPIRED"
                }
              />
              <code>{JSON.stringify(data)}</code>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentCekStatus;
