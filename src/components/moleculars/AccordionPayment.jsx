import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { FaCheckCircle, FaPlusSquare } from "react-icons/fa";
import PaymentContentPayment from "./PaymentContentPayment";
import mandiri from "../../assets/images/logo_bank/Bank-05.png";
import bri from "../../assets/images/logo_bank/Bank-04.png";
import bni from "../../assets/images/logo_bank/Bank-03.png";
import permata from "../../assets/images/logo_bank/Bank-06.png";
import bsi from "../../assets/images/logo_bank/Bank-07.png";
import bca from "../../assets/images/logo_bank/Bank-12.png";
import sampoerna from "../../assets/images/logo_bank/Bank-13.png";

function AccordionPayment({ setPayment, selectPayment, list_bank }) {
  const EWALLET = ["DANA", "OVO", "LINKAJA", "SHOPEEPAY", "ASTRAPAY"];
  const VIRTUAL_ACCOUNT = [
    "MANDIRI",
    "BCA",
    "BRI",
    "BNI",
    "PERMATA",
    "SAHABAT_SAMPOERNA",
    "BSI",
  ];
  const CREDIT_CARDS = ["CREDIT_CARD"];
  const QR_CODES = ["QR_CODE"];
  const [selectPaymentEwallet, setSelectPaymentEwallet] = useState(false);
  const [selectPaymentVa, setSelectPaymentVa] = useState(false);
  const [selectPaymentCc, setSelectPaymentCc] = useState(false);
  const [selectPaymentQrCode, setSelectPaymentQrCode] = useState(false);

  useEffect(() => {
    selectOption(selectPayment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectPayment]);

  const selectOption = (value) => {
    let checkEwallet = EWALLET.includes(value);
    let checkVA = VIRTUAL_ACCOUNT.includes(value);
    let checkCc = CREDIT_CARDS.includes(value);
    let qrcode = QR_CODES.includes(value);

    // if ewallet true
    if (checkEwallet) {
      setSelectPaymentEwallet(checkEwallet);
      setSelectPaymentVa(false);
      setSelectPaymentCc(false);
      setSelectPaymentQrCode(false);
    }

    // if virtual account true
    if (checkVA) {
      setSelectPaymentVa(checkVA);
      setSelectPaymentEwallet(false);
      setSelectPaymentCc(false);
      setSelectPaymentQrCode(false);
    }

    // if credit cards true
    if (checkCc) {
      setSelectPaymentCc(checkCc);
      setSelectPaymentVa(false);
      setSelectPaymentEwallet(false);
      setSelectPaymentQrCode(false);
    }

    // if qr code true
    if (qrcode) {
      setSelectPaymentQrCode(qrcode);
      setSelectPaymentCc(false);
      setSelectPaymentVa(false);
      setSelectPaymentEwallet(false);
    }

    setPayment(value);
  };

  return (
    <Accordion defaultActiveKey={["0"]}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          Virtual Account{" "}
          {selectPaymentVa && (
            <span style={{ color: "green" }}>
              <FaCheckCircle />
            </span>
          )}{" "}
        </Accordion.Header>
        <Accordion.Body>
          {list_bank
            ?.filter((value) => VIRTUAL_ACCOUNT.includes(value?.code))
            // ?.filter((value) => value?.is_activated !== false)
            ?.map((row, key) => {
              let imageS = "";
              switch (row?.code) {
                case "MANDIRI":
                  imageS = mandiri;
                  break;
                case "BCA":
                  imageS = bca;
                  break;
                case "BRI":
                  imageS = bri;
                  break;
                case "BNI":
                  imageS = bni;
                  break;
                case "PERMATA":
                  imageS = permata;
                  break;
                case "SAHABAT_SAMPOERNA":
                  imageS = sampoerna;
                  break;
                case "BSI":
                  imageS = bsi;
                  break;
                default:
                  imageS = "";
                  break;
              }
              return (
                <div key={key} onClick={() => selectOption(row?.code)}>
                  <PaymentContentPayment
                    title={row?.name}
                    image={imageS}
                    select={selectPayment === row?.code}
                  />
                </div>
              );
            })}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          Ewallet{" "}
          {selectPaymentEwallet && (
            <span style={{ color: "green" }}>
              <FaCheckCircle />
            </span>
          )}{" "}
        </Accordion.Header>
        <Accordion.Body>
          <hr />
          <div onClick={() => selectOption("DANA")}>
            {/* <PaymentContentPayment title="DANA" image={mandiri} /> */}
            DANA{" "}
            {selectPayment === "DANA" ? (
              <span style={{ color: "green" }}>
                <FaCheckCircle />
              </span>
            ) : (
              ""
            )}
          </div>
          <hr />
          <div onClick={() => selectOption("OVO")}>
            OVO{" "}
            {selectPayment === "OVO" ? (
              <span style={{ color: "green" }}>
                <FaCheckCircle />
              </span>
            ) : (
              ""
            )}
          </div>
          <hr />
          <div onClick={() => selectOption("LINKAJA")}>
            LINKAJA{" "}
            {selectPayment === "LINKAJA" ? (
              <span style={{ color: "green" }}>
                <FaCheckCircle />
              </span>
            ) : (
              ""
            )}
          </div>
          <hr />
          <div onClick={() => selectOption("SHOPEEPAY")}>
            SHOPEEPAY{" "}
            {selectPayment === "SHOPEEPAY" ? (
              <span style={{ color: "green" }}>
                <FaCheckCircle />
              </span>
            ) : (
              ""
            )}
          </div>
          <hr />
          <div onClick={() => selectOption("ASTRAPAY")}>
            ASTRAPAY{" "}
            {selectPayment === "ASTRAPAY" ? (
              <span style={{ color: "green" }}>
                <FaCheckCircle />
              </span>
            ) : (
              ""
            )}
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>
          Credit / Debit Card
          {selectPaymentCc && (
            <span style={{ color: "green" }}>
              <FaCheckCircle />
            </span>
          )}{" "}
        </Accordion.Header>
        <Accordion.Body>
          <hr />
          <div onClick={() => selectOption("CREDIT_CARD")}>
            Tambahkan Kartu Kredit / Debit Baru{" "}
            <span style={{ float: "left" }}>
              <FaPlusSquare />
            </span>
            {selectPayment === "CREDIT_CARD" ? (
              <span style={{ color: "green" }}>
                <FaCheckCircle />
              </span>
            ) : (
              ""
            )}
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>
          QR CODE
          {selectPaymentQrCode && (
            <span style={{ color: "green" }}>
              <FaCheckCircle />
            </span>
          )}{" "}
        </Accordion.Header>
        <Accordion.Body>
          <hr />
          <div onClick={() => selectOption("QR_CODE")}>
            Make QR code{" "}
            <span style={{ float: "left" }}>
              <FaPlusSquare />
            </span>
            {selectPayment === "QR_CODE" ? (
              <span style={{ color: "green" }}>
                <FaCheckCircle />
              </span>
            ) : (
              ""
            )}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionPayment;
