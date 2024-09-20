import React from "react";
// import { FaClock } from "react-icons/fa";

function PaymentContentQrCode({ title, value, color = "#010101" }) {
  return (
    <div className="z-container-f-k">
      <div className="payment-title-f">{title}</div>
      <div className="payment-value-f" style={{ color: color }}>
        {" " + value && value}
      </div>
    </div>
  );
}

export default PaymentContentQrCode;
