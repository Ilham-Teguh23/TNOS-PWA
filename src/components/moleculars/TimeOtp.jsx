import React, { useEffect } from "react";

function TimeOtp({ remainingTime, setRemainingTime }) {
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);
    if (remainingTime === 0) {
      // Perform any action or logic when the timer reaches zero
      // For example, you could trigger an OTP generation here
    }

    if (remainingTime < 1) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const formattedTime = formatTime(remainingTime);
  return <span>{formattedTime}</span>;
}

export default TimeOtp;
