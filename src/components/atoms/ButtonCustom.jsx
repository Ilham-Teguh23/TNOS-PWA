import React from "react";

function ButtonCustom({
  title,
  type,
  color,
  onClick,
  disabled,
  padding,
  typeButton,
  background,
  border,
  fontSize,
}) {
  const renderContent = () => {
    switch (typeButton) {
      case "home":
        return (
          <button
            style={{
              background: background,
              border: border,
              padding: `${padding}`,
              color: color,
            }}
            className="btn-custom"
            type={type}
            onClick={onClick}
            disabled={disabled}
          >
            {title}
          </button>
        );
      case "auth":
        return (
          <button
            style={{
              background: background,
              border: border,
              padding: `${padding}`,
              color: color,
            }}
            className="btn-custom"
            type={type}
            onClick={onClick}
            disabled={disabled}
          >
            {title}
          </button>
        );
      default:
        return (
          <button
            style={{
              background: background,
              border: border,
              padding: `${padding}`,
              fontSize: fontSize,
              color: color,
            }}
            className="btn-custom"
            type={type}
            onClick={onClick}
            disabled={disabled}
          >
            {title}
          </button>
        );
    }
  };

  return renderContent();
}

export default ButtonCustom;
