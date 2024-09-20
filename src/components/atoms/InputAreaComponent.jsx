import React from "react";

function InputAreaComponent({
  value,
  placeholder,
  readOnly,
  onChange,
  onBlur,
}) {
  return (
    <textarea
      placeholder={placeholder}
      className="form-payment"
      readOnly={readOnly}
      defaultValue={value}
      onChange={onChange}
      onBlur={onBlur}
      rows={3}
    ></textarea>
  );
}

export default InputAreaComponent;
