import axios from "axios";
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Spinner } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function RegisterMenu() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPassword_confirmation("");
  };

  const authRegister = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };
    setLoader(true);
    setFormError({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
    axios
      .post("http://127.0.0.1:8000/api/register", data)
      .then((res) => {
        if (res.data.error) {
          setFormError({
            name: res.data.error.name,
            email: res.data.error.email,
            password: res.data.error.password,
          });
        }
        if (res.data.message) {
          toast.success(res.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          resetForm();
        }
        setLoader(false);
        // console.log(formError);
        console.log(res);
      })
      .catch((res) => {
        toast.error(
          res.response.data.message
            ? res.response.data.message
            : "there is something wrong",
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        setLoader(false);
      });
  };
  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/login" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
            </Link>
          </div>
          <div className="njwdjhwk">
            <h5 className="title-kasnadkw">Register</h5>
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
            <form onSubmit={(e) => authRegister(e)}>
              <div className="form-group mb-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className={`form-control form-layanan ${
                    formError.name ? "is-invalid" : ""
                  }`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {formError.name ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.name}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className={`form-control form-layanan ${
                    formError.email ? "is-invalid" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {formError.email ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.email}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`form-control form-layanan ${
                    formError.password ? "is-invalid" : ""
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {formError.password ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.password}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="password">Password Confirmation</label>
                <input
                  type="password"
                  className="form-control form-layanan"
                  value={password_confirmation}
                  onChange={(e) => setPassword_confirmation(e.target.value)}
                />
              </div>
              <Link to="/login">
                <p>Sudah Punya Akun?</p>
              </Link>
              <div className="form-group mt-3">
                <button
                  type="submit"
                  className="btn btn-layanan w-100"
                  disabled={loader}
                >
                  {loader ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default RegisterMenu;
