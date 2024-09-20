import axios from "axios";
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Spinner } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment-timezone";

function ContentRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [no_telepon, setNo_telepon] = useState("");
  const [formErrorName, setFormErrorName] = useState("");
  const [formErrorEmail, setFormErrorEmail] = useState("");
  const [formErrorNo_telepon, setFormErrorNo_telepon] = useState("");
  const [loader, setLoader] = useState(false);

  const resetFormError = () => {
    setName("");
    setEmail("");
    setNo_telepon("");
    setFormErrorName("");
    setFormErrorEmail("");
    setFormErrorNo_telepon("");
  };
  function makeToken(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJK/LMNOPQRSTU.VWXYZabc/defghi.jklmno/pqrstuvwxyz012/3456789$";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const authRegister = async (e) => {
    e.preventDefault();
    // resetForm();
    if (name === "") {
      setFormErrorName("Nama lengkap tidak boleh kosong");
      // console.log("dad");
    }
    if (email === "") {
      setFormErrorEmail("Email tidak boleh kosong");
      // console.log("dad");
    }
    if (no_telepon === "") {
      setFormErrorNo_telepon("Nomer handphone tidak boleh kosong");
      // console.log("dad");
    }
    const data = JSON.stringify({
      //"noktp"   : req_noktp,
      name: name,
      email: email,
      phone: no_telepon,
      timezone: moment.tz.guess(),
    });
    setLoader(true);

    // console.log(formError);
    let token_arr = [
      "tG7B/pyPW0H/ARi.EMqBQwrS$9fHv9",
      "V5fnr7nuGp4.OpTmAMHMI/YjHG1/4s",
      "P/42VLSzsx/FENsyinKds0s0O/V40h",
      "KmM$/O2GdD6SG/GuW/LBvQszI/VDWw",
      "1uV/nOvjkpTr/LzxrgS.G.HaVFG0Jd",
      "z8$b2RJAl/oFNf7Iw/M$qXyrX.EaPv",
      "4n1rxAB$b2W/S.EwOi4RkcbQ/Pjtf4",
      "MjGgCA/OMkLhB$jVX4YpbV3WBSR/n7",
      "cj/RS1/PcoqyUKUq.$CFwBdI/GX/rw",
      "A7tz8z.rq5/4O/aKOxC4Ycm$xoNdEW",
    ];
    let firstId = makeToken(20);
    let lastId = makeToken(20);
    let tokenKey = token_arr[Math.floor(Math.random() * 10)];
    let cipherBasic = "LYRAPP " + firstId + ":" + tokenKey + ":" + lastId;
    await axios
      .post(
        `${process.env.REACT_APP_API_MOBILE_URL}/member/auth/register`,
        data,
        {
          headers: {
            Authorization: `Basic ${cipherBasic}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // console.log(res.data.statusCode);
        setLoader(false);
        if (name !== "") {
          setFormErrorName("");
          // console.log("dad");
        }
        if (email !== "") {
          setFormErrorEmail("");
          if (res.data.statusCode === "202") {
            toast.error("Email telah terdaftar", {
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
          // console.log("dad");
        }
        if (no_telepon !== "") {
          setFormErrorNo_telepon("");
          if (res.data.statusCode === "203") {
            toast.error("Nomer handphone telah terdaftar", {
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
          // console.log("dad");
        }
        if (res.data.statusCode === "200") {
          toast.success("Selamat pendaftaran akun berhasil", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          resetFormError();
        }
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
            <form onSubmit={(e) => authRegister(e)}>
              <div className="form-group mb-2">
                <label htmlFor="name">Nama Lengkap</label>
                <input
                  type="text"
                  className={`form-control form-layanan ${
                    formErrorName ? "is-invalid" : ""
                  }`}
                  value={name}
                  placeholder="Full Name"
                  onChange={(e) => setName(e.target.value)}
                />
                {formErrorName ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formErrorName}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={`form-control form-layanan ${
                    formErrorEmail ? "is-invalid" : ""
                  }`}
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {formErrorEmail ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formErrorEmail}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="no_telepon">Nomer Handphone</label>
                <input
                  type="text"
                  className={`form-control form-layanan ${
                    formErrorNo_telepon ? "is-invalid" : ""
                  }`}
                  placeholder="Format 08**********"
                  value={no_telepon}
                  onChange={(e) => setNo_telepon(e.target.value)}
                />
                {formErrorNo_telepon ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formErrorNo_telepon}
                  </div>
                ) : (
                  ""
                )}
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

export default ContentRegister;
