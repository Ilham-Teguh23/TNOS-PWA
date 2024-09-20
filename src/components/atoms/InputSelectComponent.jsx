import React from "react";
import Select from "react-select";

function InputSelectComponent({ options, onChange, onBlur, value, id }) {

  // handle change
  const handleChange = (value) => {
    onChange(id, value);
  };

  // handle blur
  const handleBlur = () => {
    if (!onBlur) {
      return;
    }
    onBlur(id, true);
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={value?.label}
      id={id}
      onBlur={handleBlur}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          // borderColor: state.isFocused ? "grey" : "red",
          padding: "0.18rem",
          fontSize: "0.9rem",
        }),
      }}
    />
  );
}

export default InputSelectComponent;
