import React from "react";
import { useCountdown } from "../utils/CountDownTime";

function ColdownTimer({ target, type }) {
  const [days, hours, minutes, seconds] = useCountdown(target);

  // console.log(type);

  const renderContent = () => {
    switch (type) {
      case "QR_CODE":
        return (
          <div className="time">
            <div className="qr-time-coldown">
              <p style={days <= 1 ? { color: "var(--font-color7)" } : {}}>
                {days}
              </p>
              <span>Hari</span>
            </div>
            :
            <div className="qr-time-coldown">
              <p
                style={
                  days <= 1 && hours <= 1 ? { color: "var(--font-color7)" } : {}
                }
              >
                {hours}
              </p>
              <span>Jam</span>
            </div>
            :
            <div className="qr-time-coldown">
              <p
                style={
                  hours <= 1 && minutes <= 1
                    ? { color: "var(--font-color7)" }
                    : {}
                }
              >
                {minutes}
              </p>
              <span>Menit</span>
            </div>
            :
            <div className="qr-time-coldown">
              <p
                style={
                  minutes <= 1 && seconds <= 1
                    ? { color: "var(--font-color7)" }
                    : {}
                }
              >
                {seconds}
              </p>
              <span>Detik</span>
            </div>
            {/* <div className="time">
              <span
                className="value"
                style={days <= 1 ? { color: "#ff0000" } : {}}
              >
                {days}
              </span>
              :<span className="name">Hari</span>
            </div> */}
          </div>
        );
      default:
        return (
          <div className="container-time-f">
            <span style={days <= 1 ? { color: "#ff0000" } : {}}>{days}</span>:
            <span style={days <= 1 && hours <= 1 ? { color: "#ff0000" } : {}}>
              {hours}
            </span>
            :
            <span
              style={hours <= 1 && minutes <= 1 ? { color: "#ff0000" } : {}}
            >
              {minutes}
            </span>
            :
            <span
              style={minutes <= 1 && seconds <= 1 ? { color: "#ff0000" } : {}}
            >
              {seconds}
            </span>
          </div>
        );
    }
  };

  return renderContent();
}

export default ColdownTimer;
