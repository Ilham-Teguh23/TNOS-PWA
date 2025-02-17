import React from "react";

function ButtonNotif({ title }) {
  return (
    <div className="container-btn-notif-f">
      <button onClick={() => {
        window.location.href = "/dashboard"
      }} className="btn-notif">{title}</button>
    </div>
  );
}

export default ButtonNotif;
