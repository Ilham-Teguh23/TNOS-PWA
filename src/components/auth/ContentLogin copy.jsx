import axios from "axios";
import React, { Fragment } from "react";
import { FaWindowClose } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import MenuLogin from "./MenuLogin";
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
import crypto from "crypto-js";
import Loader from "../cummon/Loader";

function ContentLogin() {
  const [phone, setPhone] = useState("");
  const [keyCaptcha, setKeyCaptcha] = useState("");
  const [timezone, setTimezone] = useState("");
  const [numberTrue, setNumberTrue] = useState(false);

  // const [loading, setLoading] = useState(true);

  // coba
  const encryptKey = "TNOS-wfWE@#%$rfdsefgdsf";
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

    const data = { id: 1, role: 2 };
    // percobaan
    var ciphertext = crypto.AES.encrypt(
      JSON.stringify(data),
      encryptKey
    ).toString();
    var bytes = crypto.AES.decrypt(ciphertext, encryptKey);
    var originalText = JSON.parse(bytes.toString(crypto.enc.Utf8));
    console.log("encrypt: " + ciphertext);
    console.log("ori: " + JSON.stringify(originalText));

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
        // let token_arr = [
        //   "tG7B/pyPW0H/ARi.EMqBQwrS$9fHv9",
        //   "V5fnr7nuGp4.OpTmAMHMI/YjHG1/4s",
        //   "P/42VLSzsx/FENsyinKds0s0O/V40h",
        //   "KmM$/O2GdD6SG/GuW/LBvQszI/VDWw",
        //   "1uV/nOvjkpTr/LzxrgS.G.HaVFG0Jd",
        //   "z8$b2RJAl/oFNf7Iw/M$qXyrX.EaPv",
        //   "4n1rxAB$b2W/S.EwOi4RkcbQ/Pjtf4",
        //   "MjGgCA/OMkLhB$jVX4YpbV3WBSR/n7",
        //   "cj/RS1/PcoqyUKUq.$CFwBdI/GX/rw",
        //   "A7tz8z.rq5/4O/aKOxC4Ycm$xoNdEW",
        // ];
        // let firstId = makeToken(20);
        // let lastId = makeToken(20);
        // let tokenKey = token_arr[Math.floor(Math.random() * 10)];
        // let cipherBasic = "LYRAPP " + firstId + ":" + tokenKey + ":" + lastId;
        // console.log(cipherBasic)
        // console.log("firstId: " + firstId);
        // console.log("lastId: " + lastId);
        // console.log("token key: " + tokenKey);
        try {
          const urlLaravel = "http://127.0.0.1:8000/api/send-otp";

          const dataLaravel = {
            nomor: phone,
            timezone: timezone,
          };

          axios
            .post(urlLaravel, dataLaravel)
            .then((res) => {
              if (res.data.message !== "OTP sudah dikirim") {
                console.log("gagal");
              } else {
                // console.log("berhasil");
                console.log(res.data.response.statusCode);
                if (res.data.response.statusCode != 2000) {
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
                  //       // alert("dad");
                } else {
                  setNumberTrue(true);
                  localStorage.setItem("phone", res.data.nomor);
                  localStorage.setItem("authKey", res.data.token);
                  localStorage.setItem(
                    "numberCode",
                    res.data.response.data.mmbr_code
                  );
                }
                // const url = "https://api-dev.tnos.world/member/auth/phone";
                // const data = JSON.stringify({
                //   phone: phone,
                //   method: "0",
                //   timezone: timezone,
                // });

                // axios
                //   .post(url, data, {
                //     headers: {
                //       Authorization: `Basic ${cipherBasic}`,
                //       "Content-Type": "application/json",
                //     },
                //   })
                //   .then((res) => {
                //     // console.log(res);
                //     // eslint-disable-next-line eqeqeq
                //     if (res.data.statusCode == 4004) {
                //       // toast("Maaf no yang kamu masukan belum terdaftar");
                //       toast.error("Maaf no yang kamu masukan belum terdaftar", {
                //         position: "top-right",
                //         autoClose: 5000,
                //         hideProgressBar: false,
                //         closeOnClick: true,
                //         pauseOnHover: true,
                //         draggable: true,
                //         progress: undefined,
                //         theme: "light",
                //       });
                //       // alert("dad");
                //     } else {
                //       // console.log(authKey);
                //       // setNumberCode(res.data.data.mmbr_code);
                //       setNumberTrue(true);
                //       // console.log(res.data.data.mmbr_code);
                //       // console.log(numberCode);

                //       localStorage.setItem("phone", phone);
                //       localStorage.setItem("authKey", `Basic ${cipherBasic}`);
                //       localStorage.setItem(
                //         "numberCode",
                //         res.data.data.mmbr_code
                //       );
                //     }
                //   })
                //   .catch((res) => {
                //     console.log(res);
                //   });
              }
            })
            .catch((res) => {
              console.log(res);
            });
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
      }
    }
  };

  if (numberTrue) {
    return <Navigate to="/verified-otp" replace />;
  }
  return (
    <Fragment>
      {/* {loading === true ? <Loader /> : ""} */}
      <div className="responsive-class">
        <div className="res-class">
          <MenuLogin />
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
            <form action="" className="form-top-login">
              <label htmlFor="">NO HP</label>
              <div className="d-flex align-content-center">
                <span className="d-flex">+62</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Masukan no telepon anda"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
                <div className="btn-hapus-number">
                  <FaWindowClose />
                </div>
              </div>
              <Link href="#" className="btn-not-active">
                No. telephone saya sudah tidak aktif
              </Link>
              <hr />
              <div className="col-6 ">
                <LoadCanvasTemplate />
                <input
                  placeholder="Enter Captcha Value"
                  onChange={(e) => setKeyCaptcha(e.target.value)}
                  value={keyCaptcha}
                  type="text"
                  className="form-control"
                ></input>
                <p className="text-danger">Kode captcha wajib</p>
              </div>
              <hr />
              <div className="text-center">
                <button
                  onClick={(e) => submitNomor(e)}
                  className="btn btn-submit-login"
                >
                  Lanjut
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ContentLogin;
