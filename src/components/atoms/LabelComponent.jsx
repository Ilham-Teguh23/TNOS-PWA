import React from "react";

function LabelComponent({ label, cardType, typeInput, id }) {
  // const convertedString = label.replace(/\s+/g, "_");
  // const toloweCaseLabel = convertedString.toLowerCase();

  const renderContent = () => {
    switch (typeInput) {
      case "auth":
        return (
          <label
            htmlFor={id}
            className="input-label-payment"
            style={{ color: "var(--font-color9)" }}
          >
            {label} {cardType}
          </label>
        );
      default:
        return (
          <label htmlFor={id} className="input-label-payment">
            {label} {cardType}
          </label>
        );
    }
  };
  return renderContent();
}

export default LabelComponent;
