import axios from "axios";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../route/AppRoutes";

function LoginMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (state) {
      toast.success(state.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(state.pathname, {});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    setFormError({
      email: "",
      password: "",
    });
    setLoader(true);
    const url = "https://api-pwa.tnos.world/api/login";
    // const url = "http://127.0.0.1:8000/api/login";
    await axios
      .post(url, data)
      .then((res) => {
        if (res.data.success === true) {
          dispatch({
            type: "LOGIN",
            payload: res.data.authorisation,
          });
          navigate("/dashboard");
          setLoader(false);
        } else {
          if (res.data.error) {
            console.log(res.data.error);
            setFormError({
              email: res.data.error.email,
              password: res.data.error.password,
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
            <Link to="/" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
            </Link>
          </div>
          <div className="njwdjhwk">
            <h5 className="title-kasnadkw">Login </h5>
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
            <form onSubmit={(e) => authLogin(e)}>
              <div className="form-group mb-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
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
              <Link to="/register">
                <div>Belum Punya Akun?</div>
              </Link>
              <Link to="/forgot-password">
                <div>Lupa Password?</div>
              </Link>
              <div className="form-group mt-3">
                <button
                  className="btn btn-layanan w-100"
                  disabled={loader}
                  type="submit"
                >
                  {loader ? <Spinner animation="border" size="sm" /> : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default LoginMenu;
