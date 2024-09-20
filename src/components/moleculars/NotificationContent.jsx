import React from "react";
import Gap from "./Gap";

function NotificationContent({ image, title, description }) {
  return (
    <div className="container-content-notif">
      <div className="container-image-notif-f">
        <img src={image} alt="" />
      </div>
      <Gap height={42} />
      <div className="title">{title}</div>
      <div className="description">{description}</div>
    </div>
  );
}

export default NotificationContent;
