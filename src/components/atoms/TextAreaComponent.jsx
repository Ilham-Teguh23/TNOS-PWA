import React from "react";

function TextAreaComponent({ value, placeholder, readOnly }) {
  return (
    <textarea
      placeholder={placeholder}
      className="form-payment"
      readOnly={readOnly}
      defaultValue={value}
    ></textarea>
  );
}

export default TextAreaComponent;
