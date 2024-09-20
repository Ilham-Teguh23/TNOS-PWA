import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { checkout } from "../utils/paymentCheckoutHandle";
// import TopNewNav from "../moleculars/TopNewNav";
import mandiri from "../../assets/images/logo_bank/Bank-05.png";
import bri from "../../assets/images/logo_bank/Bank-04.png";
import bni from "../../assets/images/logo_bank/Bank-03.png";
import permata from "../../assets/images/logo_bank/Bank-06.png";
import bsi from "../../assets/images/logo_bank/Bank-07.png";
import bca from "../../assets/images/logo_bank/Bank-12.png";
import sampoerna from "../../assets/images/logo_bank/Bank-13.png";
import bjb from "../../assets/images/logo_bank/BJB.png";
// import dana from "../../assets/images/logo_ewallet/E-WALLET_Dana.png";
// import shopeepay from "../../assets/images/logo_ewallet/E-WALLET_ShopeePay.png";
import linkaja from "../../assets/images/logo_ewallet/E-WALLET_Link Aja.png";
import ovo from "../../assets/images/logo_ewallet/E-WALLET_OVO.png";
import astrapay from "../../assets/images/logo_ewallet/E-WALLET_AstraPay.png";
import cc from "../../assets/images/logo_kartu_kredit/CREDIT CARD-12.png";
import qris from "../../assets/images/logo_ewallet/QRIS.png";
import DetailCostumer from "../moleculars/DetailCostumer";
import {
  // getFetchPaymentByIdAction,
  getListBankAction,
} from "../../redux/action/paymentAction";
import { showMessage } from "../utils/Message";
import { isPayment, setPaymentData } from "../../redux/action/globalAction";
import { getParams } from "../moleculars/GetParams";
import { decode as base64_decode } from "base-64";
// import { setData } from "../../redux/action/globalAction";

import CryptoJS from "crypto-js";

const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

function Payment() {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params?.id;
  const storeData = useSelector((store) => store?.global);
  const { payment_data, is_payment, list_bank } = storeData;
  // const EWALLET = ["DANA", "OVO", "LINKAJA", "SHOPEEPAY", "ASTRAPAY"];
  // const VIRTUAL_ACCOUNT = [
  //   "MANDIRI",
  //   "BCA",
  //   "BRI",
  //   "BNI",
  //   "PERMATA",
  //   "SAHABAT_SAMPOERNA",
  //   "BSI",
  //   "BJB",
  // ];

  useEffect(() => {
    checkParams();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkParams = () => {
    let checkP = getParams(["token"]);

    if (!checkP) {
      console.log("params tidak ditemukan");
    } else {
      var base64regex =
        /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
      // let string = base64_decode(checkP.token);
      // let info2x = CryptoJS.AES.decrypt(atob(checkP.token), process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8);
      if (!base64regex.test(checkP.token)) {
        console.log("data base64 tidak cocok");
      } else {
        let string = base64_decode(checkP.token);
        let cryptdata = string;
        const info2x = CryptoJS.AES.decrypt(cryptdata, secretKey).toString(
          CryptoJS.enc.Utf8
        );

        if (!info2x) {
          console.log("data base64 not match when decrypt");
        } else {
          var paramValue = JSON.parse(info2x);
          var user = JSON.parse(paramValue.data);
          var changeFormatValue = {
            id: paramValue.OID,
            customer: {
              name: user.name,
              email: user.email,
              phone: user.phone,
            },
            items: {
              id: "1",
              name: paramValue.title,
              quantity: 1,
              price: paramValue.amount,
            },
          };
          console.log(changeFormatValue);
          dispatch(setPaymentData(changeFormatValue));
        }
      }
    }
  };

  const navigate = useNavigate();

  const handleCheckout = (code) => {
    if (payment_data) {
      if (!is_payment) {
        if (code === "OVO") {
          checkout(code, payment_data, dispatch, navigate);
        } else {
          dispatch(isPayment(true));
          checkout(code, payment_data, dispatch, navigate);
        }
      } else {
        navigate("/not-found");
        showMessage(
          "Anda sudah memilih metode pembayaran sebelumnya, silahkan pilih pembayaran ulang",
          "error"
        );
      }
    } else {
      showMessage("Ada yang salah, silahkan coba lagi", "error");
    }
  };

  useEffect(() => {
    const getPaymentById = async () => {
      // dispatch(await getFetchPaymentByIdAction(id));
      dispatch(await getListBankAction());
    };

    getPaymentById();
  }, [dispatch, id]);

  return (
    <>
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container" style={{ marginTop: "0px" }}>
              <div className="payment-content">
                <DetailCostumer
                  amount={(
                    payment_data?.items?.quantity * payment_data?.items?.price
                  ).toLocaleString()}
                  id={payment_data?.id}
                  show={false}
                  TypeId="order"
                />
                <div className="cantainer-option-payment-f">
                  <div className="title">
                    Pilih salah satu metode pembayaran di bawah
                  </div>
                  <div className="container-option-f">
                    <div className="title">Bank Tranfer</div>
                    <div className="payment-chanel-flex-f">
                      {list_bank
                        // ?.filter((value) =>
                        //   VIRTUAL_ACCOUNT.includes(value?.code)
                        // )
                        ?.filter((value) => value?.is_activated !== false)
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
                            case "BJB":
                              imageS = bjb;
                              break;
                            default:
                              imageS = "";
                              break;
                          }
                          return (
                            <div
                              key={key}
                              className="payment-chanel-f"
                              onClick={() => handleCheckout(row?.code)}
                            >
                              <img src={imageS} alt="" />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="container-option-f">
                    <div className="title">E-Wallet</div>
                    <div className="payment-chanel-flex-f">
                      {/* <div className="payment-chanel-f">
                        <img
                          src={dana}
                          alt=""
                          onClick={() => handleCheckout("DANA")}
                        />
                      </div>
                      <div className="payment-chanel-f">
                        <img
                          src={shopeepay}
                          alt=""
                          onClick={() => handleCheckout("SHOPEEPAY")}
                        />
                      </div> */}
                      <div className="payment-chanel-f">
                        <img
                          src={linkaja}
                          alt=""
                          onClick={() => handleCheckout("LINKAJA")}
                        />
                      </div>
                      <div
                        className="payment-chanel-f"
                        onClick={() => handleCheckout("OVO")}
                      >
                        <img src={ovo} alt="" />
                      </div>
                      <div
                        className="payment-chanel-f"
                        onClick={() => handleCheckout("ASTRAPAY")}
                      >
                        <img src={astrapay} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="container-option-f">
                    <div className="title">Kartu Kredit & Debit</div>
                    <div className="payment-chanel-flex-f">
                      <div
                        className="payment-chanel-f"
                        onClick={() => handleCheckout("CREDIT_CARD")}
                      >
                        <img src={cc} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="container-option-f">
                    <div className="title">QR Code</div>
                    <div className="payment-chanel-flex-f">
                      <div
                        className="payment-chanel-f"
                        onClick={() => handleCheckout("QR_CODE")}
                      >
                        <img src={qris} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
