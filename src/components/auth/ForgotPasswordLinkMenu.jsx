import axios from "axios";
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Spinner } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function ForgotPasswordLinkMenu() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [formError, setFormError] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loader, setLoader] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const authForgotPassword = async () => {
    const data = {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      token: params.token,
    };
    setFormError({
      email: "",
      password: "",
      password_confirmation: "",
    });
    setLoader(true);
    await axios
      .post("http://127.0.0.1:8000/api/reset-password", data)
      .then((res) => {
        if (res.data.success === true) {
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
          navigate("/login", { state: { message: res.data.message } });
        } else {
          if (res.data.error) {
            console.log(res.data.error);
            setFormError({
              email: res.data.error.email,
              password: res.data.error.password,
              password_confirmation: res.data.error.password_confirmation,
            });
          }
          if (res.data.message) {
            console.log(res.data.message);
            toast.error(res.data.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          setLoader(false);
        }
      })
      .catch((res) => {
        console.log(res);
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
            <h5 className="title-kasnadkw">Lupa Password</h5>
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
            <div className="form-group mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className={`form-control form-layanan ${
                  formError.email ? "is-invalid" : ""
                }`}
                placeholder="Email"
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
                placeholder="Password"
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
              <label htmlFor="password_confirmation">
                Password Confirmation
              </label>
              <input
                type="password"
                className={`form-control form-layanan ${
                  formError.password_confirmation ? "is-invalid" : ""
                }`}
                placeholder="Password Confirmation"
                value={password_confirmation}
                onChange={(e) => setPassword_confirmation(e.target.value)}
              />
              {formError.password_confirmation ? (
                <div
                  id="validationServer03Feedback"
                  className="invalid-feedback"
                >
                  {formError.password_confirmation}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group mt-3">
              <button
                onClick={() => authForgotPassword()}
                className="btn btn-layanan w-100"
                disabled={loader}
              >
                {loader ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Send Password Reset Link"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ForgotPasswordLinkMenu;
