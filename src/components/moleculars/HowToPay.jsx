import React, { useState } from "react";
import {
  //   FaArrowDown,
  //   FaArrowUp,
  FaRegArrowAltCircleUp,
  FaRegQuestionCircle,
} from "react-icons/fa";
import AccordionContent from "./AccordionContent";

function HowToPay({ show = false, code, account_number, merchant_code }) {
  const [isShow, setIsShow] = useState(show);

  const handleShow = () => {
    if (isShow) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  };

  return (
    <div className="container-how-to-pay-f">
      <div className="title" onClick={handleShow}>
        <FaRegQuestionCircle /> How to pay <FaRegArrowAltCircleUp />
      </div>
      <AccordionContent
        isShow={isShow}
        code={code}
        account_number={account_number}
        merchant_code={merchant_code}
      />
    </div>
  );
}

export default HowToPay;
