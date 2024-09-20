import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Form, Spinner } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import garis_2 from "../../assets/images/garis-2.png";

function FormDetailTransactionKonsulMenu() {
  const [needs, setNeeds] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(0);
  const [order_total, setorder_total] = useState(0);

  const params = useParams();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    getDataOrder();
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
      console.log(state);
      navigate(state.pathname, {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataOrder = async () => {
    console.log(params.id);
    setLoader(true);
    await axios
      .get(`http://127.0.0.1:8000/api/konsultasi/get-detail-order/${params.id}`)
      .then((res) => {
        console.log(res.data.detail);
        setNeeds(res.data.detail.needs);
        setName(res.data.detail.name);
        setEmail(res.data.detail.email);
        setPhone(res.data.detail.phone);
        setTime(res.data.detail.time);
        setDuration(res.data.detail.duration);
        setorder_total(res.data.detail.order_total);
        setLoader(false);
        // navigate(
        //   `${process.env.REACT_APP_API_PWA}` +
        //   res.data.order.invoice_id,
        // );
      })
      .catch((res) => {
        console.log(res);
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
        .post("http://127.0.0.1:8000/api/konsultasi/in-payment", data)
        .then((res) => {
          setLoader(false);
          console.log(res);
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
          setLoader(false);
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
            <Link
              to="/form-transaksi-konsultasi-hukum"
              className="btn nav-back-arrow"
            >
              <FaArrowLeft className="hhagwd" />
            </Link>
          </div>
          <div className="njwdjhwk">
            <h5 className="title-kasnadkw">
              Order Detail Konsultasi Hukum : {params.id}{" "}
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
                <label htmlFor="keperluan">*Keperluan Konsultasi</label>
                <textarea
                  name="keperluan"
                  id="keperluan"
                  cols="10"
                  rows="5"
                  className="form-control form-layanan"
                  readOnly
                  value={needs}
                ></textarea>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="nama">*Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={name}
                  className="form-control form-layanan"
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">*Email</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  className="form-control form-layanan"
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="no_telepon">*No. Telephone / Whats App</label>
                <input
                  type="text"
                  name="no_telepon"
                  value={phone}
                  className="form-control form-layanan"
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="waktu_konsul">*Pilih waktu konsultasi :</label>
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
              <h5 className="title-layanan-kkd">Pilih Metode Pembayaran</h5>
              <Form.Check
                type="radio"
                name="metode_pembayaran"
                label="Pembayaran Midtrans"
                id="disabled-default-1"
                defaultChecked
              />
              <Form.Check
                type="radio"
                name="metode_pembayaran"
                label="E-Voucher"
                id="disabled-default-2"
              />
              <img src={garis_2} alt="" className="w-100" />
              <div className="d-flex justify-content-between align-items-center">
                <div className="detail-harga">
                  <h5 className="title-layanan-kkd">
                    Total Pembayaran : Rp. {order_total}
                  </h5>
                </div>
                <div className="btn-detail-harga">
                  <button
                    type="submit"
                    className="btn btn-layanan"
                    disabled={loader}
                  >
                    {loader ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Bayar Sekarang"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default FormDetailTransactionKonsulMenu;
