import React, { Fragment, useState } from "react";
import InputComponent from "../atoms/InputComponent";
import ButtonCustom from "../atoms/ButtonCustom";

function InputSusunanComponent({ value, setValue, component, onBlur }) {
  const [input, setInput] = useState();

  const handleMultipleInput = (e) => {
    const { name, value } = e.target;
    const inputValue = value;

    setInput({
      ...input,
      [name]: inputValue,
    });
  };
  // console.log(saham);

  const handleClickMultiple = () => {
    if (!input) return;
    setValue([...value, input]);
    // setInput({
    //   pemegang_saham: "",
    //   jumlah_saham: "",
    // });
  };

  return (
    <div className="row">
      {component?.map((row, key) => {
        return (
          <Fragment key={key}>
            <div className="col-4">
              <InputComponent
                type={"text"}
                name={row?.field1}
                //   value={}
                onChange={(e) => handleMultipleInput(e)}
                placeholder={row?.field1}
              />
            </div>
            <div className="col-4">
              <InputComponent
                type={"text"}
                placeholder={row?.field2}
                // value={component?.persen}
                name={row?.field2}
                onChange={(e) => handleMultipleInput(e)}
              />
            </div>
          </Fragment>
        );
      })}

      <div className="col-4">
        <ButtonCustom
          type="button"
          onClick={() => handleClickMultiple()}
          title={<div>Tambah</div>}
          color={"white"}
          padding="0.6rem"
          fontSize={"0.9rem"}
        />
      </div>
    </div>
  );
}

export default InputSusunanComponent;
