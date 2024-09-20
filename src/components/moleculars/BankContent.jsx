import React from "react";

function BankContent({ border = true, image, title }) {
  return (
    <div className="title-payment">
      <div className="title">{title}</div>
      <div>
        <img src={image} alt="" style={!border ? { border: "none" } : ""} />
      </div>
    </div>
  );
}

export default BankContent;
