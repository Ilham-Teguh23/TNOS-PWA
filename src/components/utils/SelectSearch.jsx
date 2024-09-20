import React from "react";

import Select from "react-select";
import TextError from "../atoms/TextError";

function SelectSearch(props) {
  const allCategory = props.data?.map((row) => {
    return {
      value: row?.id,
      label: row?.nama,
    };
  });

  // handle change
  const handleChange = (value) => {
    props.onChange(props.id, value);
    props.valueId(value.value);
  };

  // handle blur
  const handleBlur = () => {
    props.onBlur(props.id, true);
  };
  return (
    <div>
      <Select
        onChange={handleChange}
        onBlur={handleBlur}
        id={props.id}
        options={allCategory}
        value={props?.value?.label}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: props?.error ? "red" : "transparent",
            background: "#f5f5f5",
          }),
        }}
      />

      {props?.error && <TextError error={props?.error} />}
    </div>
  );
}

export default SelectSearch;
