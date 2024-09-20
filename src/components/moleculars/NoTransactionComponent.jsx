import React from "react";
import bgNoTransaksi from "../../assets/images/new pwa icon/riwayat/bgNoTransaksi.png";
import Gap from "./Gap";

function NoTransactionComponent({ title }) {
  return (
    <div className="no-transaction-container">
      <img src={bgNoTransaksi} alt="" />
      <Gap height={42} />
      <div className="title">{title}</div>
    </div>
  );
}

export default NoTransactionComponent;
