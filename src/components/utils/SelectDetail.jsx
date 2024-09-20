import React from "react";

import Select from "react-select";

function SelectDetail(props) {
  const allCategory = [
    {
      value: props?.data?.id,
      label: props?.data?.nama,
    },
  ];
  return (
    <div>
      <Select
        id={props.id}
        options={allCategory}
        value={allCategory}
        isSearchable={false}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: props?.error ? "red" : "transparent",
            background: "#f5f5f5",
          }),
        }}
      />
    </div>
  );
}

export default SelectDetail;
