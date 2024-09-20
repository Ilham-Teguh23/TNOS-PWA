import React from "react";
import ColdownTimer from "./ColdownTimer";

function DetailCostumer({
  time = "--:--:--:--",
  amount,
  id,
  discount,
  type,
  show = true,
  TypeId,
}) {
  const renderChoosType = () => {
    switch (type) {
      case "QR_CODE":
        return "Jatuh Tempo";
      default:
        return "Choosen within";
    }
  };

  const renderTypeId = () => {
    switch (TypeId) {
      case "order":
        return "Order ID";
      default:
        return "Transaction ID";
    }
  };

  const renderContent = () => {
    switch (type) {
      case "QR_CODE":
        return (
          <div className="container-detail-costumer-f">
            <div className="detail-customer-g-k">
              <div className="payment-total-f">
                <div className="title">Total Pembayaran</div>
                {show && (
                  <div className="value">
                    {renderChoosType() + " "}
                    <span>
                      {" "}
                      <ColdownTimer target={time} />
                    </span>
                  </div>
                )}
              </div>
              <div className="amount-f">Rp{amount}</div>
              <div className="id-order-f">
                {" "}
                {id && `${renderTypeId()} #${id}`}
              </div>
              <div className="id-order-f">
                {" "}
                {discount && `Discount ${discount}`}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="container-detail-costumer-f">
            <div className="detail-customer-g-k">
              <div className="payment-total-f">
                <div className="title">Total Pembayaran</div>
                {/* {show && (
                  <div className="value">
                    {renderChoosType() + " "}
                    <span>
                      {" "}
                      <ColdownTimer target={time} />
                    </span>
                  </div>
                )} */}
              </div>
              <div className="amount-f">Rp{amount}</div>
              <div className="id-order-f">
                {" "}
                {id && `${renderTypeId()} #${id}`}
              </div>
              <div className="id-order-f">
                {" "}
                {discount && `Discount ${discount}`}
              </div>
            </div>
          </div>
        );
    }
  };
  return renderContent();
}

export default DetailCostumer;
