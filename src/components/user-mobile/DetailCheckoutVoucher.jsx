import { Skeleton } from "@mui/material";
import { useFormik } from "formik";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import voucher from "../../assets/images/image-v.png";

import ButtonFixedFooter from "../utils/ButtonFixedFooter";
import TitleHeader from "../utils/TitleHeader";
import { decode as base64_decode } from "base-64";
import { useState } from "react";
import { inVoucher } from "../../redux/slices/users/UserSlices";
var CryptoJS = require("crypto-js");
const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

function DetailCheckoutVoucher() {
  TitleHeader("Checkout Voucher");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const storeData = useSelector((store) => store?.users);
  const { loading } = storeData;

  useEffect(() => {
    handleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUser = () => {
    let str = searchParams.get("query");
    var base64regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    if (!base64regex.test(str)) {
      if (!localStorage.getItem("data")) {
        console.log("salah");
        localStorage.removeItem("data");
        navigate("/login");
      }
    } else {
      let string = base64_decode(str);
      let cryptdata = string;
      const info2x = CryptoJS.AES.decrypt(cryptdata, secretKey).toString(
        CryptoJS.enc.Utf8
      );
      var data = "";
      if (!info2x) {
        console.log("salah");
      } else {
        data = JSON.parse(info2x);
        setUser(data);
        console.log(data);
        localStorage.setItem("data", JSON.stringify(data));
      }
      if (!localStorage.getItem("data")) {
        if (!data.user_id) {
          console.log("salah");
          localStorage.removeItem("data");
          navigate("/login");
        }
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    onSubmit: (values) => {
      // console.log(values);
      // values.user_id = "1001202300001";
      values.user_id = user?.user_id;
      values.customer = {
        // gives_name: "Dicki Prasetya",
        // email: "coba@gmail.com",
        // mobile_number: "081389003413",
        gives_name: user?.name,
        email: user?.email ? user?.email : "coba@gmail.com",
        mobile_number: user?.phone ? user?.phone : "081389003413",
      };

      values.description = {
        title: "Voucher",
        description: "Voucher",
        status_poin: "Voucher",
      };

      console.log(values);

      dispatch(inVoucher(values))
        .then(({ payload }) => {
          if (payload?.success === true) {
            // window.location = `${process.env.REACT_APP_API_INVOICE_URL}${payload?.order?.invoice_id}`;
            navigate(`/iframe/pembayaran/${payload?.order?.invoice_id}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          {/* <div className="nav-top-login">
            <Link to="/tnos-gems" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw">Checkout Poin</h5>
            </Link>
          </div> */}
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
          <div className="njwdjhwk" style={{ padding: "20px 20px 50px 20px" }}>
            {loading ? (
              <>
                <div className="kyhhdg">
                  <div className="img-dafgegh">
                    <img src={voucher} alt="" className="fawfawgwa" />
                  </div>
                  {/* <div className="jdwij">Voucher Konsultasi Video Call</div> */}
                </div>
                <div className="mkmdwadbh">
                  <table className="w-100">
                    <thead>
                      <tr>
                        <td>
                          Keterangan{" "}
                          <span style={{ float: "right", marginRight: "10px" }}>
                            :
                          </span>
                        </td>
                        <th>
                          {" "}
                          <Skeleton width="100px" height={22} />
                        </th>
                      </tr>
                      <tr>
                        <td>
                          Jumlah Poin
                          <span style={{ float: "right", marginRight: "10px" }}>
                            :
                          </span>
                        </td>
                        <th>
                          {" "}
                          <Skeleton width="30px" height={22} />
                        </th>
                      </tr>
                      <tr>
                        <td>
                          Harga
                          <span style={{ float: "right", marginRight: "10px" }}>
                            :
                          </span>
                        </td>
                        <th>
                          <Skeleton width="80px" height={22} />
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </>
            ) : (
              <>
                <div className="kyhhdg">
                  <div className="img-dafgegh">
                    <img src={voucher} alt="" className="fawfawgwa" />
                  </div>
                  {/* <div className="jdwij">Voucher Konsultasi Video Call</div> */}
                </div>
                <div className="mkmdwadbh">
                  <table className="w-100">
                    <thead>
                      <tr>
                        <td>
                          Keterangan{" "}
                          <span style={{ float: "right", marginRight: "10px" }}>
                            :
                          </span>
                        </td>
                        <th>Pembelian Voucher</th>
                      </tr>
                      <tr>
                        <td>
                          Jumlah Voucher
                          <span style={{ float: "right", marginRight: "10px" }}>
                            :
                          </span>
                        </td>
                        <th>1</th>
                      </tr>
                      <tr>
                        <td>
                          Total Pembayaran
                          <span style={{ float: "right", marginRight: "10px" }}>
                            :
                          </span>
                        </td>
                        <th>Rp {parseInt(400000).toLocaleString()}</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="mkmdwadbh">
                  <div className="djwjdiifwh">
                    <b>Syarat dan Ketentuan</b>
                    <br />
                    <ul>
                      <li>Durasi tidak terbatas.</li>
                      <li>
                        Jika terputus sebelum durasi 1(satu) jam Anda
                        berkesempatan untuk menyambungkan kembali sebanyak{" "}
                        3(tiga) kali.
                      </li>
                      <li>
                        Hanya bisa digunakan dalam 1(satu) periode Konsultasi.
                      </li>
                      <li>
                        Voucher hanya dapat digunakan dalam masa periode
                        <br />
                        program sampai dengan 31 Desember 2024.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mkmdwadbh">
                  <div className="djwjdiifwh">
                    Dengan Melakukan pembayaran, Anda setuju dengan syarat dan
                    ketentuan.
                  </div>
                </div>
              </>
            )}

            <form onSubmit={formik.handleSubmit}>
              <ButtonFixedFooter
                loading={loading}
                button={`Bayar Sekarang Rp ${parseInt(
                  400000
                ).toLocaleString()}`}
                cssCustom="btn-dwajdj layanan"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DetailCheckoutVoucher;
