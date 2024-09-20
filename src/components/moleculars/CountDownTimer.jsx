import React from "react";
import { useCountdown } from "../utils/CountDownTime";
import DateTimeDisplay from "../utils/DateTimeDisplay";

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  //   if (days + hours + minutes + seconds <= 0) {
  //     return <ExpiredNotice />;
  //   } else {
  return (
    <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  );
  //   }
};

// const ExpiredNotice = () => {
//   return (
//     <div className="expired-notice">
//       <span>Expired!!!</span>
//       <p>Please select a future date and time.</p>
//     </div>
//   );
// };

const ShowCounter = ({ days = 0, hours = 0, minutes = 0, seconds = 0 }) => {
  return (
    <div className="show-counter">
      <div className="countdown-link">
        <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 1} />
        <p>:</p>
        <DateTimeDisplay
          value={hours}
          type={"Hours"}
          isDanger={days <= 1 && hours <= 1}
        />
        <p>:</p>
        <DateTimeDisplay
          value={minutes}
          type={"Mins"}
          isDanger={hours <= 1 && minutes <= 1}
        />
        <p>:</p>
        <DateTimeDisplay
          value={seconds}
          type={"Seconds"}
          isDanger={minutes <= 1 && seconds <= 1}
        />
      </div>
    </div>
  );
};

export default CountdownTimer;
