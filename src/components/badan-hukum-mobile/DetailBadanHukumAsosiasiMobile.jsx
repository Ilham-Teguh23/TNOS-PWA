/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Form, Spinner } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import garis_2 from "../../assets/images/garis-2.png";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBadanHukumByIdAction,
  paymentBadanHukumAction,
} from "../../redux/slices/badan-hukum/BadanHukumSlices";
import { useFormik } from "formik";
import SelectDetail from "../utils/SelectDetail";

function DetailBadanHukumAsosiasiMobile() {
  const { t } = useTranslation();

  const [preview, setPreview] = useState(false);

  const params = useParams();

  const dispatch = useDispatch();
  const storeData = useSelector((store) => store?.badanHukum);
  const { loading, badanHukumList } = storeData;
  const alamat =
    badanHukumList?.alamat_badan_hukum &&
    JSON.parse(badanHukumList?.alamat_badan_hukum);
  const provinsi = alamat?.provinsi;
  const kabupaten = alamat?.kabupaten;
  const kecamatan = alamat?.kecamatan;
  const kelurahan = alamat?.kelurahan;
  const kode_pos = alamat?.kode_pos;
  const detail_alamat = alamat?.detail_alamat;

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("data")) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(fetchBadanHukumByIdAction(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      order_id: params.id,
    },
    onSubmit: (values) => {
      dispatch(paymentBadanHukumAction(values))
        .then(({ payload }) => {
          if (payload?.success === true) {
            navigate(`/iframe/pembayaran/${payload?.order?.invoice_id}`);
            // window.location = `${process.env.REACT_APP_API_INVOICE_URL}${payload?.order?.invoice_id}`;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const renderButton = () => {
    if (badanHukumList?.payment_status === "ORDER") {
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
    } else if (badanHukumList?.payment_status === "UNPAID") {
      return (
        <Fragment>
          {!loading ? (
            <button
              className="btn btn-primary btn-sm"
              type="button"
              onClick={
                () =>
                  navigate(`/iframe/pembayaran/${badanHukumList?.invoice_id}`)
                // (window.location = `${process.env.REACT_APP_API_INVOICE_URL}${badanHukumList?.invoice_id}`)
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
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/badan-usaha-asosiasi-m" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw">Detail Badan Usaha Asosiasi</h5>
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
                <label htmlFor="phone">Name</label>
                <input
                  name="phone"
                  type="text"
                  className={`form-control form-layanan`}
                  value={badanHukumList?.name}
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="text"
                  className={`form-control form-layanan`}
                  value={badanHukumList?.email}
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="phone">Phone</label>
                <input
                  name="phone"
                  type="text"
                  className={`form-control form-layanan`}
                  value={badanHukumList?.phone}
                  readOnly
                />
              </div>
              <Form.Group className="mb-2">
                <div htmlFor="ktp">{t("f_ktp_all_pt")}</div>
                {}
              </Form.Group>
              <div className="uploaded-files-list mb-2">
                <Fragment>
                  <div className="row">
                    {badanHukumList?.file_document &&
                      JSON.parse(badanHukumList?.file_document)?.map(
                        (file, key) => (
                          <div key={key} className="col-lg-6 mb-2">
                            {preview ? (
                              <div>
                                <img
                                  className="w-100"
                                  src={file.image_url}
                                  alt={file.image_name}
                                />
                              </div>
                            ) : (
                              <div>{file.image_name}</div>
                            )}
                          </div>
                        )
                      )}
                    {badanHukumList?.file_document && (
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            if (preview) {
                              setPreview(false);
                            } else {
                              setPreview(true);
                            }
                          }}
                          className="btn btn-primary btn-sm"
                        >
                          {preview ? "tutup preview" : "tampil preview"}
                        </button>
                      </div>
                    )}
                  </div>
                </Fragment>
              </div>

              {badanHukumList?.name_badan_hukum &&
                JSON.parse(badanHukumList?.name_badan_hukum).map((row, key) => {
                  return (
                    <div key={key} className="form-group mb-2">
                      <label htmlFor="name">Name opsi {key + 1}</label>
                      <input
                        name="name"
                        type="text"
                        className={`form-control form-layanan`}
                        value={row.opsi}
                        readOnly
                      />
                    </div>
                  );
                })}
              <div className="form-group mb-2">
                <label htmlFor="susunan_direksi">Susunan Pengurus</label>
                <textarea
                  name="susunan_direksi"
                  id="susunan_direksi"
                  cols="10"
                  rows="5"
                  className={`form-control form-layanan`}
                  defaultValue={badanHukumList?.susunan_direksi}
                  readOnly
                ></textarea>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="bidang">
                  {t("f_bidang_pt")}{" "}
                  <a
                    href="https://oss.go.id/informasi/kbli-berbasis-risiko"
                    target="_blank"
                  >
                    https://oss.go.id/informasi/kbli-berbasis-risiko
                  </a>
                  )
                </label>
                <textarea
                  name="bidang"
                  id="bidang"
                  cols="10"
                  rows="5"
                  className={`form-control form-layanan`}
                  defaultValue={badanHukumList?.bidang_usaha}
                  readOnly
                ></textarea>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">Email PT & Password</label>
                <input
                  name="email"
                  type="text"
                  className={`form-control form-layanan `}
                  value={badanHukumList?.email_badan_hukum}
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="no_penanggung_jawab">{t("f_nomer_pt")}</label>
                <input
                  name="no_penanggung_jawab"
                  type="number"
                  className={`form-control form-layanan`}
                  value={badanHukumList?.phone_badan_hukum}
                  readOnly
                />
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group mb-2">
                    <label htmlFor="provinsi">*Provinsi</label>
                    <SelectDetail data={provinsi} id="kelurahan" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group mb-2">
                    <label htmlFor="kabupaten">*Kabupaten/Kota</label>
                    <SelectDetail data={kabupaten} id="kelurahan" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group mb-2">
                    <label htmlFor="kecamatan">*Kecamatan</label>
                    <SelectDetail data={kecamatan} id="kelurahan" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group mb-2">
                    <label htmlFor="kelurahan">*kelurahan</label>
                    <SelectDetail data={kelurahan} id="kelurahan" />
                  </div>
                </div>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="kode_pos">*Kode Pos</label>
                <input
                  name="no_penanggung_jawab"
                  type="text"
                  value={kode_pos}
                  className={`form-control form-layanan`}
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="detail_alamat">*Detail Alamat</label>
                <textarea
                  name="detail_alamat"
                  id="detail_alamat"
                  cols="10"
                  rows="5"
                  defaultValue={detail_alamat}
                  className={`form-control form-layanan`}
                  readOnly
                ></textarea>
              </div>
              <img src={garis_2} alt="" className="w-100" />
              <div className="d-flex justify-content-between align-items-center">
                <div className="detail-harga">
                  <h5 className="title-layanan-kkd">
                    Total Pembayaran : Rp. {badanHukumList?.order_total}
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

export default DetailBadanHukumAsosiasiMobile;
