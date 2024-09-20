/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-target-blank */
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Form, Spinner } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import cv from "../../assets/images/cv.png";
import { useTranslation } from "react-i18next";

const MAX_COUNT = 99;

function FormTransactionCvMenu() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  // const [ktp, setKtp] = useState("");
  // const [npwp, setNpwp] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [, setFileLimit] = useState(false);
  const [preview, setPreview] = useState(false);
  const [name_badan_hukum, setName_badan_hukum] = useState("");
  const [modal_dasar, setModal_dasar] = useState();
  const [modal_disetor, setModal_disetor] = useState();
  const [alamat_badan_hukum, setAlamat_badan_hukum] = useState("");
  const [pemegang_saham, setPemegang_saham] = useState("");
  const [susunan_direksi, setSusunan_direksi] = useState("");
  const [bidang_usaha, setBidang_usaha] = useState("");
  const [email_badan_hukum, setEmail_badan_hukum] = useState("");
  const [phone_badan_hukum, setPhone_badan_hukum] = useState("");
  const [tnos_subservice_id, setTnos_subservice_id] = useState("");
  const navigate = useNavigate();
  const [formError, setFormError] = useState({
    file_document: "",
    name_badan_hukum: "",
    modal_dasar: "",
    modal_disetor: "",
    alamat_badan_hukum: "",
    pemegang_saham: "",
    susunan_direksi: "",
    bidang_usaha: "",
    email_badan_hukum: "",
    phone_badan_hukum: "",
  });
  const [loader, setLoader] = useState(false);
  var user = JSON.parse(localStorage.getItem("user"));
  const name = user.mmbr_name;
  const email = user.mmbr_email;
  const phone = user.mmbr_phone;

  const handleFileEvent = (e) => {
    // setUploadedFiles([]);
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    // console.log(chosenFiles);
    handleUploadFiles(chosenFiles);
  };
  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) {
          setFileLimit(true);
        }
        if (uploaded.length > MAX_COUNT) {
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) {
      setUploadedFiles(uploaded);
    }
    // console.log(uploadedFiles);
  };
  const onSubmitOrder = async (e) => {
    e.preventDefault();

    const data = {
      tnos_service_id: "3",
      tnos_subservice_id: tnos_subservice_id,
      user_id: user.mmbr_code,
      name: name,
      email: email,
      phone: phone,
      file_document: uploadedFiles,
      name_badan_hukum: name_badan_hukum,
      modal_dasar: modal_dasar,
      modal_disetor: modal_disetor,
      alamat_badan_hukum: alamat_badan_hukum,
      pemegang_saham: pemegang_saham,
      susunan_direksi: susunan_direksi,
      bidang_usaha: bidang_usaha,
      email_badan_hukum: email_badan_hukum,
      phone_badan_hukum: phone_badan_hukum,
    };
    setLoader(true);
    setFormError({
      file_document: "",
      name_badan_hukum: "",
      modal_dasar: "",
      modal_disetor: "",
      alamat_badan_hukum: "",
      pemegang_saham: "",
      susunan_direksi: "",
      bidang_usaha: "",
      email_badan_hukum: "",
      phone_badan_hukum: "",
      tnos_subservice_id: "",
    });
    const url = `${process.env.REACT_APP_API_PWA}/badan-hukum-cv/in-order`;
    // const url = `http://127.0.0.1:8000/api/badan-hukum-cv/in-order`;
    await axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setLoader(false);
        if (!res.data.success) {
          setFormError({
            file_document: res.data.error.file_document,
            name_badan_hukum: res.data.error.name_badan_hukum,
            modal_dasar: res.data.error.modal_dasar,
            modal_disetor: res.data.error.modal_disetor,
            alamat_badan_hukum: res.data.error.alamat_badan_hukum,
            pemegang_saham: res.data.error.pemegang_saham,
            susunan_direksi: res.data.error.susunan_direksi,
            bidang_usaha: res.data.error.bidang_usaha,
            email_badan_hukum: res.data.error.email_badan_hukum,
            phone_badan_hukum: res.data.error.phone_badan_hukum,
            tnos_subservice_id: res.data.error.tnos_subservice_id,
          });
        }
        // console.log(formError);
        navigate(`/badan-hukum-cv/` + res.data.detail.id, {
          state: res.data.message,
        });
      })
      .catch((res) => {
        setLoader(false);
        console.log(res);
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

  const renderKeuntunganKlasifikasi = () => {
    if (tnos_subservice_id !== "") {
      return (
        <div className="box-layanan-sjdj">
          <b className="title-jdah">Sudah Termasuk</b>
          <ul>
            <li>Pengecekan nama PT</li>
            <li>Akta Pendirian & SK Kemenkumham</li>
            <li>NPWP PT</li>
            <li>Nomor Izin Berusaha</li>
            <li>Izin Lokasi</li>
            <li>Konsultasi Online</li>
          </ul>
        </div>
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
              <h5 className="title-kasnadkw">{t("badan_hukum_cv")}</h5>
            </Link>
          </div>
          <div className="njwdjhwk">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8 col-xl-8 col-12">
                <p className="text-justify jjdw">{t("p_cv")}</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xl-4 col-12">
                <img src={cv} alt="" className="img-xy" />
              </div>
            </div>
            <hr />
            {localStorage.getItem("code") === "en" ? (
              <Fragment>
                <div
                  className={`card-syarat-ketentuan-jjs ${
                    show ? "" : "show-ketentuan-jsd"
                  }`}
                >
                  <b>Terms of Establishment CV</b>
                  <br />
                  1. Provisions for the name CV
                  <br />
                  For CV names, please submit 3 (three) CV names With rule:
                  <br />
                  <ul>
                    <li>Consists of a minimum of 3 (three) syllables</li>
                    <li>Written in Latin letters</li>
                    <li>
                      It should not be the same as other CVs in terms of writing
                      and pronunciation (example: CV Sukses Jaya Utama with CV
                      Sukses Djaja Oetama)
                    </li>
                    <li>Not contrary to public order and/or decency</li>
                    <li>
                      Has nothing in common with the name of a state
                      institution, government agencies or international
                      organizations
                    </li>
                    <li>
                      Does not consist of numbers or series of numbers, letters
                      or letters that do not form words <br />
                      (contoh: CV 14045, CV Qwerty)
                    </li>
                    <li>
                      Does not mean as a company, legal entity, or civil
                      partnership (using the words Foundation, Ltd, Inc., Co.,
                      etc.)
                    </li>
                  </ul>
                  <div className={`${show ? "hide-ketentuan-ssdbb" : ""}`}>
                    <br />
                    <br />
                    ........
                  </div>
                  <div className="btn-position-sjs">
                    <button
                      className={`btn btn-layanan ${
                        show ? "hide-ketentuan-ssdbb" : ""
                      }`}
                      style={{ fontSize: "12px" }}
                      onClick={() => {
                        if (show) {
                          setShow(false);
                        } else {
                          setShow(true);
                        }
                      }}
                    >
                      More complete...
                    </button>
                  </div>
                  If the names of the 3 CVs submitted are not available, we will
                  inform to file a different name.
                  <br />
                  2. Selection of KBLI/Business Field
                  <ul>
                    <li>
                      KBLI (Indonesian Business Field Standard Classification)
                      is classification code system which will then be inputted
                      on Deed and NIB
                    </li>
                    <li>
                      KBLI yang dipilih harus satu turunan dengan kegiatan
                      usaha(untuk menghindari perusahaan palugada, perusahaan
                      yang memiliki kegiatan usaha yang berbeda-beda mengikuti
                      demand)
                    </li>
                    <li>
                      The selected KBLI must have the same derivative as the
                      activity effort(to avoid the palugada company, company who
                      have different business activities follow demand)
                      <a
                        href="https://oss.go.id/informasi/kbli-berbasis-risiko"
                        target="_blank"
                      >
                        https://oss.go.id/informasi/kbli-berbasis-risiko
                      </a>
                    </li>
                  </ul>
                  3. Shareholders and Directors
                  <ul>
                    <li>CV has at least 2 shareholders</li>
                    <li>CV must have at least 1 director and 1 commissioner</li>
                    <li>
                      If there are more than 1 director and commissioner
                      respectively, one of them was appointed director and
                      President Commissioner
                    </li>
                  </ul>
                  4. Husband and wife are not allowed to set up a CV
                  <br />
                  5. CV has a minimum capital of Rp.
                  <br />
                  50,000,000 (Fifty Million Rupiah) and make a deposit 25% of
                  the capital (fictitious deposit)
                  <div className="btn-position-sjs">
                    <button
                      className={`btn btn-layanan  ${show ? "" : ""}`}
                      style={{ fontSize: "12px" }}
                      onClick={() => {
                        if (show) {
                          setShow(false);
                        } else {
                          setShow(true);
                        }
                      }}
                    >
                      More complete...
                    </button>
                  </div>
                </div>
                <br />
                <div className={`${show ? "" : "hide-ketentuan-ssdbb"}`}>
                  <div className="alert alert-danger" role="alert">
                    Before filling out the form, please read the terms and
                    conditions terms first
                  </div>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div
                  className={`card-syarat-ketentuan-jjs ${
                    show ? "" : "show-ketentuan-jsd"
                  }`}
                >
                  <b>Ketentuan Pendirian CV</b>
                  <br />
                  1. Ketentuan nama CV <br />
                  Untuk nama CV, mohon untuk mengajukan 3 (tiga) nama CV. Dengan
                  aturan:
                  <br />
                  <ul>
                    <li>Terdiri dari minimal 3 (tiga) suku kata</li>
                    <li>Ditulis dengan huruf latin</li>
                    <li>
                      Tidak boleh sama dengan CV lain dari sisi penulisan dan
                      pengucapan (contoh: CV Sukses Jaya Utama dengan CV Sukses
                      Djaja Oetama)
                    </li>
                    <li>
                      Tidak bertentangan dengan ketertiban umum dan/atau
                      kesusilaan
                    </li>
                    <li>
                      Tidak memiliki kesamaan dengan nama lembaga negara,
                      lembaga pemerintahan, atau lembaga internasional
                    </li>
                    <li>
                      Tidak terdiri atas angka atau rangkaian angka, huruf atau
                      huruf yang tidak membentuk kata <br />
                      (contoh: CV 14045, CV Qwerty)
                    </li>
                    <li>
                      Tidak memiliki artian sebagai perseroan, badan hukum, atau
                      persekutuan perdata (menggunakan kata Yayasan, Ltd, Inc.,
                      Co., dll)
                    </li>
                  </ul>
                  <div className={`${show ? "hide-ketentuan-ssdbb" : ""}`}>
                    ........
                  </div>
                  <div className="btn-position-sjs">
                    <button
                      className={`btn btn-layanan ${
                        show ? "hide-ketentuan-ssdbb" : ""
                      }`}
                      style={{ fontSize: "12px" }}
                      onClick={() => {
                        if (show) {
                          setShow(false);
                        } else {
                          setShow(true);
                        }
                      }}
                    >
                      Lebih lengkap...
                    </button>
                  </div>
                  Jika dari 3 nama CV yang diajukan tidak tersedia, akan kami
                  informasikan untuk mengajukan nama yang berbeda.
                  <br />
                  2. Pemilihan KBLI/Bidang Usaha
                  <ul>
                    <li>
                      KBLI (Klasifikasi Baku Lapangan Usaha Indonesia) adalah
                      sistem kode klasifikasi yang kemudian akan diinput pada
                      Akta dan NIB
                    </li>
                    <li>
                      KBLI yang dipilih harus satu turunan dengan kegiatan
                      usaha(untuk menghindari perusahaan palugada, perusahaan
                      yang memiliki kegiatan usaha yang berbeda-beda mengikuti
                      demand)
                    </li>
                    <li>
                      Pemilihan KBLI dapat dilakukan pada link{" "}
                      <a
                        href="https://oss.go.id/informasi/kbli-berbasis-risiko"
                        target="_blank"
                      >
                        https://oss.go.id/informasi/kbli-berbasis-risiko
                      </a>
                    </li>
                  </ul>
                  3. Pemegang Saham dan Direksi
                  <ul>
                    <li>CV minimal memiliki 2 pemegang saham</li>
                    <li>CV minimal memiliki 1 direktur dan 1 komisaris </li>
                    <li>
                      Apabila terdapat lebih dari 1 direktur dan komisaris
                      masing-masing, salah satunya diangkat menjadi direktur dan
                      komisaris utama
                    </li>
                  </ul>
                  4. Suami Istri tidak diperbolehkan untuk mendirikan CV
                  <br />
                  5. CV memiliki modal minimal Rp.
                  <br />
                  50.000.000 (Lima Puluh Juta Rupiah) dan melakukan penyetoran
                  sejumlah 25% dari modal (penyetoran fiktif)
                  <div className="btn-position-sjs">
                    <button
                      className={`btn btn-layanan  ${show ? "" : ""}`}
                      style={{ fontSize: "12px" }}
                      onClick={() => {
                        if (show) {
                          setShow(false);
                        } else {
                          setShow(true);
                        }
                      }}
                    >
                      Lebih lengkap...
                    </button>
                  </div>
                </div>
                <br />
                <div className={`${show ? "" : "hide-ketentuan-ssdbb"}`}>
                  <div className="alert alert-danger" role="alert">
                    Sebelum Mengisi form dimohon untuk membaca syarat dan
                    ketentuan terlebih dahulu
                  </div>
                </div>
              </Fragment>
            )}

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
                <label htmlFor="name">*Pilih Layanan</label>
                <select
                  name=""
                  id=""
                  className={`form-control form-layanan ${
                    formError.tnos_subservice_id ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setTnos_subservice_id(e.target.value)}
                >
                  <option value="">Pilih</option>
                  <option value="2">CV</option>
                  <option value="3">Yayasan</option>
                  <option value="4">Perkumpulan</option>
                  <option value="5">Asosiasi</option>
                </select>
                {formError.tnos_subservice_id ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.tnos_subservice_id}
                  </div>
                ) : (
                  ""
                )}
                <div>{renderKeuntunganKlasifikasi()}</div>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="name">*{t("nama_lengkap")}</label>
                <input
                  type="text"
                  name="Name"
                  className={`form-control form-layanan`}
                  value={name}
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">*Email</label>
                <input
                  type="text"
                  name="email"
                  className={`form-control form-layanan`}
                  value={email}
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="phone">*{t("no_telepon")}</label>
                <input
                  type="text"
                  name="phone"
                  className={`form-control form-layanan`}
                  value={phone}
                  readOnly
                />
              </div>
              <Form.Group className="mb-2">
                <div htmlFor="ktp">*{t("f_ktp_all_cv")}</div>
                <Form.Control
                  name="ktp"
                  type="file"
                  className={`form-control form-layanan ${
                    formError.file_document ? "is-invalid" : ""
                  }`}
                  accecv="image/png,image/jpeg,image/jpg"
                  multiple
                  onChange={(e) => handleFileEvent(e)}
                />
                {formError.file_document ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.file_document}
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>
              <div className="uploaded-files-list mb-2">
                <Fragment>
                  <div className="row">
                    {uploadedFiles.map((file, key) => (
                      <div key={key} className="col-lg-6 mb-2">
                        {preview ? (
                          <div>
                            <img
                              className="w-100"
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                            />
                          </div>
                        ) : (
                          <div>{file.name}</div>
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
                <label htmlFor="name_badan_hukum">*{t("f_name_cv")}</label>
                <textarea
                  name="name_badan_hukum"
                  id="name_badan_hukum"
                  cols="10"
                  rows="5"
                  className={`form-control form-layanan ${
                    formError.name_badan_hukum ? "is-invalid" : ""
                  }`}
                  value={name_badan_hukum}
                  onChange={(e) => setName_badan_hukum(e.target.value)}
                ></textarea>
                {formError.name_badan_hukum ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.name_badan_hukum}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="modal_dasar">*{t("f_modal_cv")}</label>
                <input
                  type="number"
                  name="modal_dasar"
                  className={`form-control form-layanan ${
                    formError.modal_dasar ? "is-invalid" : ""
                  }`}
                  value={modal_dasar}
                  onChange={(e) => setModal_dasar(e.target.value)}
                />
                {formError.modal_dasar ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.modal_dasar}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="modal_disetor">*{t("f_disetor_cv")}</label>
                <input
                  name="modal_disetor"
                  type="number"
                  className={`form-control form-layanan ${
                    formError.modal_disetor ? "is-invalid" : ""
                  }`}
                  value={modal_disetor}
                  onChange={(e) => setModal_disetor(e.target.value)}
                />
                {formError.modal_disetor ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.modal_disetor}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="alamat_badan_hukum">*{t("f_alamat_cv")}</label>
                <textarea
                  name="alamat_badan_hukum"
                  id="alamat_badan_hukum"
                  cols="10"
                  rows="5"
                  className={`form-control form-layanan ${
                    formError.alamat_badan_hukum ? "is-invalid" : ""
                  }`}
                  value={alamat_badan_hukum}
                  onChange={(e) => setAlamat_badan_hukum(e.target.value)}
                ></textarea>
                {formError.alamat_badan_hukum ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.alamat_badan_hukum}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="pemegang_saham">*{t("f_saham_cv")}</label>
                <textarea
                  name="pemegang_saham"
                  id="pemegang_saham"
                  cols="10"
                  rows="5"
                  className={`form-control form-layanan ${
                    formError.pemegang_saham ? "is-invalid" : ""
                  }`}
                  value={pemegang_saham}
                  onChange={(e) => setPemegang_saham(e.target.value)}
                ></textarea>
                {formError.pemegang_saham ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.pemegang_saham}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="susunan_direksi">*{t("f_direksi_cv")}</label>
                <textarea
                  name="susunan_direksi"
                  id="susunan_direksi"
                  cols="10"
                  rows="5"
                  className={`form-control form-layanan ${
                    formError.susunan_direksi ? "is-invalid" : ""
                  }`}
                  value={susunan_direksi}
                  onChange={(e) => setSusunan_direksi(e.target.value)}
                ></textarea>
                {formError.susunan_direksi ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.susunan_direksi}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="bidang">
                  *{t("f_bidang_cv")}
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
                  className={`form-control form-layanan ${
                    formError.bidang_usaha ? "is-invalid" : ""
                  }`}
                  value={bidang_usaha}
                  onChange={(e) => setBidang_usaha(e.target.value)}
                ></textarea>
                {formError.bidang_usaha ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.bidang_usaha}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">*Email CV & Password</label>
                <input
                  name="email"
                  type="text"
                  className={`form-control form-layanan ${
                    formError.email_badan_hukum ? "is-invalid" : ""
                  }`}
                  value={email_badan_hukum}
                  onChange={(e) => setEmail_badan_hukum(e.target.value)}
                />
                {formError.email_badan_hukum ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.email_badan_hukum}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="no_penanggung_jawab">*{t("f_nomer_cv")}</label>
                <input
                  name="no_penanggung_jawab"
                  type="number"
                  className={`form-control form-layanan ${
                    formError.phone_badan_hukum ? "is-invalid" : ""
                  }`}
                  value={phone_badan_hukum}
                  onChange={(e) => setPhone_badan_hukum(e.target.value)}
                />
                {formError.phone_badan_hukum ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.phone_badan_hukum}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group  mt-3">
                <button
                  className="btn btn-layanan w-100"
                  type="submit"
                  disabled={loader}
                >
                  {loader ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Lanjut Pembayaran"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default FormTransactionCvMenu;
