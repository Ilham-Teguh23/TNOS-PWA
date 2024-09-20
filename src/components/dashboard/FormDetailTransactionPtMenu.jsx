/* eslint-disable react/jsx-no-target-blank */
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
import { useTranslation } from "react-i18next";

function FormDetailTransactionPtMenu() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name_badan_hukum, setName_badan_hukum] = useState("");
  const [modal_dasar, setModal_dasar] = useState("");
  const [modal_disetor, setModal_disetor] = useState("");
  const [alamat_badan_hukum, setAlamat_badan_hukum] = useState("");
  const [pemegang_saham, setPemegang_saham] = useState("");
  const [susunan_direksi, setSusunan_direksi] = useState("");
  const [bidang_usaha, setBidang_usaha] = useState("");
  const [email_badan_hukum, setEmail_badan_hukum] = useState("");
  const [phone_badan_hukum, setPhone_badan_hukum] = useState("");
  const [klasifikasi, setKlasifikasi] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [preview, setPreview] = useState(false);
  const [order_total, setorder_total] = useState(0);
  const [payment_status, setPayment_status] = useState("");
  const [invoice_id, setInvoice_id] = useState("");

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
    // console.log(params.id);
    setLoader(true);
    const url = `${process.env.REACT_APP_API_PWA}/badan-hukum-pt/get-detail-order/${params.id}`;
    // const url = `http://127.0.0.1:8000/api/badan-hukum-pt/get-detail-order/${params.id}`;
    await axios
      .get(url)
      .then((res) => {
        // console.log(res.data.detail);

        setUploadedFiles(JSON.parse(res.data.detail.file_document));
        setName_badan_hukum(res.data.detail.name_badan_hukum);
        setModal_dasar(res.data.detail.modal_dasar);
        setModal_disetor(res.data.detail.modal_disetor);
        setAlamat_badan_hukum(res.data.detail.alamat_badan_hukum);
        setPemegang_saham(res.data.detail.pemegang_saham);
        setSusunan_direksi(res.data.detail.susunan_direksi);
        setBidang_usaha(res.data.detail.bidang_usaha);
        setEmail_badan_hukum(res.data.detail.email_badan_hukum);
        setPhone_badan_hukum(res.data.detail.phone_badan_hukum);
        setorder_total(res.data.detail.order_total);
        setKlasifikasi(res.data.detail.klasifikasi);
        setName(res.data.detail.name);
        setEmail(res.data.detail.email);
        setPhone(res.data.detail.phone);
        setPayment_status(res.data.detail.payment_status);
        setInvoice_id(res.data.detail.invoice_id);
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
      const url = `${process.env.REACT_APP_API_PWA}/badan-hukum-pt/in-payment`;
      // const url = "http://127.0.0.1:8000/api/badan-hukum-pt/in-payment";
      await axios
        .post(url, data)
        .then((res) => {
          setLoader(false);
          // console.log(res);
          window.location = `${process.env.REACT_APP_API_INVOICE_URL}${res.data.order.invoice_id}`;
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

  const renderKlasifikasi = () => {
    if (klasifikasi === "1") {
      return "SUPER PLATINUM";
    } else if (klasifikasi === "2") {
      return "PLATINUM";
    } else if (klasifikasi === "3") {
      return "SILVER";
    } else {
      return "ada yang salah";
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
          {loader ? <Spinner animation="border" size="sm" /> : "Bayar Sekarang"}
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
              <h5 className="title-kasnadkw">{t("detail_badan_hukum_pt")}</h5>
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
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  type="text"
                  className={`form-control form-layanan`}
                  value={name}
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="text"
                  className={`form-control form-layanan`}
                  value={email}
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="phone">Phone</label>
                <input
                  name="phone"
                  type="text"
                  className={`form-control form-layanan`}
                  value={phone}
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
                    {uploadedFiles &&
                      uploadedFiles?.map((file, key) => (
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
                      ))}
                    {uploadedFiles.length > 0 ? (
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
                          className="btn btn-primary"
                        >
                          {preview ? "tutup preview" : "tampil preview"}
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </Fragment>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="klasifikasi">{t("clasification_pt")}</label>
                <input
                  name="klasifikasi"
                  type="text"
                  className={`form-control form-layanan`}
                  value={renderKlasifikasi()}
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="name_badan_hukum">{t("f_name_pt")}</label>
                <textarea
                  name="name_badan_hukum"
                  id="name_badan_hukum"
                  cols="10"
                  rows="5"
                  className={`form-control form-layanan`}
                  defaultValue={name_badan_hukum}
                  readOnly
                ></textarea>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="modal_dasar">{t("f_modal_pt")}</label>
                <input
                  name="modal_dasar"
                  type="number"
                  className={`form-control form-layanan`}
                  value={modal_dasar}
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="modal_disetor">{t("f_disetor_pt")}</label>
                <input
                  name="modal_disetor"
                  type="number"
                  className={`form-control form-layanan`}
                  value={modal_disetor}
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="alamat_badan_hukum">{t("f_alamat_pt")}</label>
                <textarea
                  name="alamat_badan_hukum"
                  id="alamat_badan_hukum"
                  cols="10"
                  rows="5"
                  className={`form-control form-layanan`}
                  defaultValue={alamat_badan_hukum}
                  readOnly
                ></textarea>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="pemegang_saham">{t("f_saham_pt")}</label>
                <textarea
                  name="pemegang_saham"
                  id="pemegang_saham"
                  cols="10"
                  rows="5"
                  className={`form-control form-layanan`}
                  defaultValue={pemegang_saham}
                  readOnly
                ></textarea>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="susunan_direksi">{t("f_direksi_pt")}</label>
                <textarea
                  name="susunan_direksi"
                  id="susunan_direksi"
                  cols="10"
                  rows="5"
                  className={`form-control form-layanan`}
                  defaultValue={susunan_direksi}
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
                  defaultValue={bidang_usaha}
                  readOnly
                ></textarea>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">Email PT & Password</label>
                <input
                  name="email"
                  type="text"
                  className={`form-control form-layanan `}
                  value={email_badan_hukum}
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="no_penanggung_jawab">{t("f_nomer_pt")}</label>
                <input
                  name="no_penanggung_jawab"
                  type="number"
                  className={`form-control form-layanan`}
                  value={phone_badan_hukum}
                  readOnly
                />
              </div>
              <img src={garis_2} alt="" className="w-100" />
              {/* <h5 className="title-layanan-kkd">Pilih Metode Pembayaran</h5>
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
              /> */}
              {/* <img src={garis_2} alt="" className="w-100" /> */}
              <div className="d-flex justify-content-between align-items-center">
                <div className="detail-harga">
                  <h5 className="title-layanan-kkd">
                    Total Pembayaran : Rp. {order_total}
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

export default FormDetailTransactionPtMenu;
