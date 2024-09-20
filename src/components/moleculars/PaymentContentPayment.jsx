import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Gap from "./Gap";

function PaymentContentPayment({ color = "green", select, image, title }) {
  return (
    <div className="z-container-f">
      <div className="payment-title-f">
        <div className="box-option-f">
          <div className="payment-icon">
            <img src={image} alt="" />
          </div>
          <Gap width={10} />
          <div className="title">{title}</div>
        </div>
      </div>
      {select && (
        <div className="payment-value-f">
          <FaCheckCircle style={{ color: color }} />
        </div>
      )}
    </div>
  );
}

export default PaymentContentPayment;
