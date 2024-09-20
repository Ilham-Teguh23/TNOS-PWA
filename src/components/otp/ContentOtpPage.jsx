import axios from "axios";
import moment from "moment-timezone";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaArrowLeft, FaPhone } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
// import MenuLogin from "../auth/MenuLogin";
import crypto from "crypto-js";
import { useContext } from "react";
import { AuthContext } from "../../route/AppRoutes";
import { Spinner } from "react-bootstrap";

function ContentOtpPage() {
  const [codeOtp, setCodeOtp] = useState("");
  const [timezone, setTimezone] = useState("");
  // const [data, setData] = useState({});
  // const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  // const [codeLogin, setCodeLogin] = useState([
  //   "login1",
  //   "login2",
  //   "login3",
  //   "login4",
  //   "login5",
  //   "login6",
  //   "login7",
  // ]);

  const [buttonUlangOtp, setButtonUlangOtp] = useState(false);
  const [currentCount, setCount] = useState(0);

  const encryptKey = "TNOS-wfWE@#%$rfdsefgdsf";
  const timer = () => {
    localStorage.setItem(
      "currentCount",
      parseInt(localStorage.getItem("currentCount")) - 1
    );
    setCount(localStorage.getItem("currentCount"));
    // console.log(localStorage.getItem("currentCount"));
  };
  // const timer = () => setCount(currentCount - 1);
  const funPercobaan = () => {
    if (localStorage.getItem("Pccb")) {
      var bytes1 = crypto.AES.decrypt(localStorage.getItem("Pccb"), encryptKey);
      var oriTextString = bytes1.toString(crypto.enc.Utf8);
      var oriTextIntCount = parseInt(oriTextString) + 1;
      if (oriTextIntCount >= 5) {
        // console.log("jam sekarang" + moment().unix());
        // console.log("jam expired" + moment().add(10, "second").unix());

        // kondisi ketika waktu sekarang sudah melewati expired time request otp maka reset percobaan ke 0 dan hapus localStorage expiredTime
        if (
          parseInt(moment().unix()) >
          parseInt(localStorage.getItem("expiredTime"))
        ) {
          toast.success("Kode OTP sudah dikirim ulang", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          var toStartCountPercobaan = crypto.AES.encrypt(
            "1",
            encryptKey
          ).toString();
          // localStorage.removeItem("Pccb" + toStartCountPercobaan);
          localStorage.removeItem("expiredTime");
          localStorage.setItem("Pccb", toStartCountPercobaan);
          // var bytes = crypto.AES.decrypt(toStartCountPercobaan, encryptKey);
          // var originalText = bytes.toString(crypto.enc.Utf8);
          // console.log("ori: " + originalText);
          // console.log("1");
        } else {
          // mengisi value nilai expired time untuk setiap limit request
          var travelTime = moment().add(10, "second").unix();
          localStorage.setItem("expiredTime", travelTime);
          toast.error(
            "Percobaan sudah melebihi batas limit, Silahkan coba lagi nanti",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
      } else {
        toast.success("Kode OTP sudah dikirim ulang", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        var oriTextIntCountString = oriTextIntCount.toString();
        // console.log("data local sudah ada, percobaan ke" + oriTextString);
        // console.log(
        //   "data local sudah ada, percobaan ditambah 1 ke" +
        //     oriTextIntCountString
        // );
        var encryptPercobaanCount = crypto.AES.encrypt(
          oriTextIntCountString,
          encryptKey
        ).toString();
        localStorage.setItem("Pccb", encryptPercobaanCount);
        // console.log(
        //   "data percobaan sudah diencrypt dan ditambah" +
        //     localStorage.getItem("Pccb")
        // );
      }
    } else {
      toast.success("Kode OTP sudah dikirim ulang", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      var cipherTextPercobaan = crypto.AES.encrypt("1", encryptKey).toString();
      // var bytes = crypto.AES.decrypt(cipherTextPercobaan, encryptKey);
      // var originalText = bytes.toString(crypto.enc.Utf8);
      // console.log("encrypt: " + cipherTextPercobaan);
      // console.log("bytes: " + bytes);
      // console.log("ori: " + originalText);
      // console.log("oriCip: " + percobaan);
      // console.log("countpercobaan: " + percobaan);
      // console.log(percobaan);
      localStorage.setItem("Pccb", cipherTextPercobaan);
    }
  };

  useEffect(() => {
    if (currentCount <= 0) {
      setButtonUlangOtp(true);

      return;
    }
    if (localStorage.getItem("currentCount") > 30) {
      toast.error("Delay tidak bisa diubah", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem("currentCount", 30);
    }
    // var data = codeLogin.includes(localStorage.getItem("loggedIn"));
    // if (data) {
    //   console.log(data + "1");
    // } else {
    //   alert("dwdwa");
    // }
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, [currentCount]);

  useEffect(() => {
    setTimezone(moment.tz.guess());
    if (!localStorage.getItem("currentCount")) {
      setCount(0);
    } else {
      setCount(localStorage.getItem("currentCount"));
    }
    // localStorage.setItem("currentCount", 0);
    // setCount(0);
    // funPercobaan();
  }, []);
  // useEffect(() => {
  //   if (validationError) {
  //     setInterval(setValidationError(""), 5000);
  //   }
  // }, [validationError]);

  // useEffect(() => {
  //   if (delayOtp <= 0) {
  //     setButtonUlangOtp(true);
  //     setDelayOtp("00");
  //     return;
  //   }
  //   const id = setInterval(timer(), 1000);
  //   return () => clearInterval(id);
  // }, []);

  const formSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      if (!codeOtp) {
        toast.error("Code OTP wajib di isi!", {
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
      // if (!localStorage.getItem("numberCode")) {
      //   toast.error(
      //     "Ada yang salah, silahkan kembali ke menu masukan nomor telepon!",
      //     {
      //       position: "top-right",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "light",
      //     }
      //   );
      // }
      const url = "https://api-dev.tnos.world/member/auth/otp";
      // const url = "http://127.0.0.1:8000/api/verif-otp";
      // const data = {
      //   usercode: localStorage.getItem("numberCode"),
      //   otp: codeOtp,
      //   timezone: timezone,
      //   token: localStorage.getItem("authKey"),
      // };
      const data = JSON.stringify({
        usercode: localStorage.getItem("numberCode"),
        otp: codeOtp,
        fbtoken: "fcmToken",
        timezone: timezone,
      });
      var CryptoJS = require("crypto-js");
      const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;
      var bytes = CryptoJS.AES.decrypt(
        localStorage.getItem("authKey"),
        secretKey
      );
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      const headers = {
        Authorization: `Basic ${originalText}`,
        "Content-Type": "application/json",
      };
      // console.log(data);
      // console.log(localStorage.getItem("autKey"));
      setLoader(true);
      await axios
        .post(url, data, {
          headers,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.statusCode === "4004") {
            toast.error("Maaf kode OTP yang kamu masukan tidak cocok!", {
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
          if (res.data.statusCode === "2000") {
            localStorage.setItem("user", JSON.stringify(res?.data?.data));
            let ciphertext =
              "TNSUSR:" +
              localStorage.getItem("numberCode").toString() +
              ":" +
              res.data.message;
            localStorage.setItem(
              "token",
              CryptoJS.AES.encrypt(ciphertext, secretKey).toString()
            );
            dispatch({
              type: "LOGIN",
              // payload: res.data.authorisation,
            });
            navigate("/dashboard");
          }

          setLoader(false);
        })
        .catch((res) => {
          // console.log(res);
          // console.log("1");
          // setValidationError(res.response.data.message);
          setLoader(false);
        });
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  const formRequestOtp = async (e) => {
    e.preventDefault();
    // setCount(5);
    // localStorage.setItem("startCount", 1);
    localStorage.setItem("currentCount", 30);
    setCount(localStorage.getItem("currentCount"));
    setButtonUlangOtp(false);
    funPercobaan();
    // var codeLogin = [
    //   "login1",
    //   "login2",
    //   "login3",
    //   "login4",
    //   "login5",
    //   "login6",
    //   "login7",
    // ];
    // setCodeLogin(codeLogin);
    // var keyCodeLogin = codeLogin[Math.floor(Math.random() * codeLogin.length)];
    // localStorage.setItem("loggedIn", keyCodeLogin);
  };

  if (!localStorage.getItem("phone") || !localStorage.getItem("numberCode")) {
    return <Navigate to="/login" replace />;
  }
  var showCount;
  if (currentCount < 9) {
    showCount = "0" + currentCount;
  } else {
    showCount = currentCount;
  }

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/" className="btn nav-back-arrow">
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

            <form
              onSubmit={(e) => formSubmitOtp(e)}
              action=""
              className="form-top-login"
            >
              <label htmlFor="">OTP </label>
              <div className="d-flex align-content-center">
                <input
                  type="number"
                  maxLength="6"
                  className="otp form-control form-layanan"
                  placeholder="######"
                  onChange={(e) => setCodeOtp(e.target.value)}
                  value={codeOtp}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
                <div className="times-otp">
                  <FaPhone />
                  <span className="m-0">00:{showCount}</span>
                </div>
              </div>
              <button
                onClick={(e) => formRequestOtp(e)}
                disabled={!buttonUlangOtp}
                className="dd-dw"
              >
                Kirim ulang kode OTP
              </button>
              <div className="form-group mt-3">
                <button
                  type="submit"
                  className="btn btn-layanan w-100"
                  disabled={loader}
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

export default ContentOtpPage;
