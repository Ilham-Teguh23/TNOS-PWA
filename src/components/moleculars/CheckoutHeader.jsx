import React from "react";

function CheckoutHeader({ image, alt, title }) {
  return (
    <div className="checkout-title-f-g">
      <img src={image} alt={alt} />
      <div>{title}</div>
    </div>
  );
}

export default CheckoutHeader;
