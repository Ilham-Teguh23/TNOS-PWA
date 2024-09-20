import axios from "axios";
import moment from "moment-timezone";
import React, { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import {
  FaArrowLeft,
  FaClock,
  FaGripHorizontal,
  FaHackerrank,
  FaHome,
  FaIdCard,
  FaKey,
  FaLocationArrow,
  FaMoneyBill,
  FaPhone,
  FaRegClock,
  FaTable,
  FaUserAlt,
  FaWallet,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function HistoryDetailMenu() {
  const params = useParams();
  const [loader, setLoader] = useState(false);
  const [layanan, setLayanan] = useState("");
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

  useEffect(() => {
    getDataOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataOrder = async () => {
    // console.log(params.id);
    setLoader(true);
    const url = `https://api-pwa.tnos.world/api/order/${params.id}`;
    // const url = `http://127.0.0.1:8000/api/badan-hukum-cv/get-detail-order/${params.id}`;
    await axios
      .get(url)
      .then((res) => {
        // console.log(res.data.detail);

        setLoader(false);
        setLayanan(res.data.detail.tnos_service_id);
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
            ? res.data.detail.name_badan_hukum
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
            ? res.data.detail.alamat_badan_hukum
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
          if (status_order === "WAIT") {
            alert_css = "alert-info";
          } else if (status_order === "START") {
            alert_css = "alert-primary";
          } else if (status_order === "RUN") {
            alert_css = "alert-warning";
          } else if (status_order === "FINISH") {
            alert_css = "alert-success";
          } else {
            alert_css = "alert-light";
          }
        } else {
          alert_css = "alert-light";
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
                <div className="title-status-order">
                  Pembayaran: <b>{v_payment_status}</b>
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
                  <FaLocationArrow />
                </div>
                <div className="detail-layanan-dajwdc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Delectus dignissimos quis ipsa tempora iure. Ducimus?
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
          </Fragment>
        );
      }
    } else {
      if (sublayanan === "1") {
        nama_layanan = "Badan Hukum PT";

        if (payment_status === "EXPIRED") {
          alert_css = "alert-danger";
        } else if (payment_status === "PAID" || payment_status === "SETTLED") {
          if (status_order === "WAIT") {
            alert_css = "alert-info";
          } else if (status_order === "START") {
            alert_css = "alert-primary";
          } else if (status_order === "RUN") {
            alert_css = "alert-warning";
          } else if (status_order === "FINISH") {
            alert_css = "alert-success";
          } else {
            alert_css = "alert-light";
          }
        } else {
          alert_css = "alert-light";
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
                <div className="title-status-order">
                  Pembayaran: <b>{v_payment_status}</b>
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
                  Nama PT: <b>{name_badan_hukum}</b>
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
                  Alamat PT: Rp. <b>{alamat_badan_hukum}</b>
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
            </div>
          </Fragment>
        );
      } else {
        nama_layanan = "Badan Hukum CV";

        if (payment_status === "EXPIRED") {
          alert_css = "alert-danger";
        } else if (payment_status === "PAID" || payment_status === "SETTLED") {
          if (status_order === "WAIT") {
            alert_css = "alert-info";
          } else if (status_order === "START") {
            alert_css = "alert-primary";
          } else if (status_order === "RUN") {
            alert_css = "alert-warning";
          } else if (status_order === "FINISH") {
            alert_css = "alert-success";
          } else {
            alert_css = "alert-light";
          }
        } else {
          alert_css = "alert-light";
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
                <div className="title-status-order">
                  Pembayaran: <b>{v_payment_status}</b>
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
                  Nama CV: <b>{name_badan_hukum}</b>
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
                  Alamat CV: Rp. <b>{alamat_badan_hukum}</b>
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
  if (status_order === "WAIT") {
    v_status_order = "Menunggu";
  } else if (status_order === "START") {
    v_status_order = "Mitra sedang persiapan";
  } else if (status_order === "RUN") {
    v_status_order = "Mitra sedang bertugas atau dalam perjalanan";
  } else if (status_order === "FINISH") {
    v_status_order = "Mitra Selesai bertugas";
  } else {
    v_status_order = "Tidak Diketahui";
  }

  var v_payment_status = "";
  if (payment_status === "ORDER") {
    v_payment_status = "Memesan";
  } else if (payment_status === "Unpaid") {
    v_payment_status = "Belum dibayar";
  } else if (payment_status === "PAID" || payment_status === "SETTLED") {
    v_payment_status = "Sudah dibayar";
  } else {
    v_payment_status = "Kadaluarsa";
  }

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/riwayat-transaksi" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw">Detail Transaksi</h5>
            </Link>
          </div>
          <div className="njwdjhwk">
            <h5 className="title-kasnadkw">Id: {params.id}</h5>
            <hr />
            {loader ? <div>Loading...</div> : renderDetailLayanan()}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HistoryDetailMenu;
