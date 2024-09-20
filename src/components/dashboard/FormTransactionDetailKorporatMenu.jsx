import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import garis_2 from "../../assets/images/garis-2.png";
import { Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function FormTransactionDetailKorporatMenu() {
  const { t } = useTranslation();
  const [needs, setNeeds] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(0);
  const [guard, setGuard] = useState(0);
  const [order_total, setorder_total] = useState(0);
  const [location, setLocation] = useState("");
  const [payment_status, setPayment_status] = useState("");
  const [loader, setLoader] = useState(false);
  const [invoice_id, setInvoice_id] = useState("");
  const params = useParams();
  // var user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getDataOrder();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataOrder = async () => {
    // console.log(params.id);
    const url = `${process.env.REACT_APP_API_PWA}/pengamanan-korporat/get-detail-order/${params.id}`;
    await axios
      .get(url)
      .then((res) => {
        setNeeds(res.data.detail.needs);
        setName(res.data.detail.name);
        setEmail(res.data.detail.email);
        setPhone(res.data.detail.phone);
        setTime(res.data.detail.time);
        setDuration(res.data.detail.duration);
        setGuard(res.data.detail.jml_personil);
        setorder_total(res.data.detail.order_total);
        setLocation(res.data.detail.location);
        setInvoice_id(res.data.detail.invoice_id);
        setPayment_status(res.data.detail.payment_status);
        // console.log(res.data.detail.payment_status);
        // navigate(
        //   `${process.env.REACT_APP_API_PWA}` +
        //   res.data.order.invoice_id,
        // );
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
      const url = `${process.env.REACT_APP_API_PWA}/pengamanan-korporat/in-payment`;
      await axios
        .post(url, data)
        .then((res) => {
          setLoader(false);
          // console.log(res);
          // window.location = `https://checkout.xendit.co/web/${res.data.order.invoice_id}`;
          window.location = `${process.env.REACT_APP_API_INVOICE_URL}${res.data.order.invoice_id}`;

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

  const renderButton = () => {
    if (payment_status === "ORDER") {
      return (
        <button
          className="btn btn-layanan btn-block "
          type="submit"
          disabled={loader}
        >
          {loader ? (
            <Spinner animation="border" size="sm" />
          ) : (
            t("bayar_sekarang")
          )}
        </button>
      );
    } else if (payment_status === "UNPAID") {
      return (
        <button
          type="button"
          className="btn btn-primary btn-sm"
          disabled={loader}
          onClick={() =>
            (window.location = `${process.env.REACT_APP_API_INVOICE_URL}${invoice_id}`)
          }
        >
          {loader ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Klik untuk membayar"
          )}
        </button>
      );
    } else {
      return (
        <button type="button" className="btn btn-success btn-sm">
          Sudah Dibayar
        </button>
      );
    }
  };

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/dashboard" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw">{t("detail_k")}</h5>
            </Link>
          </div>
          <div className="njwdjhwk">
            <h5 className="title-kasnadkw">Order Id: {params.id} </h5>
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
                <label htmlFor="keperluan">{t("keperluan_k")}</label>
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
                <label htmlFor="name">{t("name")}</label>
                <input
                  type="text"
                  name="name"
                  className="form-control form-layanan"
                  readOnly
                  value={name}
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control form-layanan"
                  readOnly
                  value={email}
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="no_telepon">{t("telepon_k")}</label>
                <input
                  type="text"
                  name="no_telepon"
                  className="form-control form-layanan"
                  value={phone}
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="alamat">{t("alamat_k")}</label>
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
                <label htmlFor="waktu_konsul">{t("waktu_k")}:</label>
                <input
                  type="text"
                  name="waktu_konsul"
                  value={time}
                  className="form-control form-layanan"
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="durasi">{t("durasi_k")}:</label>
                <input
                  type="text"
                  name="durasi"
                  value={duration}
                  className="form-control form-layanan"
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="durasi">{t("jumlah_k")}:</label>
                <input
                  type="text"
                  name="durasi"
                  value={guard}
                  className="form-control form-layanan"
                  readOnly
                />
              </div>

              <img src={garis_2} alt="" className="w-100" />
              {/* <h5 className="title-layanan-kkd">Masukan Voucher</h5>
              <Form.Check
                type="radio"
                name="metode_pembayaran"
                label="E-Voucher"
                id="disabled-default-2"
              /> */}
              <div className="d-flex justify-content-between align-items-center">
                <div className="detail-harga">
                  <h5 className="title-layanan-kkd">
                    {t("total_pembayaran")} : Rp. {order_total}
                  </h5>
                </div>
                <div className="btn-detail-harga">{renderButton()}</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default FormTransactionDetailKorporatMenu;
