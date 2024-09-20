import React, { Fragment } from "react";
import { FaArrowLeft, FaWindowClose } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import { inputPhoneLoginAction } from "../../redux/slices/users/UserSlices";
import TitleHeader from "../utils/TitleHeader";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formSchema = Yup.object({
  captcha: Yup.string().required("Captcha is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
});

function LoginOtp() {
  TitleHeader("Login");
  useEffect(() => {
    loadCaptchaEnginge(3);
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storeData = useSelector((store) => store?.users);
  const { loading, isInputLogin } = storeData;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      phone: "",
      captcha: "",
    },
    onSubmit: (values) => {
      values.timezone = moment.tz.guess();
      values.method = "0";
      if (validateCaptcha(values?.captcha) === true) {
        // console.log(values);
        dispatch(inputPhoneLoginAction(values));
      } else {
        toast.error("Code Captcha tidak cocok!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
    validationSchema: formSchema,
  });
  const deletePhoneHandle = () => {
    formik.setFieldValue("phone", "");
  };

  if (isInputLogin) {
    navigate("/verified-otp");
  }

  return (
    <Fragment>
      {/* {loading === true ? <Loader /> : ""} */}
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw">Login</h5>
            </Link>
          </div>
          <div className="content-box-login">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <h5 className="title-login">Masukan nomor telephone terdaftar</h5>
            <p className="p-login">
              Untuk masuk ke akunmu atau daftar penguna baru.
            </p>
            <form onSubmit={formik.handleSubmit} className="form-top-login">
              <label htmlFor="">No handphone</label>
              <div className=" align-content-center">
                <input
                  type="text"
                  placeholder="Masukan no handphone anda"
                  value={formik.values.phone}
                  onChange={formik.handleChange("phone")}
                  onBlur={formik.handleBlur("phone")}
                  className={`form-control form-layanan ${
                    formik.errors.phone && "is-invalid"
                  }`}
                />
                {formik.touched.phone && (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.phone}
                  </div>
                )}
                <div
                  className="btn-hapus-number"
                  onClick={() => deletePhoneHandle()}
                >
                  <FaWindowClose />
                </div>
              </div>
              <hr />
              <div className="col-6 ">
                <LoadCanvasTemplate />
                <input
                  placeholder="Enter Captcha Value"
                  type="text"
                  value={formik.values.captcha}
                  onChange={formik.handleChange("captcha")}
                  onBlur={formik.handleBlur("captcha")}
                  className={`form-control form-layanan ${
                    formik.errors.captcha && "is-invalid"
                  }`}
                />
                {formik.touched.captcha && (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.captcha}
                  </div>
                )}
              </div>
              <hr />
              <div className="form-group mt-3">
                {loading ? (
                  <button
                    type="submit"
                    className="btn btn-layanan w-100"
                    disabled
                  >
                    Loading...
                  </button>
                ) : (
                  <button type="submit" className="btn btn-layanan w-100">
                    Lanjutkan
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default LoginOtp;
