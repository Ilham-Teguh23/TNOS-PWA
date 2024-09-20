import React from "react";
import ButtonCustom from "./ButtonCustom";

function ButtonComponent({
  title,
  type,
  color,
  onClick,
  loading = false,
  others,
  typeButton,
  background,
  border,
  padding,
  disabled,
  children,
}) {
  const renderContent = () => {
    switch (typeButton) {
      case "auth":
        return (
          <div className="outside-container-button-f">
            <div
              className="container-button-f"
              style={{
                background: "var(--bg-color6)",
                border: "none",
                boxShadow: "none",
              }}
            >
              {others}
              <ButtonCustom
                color={color}
                padding={padding}
                border={border}
                background={background}
                className="btn-custom"
                type={type}
                onClick={onClick}
                disabled={disabled}
                title={title}
                typeButton={typeButton}
              />
            </div>
          </div>
        );
      case "home":
        return (
          <div className="outside-container-button-f">
            <div
              className="container-button-f"
              style={{
                background: "var(--bg-color6)",
                border: "none",
                boxShadow: "none",
              }}
            >
              {children}
            </div>
          </div>
        );
      case "rincian":
        return (
          <div className="outside-container-button-f">
            <div
              className="container-button-f"
              style={{ padding: "5px 15px 15px 15px" }}
            >
              {others}
              <ButtonCustom
                background={background}
                color={color}
                border={border}
                className="btn-custom"
                type={type}
                onClick={onClick}
                disabled={loading || disabled}
                title={title}
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="outside-container-button-f">
            <div className="container-button-f">
              {others}
              <ButtonCustom
                background={background}
                color={color}
                border={border}
                className="btn-custom"
                type={type}
                onClick={onClick}
                disabled={loading || disabled}
                title={title}
              />
            </div>
          </div>
        );
    }
  };
  return renderContent();
}

export default ButtonComponent;
