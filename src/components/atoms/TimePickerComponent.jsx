import React from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "../../assets/css/TimePickerStyles.css";

function TimePickerComponent({ value, onChange }) {
  const defaultLanguage = localStorage.getItem("language");

  return <TimePicker onChange={onChange} value={value} locale={defaultLanguage} />;
}

export default TimePickerComponent;
