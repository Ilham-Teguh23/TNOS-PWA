import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import Xendit from "xendit-js-node";
// import * as Yup from "yup";
import { useFormik } from "formik";
// import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getFetchPaymentByIdAction,
  updateTokenToPaymentDataAction,
} from "../../redux/action/paymentAction";
import InputComponent from "../atoms/InputComponent";
import LabelComponent from "../atoms/LabelComponent";
// import TextError from "../atoms/TextError";
import Gap from "../moleculars/Gap";
import ButtonComponent from "../atoms/ButtonComponent";
import TopNewNav from "../moleculars/TopNewNav";
import DetailCostumer from "../moleculars/DetailCostumer";
// import HowToPay from "../moleculars/HowToPay";
// import PaymentFailure from "../notif/PaymentFailure";
import PaymentProgress from "../notif/PaymentProgress";
// import cc from "../../assets/images/logo_kartu_kredit/CREDIT CARD-12.png";
import { showMessage } from "../utils/Message";
import CardTypes from "../moleculars/CardTypes";

// const formSchema = Yup.object({
//   amount: Yup.string().required("amount is required"),
//   // card_number1: Yup.string()
//   //   .matches(/^\d{0,4}$/, "Must contain at most 4 digits")
//   //   .matches(/^[0-9]+$/, "Must be a number")
//   //   .required("Column 1 is required"),
//   // card_number2: Yup.string()
//   //   .matches(/^\d{0,4}$/, "Must contain at most 4 digits")
//   //   .matches(/^[0-9]+$/, "Must be a number")
//   //   .required("Column 2 is required"),
//   // card_number3: Yup.string()
//   //   .matches(/^\d{0,4}$/, "Must contain at most 4 digits")
//   //   .matches(/^[0-9]+$/, "Must be a number")
//   //   .required("Column 3 is required"),
//   // card_number4: Yup.string()
//   //   .matches(/^\d{0,4}$/, "Must contain at most 4 digits")
//   //   .matches(/^[0-9]+$/, "Must be a number")
//   //   .required("Column 4 is required"),
//   card_exp_month: Yup.string().required("Month is required"),
//   year: Yup.string().required("Year is required"),
//   card_cvn: Yup.string().required("CVV is required"),
// });

const EX_API_KEY = `${process.env.REACT_APP_API_PUBLIC_KEY}`;
function PaymentCreditOrDebitCard() {
  const [creditCardNumber, setCreditCardNumber] = useState({
    card1: "",
    card2: "",
    card3: "",
    card4: "",
  });

  const [creditCard, setCreditCard] = useState({
    detail1: "",
    detail2: "",
    detail3: "",
  });
  // const [show, setShow] = useState(false);
  const [in_status, setin_status] = useState("");
  const [url, setUrl] = useState("/not-found");
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeData = useSelector((store) => store?.global);
  const { payment_data, data } = storeData;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.xendit.co/v1/xendit.min.js";
    script.async = true;
    document.body.appendChild(script);
    const getPaymentById = async () => {
      dispatch(await getFetchPaymentByIdAction(id));
    };

    getPaymentById();
  }, [dispatch, id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setCreditCardNumber({
      ...creditCardNumber,
      [name]: value.replace(/[^0-9]/g, ""),
    });

    if (value.length === 4 && name !== "card4") {
      const nextFieldName = `card${parseInt(name.substring(4)) + 1}`;
      const nextInput = document.getElementsByName(nextFieldName)[0];
      nextInput.focus();
    }

    if ((value.length === 4) & (name === "card4")) {
      const nextInput = document.getElementsByName("detail1")[0];
      nextInput.focus();
    }
  }

  function handleChangeDetailCreditCard(event) {
    const { name, value } = event.target;

    setCreditCard({
      ...creditCard,
      [name]: value.replace(/[^0-9]/g, ""),
    });

    if (value.length === 2 && name !== "detail3") {
      const nextFieldName = `detail${parseInt(name.substring(6)) + 1}`;
      const nextInput = document.getElementsByName(nextFieldName)[0];
      nextInput.focus();
    }

    if ((value.length === 3) & (name !== "detail3")) {
      const nextFieldName = `detail${parseInt(name.substring(6)) + 1}`;
      const nextInput = document.getElementsByName(nextFieldName)[0];
      nextInput.focus();
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: payment_data?.items?.quantity * payment_data?.items?.price,
      card_number: "",
      // card_number: "5200000000001096",
      card_exp_month: "",
      card_exp_year: "",
      year: "",
      card_cvn: "",
      is_multiple_use: false,
      should_authenticate: true,
    },
    onSubmit: (values) => {
      if (
        !creditCardNumber.card1 ||
        !creditCardNumber.card2 ||
        !creditCardNumber.card3 ||
        !creditCardNumber.card4
      ) {
        showMessage("Card column is required", "error");
        return;
      }

      if (!creditCard.detail1) {
        showMessage("Month is required", "error");
        return;
      }

      if (!creditCard.detail2) {
        showMessage("Year is required", "error");
        return;
      }

      if (!creditCard.detail3) {
        showMessage("CVV is required", "error");
        return;
      }

      setLoading(true);
      if (data?.payment?.status === "CAPTURED") {
        showMessage(
          "You have been successfully payment, go to back your dashboard",
          "error"
        );
      } else {
        values.card_number =
          creditCardNumber.card1 +
          creditCardNumber.card2 +
          creditCardNumber.card3 +
          creditCardNumber.card4;

        values.card_exp_month = creditCard.detail1;
        values.card_exp_year = "20" + creditCard.detail2;
        values.card_cvn = creditCard.detail3;

        const tokenData = values;
        window.Xendit.setPublishableKey(EX_API_KEY);
        window.Xendit.card.createToken(tokenData, xenditResponseHandler);
      }
    },
    // validationSchema: formSchema,
  });

  //   const getTokenData = () => {
  //     return {
  //       amount: 200000,
  //       card_number: "5200000000001096",
  //       //   card_number: "48895060737227971",
  //       card_exp_month: "11",
  //       card_exp_year: "2027",
  //       card_cvn: "887",
  //       is_multiple_use: false,
  //       should_authenticate: true,
  //     };
  //   };

  const xenditResponseHandler = async (err, creditCardToken) => {
    if (err) {
      setLoading(false);
      toast.error(err?.message);
      return;
    }
    if (
      creditCardToken.status === "APPROVED" ||
      creditCardToken.status === "VERIFIED"
    ) {
      setLoading(false);
      setin_status(creditCardToken?.status);
      // handleClose();

      toast.success("Proses verified");

      const data = {
        id: id,
        token_id: creditCardToken?.id,
        authentication_id: creditCardToken?.authentication_id,
        card_info: JSON.stringify(creditCardToken?.card_info),
        status: creditCardToken?.status,
        amount: formik.values.amount,
        // card_cvn: formik.values.card_cvn,
      };
      dispatch(await updateTokenToPaymentDataAction(data, navigate));
      // console.log("VERIFIED", creditCardToken.status);
    } else if (creditCardToken?.status === "IN_REVIEW") {
      setLoading(false);
      setin_status(creditCardToken?.status);
      toast.success("Sedang di proses");

      // handleShow();
      setUrl(creditCardToken.payer_authentication_url);
    } else if (creditCardToken?.status === "FAILED") {
      console.log(creditCardToken);
      setLoading(false);
      setin_status(creditCardToken?.status);
      toast.error("Proses gagal");
    }
  };

  // if (data?.payment?.status !== "CREATED") {
  //   navigate(`/payment/credit-or-debit-card/charge/${id}`);
  // }

  const renderContent = () => {
    switch (in_status) {
      case "IN_REVIEW":
        return (
          <>
            <TopNewNav title="Payment Credit & Debit Card" nav={false} />
            <div className="container-class">
              <div className="responsive-class">
                <div className="res-class">
                  <div className="payment-container">
                    <div className="payment-content">
                      <iframe
                        title="Of"
                        style={{ minHeight: "100vh", overflow: "hidden" }}
                        width="100%"
                        src={url}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case "VERIFIED":
        return <PaymentProgress />;
      case "APPROVED":
        return <PaymentProgress />;
      case "FAILED":
        return (
          <>
            <TopNewNav nav={false} title="Payment Credit & Debit Card" />
            <div className="container-class">
              <div className="responsive-class">
                <div className="res-class">
                  <div className="payment-container">
                    <div className="payment-content">
                      <DetailCostumer
                        amount={data?.payment?.amount?.toLocaleString()}
                        id={payment_data?.id}
                        show={false}
                      />
                      <div className="cantainer-option-payment-f">
                        <form onSubmit={formik.handleSubmit}>
                          <div className="payment-content">
                            <div className="box-content-f">
                              <div className="row">
                                <div className="col-12">
                                  <div className="row">
                                    <div
                                      className="col-3"
                                      style={{ padding: "5px" }}
                                    >
                                      <div className="form-group mb-2">
                                        <LabelComponent label={`Kartu`} />
                                        <InputComponent
                                          maxLength={4}
                                          placeholder="0000"
                                          name="card1"
                                          value={creditCardNumber.card1}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      className="col-3"
                                      style={{ padding: "5px" }}
                                    >
                                      <div className="form-group mb-2">
                                        <Gap height={19} />
                                        <InputComponent
                                          maxLength={4}
                                          name="card2"
                                          placeholder="0000"
                                          value={creditCardNumber.card2}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      className="col-3"
                                      style={{ padding: "5px" }}
                                    >
                                      <div className="form-group mb-2">
                                        <Gap height={19} />
                                        <InputComponent
                                          maxLength={4}
                                          name="card3"
                                          placeholder="0000"
                                          value={creditCardNumber.card3}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      className="col-3"
                                      style={{ padding: "5px" }}
                                    >
                                      {" "}
                                      <div className="form-group mb-2">
                                        <Gap height={19} />
                                        <InputComponent
                                          maxLength={4}
                                          name="card4"
                                          placeholder="0000"
                                          value={creditCardNumber.card4}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col-3"
                                  style={{ padding: "5px" }}
                                >
                                  <div className="form-group mb-2">
                                    <LabelComponent label={"Bulan"} />
                                    <InputComponent
                                      maxLength={2}
                                      name="detail1"
                                      placeholder="00"
                                      value={creditCard.detail1}
                                      onChange={handleChangeDetailCreditCard}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-3"
                                  style={{ padding: "5px" }}
                                >
                                  <div className="form-group mb-2">
                                    <LabelComponent label="Tahun" />
                                    <InputComponent
                                      maxLength={2}
                                      name="detail2"
                                      placeholder="00"
                                      value={creditCard.detail2}
                                      onChange={handleChangeDetailCreditCard}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-3"
                                  style={{ padding: "5px" }}
                                >
                                  <div className="form-group mb-2">
                                    <LabelComponent label="CVV" />
                                    <InputComponent
                                      maxLength={3}
                                      name="detail3"
                                      placeholder="000"
                                      value={creditCard.detail3}
                                      onChange={handleChangeDetailCreditCard}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-3"
                                  style={{ padding: "5px" }}
                                >
                                  <CardTypes
                                    cardNumber={
                                      creditCardNumber.card1 +
                                      creditCardNumber.card2 +
                                      creditCardNumber.card3 +
                                      creditCardNumber.card4
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <Gap height={20} />
                          <ButtonComponent
                            title={"Bayar Sekarang"}
                            type="submit"
                            loading={loading}
                          />
                        </form>
                        {/* <HowToPay code="OVO" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case "CANCEL":
        return (
          <>
            <TopNewNav nav={false} title="Payment Credit & Debit Card" />
            <div className="container-class">
              <div className="responsive-class">
                <div className="res-class">
                  <div className="payment-container">
                    <div className="payment-content">
                      <DetailCostumer
                        amount={data?.payment?.amount?.toLocaleString()}
                        id={payment_data?.id}
                        show={false}
                      />
                      <div className="cantainer-option-payment-f">
                        <form onSubmit={formik.handleSubmit}>
                          <div className="payment-content">
                            <div className="box-content-f">
                              <div className="row">
                                <div className="col-12">
                                  <div className="row">
                                    <div
                                      className="col-3"
                                      style={{ padding: "5px" }}
                                    >
                                      <div className="form-group mb-2">
                                        <LabelComponent label={`Kartu`} />
                                        <InputComponent
                                          maxLength={4}
                                          placeholder="0000"
                                          name="card1"
                                          value={creditCardNumber.card1}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      className="col-3"
                                      style={{ padding: "5px" }}
                                    >
                                      <div className="form-group mb-2">
                                        <Gap height={19} />
                                        <InputComponent
                                          maxLength={4}
                                          name="card2"
                                          placeholder="0000"
                                          value={creditCardNumber.card2}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      className="col-3"
                                      style={{ padding: "5px" }}
                                    >
                                      <div className="form-group mb-2">
                                        <Gap height={19} />
                                        <InputComponent
                                          maxLength={4}
                                          name="card3"
                                          placeholder="0000"
                                          value={creditCardNumber.card3}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      className="col-3"
                                      style={{ padding: "5px" }}
                                    >
                                      {" "}
                                      <div className="form-group mb-2">
                                        <Gap height={19} />
                                        <InputComponent
                                          maxLength={4}
                                          name="card4"
                                          placeholder="0000"
                                          value={creditCardNumber.card4}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col-3"
                                  style={{ padding: "5px" }}
                                >
                                  <div className="form-group mb-2">
                                    <LabelComponent label={"Bulan"} />
                                    <InputComponent
                                      maxLength={2}
                                      name="detail1"
                                      placeholder="00"
                                      value={creditCard.detail1}
                                      onChange={handleChangeDetailCreditCard}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-3"
                                  style={{ padding: "5px" }}
                                >
                                  <div className="form-group mb-2">
                                    <LabelComponent label="Tahun" />
                                    <InputComponent
                                      maxLength={2}
                                      name="detail2"
                                      placeholder="00"
                                      value={creditCard.detail2}
                                      onChange={handleChangeDetailCreditCard}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-3"
                                  style={{ padding: "5px" }}
                                >
                                  <div className="form-group mb-2">
                                    <LabelComponent label="CVV" />
                                    <InputComponent
                                      maxLength={3}
                                      name="detail3"
                                      placeholder="000"
                                      value={creditCard.detail3}
                                      onChange={handleChangeDetailCreditCard}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-3"
                                  style={{ padding: "5px" }}
                                >
                                  <CardTypes
                                    cardNumber={
                                      creditCardNumber.card1 +
                                      creditCardNumber.card2 +
                                      creditCardNumber.card3 +
                                      creditCardNumber.card4
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <Gap height={20} />
                          <ButtonComponent
                            title={"Bayar Sekarang"}
                            type="submit"
                            loading={loading}
                          />
                        </form>
                        {/* <HowToPay code="OVO" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return (
          <>
            <TopNewNav nav={false} title="Payment Credit & Debit Card" />
            <div className="container-class">
              <div className="responsive-class">
                <div className="res-class">
                  <div className="payment-container">
                    <div className="payment-content">
                      <DetailCostumer
                        amount={data?.payment?.amount?.toLocaleString()}
                        id={payment_data?.id}
                        show={false}
                      />
                      <div className="cantainer-option-payment-f">
                        <form onSubmit={formik.handleSubmit}>
                          <div className="payment-content">
                            <div className="box-content-f">
                              <div className="row">
                                <div className="col-12">
                                  <div className="row">
                                    <div
                                      className="col-3"
                                      style={{ padding: "5px" }}
                                    >
                                      <div className="form-group mb-2">
                                        <LabelComponent label={`Kartu`} />
                                        <InputComponent
                                          maxLength={4}
                                          placeholder="0000"
                                          name="card1"
                                          value={creditCardNumber.card1}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      className="col-3"
                                      style={{ padding: "5px" }}
                                    >
                                      <div className="form-group mb-2">
                                        <Gap height={19} />
                                        <InputComponent
                                          maxLength={4}
                                          name="card2"
                                          placeholder="0000"
                                          value={creditCardNumber.card2}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      className="col-3"
                                      style={{ padding: "5px" }}
                                    >
                                      <div className="form-group mb-2">
                                        <Gap height={19} />
                                        <InputComponent
                                          maxLength={4}
                                          name="card3"
                                          placeholder="0000"
                                          value={creditCardNumber.card3}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      className="col-3"
                                      style={{ padding: "5px" }}
                                    >
                                      {" "}
                                      <div className="form-group mb-2">
                                        <Gap height={19} />
                                        <InputComponent
                                          maxLength={4}
                                          name="card4"
                                          placeholder="0000"
                                          value={creditCardNumber.card4}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col-3"
                                  style={{ padding: "5px" }}
                                >
                                  <div className="form-group mb-2">
                                    <LabelComponent label={"Bulan"} />
                                    <InputComponent
                                      maxLength={2}
                                      name="detail1"
                                      placeholder="00"
                                      value={creditCard.detail1}
                                      onChange={handleChangeDetailCreditCard}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-3"
                                  style={{ padding: "5px" }}
                                >
                                  <div className="form-group mb-2">
                                    <LabelComponent label="Tahun" />
                                    <InputComponent
                                      maxLength={2}
                                      name="detail2"
                                      placeholder="00"
                                      value={creditCard.detail2}
                                      onChange={handleChangeDetailCreditCard}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-3"
                                  style={{ padding: "5px" }}
                                >
                                  <div className="form-group mb-2">
                                    <LabelComponent label="CVV" />
                                    <InputComponent
                                      maxLength={3}
                                      name="detail3"
                                      placeholder="000"
                                      value={creditCard.detail3}
                                      onChange={handleChangeDetailCreditCard}
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-3"
                                  style={{ padding: "5px" }}
                                >
                                  <CardTypes
                                    cardNumber={
                                      creditCardNumber.card1 +
                                      creditCardNumber.card2 +
                                      creditCardNumber.card3 +
                                      creditCardNumber.card4
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <Gap height={20} />
                          <ButtonComponent
                            title={"Bayar Sekarang"}
                            type="submit"
                            loading={loading}
                          />
                        </form>
                        {/* <HowToPay code="OVO" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      {renderContent()}
      {/* <Modal tabIndex="-1" show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Process</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
            
          
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-layanan " onClick={handleCloseModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

export default PaymentCreditOrDebitCard;
