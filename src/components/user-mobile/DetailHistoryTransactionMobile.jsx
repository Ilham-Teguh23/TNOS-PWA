import { Skeleton } from "@mui/material";
import axios from "axios";
import moment from "moment-timezone";
import React, { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import {
  FaClock,
  FaGripHorizontal,
  FaHackerrank,
  FaHome,
  FaIdCard,
  FaKey,
  FaLocationArrow,
  FaMoneyBill,
  FaPhone,
  FaQuestion,
  FaRegClock,
  FaTable,
  FaUserAlt,
  FaWallet,
} from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { decode as base64_decode } from "base-64";
import { useDispatch } from "react-redux";
import { paymentBadanHukumAction } from "../../redux/slices/badan-hukum/BadanHukumSlices";
import { paymentKorporatAction } from "../../redux/slices/pengamanan-korporat/KorporatSlices";
var CryptoJS = require("crypto-js");
const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

function DetailHistoryTransactionMobile() {
  const [loader, setLoader] = useState(false);
  const [layanan, setLayanan] = useState("");
  const [needs, setNeeds] = useState("");
  const [location, setLocation] = useState("");
  const [sublayanan, setSublayanan] = useState("");
  const [status_order, setStatus_order] = useState("");
  const [payment_status, setPayment_status] = useState("");
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [order_total, setOrder_total] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [preview, setPreview] = useState(false);
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
  const user = JSON.parse(localStorage.getItem("data"));

  const navigate = useNavigate();
  const [invoice_id, setInvoice_id] = useState("");

  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    handleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log();

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
        getDataOrder(data?.id);
        localStorage.setItem("data", JSON.stringify(data));
      }
      if (!localStorage.getItem("data")) {
        if (!data.id) {
          console.log("salah");
          localStorage.removeItem("data");
          navigate("/login");
        }
      }
    }
  };

  const getDataOrder = async ($id) => {
    // console.log(params.id);
    setLoader(true);
    const url = `${process.env.REACT_APP_API_PWA}/order/${$id}`;
    // const url = `http://127.0.0.1:8000/api/badan-hukum-cv/get-detail-order/${params.id}`;
    await axios
      .get(url)
      .then((res) => {
        // console.log(res.data.detail);

        setLoader(false);
        setLayanan(res.data.detail.tnos_service_id);
        setInvoice_id(
          res.data.detail.invoice_id ? res.data.detail.invoice_id : ""
        );
        setNeeds(res.data.detail.needs ? res.data.detail.needs : "");
        setLocation(res.data.detail.location ? res.data.detail.location : "");
        setSublayanan(res.data.detail.tnos_subservice_id);
        setStatus_order(
          res.data.detail.status_order ? res.data.detail.status_order : ""
        );
        setPayment_status(
          res.data.detail.payment_status ? res.data.detail.payment_status : ""
        );
        setTime(res.data.detail.time ? res.data.detail.time : "");
        setDuration(res.data.detail.duration ? res.data.detail.duration : "");
        setOrder_total(
          res.data.detail.order_total ? res.data.detail.order_total : ""
        );
        setUploadedFiles(
          res.data.detail.file_document
            ? JSON.parse(res.data.detail.file_document)
            : ""
        );
        setName_badan_hukum(
          res.data.detail.name_badan_hukum
            ? JSON.parse(res.data.detail.name_badan_hukum)
            : ""
        );
        setModal_dasar(
          res.data.detail.modal_dasar ? res.data.detail.modal_dasar : ""
        );
        setModal_disetor(
          res.data.detail.modal_disetor ? res.data.detail.modal_disetor : ""
        );
        setAlamat_badan_hukum(
          res.data.detail.alamat_badan_hukum
            ? JSON.parse(res.data.detail.alamat_badan_hukum)
            : ""
        );
        setPemegang_saham(
          res.data.detail.pemegang_saham ? res.data.detail.pemegang_saham : ""
        );
        setSusunan_direksi(
          res.data.detail.susunan_direksi ? res.data.detail.susunan_direksi : ""
        );
        setBidang_usaha(
          res.data.detail.bidang_usaha ? res.data.detail.bidang_usaha : ""
        );
        setEmail_badan_hukum(
          res.data.detail.email_badan_hukum
            ? res.data.detail.email_badan_hukum
            : ""
        );
        setPhone_badan_hukum(
          res.data.detail.phone_badan_hukum
            ? res.data.detail.phone_badan_hukum
            : ""
        );
        setKlasifikasi(
          res.data.detail.klasifikasi ? res.data.detail.klasifikasi : ""
        );
        // navigate(
        //   `${process.env.REACT_APP_API_PWA}` +
        //   res.data.order.invoice_id,
        // );
      })
      .catch((res) => {
        // console.log(res);
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
  const renderKlasifikasi = () => {
    if (klasifikasi === "1") {
      return "SUPER PLATINUM";
    } else if (klasifikasi === "2") {
      return "PLATINUM";
    } else if (klasifikasi === "2") {
      return "SILVER";
    } else {
      return "ada yang salah";
    }
  };
  // console.log(layanan);
  // console.log(sublayanan);
  var nama_layanan = "";
  var alert_css = "";
  var renderDetailLayanan = () => {
    if (layanan === "1") {
      if (sublayanan === "1") {
        nama_layanan = "Pendampingan Hukum";
      } else {
        nama_layanan = "Konsultasi Hukum";
      }
    } else if (layanan === "2") {
      if (sublayanan === "1") {
        nama_layanan = "Pengamanan Perorang";
      } else {
        nama_layanan = "Pengamanan Korporat";

        if (payment_status === "EXPIRED") {
          alert_css = "alert-danger";
        } else if (payment_status === "PAID" || payment_status === "SETTLED") {
          if (status_order === "005") {
            alert_css = "alert-info";
          } else if (status_order === "010") {
            alert_css = "alert-success";
          } else if (status_order === "011") {
            alert_css = "alert-danger";
          } else {
            alert_css = "alert-info";
          }
        } else {
          alert_css = "alert-info";
        }
        return (
          <Fragment>
            <div className={`card-status-order-ajd alert ${alert_css}`}>
              <div className="title-status-order">
                Nama Layanan: <b>{nama_layanan}</b>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="title-status-order">
                  Status Order:{" "}
                  <b>{payment_status === "EXPIRED" ? "-" : v_status_order}</b>
                </div>
              </div>
              <hr />
              {/* <div className="keterangan-dajdw">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quidem nemo perferendis minima natus asperiores, quibusdam
                    rerum accusamus blanditiis iure quam nesciunt magnam, quae
                    reiciendis minus voluptas tenetur necessitatibus similique
                    suscipit.
                  </div> */}
            </div>
            <div className="card-detail-dasak">
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaQuestion />
                </div>
                <div className="detail-layanan-dajwdc">
                  Keperluan: <b>{needs}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaLocationArrow />
                </div>
                <div className="detail-layanan-dajwdc">
                  Lokasi: <b>{location}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaClock />
                </div>
                <div className="detail-layanan-dajwdc">
                  <b>{time}</b> s/d{" "}
                  <b>
                    {" "}
                    {moment(time)
                      .add(duration, "hours")
                      .format("YYYY-MM-DD HH:mm:ss")}
                  </b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaRegClock />
                </div>
                <div className="detail-layanan-dajwdc">
                  <b>{duration} Jam </b>durasi kerja
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaWallet />
                </div>
                <div className="detail-layanan-dajwdc">
                  <b>Rp. {order_total.toLocaleString()}</b>
                </div>
              </div>
            </div>
            <div className="jdawdi-dawda">
              {loader ? (
                <button className="btn-dwajdj">Loading...</button>
              ) : payment_status === "PAID" || payment_status === "SETTLED" ? (
                <button className="btn-dwajdj paid">Sudah Dibayar</button>
              ) : invoice_id ? (
                <button
                  onClick={() => navigate(`/iframe/pembayaran/${invoice_id}`)}
                  className="btn-dwajdj bayar"
                >
                  Klik untuk membayar
                </button>
              ) : (
                <button
                  onClick={() =>
                    dispatch(
                      paymentKorporatAction({
                        order_id: localStorage.getItem("data")
                          ? JSON.parse(localStorage.getItem("data")).id
                          : null,
                      })
                    )
                      .then(({ payload }) => {
                        if (payload?.success === true) {
                          navigate(
                            `/iframe/pembayaran/${payload?.order?.invoice_id}`
                          );
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      })
                  }
                  className="btn-dwajdj bayar"
                >
                  Bayar Sekarang
                </button>
              )}
            </div>
          </Fragment>
        );
      }
    } else {
      if (sublayanan === "1") {
        nama_layanan = "Badan Hukum PT";

        if (payment_status === "EXPIRED") {
          alert_css = "alert-danger";
        } else if (payment_status === "PAID" || payment_status === "SETTLED") {
          if (status_order === "005") {
            alert_css = "alert-info";
          } else if (status_order === "010") {
            alert_css = "alert-success";
          } else if (status_order === "011") {
            alert_css = "alert-danger";
          } else {
            alert_css = "alert-info";
          }
        } else {
          alert_css = "alert-info";
        }

        return (
          <Fragment>
            <div className={`card-status-order-ajd alert ${alert_css}`}>
              <div className="title-status-order">
                Nama Layanan: <b>{nama_layanan}</b>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="title-status-order">
                  Status Order:{" "}
                  <b>{payment_status === "EXPIRED" ? "-" : v_status_order}</b>
                </div>
              </div>
              <hr />
              {/* <div className="keterangan-dajdw">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quidem nemo perferendis minima natus asperiores, quibusdam
                    rerum accusamus blanditiis iure quam nesciunt magnam, quae
                    reiciendis minus voluptas tenetur necessitatibus similique
                    suscipit.
                  </div> */}
            </div>
            <div className="card-detail-dasak">
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaHackerrank />
                </div>
                <div className="detail-layanan-dajwdc">
                  Klasifikasi: <b>{renderKlasifikasi()}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaIdCard />
                </div>
                <div className="detail-layanan-dajwdc">
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
                        <span
                          type="button"
                          onClick={() => {
                            if (preview) {
                              setPreview(false);
                            } else {
                              setPreview(true);
                            }
                          }}
                        >
                          {preview ? "tutup preview" : "tampil preview"}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaUserAlt />
                </div>
                <div className="detail-layanan-dajwdc">
                  {name_badan_hukum &&
                    name_badan_hukum?.map((row, key) => {
                      return (
                        <div key={key}>
                          Nama PT opsi {key + 1}: <b>{row.opsi}</b>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaMoneyBill />
                </div>
                <div className="detail-layanan-dajwdc">
                  Modal Dasar: Rp. <b>{modal_dasar.toLocaleString()}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaMoneyBill />
                </div>
                <div className="detail-layanan-dajwdc">
                  Modal Disetor: Rp. <b>{modal_disetor.toLocaleString()}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaLocationArrow />
                </div>
                <div className="detail-layanan-dajwdc">
                  Provinsi: <b>{alamat_badan_hukum?.provinsi?.nama}</b>
                  <br />
                  Kabupaten: <b>{alamat_badan_hukum?.kabupaten?.nama}</b>
                  <br />
                  Kecamatan: <b>{alamat_badan_hukum?.kecamatan?.nama}</b>
                  <br />
                  Kelurahan: <b>{alamat_badan_hukum?.kelurahan?.nama}</b>
                  <br />
                  Kode Pos: <b>{alamat_badan_hukum?.kode_pos}</b>
                  <br />
                  Detail Alamat: <b>{alamat_badan_hukum?.detail_alamat}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaHome />
                </div>
                <div className="detail-layanan-dajwdc">
                  Pemegang Saham: <b>{pemegang_saham}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaTable />
                </div>
                <div className="detail-layanan-dajwdc">
                  Susunan Direksi: <b>{susunan_direksi}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaGripHorizontal />
                </div>
                <div className="detail-layanan-dajwdc">
                  Bidang Usaha: <b>{bidang_usaha}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaKey />
                </div>
                <div className="detail-layanan-dajwdc">
                  Email PT & Password: <b>{email_badan_hukum}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaPhone />
                </div>
                <div className="detail-layanan-dajwdc">
                  No Telepon: <b>{phone_badan_hukum}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaWallet />
                </div>
                <div className="detail-layanan-dajwdc">
                  <b>Rp. {order_total.toLocaleString()}</b>
                </div>
              </div>
              <div className="jdawdi-dawda">
                {loader ? (
                  <button className="btn-dwajdj">Loading...</button>
                ) : payment_status === "PAID" ||
                  payment_status === "SETTLED" ? (
                  <button className="btn-dwajdj paid">Sudah Dibayar</button>
                ) : invoice_id ? (
                  <button
                    onClick={() => navigate(`/iframe/pembayaran/${invoice_id}`)}
                    className="btn-dwajdj bayar"
                  >
                    Klik untuk membayar
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      dispatch(
                        paymentBadanHukumAction({
                          order_id: localStorage.getItem("data")
                            ? JSON.parse(localStorage.getItem("data")).id
                            : null,
                        })
                      )
                        .then(({ payload }) => {
                          if (payload?.success === true) {
                            navigate(
                              `/iframe/pembayaran/${payload?.order?.invoice_id}`
                            );
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                        })
                    }
                    className="btn-dwajdj bayar"
                  >
                    Bayar Sekarang
                  </button>
                )}
              </div>
            </div>
          </Fragment>
        );
      } else if (sublayanan === "2") {
        nama_layanan = "Badan Hukum CV";

        if (payment_status === "EXPIRED") {
          alert_css = "alert-danger";
        } else if (payment_status === "PAID" || payment_status === "SETTLED") {
          if (status_order === "005") {
            alert_css = "alert-info";
          } else if (status_order === "010") {
            alert_css = "alert-success";
          } else if (status_order === "011") {
            alert_css = "alert-danger";
          } else {
            alert_css = "alert-info";
          }
        } else {
          alert_css = "alert-info";
        }

        return (
          <Fragment>
            <div className={`card-status-order-ajd alert ${alert_css}`}>
              <div className="title-status-order">
                Nama Layanan: <b>{nama_layanan}</b>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="title-status-order">
                  Status Order:{" "}
                  <b>{payment_status === "EXPIRED" ? "-" : v_status_order}</b>
                </div>
              </div>
              <hr />
              {/* <div className="keterangan-dajdw">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quidem nemo perferendis minima natus asperiores, quibusdam
                    rerum accusamus blanditiis iure quam nesciunt magnam, quae
                    reiciendis minus voluptas tenetur necessitatibus similique
                    suscipit.
                  </div> */}
            </div>
            <div className="card-detail-dasak">
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaIdCard />
                </div>
                <div className="detail-layanan-dajwdc">
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
                        <span
                          type="button"
                          onClick={() => {
                            if (preview) {
                              setPreview(false);
                            } else {
                              setPreview(true);
                            }
                          }}
                        >
                          {preview ? "tutup preview" : "tampil preview"}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaUserAlt />
                </div>
                <div className="detail-layanan-dajwdc">
                  {name_badan_hukum &&
                    name_badan_hukum?.map((row, key) => {
                      return (
                        <div key={key}>
                          Nama CV opsi {key + 1}: <b>{row.opsi}</b>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaMoneyBill />
                </div>
                <div className="detail-layanan-dajwdc">
                  Modal Dasar: Rp. <b>{modal_dasar.toLocaleString()}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaMoneyBill />
                </div>
                <div className="detail-layanan-dajwdc">
                  Modal Disetor: Rp. <b>{modal_disetor.toLocaleString()}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaLocationArrow />
                </div>
                <div className="detail-layanan-dajwdc">
                  Provinsi: <b>{alamat_badan_hukum?.provinsi?.nama}</b>
                  <br />
                  Kabupaten: <b>{alamat_badan_hukum?.kabupaten?.nama}</b>
                  <br />
                  Kecamatan: <b>{alamat_badan_hukum?.kecamatan?.nama}</b>
                  <br />
                  Kelurahan: <b>{alamat_badan_hukum?.kelurahan?.nama}</b>
                  <br />
                  Kode Pos: <b>{alamat_badan_hukum?.kode_pos}</b>
                  <br />
                  Detail Alamat: <b>{alamat_badan_hukum?.detail_alamat}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaHome />
                </div>
                <div className="detail-layanan-dajwdc">
                  Pemegang Saham: <b>{pemegang_saham}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaTable />
                </div>
                <div className="detail-layanan-dajwdc">
                  Susunan Direksi: <b>{susunan_direksi}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaGripHorizontal />
                </div>
                <div className="detail-layanan-dajwdc">
                  Bidang Usaha: <b>{bidang_usaha}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaKey />
                </div>
                <div className="detail-layanan-dajwdc">
                  Email CV & Password: <b>{email_badan_hukum}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaPhone />
                </div>
                <div className="detail-layanan-dajwdc">
                  No Telepon: <b>{phone_badan_hukum}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaWallet />
                </div>
                <div className="detail-layanan-dajwdc">
                  <b>Rp. {order_total.toLocaleString()}</b>
                </div>
              </div>
            </div>
            <div className="jdawdi-dawda">
              {loader ? (
                <button className="btn-dwajdj">Loading...</button>
              ) : payment_status === "PAID" || payment_status === "SETTLED" ? (
                <button className="btn-dwajdj paid">Sudah Dibayar</button>
              ) : invoice_id ? (
                <button
                  onClick={() => navigate(`/iframe/pembayaran/${invoice_id}`)}
                  className="btn-dwajdj bayar"
                >
                  Klik untuk membayar
                </button>
              ) : (
                <button
                  onClick={() =>
                    dispatch(
                      paymentBadanHukumAction({
                        order_id: localStorage.getItem("data")
                          ? JSON.parse(localStorage.getItem("data")).id
                          : null,
                      })
                    )
                      .then(({ payload }) => {
                        if (payload?.success === true) {
                          navigate(
                            `/iframe/pembayaran/${payload?.order?.invoice_id}`
                          );
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      })
                  }
                  className="btn-dwajdj bayar"
                >
                  Bayar Sekarang
                </button>
              )}
            </div>
          </Fragment>
        );
      } else if (sublayanan === "3") {
        nama_layanan = "Badan Hukum Yayasan";

        if (payment_status === "EXPIRED") {
          alert_css = "alert-danger";
        } else if (payment_status === "PAID" || payment_status === "SETTLED") {
          if (status_order === "005") {
            alert_css = "alert-info";
          } else if (status_order === "010") {
            alert_css = "alert-success";
          } else if (status_order === "011") {
            alert_css = "alert-danger";
          } else {
            alert_css = "alert-info";
          }
        } else {
          alert_css = "alert-info";
        }

        return (
          <Fragment>
            <div className={`card-status-order-ajd alert ${alert_css}`}>
              <div className="title-status-order">
                Nama Layanan: <b>{nama_layanan}</b>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="title-status-order">
                  Status Order:{" "}
                  <b>{payment_status === "EXPIRED" ? "-" : v_status_order}</b>
                </div>
              </div>
              <hr />
              {/* <div className="keterangan-dajdw">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quidem nemo perferendis minima natus asperiores, quibusdam
                    rerum accusamus blanditiis iure quam nesciunt magnam, quae
                    reiciendis minus voluptas tenetur necessitatibus similique
                    suscipit.
                  </div> */}
            </div>
            <div className="card-detail-dasak">
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaIdCard />
                </div>
                <div className="detail-layanan-dajwdc">
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
                        <span
                          type="button"
                          onClick={() => {
                            if (preview) {
                              setPreview(false);
                            } else {
                              setPreview(true);
                            }
                          }}
                        >
                          {preview ? "tutup preview" : "tampil preview"}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaUserAlt />
                </div>
                <div className="detail-layanan-dajwdc">
                  {name_badan_hukum &&
                    name_badan_hukum?.map((row, key) => {
                      return (
                        <div key={key}>
                          Nama CV opsi {key + 1}: <b>{row.opsi}</b>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaLocationArrow />
                </div>
                <div className="detail-layanan-dajwdc">
                  Provinsi: <b>{alamat_badan_hukum?.provinsi?.nama}</b>
                  <br />
                  Kabupaten: <b>{alamat_badan_hukum?.kabupaten?.nama}</b>
                  <br />
                  Kecamatan: <b>{alamat_badan_hukum?.kecamatan?.nama}</b>
                  <br />
                  Kelurahan: <b>{alamat_badan_hukum?.kelurahan?.nama}</b>
                  <br />
                  Kode Pos: <b>{alamat_badan_hukum?.kode_pos}</b>
                  <br />
                  Detail Alamat: <b>{alamat_badan_hukum?.detail_alamat}</b>
                </div>
              </div>

              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaTable />
                </div>
                <div className="detail-layanan-dajwdc">
                  Susunan Pengurus: <b>{susunan_direksi}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaGripHorizontal />
                </div>
                <div className="detail-layanan-dajwdc">
                  Bidang Usaha: <b>{bidang_usaha}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaKey />
                </div>
                <div className="detail-layanan-dajwdc">
                  Email CV & Password: <b>{email_badan_hukum}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaPhone />
                </div>
                <div className="detail-layanan-dajwdc">
                  No Telepon: <b>{phone_badan_hukum}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaWallet />
                </div>
                <div className="detail-layanan-dajwdc">
                  <b>Rp. {order_total.toLocaleString()}</b>
                </div>
              </div>
            </div>
            <div className="jdawdi-dawda">
              {loader ? (
                <button className="btn-dwajdj">Loading...</button>
              ) : payment_status === "PAID" || payment_status === "SETTLED" ? (
                <button className="btn-dwajdj paid">Sudah Dibayar</button>
              ) : invoice_id ? (
                <button
                  onClick={() => navigate(`/iframe/pembayaran/${invoice_id}`)}
                  className="btn-dwajdj bayar"
                >
                  Klik untuk membayar
                </button>
              ) : (
                <button
                  onClick={() =>
                    dispatch(
                      paymentBadanHukumAction({
                        order_id: localStorage.getItem("data")
                          ? JSON.parse(localStorage.getItem("data")).id
                          : null,
                      })
                    )
                      .then(({ payload }) => {
                        if (payload?.success === true) {
                          navigate(
                            `/iframe/pembayaran/${payload?.order?.invoice_id}`
                          );
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      })
                  }
                  className="btn-dwajdj bayar"
                >
                  Bayar Sekarang
                </button>
              )}
            </div>
          </Fragment>
        );
      } else if (sublayanan === "4") {
        nama_layanan = "Badan Hukum Perkumpulan";

        if (payment_status === "EXPIRED") {
          alert_css = "alert-danger";
        } else if (payment_status === "PAID" || payment_status === "SETTLED") {
          if (status_order === "005") {
            alert_css = "alert-info";
          } else if (status_order === "010") {
            alert_css = "alert-success";
          } else if (status_order === "011") {
            alert_css = "alert-danger";
          } else {
            alert_css = "alert-info";
          }
        } else {
          alert_css = "alert-info";
        }

        return (
          <Fragment>
            <div className={`card-status-order-ajd alert ${alert_css}`}>
              <div className="title-status-order">
                Nama Layanan: <b>{nama_layanan}</b>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="title-status-order">
                  Status Order:{" "}
                  <b>{payment_status === "EXPIRED" ? "-" : v_status_order}</b>
                </div>
              </div>
              <hr />
              {/* <div className="keterangan-dajdw">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quidem nemo perferendis minima natus asperiores, quibusdam
                    rerum accusamus blanditiis iure quam nesciunt magnam, quae
                    reiciendis minus voluptas tenetur necessitatibus similique
                    suscipit.
                  </div> */}
            </div>
            <div className="card-detail-dasak">
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaIdCard />
                </div>
                <div className="detail-layanan-dajwdc">
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
                        <span
                          type="button"
                          onClick={() => {
                            if (preview) {
                              setPreview(false);
                            } else {
                              setPreview(true);
                            }
                          }}
                        >
                          {preview ? "tutup preview" : "tampil preview"}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaUserAlt />
                </div>
                <div className="detail-layanan-dajwdc">
                  {name_badan_hukum &&
                    name_badan_hukum?.map((row, key) => {
                      return (
                        <div key={key}>
                          Nama CV opsi {key + 1}: <b>{row.opsi}</b>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaLocationArrow />
                </div>
                <div className="detail-layanan-dajwdc">
                  Provinsi: <b>{alamat_badan_hukum?.provinsi?.nama}</b>
                  <br />
                  Kabupaten: <b>{alamat_badan_hukum?.kabupaten?.nama}</b>
                  <br />
                  Kecamatan: <b>{alamat_badan_hukum?.kecamatan?.nama}</b>
                  <br />
                  Kelurahan: <b>{alamat_badan_hukum?.kelurahan?.nama}</b>
                  <br />
                  Kode Pos: <b>{alamat_badan_hukum?.kode_pos}</b>
                  <br />
                  Detail Alamat: <b>{alamat_badan_hukum?.detail_alamat}</b>
                </div>
              </div>

              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaTable />
                </div>
                <div className="detail-layanan-dajwdc">
                  Susunan Pengurus: <b>{susunan_direksi}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaGripHorizontal />
                </div>
                <div className="detail-layanan-dajwdc">
                  Bidang Usaha: <b>{bidang_usaha}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaKey />
                </div>
                <div className="detail-layanan-dajwdc">
                  Email CV & Password: <b>{email_badan_hukum}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaPhone />
                </div>
                <div className="detail-layanan-dajwdc">
                  No Telepon: <b>{phone_badan_hukum}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaWallet />
                </div>
                <div className="detail-layanan-dajwdc">
                  <b>Rp. {order_total.toLocaleString()}</b>
                </div>
              </div>
            </div>
            <div className="jdawdi-dawda">
              {loader ? (
                <button className="btn-dwajdj">Loading...</button>
              ) : payment_status === "PAID" || payment_status === "SETTLED" ? (
                <button className="btn-dwajdj paid">Sudah Dibayar</button>
              ) : invoice_id ? (
                <button
                  onClick={() => navigate(`/iframe/pembayaran/${invoice_id}`)}
                  className="btn-dwajdj bayar"
                >
                  Klik untuk membayar
                </button>
              ) : (
                <button
                  onClick={() =>
                    dispatch(
                      paymentBadanHukumAction({
                        order_id: localStorage.getItem("data")
                          ? JSON.parse(localStorage.getItem("data")).id
                          : null,
                      })
                    )
                      .then(({ payload }) => {
                        if (payload?.success === true) {
                          navigate(
                            `/iframe/pembayaran/${payload?.order?.invoice_id}`
                          );
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      })
                  }
                  className="btn-dwajdj bayar"
                >
                  Bayar Sekarang
                </button>
              )}
            </div>
          </Fragment>
        );
      } else if (sublayanan === "6") {
        nama_layanan = "Legalitas Lainnya";

        if (payment_status === "EXPIRED") {
          alert_css = "alert-danger";
        } else if (payment_status === "PAID" || payment_status === "SETTLED") {
          if (status_order === "005") {
            alert_css = "alert-info";
          } else if (status_order === "010") {
            alert_css = "alert-success";
          } else if (status_order === "011") {
            alert_css = "alert-danger";
          } else {
            alert_css = "alert-info";
          }
        } else {
          alert_css = "alert-info";
        }

        return (
          <Fragment>
            <div className={`card-status-order-ajd alert ${alert_css}`}>
              <div className="title-status-order">
                Nama Layanan: <b>{nama_layanan}</b>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div className="title-status-order">
                  Status Order:{" "}
                  <b>{payment_status === "EXPIRED" ? "-" : v_status_order}</b>
                </div>
              </div>
              <hr />
              {/* <div className="keterangan-dajdw">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quidem nemo perferendis minima natus asperiores, quibusdam
                    rerum accusamus blanditiis iure quam nesciunt magnam, quae
                    reiciendis minus voluptas tenetur necessitatibus similique
                    suscipit.
                  </div> */}
            </div>
            <div className="card-detail-dasak">
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaQuestion />
                </div>
                <div className="detail-layanan-dajwdc">
                  Keperluan: <b>{needs}</b>
                </div>
              </div>
              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaIdCard />
                </div>
                <div className="detail-layanan-dajwdc">
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
                        <span
                          type="button"
                          onClick={() => {
                            if (preview) {
                              setPreview(false);
                            } else {
                              setPreview(true);
                            }
                          }}
                        >
                          {preview ? "tutup preview" : "tampil preview"}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="d-flex-hag">
                <div className="icon-kdfna">
                  <FaWallet />
                </div>
                <div className="detail-layanan-dajwdc">
                  <b>Rp. {order_total.toLocaleString()}</b>
                </div>
              </div>
            </div>
            <div className="jdawdi-dawda">
              {loader ? (
                <button className="btn-dwajdj">Loading...</button>
              ) : payment_status === "PAID" || payment_status === "SETTLED" ? (
                <button className="btn-dwajdj paid">Sudah Dibayar</button>
              ) : invoice_id ? (
                <button
                  onClick={() => navigate(`/iframe/pembayaran/${invoice_id}`)}
                  className="btn-dwajdj bayar"
                >
                  Klik untuk membayar
                </button>
              ) : (
                <button
                  onClick={() =>
                    dispatch(
                      paymentBadanHukumAction({
                        order_id: localStorage.getItem("data")
                          ? JSON.parse(localStorage.getItem("data")).id
                          : null,
                      })
                    )
                      .then(({ payload }) => {
                        if (payload?.success === true) {
                          navigate(
                            `/iframe/pembayaran/${payload?.order?.invoice_id}`
                          );
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      })
                  }
                  className="btn-dwajdj bayar"
                >
                  Bayar Sekarang
                </button>
              )}
            </div>
          </Fragment>
        );
      }
    }
  };
  if (layanan === "1") {
    if (sublayanan === "1") {
      nama_layanan = "Pendampingan Hukum";
    } else {
      nama_layanan = "Konsultasi Hukum";
    }
  } else if (layanan === "2") {
    if (sublayanan === "1") {
      nama_layanan = "Pengamanan Perorang";
    } else {
      nama_layanan = "Pengamanan Korporat";
    }
  } else {
    if (sublayanan === "1") {
      nama_layanan = "Badan Hukum PT";
    } else {
      nama_layanan = "Badan Hukum CV";
    }
  }

  var v_status_order = "";
  if (status_order === "001") {
    v_status_order = "Menunggu dibayar";
  } else if (status_order === "002") {
    v_status_order = "Order diproses";
  } else if (status_order === "003") {
    v_status_order = "Mendapatkan Mitra";
  } else if (status_order === "004") {
    v_status_order = "Menuju Lokasi";
  } else if (status_order === "005") {
    v_status_order = "Sedang Bertugas";
  } else {
    v_status_order = "Tidak Diketahui";
  }

  // var v_payment_status = "";
  // if (payment_status === "ORDER") {
  //   v_payment_status = "Memesan";
  // } else if (payment_status === "Unpaid") {
  //   v_payment_status = "Belum dibayar";
  // } else if (payment_status === "PAID" || payment_status === "SETTLED") {
  //   v_payment_status = "Sudah dibayar";
  // } else {
  //   v_payment_status = "Kadaluarsa";
  // }

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="njwdjhwk">
            <h5 className="title-kasnadkw">Id: {user?.id}</h5>
            <hr />
            {loader ? (
              <div>
                {" "}
                <Skeleton width="100%" height={32} />{" "}
                <Skeleton width="100%" height={32} />{" "}
                <Skeleton width="100%" height={32} />{" "}
                <Skeleton width="100%" height={32} />{" "}
                <Skeleton width="100%" height={32} />{" "}
                <Skeleton width="100%" height={32} />{" "}
                <Skeleton width="100%" height={32} />{" "}
                <Skeleton width="100%" height={32} />{" "}
                <Skeleton width="100%" height={32} />{" "}
                <Skeleton width="100%" height={32} />{" "}
                <Skeleton width="100%" height={32} />{" "}
                <Skeleton width="100%" height={32} />{" "}
                <Skeleton width="100%" height={32} />{" "}
                <Skeleton width="100%" height={32} />{" "}
                <Skeleton width="100%" height={32} />{" "}
                <Skeleton width="100%" height={32} />{" "}
                <Skeleton width="100%" height={32} />{" "}
                <Skeleton width="100%" height={32} />{" "}
              </div>
            ) : (
              renderDetailLayanan()
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DetailHistoryTransactionMobile;
