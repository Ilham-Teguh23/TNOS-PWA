import React from "react";

function CheckoutValue({ title, value, color, type, opsi = "saham", number }) {
  const renderOfType = () => {
    switch (type) {
      case "option":
        return (
          <div
            className="container-checkout-content-value-f"
            style={{ display: "block" }}
          >
            <div className="title">{title}</div>
            {value &&
              value?.map((row, key) => {
                return opsi !== "saham" ? (
                  <div
                    key={key}
                    className="value"
                    style={{ color: color, fontWeight: "400" }}
                  >
                    Tuan/Nyonya{" "}
                    <span style={{ fontWeight: "600" }}>{row.field1}</span>{" "}
                    Jabatan{" "}
                    <span style={{ fontWeight: "600" }}>{row.field2}</span>
                  </div>
                ) : (
                  <div
                    key={key}
                    className="value"
                    style={{ color: color, fontWeight: "400" }}
                  >
                    Tuan/Nyonya{" "}
                    <span style={{ fontWeight: "600" }}>{row.field1}</span>{" "}
                    Sebanyak{" "}
                    <span style={{ fontWeight: "600" }}>{row.field2}</span>%
                    saham
                  </div>
                );
              })}
          </div>
        );
      case "bidang":
        return (
          <div
            className="container-checkout-content-value-f"
            style={{ display: "block" }}
          >
            <div className="title">{title}</div>
            {value &&
              value?.map((row, key) => {
                return (
                  <div
                    key={key}
                    className="value"
                    style={{ color: color, fontWeight: "400" }}
                  >
                    Bidang{" "}
                    <span style={{ fontWeight: "600" }}>{row.value}</span>
                  </div>
                );
              })}
          </div>
        );
      case "one":
        return (
          <div className="container-checkout-content-value-f">
            <div
              className="value"
              style={{ color: color, fontWeight: "400", textAlign: "justify" }}
            >
              {value}
            </div>
          </div>
        );
      default:
        return (
          <div className="container-checkout-content-value-f">
            <div className="title">{title}</div>
            <div className="value" style={{ color: color }}>
              {number && "Rp"}{" "}
              {number ? parseInt(value).toLocaleString() : value}
            </div>
          </div>
        );
    }
  };
  return renderOfType();
}

export default CheckoutValue;
