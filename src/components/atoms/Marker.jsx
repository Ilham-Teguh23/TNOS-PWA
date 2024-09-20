import React from "react";

function Marker({ lat, lng }) {
  return (
    <div>
      Marker {lat}
      {lng}
    </div>
  );
}

export default Marker;
