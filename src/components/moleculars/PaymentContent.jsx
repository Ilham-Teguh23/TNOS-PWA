import React from "react";

function PaymentContent({ title, value, color = "#010101", copy, onClick }) {
  return (
    <div className="z-container-f">
      <div className="payment-title-f">{title}</div>
      <div className="payment-value-f" style={{ color: color }}>
        {value}
        {copy && (
          <div className="copy-f" onClick={onClick}>
            SALIN
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentContent;
