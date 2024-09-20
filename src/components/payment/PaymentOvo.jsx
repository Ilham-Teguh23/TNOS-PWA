import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOvoAction } from "../../redux/action/paymentAction";
import * as Yup from "yup";
import { useFormik } from "formik";
import ButtonComponent from "../atoms/ButtonComponent";
import LabelComponent from "../atoms/LabelComponent";
import InputComponent from "../atoms/InputComponent";
import TextError from "../atoms/TextError";
import Gap from "../moleculars/Gap";
import TopNewNav from "../moleculars/TopNewNav";
import DetailCostumer from "../moleculars/DetailCostumer";
import ovo from "../../assets/images/logo_ewallet/E-WALLET_OVO.png";
import HowToPay from "../moleculars/HowToPay";
import { showMessage } from "../utils/Message";
import BankContent from "../moleculars/BankContent";

const phoneRegExp =
  /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/gm;
const formSchema = Yup.object({
  phone: Yup.string()
    .matches(phoneRegExp, "No Telepon is not valid")
    .required("No Telepon is required"),
});

function PaymentOvo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storeData = useSelector((store) => store?.global);
  const { payment_data } = storeData;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: payment_data?.id,
      amount: payment_data?.items?.price * payment_data?.items?.quantity,
      name: payment_data?.customer?.name,
      email: payment_data?.customer?.email,
      phone: "",
      items: JSON.stringify(payment_data?.items),
    },
    onSubmit: async (values) => {
      if (!values.amount || !values.name || !values.email || !values.items) {
        showMessage("Something went wrong!", "error");
      } else {
        if (values.phone.substr(0, 1) === "+") {
          dispatch(await createOvoAction(values, navigate));
        } else {
          if (
            values.phone.substr(0, 2) !== "08" ||
            values.phone.substr(0, 1) !== "0"
          ) {
            alert("salah");
          } else {
            if (values.phone.substr(0, 1) === "0") {
              values.phone = `+62${values.phone.substr(1, 15)}`;
              dispatch(await createOvoAction(values, navigate));
            }
          }
        }
      }
    },
    validationSchema: formSchema,
  });

  return (
    <>
      <TopNewNav path={-1} title="Payment Ovo" />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container">
              <div className="payment-content">
                <DetailCostumer
                  amount={(
                    payment_data?.items?.quantity * payment_data?.items?.price
                  ).toLocaleString()}
                  id={payment_data?.id}
                  show={false}
                />

                <div className="cantainer-option-payment-f">
                  <BankContent image={ovo} title={`Ovo`} border={false} />
                  <form onSubmit={formik.handleSubmit}>
                    <div className="payment-content">
                      <div className="form-group">
                        <LabelComponent label={"No Telepon (08**********)"} />
                        <InputComponent
                          type="text"
                          placeholder="Masukan No Telepon"
                          value={formik.values.phone}
                          onChange={formik.handleChange("phone")}
                          onBlur={formik.handleBlur("phone")}
                        />
                        {formik.errors.phone && formik.touched.phone ? (
                          <TextError error={formik.errors.phone} />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <Gap height={20} />
                    <ButtonComponent title={"Bayar Sekarang"} type="submit" />
                  </form>
                  <HowToPay code="OVO" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentOvo;
