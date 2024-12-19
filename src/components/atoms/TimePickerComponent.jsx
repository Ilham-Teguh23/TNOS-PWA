import React from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "../../assets/css/TimePickerStyles.css";
import "../../assets/css/timePicker.css";

function TimePickerComponent({ value, onChange }) {
  const defaultLanguage = localStorage.getItem("language");

  return (
    <div className="input-group">
      <TimePicker
        onChange={onChange}
        value={value}
        locale={defaultLanguage}
        disableClock={true}
        format="HH:mm"
        clearIcon={null}
        className="form-control time-picker-input"
      />
      <span className="input-group-text">WIB</span>
    </div>
  )
}

export default TimePickerComponent;
