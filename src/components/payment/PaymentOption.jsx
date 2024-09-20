import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/paymentOption.css";
import AccordionPayment from "../moleculars/AccordionPayment";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentData } from "../../redux/action/globalAction";
import { getListBankAction } from "../../redux/action/paymentAction";

function PaymentOption() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getListPayment = async () => {
      dispatch(await getListBankAction());
    };

    getListPayment();
  }, [dispatch]);

  const storeData = useSelector((store) => store?.global);
  const { payment_data, list_bank } = storeData;

  const setPayment = (value) => {
    const data = {
      ...payment_data,
      payment_option: {
        code: value,
      },
    };
    dispatch(setPaymentData(data));
  };

  return (
    <div className="responsive-class">
      <div className="res-class">
        <div className="nav-top-login">
          <Link to="/payment-checkout" className="btn nav-back-arrow">
            <FaArrowLeft className="hhagwd" />
            <h5 className="title-kasnadkw">Payment Option</h5>
          </Link>
        </div>
        <div className="njwdjhwk">
          <AccordionPayment
            list_bank={list_bank}
            selectPayment={payment_data?.payment_option?.code}
            setPayment={setPayment}
          />
          <div className="mt-3">
            <button
              className="btn btn-layanan w-100"
              onClick={() => navigate("/payment-checkout")}
            >
              Konfirmasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentOption;
