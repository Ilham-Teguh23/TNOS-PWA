import axios from "axios";
import React, { Fragment } from "react";
import { FaArrowLeft, FaWindowClose } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
// import MenuLogin from "./MenuLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  // LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { useEffect } from "react";
import moment from "moment-timezone";
import { Spinner } from "react-bootstrap";

// import crypto from "crypto-js";
// import Loader from "../cummon/Loader";

function ContentLogin() {
  const [phone, setPhone] = useState("");
  const [keyCaptcha, setKeyCaptcha] = useState("");
  const [timezone, setTimezone] = useState("");
  const [numberTrue, setNumberTrue] = useState(false);
  var CryptoJS = require("crypto-js");
  const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;
  const [loader, setLoader] = useState(false);

  // const [loading, setLoading] = useState(true);

  // coba
  // const encryptKey = "TNOS-wfWE@#%$rfdsefgdsf";
  // const [hasil, setHasil] = useState("");

  useEffect(() => {
    loadCaptchaEnginge(3);
    setTimezone(moment.tz.guess());
    // setTimeout(() => setLoading(false), 1000);
    // localStorage.removeItem("numberCode");
    // localStorage.removeItem("token");
  }, []);

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
  const submitNomor = async (e) => {
    e.preventDefault();

    // const data = { id: 1, role: 2 };
    // // percobaan
    // var ciphertext = crypto.AES.encrypt(
    //   JSON.stringify(data),
    //   encryptKey
    // ).toString();
    // var bytes = crypto.AES.decrypt(ciphertext, encryptKey);
    // var originalText = JSON.parse(bytes.toString(crypto.enc.Utf8));
    // // console.log("encrypt: " + ciphertext);
    // // console.log("ori: " + JSON.stringify(originalText));

    if (!keyCaptcha) {
      toast.error("Kode Captcha tidak boleh kosong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    } else {
      if (validateCaptcha(keyCaptcha) === true) {
        // toast.success("Captcha Matched", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
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
        // console.log(cipherBasic);
        // console.log("firstId: " + firstId);
        // console.log("lastId: " + lastId);
        // console.log("token key: " + tokenKey);
        try {
          // const urlLaravel = "http://127.0.0.1:8000/api/send-otp";

          // const dataLaravel = {
          //   nomor: phone,
          //   timezone: timezone,
          // };

          // axios
          //   .post(urlLaravel, dataLaravel)
          //   .then((res) => {
          //     if (res.data.message !== "OTP sudah dikirim") {
          //       console.log("gagal");
          //     } else {
          //       // console.log("berhasil");
          //       console.log(res.data.response.statusCode);
          //       if (res.data.response.statusCode != 2000) {
          //         // toast("Maaf no yang kamu masukan belum terdaftar");
          //         toast.error("Maaf no yang kamu masukan belum terdaftar", {
          //           position: "top-right",
          //           autoClose: 5000,
          //           hideProgressBar: false,
          //           closeOnClick: true,
          //           pauseOnHover: true,
          //           draggable: true,
          //           progress: undefined,
          //           theme: "light",
          //         });
          //         //       // alert("dad");
          //       } else {
          //         setNumberTrue(true);
          //         localStorage.setItem("phone", res.data.nomor);
          //         localStorage.setItem("authKey", res.data.token);
          //         localStorage.setItem(
          //           "numberCode",
          //           res.data.response.data.mmbr_code
          //         );
          //       }

          const url = `${process.env.REACT_APP_API_MOBILE_URL}/member/auth/phone`;
          // console.log(url);
          const data = JSON.stringify({
            phone: phone,
            method: "0",
            timezone: timezone,
          });
          setLoader(true);

          await axios
            .post(url, data, {
              headers: {
                Authorization: `Basic ${cipherBasic}`,
                "Content-Type": "application/json",
              },
            })
            .then((res) => {
              // console.log(res);
              // eslint-disable-next-line eqeqeq
              if (res.data.statusCode == 4004) {
                // toast("Maaf no yang kamu masukan belum terdaftar");
                toast.error("Maaf no yang kamu masukan belum terdaftar", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                // alert("dad");
              } else {
                // console.log(authKey);
                // setNumberCode(res.data.data.mmbr_code);
                setNumberTrue(true);
                // console.log(res.data.data.mmbr_code);
                // console.log(numberCode);

                localStorage.setItem("phone", phone);
                localStorage.setItem(
                  "authKey",
                  `${CryptoJS.AES.encrypt(cipherBasic, secretKey).toString()}`
                );
                localStorage.setItem("numberCode", res.data.data.mmbr_code);
                // localStorage.setItem("isAuthenticated");
              }
              setLoader(false);
            })
            .catch((res) => {
              console.log(res);
              setLoader(false);
            });

          // })
          // .catch((res) => {
          //   console.log(res);
          // });
        } catch (error) {
          console.log(error);
        }
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
        setLoader(false);
      }
    }
  };

  const onHandlePhone = () => {
    setPhone("");
  };

  if (numberTrue) {
    return <Navigate to="/verified-otp" replace />;
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
            {/* {authKey} */}
            <form onSubmit={(e) => submitNomor(e)} className="form-top-login">
              <label htmlFor="">No handphone</label>
              <div className="d-flex align-content-center">
                <input
                  type="number"
                  className="form-control form-layanan"
                  placeholder="Masukan no handphone anda"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                <div
                  onClick={() => onHandlePhone()}
                  className="btn-hapus-number"
                >
                  <FaWindowClose />
                </div>
              </div>
              <hr />
              <div className="col-6 ">
                <LoadCanvasTemplate />
                <input
                  placeholder="Enter Captcha Value"
                  onChange={(e) => setKeyCaptcha(e.target.value)}
                  value={keyCaptcha}
                  type="text"
                  className="form-control form-layanan"
                ></input>
              </div>
              <hr />
              <div className="form-group mt-3">
                <button
                  type="submit"
                  className="btn btn-layanan w-100"
                  disabled={loader}
                >
                  {loader ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Lanjutkan"
                  )}
                </button>
              </div>
              {/* <div className="text-center">
                <button
                  onClick={(e) => submitNomor(e)}
                  className="btn btn-submit-login"
                >
                  Lanjut
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ContentLogin;
