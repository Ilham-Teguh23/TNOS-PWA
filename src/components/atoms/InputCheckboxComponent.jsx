import React, { useState } from "react";
import ModalComponent from "../moleculars/ModalComponent";
import PaddingPwa from "../moleculars/PaddingPwa";
import Iframe from "react-iframe";

function InputCheckboxComponent({
  label,
  onChange,
  value,
  onBlur,
  name,
  id,
  typeLayanan,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLinkOpen = () => {
    switch (typeLayanan) {
      case "pengamanan":
        return (
          <Iframe
            url="https://tnosbantuan.freshdesk.com/support/solutions/articles/150000042230"
            width="100%"
            height="100%"
            styles={{ minHeight: "100vh" }}
            id=""
            className=""
            display="block"
            position="relative"
          />
        );
      case "badan-usaha-atau-hukum":
        return (
          <Iframe
            url="https://tnosbantuan.freshdesk.com/support/solutions/articles/150000043751-membatalkan-pesanan-komprehensif-solusi-hukum-"
            width="100%"
            height="100%"
            styles={{ minHeight: "100vh" }}
            id=""
            className=""
            display="block"
            position="relative"
          />
        );
      case "solusi-hukum":
        return (
          <Iframe
            url="https://tnosbantuan.freshdesk.com/support/solutions/articles/150000043751-membatalkan-pesanan-komprehensif-solusi-hukum-"
            width="100%"
            height="100%"
            styles={{ minHeight: "100vh" }}
            id=""
            className=""
            display="block"
            position="relative"
          />
        );
      case "legalitas":
        return (
          <Iframe
            url="https://tnosbantuan.freshdesk.com/a/solutions/articles/150000042266"
            width="100%"
            height="100%"
            styles={{ minHeight: "100vh" }}
            id=""
            className=""
            display="block"
            position="relative"
          />
        );
      case "pembayaran-lainnya":
        return (
          <Iframe
            url="https://tnosbantuan.freshdesk.com/support/solutions/articles/150000177804"
            width="100%"
            height="100%"
            styles={{ minHeight: "100vh" }}
            id=""
            className=""
            display="block"
            position="relative"
          />
        );
      default:
        return;
    }
  };

  console.log(handleLinkOpen().props.url);

  return (
    <>
      <div className="form-check-f">
        <input
          type="checkbox"
          placeholder={"Masukkan "}
          id={id}
          className="form-checkbox"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
        />
        <label
          htmlFor={id}
          style={{ cursor: "pointer" }}
          onClick={() => setIsModalVisible(!isModalVisible)}
        >
          {label}
        </label>
      </div>
      <ModalComponent
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        // onClick={}
        type="pembatalan"
      >
        <PaddingPwa padding={5}>{handleLinkOpen()}</PaddingPwa>
      </ModalComponent>
    </>
  );
}

export default InputCheckboxComponent;
