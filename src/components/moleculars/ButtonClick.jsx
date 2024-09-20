import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

function ButtonClick({ value, setValue, maxValue, minValue, addValue, type }) {
  const add = () => {
    if (value >= maxValue) {
      return false;
    }
    setValue(value + addValue);
  };
  const min = () => {
    if (value <= minValue) {
      return false;
    }

    setValue(value - addValue);
  };

  const nameValue = () => {
    switch (type) {
      case "personel":
        return "Personel";
      case "jam":
        return "Jam";
      default:
        return;
    }
  };
  return (
    <div className="container-increase-decrease">
      <FaMinus style={{ display: 'flex', justifyContent:'start' }} onClick={() => min()} />
      {value} {nameValue()}
      <FaPlus onClick={() => add()} />
    </div>
  );
}

export default ButtonClick;
