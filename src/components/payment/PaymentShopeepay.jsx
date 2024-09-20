import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createShopeepayAction } from "../../redux/action/paymentAction";
import TopNewNav from "../moleculars/TopNewNav";
import shopeepay from "../../assets/images/logo_ewallet/E-WALLET_ShopeePay.png";
import DetailCostumer from "../moleculars/DetailCostumer";
import ButtonComponent from "../atoms/ButtonComponent";
import HowToPay from "../moleculars/HowToPay";
import { useFormik } from "formik";
import { showMessage } from "../utils/Message";
import BankContent from "../moleculars/BankContent";

function PaymentShopeepay() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params?.id;

  const storeData = useSelector((store) => store?.global);
  const { payment_data } = storeData;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: payment_data?.items?.price * payment_data?.items?.quantity,
      name: payment_data?.customer?.name,
      email: payment_data?.customer?.email,
      phone: payment_data?.customer?.phone,
      items: JSON.stringify(payment_data?.items),
    },
    onSubmit: async (values) => {
      if (
        !values.amount ||
        !values.name ||
        !values.email ||
        !values.phone ||
        !values.items
      ) {
        showMessage("Something went wrong!", "error");
      } else {
        dispatch(await createShopeepayAction(values, navigate));
      }
    },
  });
  return (
    <>
      <TopNewNav path={`/payment/${id}`} title="Payment ShopeePay" />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container">
              <div className="payment-content">
                <DetailCostumer amount={10000} />
                <div className="cantainer-option-payment-f">
                  <BankContent
                    image={shopeepay}
                    title={`ShopeePay`}
                    border={false}
                  />
                  <form onSubmit={formik.handleSubmit}>
                    <ButtonComponent title={"Bayar Sekarang"} type="submit" />
                  </form>
                  <HowToPay />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentShopeepay;
