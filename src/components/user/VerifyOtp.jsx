import React, { Fragment } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import MenuLogin from "../auth/MenuLogin";
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment-timezone";
import { inputOtpLoginAction } from "../../redux/slices/users/UserSlices";
import TitleHeader from "../utils/TitleHeader";

const formSchema = Yup.object({
  otp: Yup.number()
    .typeError("OTP must be a number")
    .required("OTP is required"),
});
function VerifyOtp() {
  TitleHeader("Verifikasi OTP");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeData = useSelector((store) => store?.users);
  const { loading, inputNumberLogin, userAuth } = storeData;
  const auth = userAuth ? userAuth : "";

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      otp: "",
    },
    onSubmit: (values) => {
      values.timezone = moment.tz.guess();
      values.fbtoken = "fcmToken";
      values.usercode = inputNumberLogin?.data?.mmbr_code;
      //   console.log(values);
      dispatch(inputOtpLoginAction(values));
    },
    validationSchema: formSchema,
  });

  if (auth) {
    navigate("/dashboard");
  }

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/login" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw">Login With OTP</h5>
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
            <h5 className="title-login">Kode OTP sudah dikirim!</h5>
            <p className="p-login">
              Masukan kode OTP yang telah kami SMS ke nomor HP-mu yang terdaftar{" "}
              {localStorage.getItem("phone")}.
            </p>

            <form onSubmit={formik.handleSubmit} className="form-top-login">
              <label htmlFor="otp">OTP </label>
              <div className=" align-content-center">
                <input
                  type="text"
                  maxLength="6"
                  placeholder="######"
                  value={formik.values.otp}
                  onChange={formik.handleChange("otp")}
                  onBlur={formik.handleBlur("otp")}
                  className={`otp form-control form-layanan ${
                    formik.errors.otp && "is-invalid"
                  }`}
                />
                {formik.touched.otp && (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.otp}
                  </div>
                )}
              </div>
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
                    Login
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

export default VerifyOtp;
