import React from "react";
import { Fragment } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import garis_2 from "../../assets/images/garis-2.png";
import { Form, Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function FormTransactionDetailPendampinganMenu() {
  const [needs, setNeeds] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(0);
  const [order_total, setorder_total] = useState(0);
  const [location, setLocation] = useState("");
  const [payment_status, setPayment_status] = useState("");
  const [loader, setLoader] = useState(false);
  const params = useParams();

  useEffect(() => {
    getDataOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataOrder = async () => {
    console.log(params.id);
    setLoader(true);
    await axios
      .get(
        `http://127.0.0.1:8000/api/pendampingan/get-detail-order/${params.id}`
      )
      .then((res) => {
        setLoader(false);
        setNeeds(res.data.detail.needs);
        setName(res.data.detail.name);
        setEmail(res.data.detail.email);
        setPhone(res.data.detail.phone);
        setTime(res.data.detail.time);
        setDuration(res.data.detail.duration);
        setorder_total(res.data.detail.order_total);
        setLocation(res.data.detail.location);
        setPayment_status(res.data.detail.payment_status);
        // navigate(
        //   `${process.env.REACT_APP_API_PWA}` +
        //   res.data.order.invoice_id,
        // );
      })
      .catch((res) => {
        setLoader(true);
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
        console.log(res.response.data.message);
      });
  };
  const onSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      const data = {
        order_id: params.id,
      };
      setLoader(true);
      await axios
        .post("http://127.0.0.1:8000/api/pendampingan/in-payment", data)
        .then((res) => {
          setLoader(false);
          // console.log(res);
          // window.open(
          //   "${process.env.REACT_APP_API_PWA}" +
          //     res.data.order.invoice_id,
          //   "_blank"
          // );

          // navigate(
          //   `${process.env.REACT_APP_API_PWA}` +
          //   res.data.order.invoice_id,
          // );
        })
        .catch((res) => {
          setLoader(false);
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

          // console.log(res);
        });
    } catch (error) {
      // console.log(error);
      toast.error(error.respon.data.message ? error.respon.data.message : "", {
        position: "bottom-right",
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
  };

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/dashboard" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
            </Link>
          </div>
          <div className="njwdjhwk">
            <h5 className="title-kasnadkw">
              Order Detail Pendampingan hukum : {params.id}{" "}
            </h5>
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
            <form onSubmit={(e) => onSubmitOrder(e)}>
              <div className="form-group mb-2">
                <label htmlFor="keperluan">*Keperluan pendampingan hukum</label>
                <textarea
                  name="keperluan"
                  id="keperluan"
                  cols="10"
                  rows="5"
                  className="form-control form-layanan"
                  value={needs}
                  readOnly
                ></textarea>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="name">*Nama</label>
                <input
                  type="text"
                  name="name"
                  className="form-control form-layanan"
                  readOnly
                  value={name}
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">*Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control form-layanan"
                  readOnly
                  value={email}
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="no_telepon">*No. Telephone / Whats App</label>
                <input
                  type="text"
                  name="no_telepon"
                  className="form-control form-layanan"
                  value={phone}
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="alamat">
                  *Masukan alamat titik temu pendampingan hukum
                </label>
                <textarea
                  name="keperluan"
                  id="alamat"
                  cols="10"
                  rows="5"
                  className="form-control form-layanan"
                  value={location}
                  readOnly
                ></textarea>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="waktu_konsul">
                  *Pilih waktu pendampingan :
                </label>
                <input
                  type="text"
                  name="waktu_konsul"
                  value={time}
                  className="form-control form-layanan"
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="durasi">*Durasi :</label>
                <input
                  type="text"
                  name="durasi"
                  value={duration}
                  className="form-control form-layanan"
                  readOnly
                />
              </div>
              <img src={garis_2} alt="" className="w-100" />
              <h5 className="title-layanan-kkd">Masukan Voucher</h5>
              <Form.Check
                type="radio"
                name="metode_pembayaran"
                label="E-Voucher"
                id="disabled-default-2"
              />
              <div className="d-flex justify-content-between align-items-center">
                <div className="detail-harga">
                  <h5 className="title-layanan-kkd">
                    Total Pembayaran : Rp. {order_total}
                  </h5>
                </div>
                <div className="btn-detail-harga">
                  {payment_status !== "Unpaid" ? (
                    <button
                      type="submit"
                      className="btn btn-success btn-sm"
                      disabled={loader}
                    >
                      {loader ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Sudah Dibayar"
                      )}
                    </button>
                  ) : (
                    <button
                      className="btn btn-layanan btn-block "
                      type="submit"
                      disabled={loader}
                    >
                      {loader ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Bayar Sekarang"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default FormTransactionDetailPendampinganMenu;
