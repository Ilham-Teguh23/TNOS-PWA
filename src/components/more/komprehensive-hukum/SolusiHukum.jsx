import React, { useState } from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import "../../../assets/css/allLayanan.css";
import Gap from "../../moleculars/Gap";
import LabelComponent from "../../atoms/LabelComponent";
import ButtonComponent from "../../atoms/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { solusiHukumSchema } from "../../utils/formSchema";
import { useDispatch } from "react-redux";
import { badanHukumCreate } from "../../../redux/action/paymentAction";
import TitleHeader from "../../utils/TitleHeader";
import TextError from "../../atoms/TextError";
import InputCheckboxComponent from "../../atoms/InputCheckboxComponent";
import { t } from "i18next";

function SolusiHukum() {
  TitleHeader(t("layanan3"));
  var user = JSON.parse(localStorage.getItem("userInfo"));


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tnos_service_id: "3",
      tnos_subservice_id: "7",
      needs: "",
      user_id: user.mmbr_code,
      name: user.mmbr_name,
      email: user.mmbr_email,
      phone: user.mmbr_phone,
      ketentuan_cek: false
    },
    onSubmit: async (values) => {
      //   console.log(values);
      dispatch(
        await badanHukumCreate(
          values,
          navigate,
          "/comprehensive-Legal-solutions/checkout/"
        )
      );
    },
    validationSchema: solusiHukumSchema,
  });

  return (
    <>
      <TopNewNav title={t("layanan3")} path={`/dashboard`} />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container">
              <div className="payment-content">
                <div className="container-layanan-f">
                  <b className="title-layanan-f">
                    Penyelesaian permasalahan hukum secara menyeluruh
                  </b>
                  <Gap height={10} />
                  <form action="">
                    <div className="form-group mb-2">
                      <LabelComponent id="needs" label="Permasalahan Hukum" />
                      <textarea
                        name="needs"
                        id="needs"
                        cols="10"
                        rows="5"
                        placeholder="Jelaskan permasalahan anda"
                        value={formik.values.needs}
                        onChange={formik.handleChange("needs")}
                        onBlur={formik.handleBlur("needs")}
                        className={`form-payment ${
                          formik.errors.needs && "is-invalid"
                        }`}
                      />
                      {formik.errors.needs && formik.touched.needs ? (
                        <TextError error={formik.errors.needs} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group mb-2">
                      <InputCheckboxComponent
                        id="ketentuan_cek"
                        label="Saya menyetujui ketentuan & persyaratan Pemesanan
                        Layanan"
                        value={formik.values.ketentuan_cek}
                        onChange={formik.handleChange("ketentuan_cek")}
                        onBlur={formik.handleBlur("ketentuan_cek")}
                        typeLayanan="solusi-hukum"
                      />
                      {formik.errors.ketentuan_cek &&
                      formik.touched.ketentuan_cek ? (
                        <TextError error={formik.errors.ketentuan_cek} />
                      ) : (
                        ""
                      )}
                    </div>
                    <Gap height={70} />
                    <ButtonComponent
                      title={"Lanjut Pembayaran"}
                      type="submit"
                      onClick={formik.handleSubmit}
                      // onClick={() => handlePayment()}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SolusiHukum;
