import React from "react";

function CheckoutHeader({ image, alt, title }) {
  return (
    <div className="checkout-title-f-g">
        {image === "" ? (
            <>
                <span>
                    {title}
                </span>
            </>
        ) : (
            <>
                <img src={image} alt={alt} />
                <div>{title}</div>
            </>
        ) }
    </div>
  );
}

export default CheckoutHeader;
