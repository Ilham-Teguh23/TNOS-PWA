import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TopNewNav from "../moleculars/TopNewNav";
import DetailCostumer from "../moleculars/DetailCostumer";
import ButtonComponent from "../atoms/ButtonComponent";
import { isPayment } from "../../redux/action/globalAction";

function PaymentCheckout() {
  const storeData = useSelector((store) => store?.global);
  const dispatch = useDispatch();
  const { payment_data } = storeData;

  const navigate = useNavigate();

  const handlePayment = () => {
    dispatch(isPayment(true));
    navigate(`/payment/${payment_data?.id}`);
  };

  return (
    <>
      <TopNewNav title="Checkout" />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container">
              <div className="payment-content">
                <DetailCostumer
                  amount={(
                    payment_data?.items?.quantity * payment_data?.items?.price
                  ).toLocaleString()}
                  discount={" 0%"}
                />
                <div className="cantainer-option-payment-f">
                  <ButtonComponent
                    title={"Lanjut Pembayaran"}
                    onClick={() => handlePayment()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentCheckout;
