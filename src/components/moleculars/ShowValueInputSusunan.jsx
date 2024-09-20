import React from "react";
import ButtonCustom from "../atoms/ButtonCustom";
import { FaTrash } from "react-icons/fa";

function ShowValueInputSusunan({ value, setValue, type = "persentase" }) {
  const deleteInputMultiple = (id) => {
    const updatedItems = value && value?.filter((_item, key) => key !== id);
    setValue(updatedItems);
  };

  const calculateTotal = () => {
    const total =
      value && value?.reduce((acc, item) => acc + parseInt(item.persentase), 0);
    return total;
  };

  return (
    <>
      {value &&
        value?.map((row, key) => {
          return (
            <div className="container-check-m" key={key}>
              <div className="t-title">
                Nama :<span>{row.name}</span>
              </div>
              {type === "persentase" ? (
                <div className="p-title">
                  Persentase : <span>{row.persentase}%</span>
                </div>
              ) : (
                <div className="p-title">
                  Jabatan :{" "}
                  <span style={{ borderRadius: "4px" }}>{row.jabatan}</span>
                </div>
              )}

              <div className="container-btn-check-m">
                <ButtonCustom
                  title={<FaTrash />}
                  color={"white"}
                  padding="0px 6px"
                  onClick={() => deleteInputMultiple(key)}
                />
              </div>
            </div>
          );
        })}
      <div className="container-check-m">
        {type === "persentase" ? (
          <div className="t-title">
            Total persentase : <span>{calculateTotal()}%</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default ShowValueInputSusunan;
