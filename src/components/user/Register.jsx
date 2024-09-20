import React from "react";
import { Fragment } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../redux/slices/users/UserSlices";
import moment from "moment-timezone";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Email is not valid").required("Email is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
});
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    onSubmit: (values) => {
      values.timezone = moment.tz.guess();
      //   console.log(values);
      dispatch(registerUserAction(values));
    },
    validationSchema: formSchema,
  });

  const storeData = useSelector((store) => store?.users);
  const { loading, isCreated } = storeData;

  if (isCreated) {
    navigate("/login");
  }

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw">Register</h5>
            </Link>
          </div>
          <div className="njwdjhwk">
            <hr />
            <ToastContainer
              position="bottom-right"
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
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-2">
                <label htmlFor="name">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  className={`form-control form-layanan ${
                    formik.errors.name && "is-invalid"
                  }`}
                />
                {formik.touched.name && (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.name}
                  </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  className={`form-control form-layanan ${
                    formik.errors.email && "is-invalid"
                  }`}
                />
                {formik.touched.email && (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="phone">Nomer Handphone</label>
                <input
                  type="text"
                  placeholder="Format 08**********"
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
              </div>
              <Link to="/login">
                <p>Sudah Punya Akun?</p>
              </Link>
              <div className="form-group mt-3">
                {loading ? (
                  <button
                    type="button"
                    className="btn btn-layanan w-100"
                    disabled
                  >
                    Loading...
                  </button>
                ) : (
                  <button type="submit" className="btn btn-layanan w-100">
                    Daftar
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

export default Register;
