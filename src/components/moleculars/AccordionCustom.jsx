import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

function AccordionCustom({ isShow, title, body }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  function toggleAccordion() {
    setIsCollapsed(!isCollapsed);
  }
  return (
    isShow && (
      <div className={`accordion ${isShow ? "" : "hide"}`}>
        <div className="container-step-title" onClick={() => toggleAccordion()}>
          <div className="step-title">{title}</div>
          <div className="step-icon">
            {isCollapsed ? <FaArrowDown /> : <FaArrowUp />}
          </div>
        </div>
        <div className={`step-f ${isCollapsed ? "hide" : ""}`}>{body}</div>
      </div>
    )
  );
}

export default AccordionCustom;
