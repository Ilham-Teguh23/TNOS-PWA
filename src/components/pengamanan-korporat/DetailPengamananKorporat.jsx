import React from "react";
import { Fragment } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import garis_2 from "../../assets/images/garis-2.png";
import { Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  fetchKorporatByIdAction,
  paymentKorporatAction,
} from "../../redux/slices/pengamanan-korporat/KorporatSlices";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Skeleton } from "@mui/material";
import TitleHeader from "../utils/TitleHeader";
import MenuFooter from "../../components/cummon/MenuFooter";

function DetailPengamananKorporat() {
  TitleHeader("Detail Pengamanan Usaha dan Bisnis");
  const { t } = useTranslation();

  const params = useParams();
  // var user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const storeData = useSelector((store) => store?.korporat);
  const { loading, korporatList } = storeData;

  useEffect(() => {
    dispatch(fetchKorporatByIdAction(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      order_id: params.id,
    },
    onSubmit: (values) => {
      // console.log(values);
      dispatch(paymentKorporatAction(values))
        .then(({ payload }) => {
          if (payload?.success === true) {
            window.location = `${process.env.REACT_APP_API_INVOICE_URL}${payload?.order?.invoice_id}`;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const renderButton = () => {
    if (korporatList?.payment_status === "ORDER") {
      return (
        <Fragment>
          {!loading ? (
            <button className="btn btn-layanan btn-block " type="submit">
              Bayar Sekarang
            </button>
          ) : (
            <button
              className="btn btn-layanan btn-block "
              type="submit"
              disabled
            >
              <Spinner animation="border" size="sm" />
            </button>
          )}
        </Fragment>
      );
    } else if (korporatList?.payment_status === "UNPAID") {
      return (
        <Fragment>
          {!loading ? (
            <button
              className="btn btn-primary btn-sm"
              type="button"
              onClick={() =>
                (window.location = `${process.env.REACT_APP_API_INVOICE_URL}${korporatList?.invoice_id}`)
              }
            >
              Klik untuk membayar
            </button>
          ) : (
            <button
              className="btn btn-layanan btn-block "
              type="submit"
              disabled
            >
              <Spinner animation="border" size="sm" />
            </button>
          )}
        </Fragment>
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
      {loading ? (
        <div className="responsive-class">
          <div className="res-class">
            <div className="nav-top-login">
              <Link to="/dashboard" className="btn nav-back-arrow">
                <FaArrowLeft className="hhagwd" />
                <h5 className="title-kasnadkw">{t("detail_k")}</h5>
              </Link>
            </div>
            <div className="njwdjhwk">
              <h5 className="title-kasnadkw">
                <Skeleton width="100%" height={22} />
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
              <form>
                <Skeleton width="100%" height={22} />
                <Skeleton width="100%" height={200} />
                <Skeleton width="100%" height={22} />
                <Skeleton width="100%" height={40} />
                <Skeleton width="100%" height={22} />
                <Skeleton width="100%" height={40} />
                <Skeleton width="100%" height={22} />
                <Skeleton width="100%" height={40} />
                <Skeleton width="100%" height={22} />
                <Skeleton width="100%" height={200} />
                <Skeleton width="100%" height={22} />
                <Skeleton width="100%" height={40} />
                <Skeleton width="100%" height={22} />
                <Skeleton width="100%" height={40} />
                <Skeleton width="100%" height={22} />
                <Skeleton width="100%" height={40} />
                <img src={garis_2} alt="" className="w-100" />
                <div className="d-flex justify-content-between align-items-center">
                  <Skeleton width="100%" height={22} />
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="responsive-class">
          <div className="res-class">
            <div className="nav-top-login">
              <Link to="/dashboard" className="btn nav-back-arrow">
                <FaArrowLeft className="hhagwd" />
                <h5 className="title-kasnadkw">
                  Detail Pengamanan Usaha dan Bisnis
                </h5>
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
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-2">
                  <label htmlFor="keperluan">{t("keperluan_k")}</label>
                  <textarea
                    name="keperluan"
                    id="keperluan"
                    cols="10"
                    rows="5"
                    className="form-control form-layanan"
                    value={korporatList?.needs}
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
                    value={korporatList?.name}
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control form-layanan"
                    readOnly
                    value={korporatList?.email}
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="no_telepon">{t("telepon_k")}</label>
                  <input
                    type="text"
                    name="no_telepon"
                    className="form-control form-layanan"
                    value={korporatList?.phone}
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
                    value={korporatList?.location}
                    readOnly
                  ></textarea>
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="waktu_konsul">{t("waktu_k")}:</label>
                  <input
                    type="text"
                    name="waktu_konsul"
                    value={korporatList?.time}
                    className="form-control form-layanan"
                    readOnly
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="durasi">{t("durasi_k")}:</label>
                  <input
                    type="text"
                    name="durasi"
                    value={korporatList?.duration}
                    className="form-control form-layanan"
                    readOnly
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="durasi">{t("jumlah_k")}:</label>
                  <input
                    type="text"
                    name="durasi"
                    value={korporatList?.jml_personil}
                    className="form-control form-layanan"
                    readOnly
                  />
                </div>

                <img src={garis_2} alt="" className="w-100" />
                <div className="d-flex justify-content-between align-items-center">
                  <div className="detail-harga">
                    <h5 className="title-layanan-kkd">
                      {t("total_pembayaran")} : Rp. {korporatList?.order_total}
                    </h5>
                  </div>
                  <div className="btn-detail-harga">{renderButton()}</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <MenuFooter footer={false} />
    </Fragment>
  );
}

export default DetailPengamananKorporat;
