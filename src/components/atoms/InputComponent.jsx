import React from "react";

function InputComponent({
  onChange,
  value,
  onBlur,
  type,
  pattern,
  maxLength,
  min,
  placeholder,
  name,
  multiple,
  typeInput,
  textAlign,
  fontSize,
  defaultValue,
  id,
}) {
  const renderContent = () => {
    switch (typeInput) {
      case "auth":
        return (
          <input
            id={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className="form-payment"
            style={{
              color: "white",
              background: "var(--bg-color6)",
              textAlign: textAlign,
              fontSize: fontSize,
            }}
            type={type}
            pattern={pattern}
            maxLength={maxLength}
            min={min}
            name={name}
            multiple={multiple && true}
          />
        );
      default:
        return (
          <input
            id={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className="form-payment"
            type={type}
            pattern={pattern}
            maxLength={maxLength}
            min={min}
            name={name}
            multiple={multiple && true}
            defaultValue={defaultValue}
          />
        );
    }
  };
  return renderContent();
}

export default InputComponent;
