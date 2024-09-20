import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/DatePickerStyles.css";

function DatePickerComponent({ tanggal, setTanggal, style, minDateNumber }) {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + minDateNumber);

  return (
    <DatePicker
      style={style}
      selected={tanggal ? tanggal : minDate}
      onChange={setTanggal}
      // filterDate={filterPassedDates}
      // startDate={minDate}
      minDate={minDate}
    />
  );
}

export default DatePickerComponent;
