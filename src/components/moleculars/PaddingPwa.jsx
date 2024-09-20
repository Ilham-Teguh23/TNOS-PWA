import React from "react";

function PaddingPwa({ children, padding }) {
  return <div style={{ padding: padding }}>{children}</div>;
}

export default PaddingPwa;
