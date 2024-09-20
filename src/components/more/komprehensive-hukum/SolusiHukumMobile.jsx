import React, { useEffect, useState } from "react";
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
import { decode as base64_decode } from "base-64";
import { getParams } from "../../moleculars/GetParams";
import TextError from "../../atoms/TextError";
import InputCheckboxComponent from "../../atoms/InputCheckboxComponent";
var CryptoJS = require("crypto-js");
const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

function SolusiHukumMobile() {
  TitleHeader("Halaman Solusi Hukum");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    checkParams();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkParams = () => {
    let checkP = getParams(["query"]);

    if (!checkP) {
      console.log("params tidak ditemukan");
    } else {
      var base64regex =
        /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
      if (!base64regex.test(checkP.query)) {
        console.log("data base64 tidak cocok");
        navigate("/not-found");
      } else {
        let string = base64_decode(checkP.query);
        let cryptdata = string;
        const info2x = CryptoJS.AES.decrypt(cryptdata, secretKey).toString(
          CryptoJS.enc.Utf8
        );

        if (!info2x) {
          console.log("data base64 not match when decrypt");
        } else {
          var paramValue = JSON.parse(info2x);
          console.log(paramValue);
          setUser(paramValue);
          localStorage.setItem("data", JSON.stringify(paramValue));
        }
        if (!localStorage.getItem("data")) {
          if (!paramValue.user_id) {
            console.log("salah");
            navigate("/not-found");
          }
        }
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tnos_service_id: "3",
      tnos_subservice_id: "7",
      needs: "",
      user_id: user?.user_id,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      ketentuan_cek: false,
    },
    onSubmit: async (values) => {
      //   console.log(values);
      dispatch(
        await badanHukumCreate(values, navigate, "/solusi-hukum-m/checkout/")
      );
    },
    validationSchema: solusiHukumSchema,
  });

  return (
    <>
      {/* <TopNewNav title="Komprehensif Solusi Hukum" path={`/dashboard`} /> */}
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container" style={{ marginTop: "0px" }}>
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
                        typeLayanan="badan-usaha-atau-hukum"
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

export default SolusiHukumMobile;
