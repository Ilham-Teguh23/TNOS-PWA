/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { Form, Spinner } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import garis_2 from "../../assets/images/garis-2.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBadanHukumByIdAction,
  paymentBadanHukumAction,
} from "../../redux/slices/badan-hukum/BadanHukumSlices";
import { useFormik } from "formik";
import { useState } from "react";
import { Skeleton } from "@mui/material";

function DetailBadanHukumLainnyaMobile() {
  const [preview, setPreview] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();
  const storeData = useSelector((store) => store?.badanHukum);
  const { loading, badanHukumList } = storeData;

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
            window.location = `${process.env.REACT_APP_API_INVOICE_URL}${payload?.order?.invoice_id}`;
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
              onClick={() =>
                (window.location = `${process.env.REACT_APP_API_INVOICE_URL}${badanHukumList?.invoice_id}`)
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
              <Link to="/badan-usaha-lainnya-m" className="btn nav-back-arrow">
                <FaArrowLeft className="hhagwd" />
                <h5 className="title-kasnadkw">Detail Pembayaran Lainnya</h5>
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
              <Link to="/badan-usaha-lainnya-m" className="btn nav-back-arrow">
                <FaArrowLeft className="hhagwd" />
                <h5 className="title-kasnadkw">Detail Legalitas Lainnya</h5>
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
                  <label htmlFor="phone">Name </label>
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
                <div className="form-group mb-2">
                  <label htmlFor="needs">Keperluan</label>
                  <textarea
                    defaultValue={badanHukumList?.needs}
                    name=""
                    id=""
                    className={`form-control form-layanan`}
                    cols="10"
                    rows="5"
                    readOnly
                  ></textarea>
                </div>
                {badanHukumList?.file_document ? (
                  <>
                    <Form.Group className="mb-2">
                      <div htmlFor="ktp">Dokumen Pendukung</div>
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
                  </>
                ) : (
                  ""
                )}

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
      )}
    </Fragment>
  );
}

export default DetailBadanHukumLainnyaMobile;
