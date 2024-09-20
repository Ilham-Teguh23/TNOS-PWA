import React from "react";
import Select from "react-select";

function InputSelectSearchComponent({
  options,
  onChange,
  onBlur,
  value,
  id,
  valueId,
}) {
  // handle change
  const handleChange = (value) => {
    onChange(id, value);
    valueId && valueId(value.value);
  };

  // handle blur
  const handleBlur = () => {
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

export default InputSelectSearchComponent;
