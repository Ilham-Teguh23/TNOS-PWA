/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import pt from "../../assets/images/pt.png";
import { useTranslation } from "react-i18next";

import * as Yup from "yup";
import { useFormik } from "formik";
import KetentuanComponent from "../utils/KetentuanComponent";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { badanHukumCreateAction } from "../../redux/slices/badan-hukum/BadanHukumSlices";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const StyleDropzone = styled.div`
  width: 100%;
  min-height: 80px;
  text-align: center;
  border: 1px solid #dfdada;
  padding: 10px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function FormTransactionBadanHukumMenu() {
  // const name = user.mmbr_name;
  // const email = user.mmbr_email;
  // const phone = user.mmbr_phone;

  const [name_badan_hukum1, setname_badan_hukum1] = useState("");
  const [name_badan_hukum2, setname_badan_hukum2] = useState("");
  const [name_badan_hukum3, setname_badan_hukum3] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const formSchema = Yup.object({
    tnos_subservice_id: Yup.string().required("Pilih Layanan is required"),
    name_badan_hukum1: Yup.string().required("Name Opsi 1 is required"),
    name_badan_hukum2: Yup.string().required("Name Opsi 2 is required"),
    name_badan_hukum3: Yup.string().required("Name Opsi 3 is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    // klasifikasi: Yup.string().required("Klasifikasi is required"),
    file_document: Yup.array().required("Image is required"),
    // modal_dasar: Yup.number().required("Modal dasar is required"),
    // modal_disetor: Yup.number().required("Modal disetor is required"),
    // pemegang_saham: Yup.string().required("Pemegang saham is required"),
    // susunan_direksi: Yup.string().required("Susunan_direksi is required"),
    bidang_usaha: Yup.string().required("Bidang usaha is required"),
    email_badan_hukum: Yup.string().required("Email badan hukum is required"),
    phone_badan_hukum: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone badan hukum is required"),
    alamat_badan_hukum: Yup.string().required("Alamat badan hukum is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tnos_service_id: "3",
      tnos_subservice_id: "",
      name_badan_hukum: "",
      user_id: user.mmbr_code,
      name: user.mmbr_name,
      email: user.mmbr_email,
      phone: user.mmbr_phone,
      klasifikasi: "",
      file_document: "",
      email_badan_hukum: "",
      phone_badan_hukum: "",
      alamat_badan_hukum: "",
    },
    onSubmit: (values) => {
      values.name_badan_hukum = [
        {
          opsi: name_badan_hukum1,
        },
        {
          opsi: name_badan_hukum2,
        },
        {
          opsi: name_badan_hukum3,
        },
      ];
      // console.log(uploadedFiles);
      dispatch(badanHukumCreateAction(values));
      // console.log(values);
    },
    validationSchema: formSchema,
  });

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      formik.setFieldValue("file_document", acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    multiple: true,
    onBlur: () => {
      formik.handleBlur("file_document");
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          alt=""
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const storeData = useSelector((store) => store?.badanHukum);
  const { loading, isCreated, badanHukumCreated } = storeData;
  // console.log(badanHukumCreated);
  if (isCreated) {
    navigate(`/badan-hukum-pt/` + badanHukumCreated?.id);
  }

  const renderKeuntunganKlasifikasi = () => {
    if (formik.values.klasifikasi === "1") {
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
            <li>Logo Perusahaan (+)</li>
            <li>Kop Surat (+)</li>
            <li>Design Stempe (+)</li>
            <li>Design Kartu Nama (+)</li>
            <li>Pembuatan Rekening PT di Bank UOB (+)</li>
          </ul>
        </div>
      );
    } else if (formik.values.klasifikasi === "2") {
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
            <li>Logo Perusahaan (+)</li>
            <li>Kop Surat (+)</li>
            <li>Design Stempe (+)</li>
            <li>Design Kartu Nama (+)</li>
          </ul>
        </div>
      );
    } else if (formik.values.klasifikasi === "3") {
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
    } else {
      return false;
    }
  };

  const renderKeuntungan = () => {
    if (formik.values.tnos_subservice_id === "1") {
      return false;
    } else if (formik.values.tnos_subservice_id === "") {
      return false;
    } else {
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

  const renderInputForm = () => {
    if (formik.values.tnos_subservice_id === "1") {
      return (
        <Fragment>
          <div className="form-group mb-2">
            <label htmlFor="name">*{t("nama_lengkap")}</label>
            <input
              type="text"
              name="Name"
              className={`form-control form-layanan`}
              value={formik.values.name}
              readOnly
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email">*Email</label>
            <input
              type="text"
              name="email"
              className={`form-control form-layanan`}
              value={formik.values.email}
              readOnly
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="phone">*{t("no_telepon")}</label>
            <input
              type="text"
              name="phone"
              className={`form-control form-layanan`}
              value={formik.values.phone}
              readOnly
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="klasifikasi">*{t("klasifikasi_pt")}</label>
            <select
              className={`form-control form-layanan ${
                formik.errors.klasifikasi && "is-invalid"
              }`}
              onChange={formik.handleChange("klasifikasi")}
              onBlur={formik.handleBlur("klasifikasi")}
              value={formik.values.klasifikasi}
              name="klasifikasi"
              id="klasifikasi"
            >
              <option value="">Pilih</option>
              <option value="1">SUPER PLATINUM</option>
              <option value="2">PLATINUM</option>
              <option value="3">SILVER</option>
            </select>
            {formik.touched.klasifikasi && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.klasifikasi}
              </div>
            )}
            <div>{renderKeuntunganKlasifikasi()}</div>
          </div>
          <div className="form-group mb-3">
            <div htmlFor="ktp">*{t("f_ktp_all_pt")}</div>
            <StyleDropzone
              style={formik.errors.file_document && { border: "1px solid red" }}
              {...getRootProps({ className: "dropzone" })}
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </StyleDropzone>
            {formik.touched.file_document && (
              <div id="validationServer03Feedback" className="text-danger">
                {formik.errors.file_document}
              </div>
            )}
            <aside style={thumbsContainer}>{thumbs}</aside>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name_badan_hukum">*Nama PT Opsi pertama</label>
            <input
              value={formik.values.name_badan_hukum1}
              onChange={(e) => {
                setname_badan_hukum1(e.target.value);
                formik.setFieldValue("name_badan_hukum1", e.target.value);
              }}
              onBlur={formik.handleBlur("name_badan_hukum1")}
              className={`form-control form-layanan ${
                formik.errors.name_badan_hukum1 && "is-invalid"
              }`}
              placeholder=""
              type="text"
            />
            {formik.touched.name_badan_hukum1 && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.name_badan_hukum1}
              </div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name_badan_hukum">*Nama PT Opsi kedua</label>
            <input
              defaultValue={formik.values.name_badan_hukum2}
              onChange={(e) => {
                setname_badan_hukum2(e.target.value);
                formik.setFieldValue("name_badan_hukum2", e.target.value);
              }}
              onBlur={formik.handleBlur("name_badan_hukum2")}
              className={`form-control form-layanan ${
                formik.errors.name_badan_hukum2 && "is-invalid"
              }`}
              placeholder=""
              type="text"
            />
            {formik.touched.name_badan_hukum2 && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.name_badan_hukum2}
              </div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name_badan_hukum">*Nama PT Opsi ketiga</label>
            <input
              value={formik.values.name_badan_hukum3}
              onChange={(e) => {
                setname_badan_hukum3(e.target.value);
                formik.setFieldValue("name_badan_hukum3", e.target.value);
              }}
              onBlur={formik.handleBlur("name_badan_hukum3")}
              className={`form-control form-layanan ${
                formik.errors.name_badan_hukum3 && "is-invalid"
              }`}
              placeholder=""
              type="text"
            />
            {formik.touched.name_badan_hukum3 && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.name_badan_hukum3}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="modal_dasar">*{t("f_modal_pt")}</label>
            <input
              type="number"
              name="modal_dasar"
              value={formik.values.modal_dasar}
              onChange={formik.handleChange("modal_dasar")}
              onBlur={formik.handleBlur("modal_dasar")}
              className={`form-control form-layanan ${
                formik.errors.modal_dasar && "is-invalid"
              }`}
            />
            {formik.touched.modal_dasar && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.modal_dasar}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="modal_disetor">*{t("f_disetor_pt")}</label>
            <input
              name="modal_disetor"
              type="number"
              value={formik.values.modal_disetor}
              onChange={formik.handleChange("modal_disetor")}
              onBlur={formik.handleBlur("modal_disetor")}
              className={`form-control form-layanan ${
                formik.errors.modal_disetor && "is-invalid"
              }`}
            />
            {formik.touched.modal_disetor && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.modal_disetor}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="alamat_badan_hukum">*{t("f_alamat_pt")}</label>
            <textarea
              name="alamat_badan_hukum"
              id="alamat_badan_hukum"
              cols="10"
              rows="5"
              value={formik.values.alamat_badan_hukum}
              onChange={formik.handleChange("alamat_badan_hukum")}
              onBlur={formik.handleBlur("alamat_badan_hukum")}
              className={`form-control form-layanan ${
                formik.errors.alamat_badan_hukum && "is-invalid"
              }`}
            ></textarea>
            {formik.touched.alamat_badan_hukum && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.alamat_badan_hukum}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="pemegang_saham">*{t("f_saham_pt")}</label>
            <textarea
              name="pemegang_saham"
              id="pemegang_saham"
              cols="10"
              rows="5"
              defaultValue={formik.values.pemegang_saham}
              onChange={formik.handleChange("pemegang_saham")}
              onBlur={formik.handleBlur("pemegang_saham")}
              className={`form-control form-layanan ${
                formik.errors.pemegang_saham && "is-invalid"
              }`}
            ></textarea>
            {formik.touched.pemegang_saham && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.pemegang_saham}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="susunan_direksi">*{t("f_direksi_pt")}</label>
            <textarea
              name="susunan_direksi"
              id="susunan_direksi"
              cols="10"
              rows="5"
              defaultValue={formik.values.susunan_direksi}
              onChange={formik.handleChange("susunan_direksi")}
              onBlur={formik.handleBlur("susunan_direksi")}
              className={`form-control form-layanan ${
                formik.errors.susunan_direksi && "is-invalid"
              }`}
            ></textarea>
            {formik.touched.susunan_direksi && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.susunan_direksi}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="bidang">
              *{t("f_bidang_pt")}{" "}
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
              defaultValue={formik.values.bidang_usaha}
              onChange={formik.handleChange("bidang_usaha")}
              onBlur={formik.handleBlur("bidang_usaha")}
              className={`form-control form-layanan ${
                formik.errors.bidang_usaha && "is-invalid"
              }`}
            ></textarea>
            {formik.touched.bidang_usaha && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.bidang_usaha}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email">*Email PT & Password</label>
            <input
              name="email"
              type="text"
              value={formik.values.email_badan_hukum}
              onChange={formik.handleChange("email_badan_hukum")}
              onBlur={formik.handleBlur("email_badan_hukum")}
              className={`form-control form-layanan ${
                formik.errors.email_badan_hukum && "is-invalid"
              }`}
            />
            {formik.touched.email_badan_hukum && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.email_badan_hukum}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="no_penanggung_jawab">*{t("f_nomer_pt")}</label>
            <input
              name="no_penanggung_jawab"
              type="text"
              value={formik.values.phone_badan_hukum}
              onChange={formik.handleChange("phone_badan_hukum")}
              onBlur={formik.handleBlur("phone_badan_hukum")}
              className={`form-control form-layanan ${
                formik.errors.phone_badan_hukum && "is-invalid"
              }`}
            />
            {formik.touched.phone_badan_hukum && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.phone_badan_hukum}
              </div>
            )}
          </div>
        </Fragment>
      );
    } else if (formik.values.tnos_subservice_id === "2") {
      return (
        <Fragment>
          <div className="form-group mb-2">
            <label htmlFor="name">*{t("nama_lengkap")}</label>
            <input
              type="text"
              name="Name"
              className={`form-control form-layanan`}
              value={formik.values.name}
              readOnly
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email">*Email</label>
            <input
              type="text"
              name="email"
              className={`form-control form-layanan`}
              value={formik.values.email}
              readOnly
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="phone">*{t("no_telepon")}</label>
            <input
              type="text"
              name="phone"
              className={`form-control form-layanan`}
              value={formik.values.phone}
              readOnly
            />
          </div>
          <div className="form-group mb-3">
            <div htmlFor="ktp">*{t("f_ktp_all_pt")}</div>
            <StyleDropzone
              style={formik.errors.file_document && { border: "1px solid red" }}
              {...getRootProps({ className: "dropzone" })}
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </StyleDropzone>
            {formik.touched.file_document && (
              <div id="validationServer03Feedback" className="text-danger">
                {formik.errors.file_document}
              </div>
            )}
            <aside style={thumbsContainer}>{thumbs}</aside>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name_badan_hukum">*Nama PT Opsi pertama</label>
            <input
              value={formik.values.name_badan_hukum1}
              onChange={(e) => {
                setname_badan_hukum1(e.target.value);
                formik.setFieldValue("name_badan_hukum1", e.target.value);
              }}
              onBlur={formik.handleBlur("name_badan_hukum1")}
              className={`form-control form-layanan ${
                formik.errors.name_badan_hukum1 && "is-invalid"
              }`}
              placeholder=""
              type="text"
            />
            {formik.touched.name_badan_hukum1 && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.name_badan_hukum1}
              </div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name_badan_hukum">*Nama PT Opsi kedua</label>
            <input
              defaultValue={formik.values.name_badan_hukum2}
              onChange={(e) => {
                setname_badan_hukum2(e.target.value);
                formik.setFieldValue("name_badan_hukum2", e.target.value);
              }}
              onBlur={formik.handleBlur("name_badan_hukum2")}
              className={`form-control form-layanan ${
                formik.errors.name_badan_hukum2 && "is-invalid"
              }`}
              placeholder=""
              type="text"
            />
            {formik.touched.name_badan_hukum2 && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.name_badan_hukum2}
              </div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name_badan_hukum">*Nama PT Opsi ketiga</label>
            <input
              value={formik.values.name_badan_hukum3}
              onChange={(e) => {
                setname_badan_hukum3(e.target.value);
                formik.setFieldValue("name_badan_hukum3", e.target.value);
              }}
              onBlur={formik.handleBlur("name_badan_hukum3")}
              className={`form-control form-layanan ${
                formik.errors.name_badan_hukum3 && "is-invalid"
              }`}
              placeholder=""
              type="text"
            />
            {formik.touched.name_badan_hukum3 && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.name_badan_hukum3}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="modal_dasar">*{t("f_modal_pt")}</label>
            <input
              type="number"
              name="modal_dasar"
              value={formik.values.modal_dasar}
              onChange={formik.handleChange("modal_dasar")}
              onBlur={formik.handleBlur("modal_dasar")}
              className={`form-control form-layanan ${
                formik.errors.modal_dasar && "is-invalid"
              }`}
            />
            {formik.touched.modal_dasar && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.modal_dasar}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="modal_disetor">*{t("f_disetor_pt")}</label>
            <input
              name="modal_disetor"
              type="number"
              value={formik.values.modal_disetor}
              onChange={formik.handleChange("modal_disetor")}
              onBlur={formik.handleBlur("modal_disetor")}
              className={`form-control form-layanan ${
                formik.errors.modal_disetor && "is-invalid"
              }`}
            />
            {formik.touched.modal_disetor && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.modal_disetor}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="alamat_badan_hukum">*{t("f_alamat_pt")}</label>
            <textarea
              name="alamat_badan_hukum"
              id="alamat_badan_hukum"
              cols="10"
              rows="5"
              value={formik.values.alamat_badan_hukum}
              onChange={formik.handleChange("alamat_badan_hukum")}
              onBlur={formik.handleBlur("alamat_badan_hukum")}
              className={`form-control form-layanan ${
                formik.errors.alamat_badan_hukum && "is-invalid"
              }`}
            ></textarea>
            {formik.touched.alamat_badan_hukum && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.alamat_badan_hukum}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="pemegang_saham">*{t("f_saham_pt")}</label>
            <textarea
              name="pemegang_saham"
              id="pemegang_saham"
              cols="10"
              rows="5"
              defaultValue={formik.values.pemegang_saham}
              onChange={formik.handleChange("pemegang_saham")}
              onBlur={formik.handleBlur("pemegang_saham")}
              className={`form-control form-layanan ${
                formik.errors.pemegang_saham && "is-invalid"
              }`}
            ></textarea>
            {formik.touched.pemegang_saham && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.pemegang_saham}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="susunan_direksi">*{t("f_direksi_pt")}</label>
            <textarea
              name="susunan_direksi"
              id="susunan_direksi"
              cols="10"
              rows="5"
              defaultValue={formik.values.susunan_direksi}
              onChange={formik.handleChange("susunan_direksi")}
              onBlur={formik.handleBlur("susunan_direksi")}
              className={`form-control form-layanan ${
                formik.errors.susunan_direksi && "is-invalid"
              }`}
            ></textarea>
            {formik.touched.susunan_direksi && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.susunan_direksi}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="bidang">
              *{t("f_bidang_pt")}{" "}
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
              defaultValue={formik.values.bidang_usaha}
              onChange={formik.handleChange("bidang_usaha")}
              onBlur={formik.handleBlur("bidang_usaha")}
              className={`form-control form-layanan ${
                formik.errors.bidang_usaha && "is-invalid"
              }`}
            ></textarea>
            {formik.touched.bidang_usaha && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.bidang_usaha}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email">*Email PT & Password</label>
            <input
              name="email"
              type="text"
              value={formik.values.email_badan_hukum}
              onChange={formik.handleChange("email_badan_hukum")}
              onBlur={formik.handleBlur("email_badan_hukum")}
              className={`form-control form-layanan ${
                formik.errors.email_badan_hukum && "is-invalid"
              }`}
            />
            {formik.touched.email_badan_hukum && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.email_badan_hukum}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="no_penanggung_jawab">*{t("f_nomer_pt")}</label>
            <input
              name="no_penanggung_jawab"
              type="text"
              value={formik.values.phone_badan_hukum}
              onChange={formik.handleChange("phone_badan_hukum")}
              onBlur={formik.handleBlur("phone_badan_hukum")}
              className={`form-control form-layanan ${
                formik.errors.phone_badan_hukum && "is-invalid"
              }`}
            />
            {formik.touched.phone_badan_hukum && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.phone_badan_hukum}
              </div>
            )}
          </div>
        </Fragment>
      );
    } else if (formik.values.tnos_subservice_id === "3") {
      return (
        <Fragment>
          <div className="form-group mb-2">
            <label htmlFor="name">*{t("nama_lengkap")}</label>
            <input
              type="text"
              name="Name"
              className={`form-control form-layanan`}
              value={formik.values.name}
              readOnly
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email">*Email</label>
            <input
              type="text"
              name="email"
              className={`form-control form-layanan`}
              value={formik.values.email}
              readOnly
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="phone">*{t("no_telepon")}</label>
            <input
              type="text"
              name="phone"
              className={`form-control form-layanan`}
              value={formik.values.phone}
              readOnly
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="klasifikasi">*{t("klasifikasi_pt")}</label>
            <select
              className={`form-control form-layanan ${
                formik.errors.klasifikasi && "is-invalid"
              }`}
              onChange={formik.handleChange("klasifikasi")}
              onBlur={formik.handleBlur("klasifikasi")}
              value={formik.values.klasifikasi}
              name="klasifikasi"
              id="klasifikasi"
            >
              <option value="">Pilih</option>
              <option value="1">SUPER PLATINUM</option>
              <option value="2">PLATINUM</option>
              <option value="3">SILVER</option>
            </select>
            {formik.touched.klasifikasi && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.klasifikasi}
              </div>
            )}
            <div>{renderKeuntunganKlasifikasi()}</div>
          </div>
          <div className="form-group mb-3">
            <div htmlFor="ktp">*{t("f_ktp_all_pt")}</div>
            <StyleDropzone
              style={formik.errors.file_document && { border: "1px solid red" }}
              {...getRootProps({ className: "dropzone" })}
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </StyleDropzone>
            {formik.touched.file_document && (
              <div id="validationServer03Feedback" className="text-danger">
                {formik.errors.file_document}
              </div>
            )}
            <aside style={thumbsContainer}>{thumbs}</aside>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name_badan_hukum">*Nama PT Opsi pertama</label>
            <input
              value={formik.values.name_badan_hukum1}
              onChange={(e) => {
                setname_badan_hukum1(e.target.value);
                formik.setFieldValue("name_badan_hukum1", e.target.value);
              }}
              onBlur={formik.handleBlur("name_badan_hukum1")}
              className={`form-control form-layanan ${
                formik.errors.name_badan_hukum1 && "is-invalid"
              }`}
              placeholder=""
              type="text"
            />
            {formik.touched.name_badan_hukum1 && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.name_badan_hukum1}
              </div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name_badan_hukum">*Nama PT Opsi kedua</label>
            <input
              defaultValue={formik.values.name_badan_hukum2}
              onChange={(e) => {
                setname_badan_hukum2(e.target.value);
                formik.setFieldValue("name_badan_hukum2", e.target.value);
              }}
              onBlur={formik.handleBlur("name_badan_hukum2")}
              className={`form-control form-layanan ${
                formik.errors.name_badan_hukum2 && "is-invalid"
              }`}
              placeholder=""
              type="text"
            />
            {formik.touched.name_badan_hukum2 && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.name_badan_hukum2}
              </div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name_badan_hukum">*Nama PT Opsi ketiga</label>
            <input
              value={formik.values.name_badan_hukum3}
              onChange={(e) => {
                setname_badan_hukum3(e.target.value);
                formik.setFieldValue("name_badan_hukum3", e.target.value);
              }}
              onBlur={formik.handleBlur("name_badan_hukum3")}
              className={`form-control form-layanan ${
                formik.errors.name_badan_hukum3 && "is-invalid"
              }`}
              placeholder=""
              type="text"
            />
            {formik.touched.name_badan_hukum3 && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.name_badan_hukum3}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="alamat_badan_hukum">*{t("f_alamat_pt")}</label>
            <textarea
              name="alamat_badan_hukum"
              id="alamat_badan_hukum"
              cols="10"
              rows="5"
              value={formik.values.alamat_badan_hukum}
              onChange={formik.handleChange("alamat_badan_hukum")}
              onBlur={formik.handleBlur("alamat_badan_hukum")}
              className={`form-control form-layanan ${
                formik.errors.alamat_badan_hukum && "is-invalid"
              }`}
            ></textarea>
            {formik.touched.alamat_badan_hukum && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.alamat_badan_hukum}
              </div>
            )}
          </div>

          <div className="form-group mb-2">
            <label htmlFor="bidang">
              *{t("f_bidang_pt")}{" "}
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
              defaultValue={formik.values.bidang_usaha}
              onChange={formik.handleChange("bidang_usaha")}
              onBlur={formik.handleBlur("bidang_usaha")}
              className={`form-control form-layanan ${
                formik.errors.bidang_usaha && "is-invalid"
              }`}
            ></textarea>
            {formik.touched.bidang_usaha && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.bidang_usaha}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email">*Email PT & Password</label>
            <input
              name="email"
              type="text"
              value={formik.values.email_badan_hukum}
              onChange={formik.handleChange("email_badan_hukum")}
              onBlur={formik.handleBlur("email_badan_hukum")}
              className={`form-control form-layanan ${
                formik.errors.email_badan_hukum && "is-invalid"
              }`}
            />
            {formik.touched.email_badan_hukum && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.email_badan_hukum}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="no_penanggung_jawab">*{t("f_nomer_pt")}</label>
            <input
              name="no_penanggung_jawab"
              type="text"
              value={formik.values.phone_badan_hukum}
              onChange={formik.handleChange("phone_badan_hukum")}
              onBlur={formik.handleBlur("phone_badan_hukum")}
              className={`form-control form-layanan ${
                formik.errors.phone_badan_hukum && "is-invalid"
              }`}
            />
            {formik.touched.phone_badan_hukum && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.phone_badan_hukum}
              </div>
            )}
          </div>
        </Fragment>
      );
    } else if (formik.values.tnos_subservice_id === "4") {
      return (
        <Fragment>
          <div className="form-group mb-2">
            <label htmlFor="name">*{t("nama_lengkap")}</label>
            <input
              type="text"
              name="Name"
              className={`form-control form-layanan`}
              value={formik.values.name}
              readOnly
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email">*Email</label>
            <input
              type="text"
              name="email"
              className={`form-control form-layanan`}
              value={formik.values.email}
              readOnly
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="phone">*{t("no_telepon")}</label>
            <input
              type="text"
              name="phone"
              className={`form-control form-layanan`}
              value={formik.values.phone}
              readOnly
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="klasifikasi">*{t("klasifikasi_pt")}</label>
            <select
              className={`form-control form-layanan ${
                formik.errors.klasifikasi && "is-invalid"
              }`}
              onChange={formik.handleChange("klasifikasi")}
              onBlur={formik.handleBlur("klasifikasi")}
              value={formik.values.klasifikasi}
              name="klasifikasi"
              id="klasifikasi"
            >
              <option value="">Pilih</option>
              <option value="1">SUPER PLATINUM</option>
              <option value="2">PLATINUM</option>
              <option value="3">SILVER</option>
            </select>
            {formik.touched.klasifikasi && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.klasifikasi}
              </div>
            )}
            <div>{renderKeuntunganKlasifikasi()}</div>
          </div>
          <div className="form-group mb-3">
            <div htmlFor="ktp">*{t("f_ktp_all_pt")}</div>
            <StyleDropzone
              style={formik.errors.file_document && { border: "1px solid red" }}
              {...getRootProps({ className: "dropzone" })}
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </StyleDropzone>
            {formik.touched.file_document && (
              <div id="validationServer03Feedback" className="text-danger">
                {formik.errors.file_document}
              </div>
            )}
            <aside style={thumbsContainer}>{thumbs}</aside>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name_badan_hukum">*Nama PT Opsi pertama</label>
            <input
              value={formik.values.name_badan_hukum1}
              onChange={(e) => {
                setname_badan_hukum1(e.target.value);
                formik.setFieldValue("name_badan_hukum1", e.target.value);
              }}
              onBlur={formik.handleBlur("name_badan_hukum1")}
              className={`form-control form-layanan ${
                formik.errors.name_badan_hukum1 && "is-invalid"
              }`}
              placeholder=""
              type="text"
            />
            {formik.touched.name_badan_hukum1 && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.name_badan_hukum1}
              </div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name_badan_hukum">*Nama PT Opsi kedua</label>
            <input
              defaultValue={formik.values.name_badan_hukum2}
              onChange={(e) => {
                setname_badan_hukum2(e.target.value);
                formik.setFieldValue("name_badan_hukum2", e.target.value);
              }}
              onBlur={formik.handleBlur("name_badan_hukum2")}
              className={`form-control form-layanan ${
                formik.errors.name_badan_hukum2 && "is-invalid"
              }`}
              placeholder=""
              type="text"
            />
            {formik.touched.name_badan_hukum2 && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.name_badan_hukum2}
              </div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name_badan_hukum">*Nama PT Opsi ketiga</label>
            <input
              value={formik.values.name_badan_hukum3}
              onChange={(e) => {
                setname_badan_hukum3(e.target.value);
                formik.setFieldValue("name_badan_hukum3", e.target.value);
              }}
              onBlur={formik.handleBlur("name_badan_hukum3")}
              className={`form-control form-layanan ${
                formik.errors.name_badan_hukum3 && "is-invalid"
              }`}
              placeholder=""
              type="text"
            />
            {formik.touched.name_badan_hukum3 && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.name_badan_hukum3}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="alamat_badan_hukum">*{t("f_alamat_pt")}</label>
            <textarea
              name="alamat_badan_hukum"
              id="alamat_badan_hukum"
              cols="10"
              rows="5"
              value={formik.values.alamat_badan_hukum}
              onChange={formik.handleChange("alamat_badan_hukum")}
              onBlur={formik.handleBlur("alamat_badan_hukum")}
              className={`form-control form-layanan ${
                formik.errors.alamat_badan_hukum && "is-invalid"
              }`}
            ></textarea>
            {formik.touched.alamat_badan_hukum && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.alamat_badan_hukum}
              </div>
            )}
          </div>

          <div className="form-group mb-2">
            <label htmlFor="bidang">
              *{t("f_bidang_pt")}{" "}
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
              defaultValue={formik.values.bidang_usaha}
              onChange={formik.handleChange("bidang_usaha")}
              onBlur={formik.handleBlur("bidang_usaha")}
              className={`form-control form-layanan ${
                formik.errors.bidang_usaha && "is-invalid"
              }`}
            ></textarea>
            {formik.touched.bidang_usaha && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.bidang_usaha}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email">*Email PT & Password</label>
            <input
              name="email"
              type="text"
              value={formik.values.email_badan_hukum}
              onChange={formik.handleChange("email_badan_hukum")}
              onBlur={formik.handleBlur("email_badan_hukum")}
              className={`form-control form-layanan ${
                formik.errors.email_badan_hukum && "is-invalid"
              }`}
            />
            {formik.touched.email_badan_hukum && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.email_badan_hukum}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="no_penanggung_jawab">*{t("f_nomer_pt")}</label>
            <input
              name="no_penanggung_jawab"
              type="text"
              value={formik.values.phone_badan_hukum}
              onChange={formik.handleChange("phone_badan_hukum")}
              onBlur={formik.handleBlur("phone_badan_hukum")}
              className={`form-control form-layanan ${
                formik.errors.phone_badan_hukum && "is-invalid"
              }`}
            />
            {formik.touched.phone_badan_hukum && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.phone_badan_hukum}
              </div>
            )}
          </div>
        </Fragment>
      );
    } else if (formik.values.tnos_subservice_id === "5") {
      return (
        <Fragment>
          <div className="form-group mb-2">
            <label htmlFor="name">*{t("nama_lengkap")}</label>
            <input
              type="text"
              name="Name"
              className={`form-control form-layanan`}
              value={formik.values.name}
              readOnly
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email">*Email</label>
            <input
              type="text"
              name="email"
              className={`form-control form-layanan`}
              value={formik.values.email}
              readOnly
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="phone">*{t("no_telepon")}</label>
            <input
              type="text"
              name="phone"
              className={`form-control form-layanan`}
              value={formik.values.phone}
              readOnly
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="klasifikasi">*{t("klasifikasi_pt")}</label>
            <select
              className={`form-control form-layanan ${
                formik.errors.klasifikasi && "is-invalid"
              }`}
              onChange={formik.handleChange("klasifikasi")}
              onBlur={formik.handleBlur("klasifikasi")}
              value={formik.values.klasifikasi}
              name="klasifikasi"
              id="klasifikasi"
            >
              <option value="">Pilih</option>
              <option value="1">SUPER PLATINUM</option>
              <option value="2">PLATINUM</option>
              <option value="3">SILVER</option>
            </select>
            {formik.touched.klasifikasi && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.klasifikasi}
              </div>
            )}
            <div>{renderKeuntunganKlasifikasi()}</div>
          </div>
          <div className="form-group mb-3">
            <div htmlFor="ktp">*{t("f_ktp_all_pt")}</div>
            <StyleDropzone
              style={formik.errors.file_document && { border: "1px solid red" }}
              {...getRootProps({ className: "dropzone" })}
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </StyleDropzone>
            {formik.touched.file_document && (
              <div id="validationServer03Feedback" className="text-danger">
                {formik.errors.file_document}
              </div>
            )}
            <aside style={thumbsContainer}>{thumbs}</aside>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name_badan_hukum">*Nama PT Opsi pertama</label>
            <input
              value={formik.values.name_badan_hukum1}
              onChange={(e) => {
                setname_badan_hukum1(e.target.value);
                formik.setFieldValue("name_badan_hukum1", e.target.value);
              }}
              onBlur={formik.handleBlur("name_badan_hukum1")}
              className={`form-control form-layanan ${
                formik.errors.name_badan_hukum1 && "is-invalid"
              }`}
              placeholder=""
              type="text"
            />
            {formik.touched.name_badan_hukum1 && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.name_badan_hukum1}
              </div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name_badan_hukum">*Nama PT Opsi kedua</label>
            <input
              defaultValue={formik.values.name_badan_hukum2}
              onChange={(e) => {
                setname_badan_hukum2(e.target.value);
                formik.setFieldValue("name_badan_hukum2", e.target.value);
              }}
              onBlur={formik.handleBlur("name_badan_hukum2")}
              className={`form-control form-layanan ${
                formik.errors.name_badan_hukum2 && "is-invalid"
              }`}
              placeholder=""
              type="text"
            />
            {formik.touched.name_badan_hukum2 && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.name_badan_hukum2}
              </div>
            )}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name_badan_hukum">*Nama PT Opsi ketiga</label>
            <input
              value={formik.values.name_badan_hukum3}
              onChange={(e) => {
                setname_badan_hukum3(e.target.value);
                formik.setFieldValue("name_badan_hukum3", e.target.value);
              }}
              onBlur={formik.handleBlur("name_badan_hukum3")}
              className={`form-control form-layanan ${
                formik.errors.name_badan_hukum3 && "is-invalid"
              }`}
              placeholder=""
              type="text"
            />
            {formik.touched.name_badan_hukum3 && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.name_badan_hukum3}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="alamat_badan_hukum">*{t("f_alamat_pt")}</label>
            <textarea
              name="alamat_badan_hukum"
              id="alamat_badan_hukum"
              cols="10"
              rows="5"
              value={formik.values.alamat_badan_hukum}
              onChange={formik.handleChange("alamat_badan_hukum")}
              onBlur={formik.handleBlur("alamat_badan_hukum")}
              className={`form-control form-layanan ${
                formik.errors.alamat_badan_hukum && "is-invalid"
              }`}
            ></textarea>
            {formik.touched.alamat_badan_hukum && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.alamat_badan_hukum}
              </div>
            )}
          </div>

          <div className="form-group mb-2">
            <label htmlFor="bidang">
              *{t("f_bidang_pt")}{" "}
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
              defaultValue={formik.values.bidang_usaha}
              onChange={formik.handleChange("bidang_usaha")}
              onBlur={formik.handleBlur("bidang_usaha")}
              className={`form-control form-layanan ${
                formik.errors.bidang_usaha && "is-invalid"
              }`}
            ></textarea>
            {formik.touched.bidang_usaha && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.bidang_usaha}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email">*Email PT & Password</label>
            <input
              name="email"
              type="text"
              value={formik.values.email_badan_hukum}
              onChange={formik.handleChange("email_badan_hukum")}
              onBlur={formik.handleBlur("email_badan_hukum")}
              className={`form-control form-layanan ${
                formik.errors.email_badan_hukum && "is-invalid"
              }`}
            />
            {formik.touched.email_badan_hukum && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.email_badan_hukum}
              </div>
            )}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="no_penanggung_jawab">*{t("f_nomer_pt")}</label>
            <input
              name="no_penanggung_jawab"
              type="text"
              value={formik.values.phone_badan_hukum}
              onChange={formik.handleChange("phone_badan_hukum")}
              onBlur={formik.handleBlur("phone_badan_hukum")}
              className={`form-control form-layanan ${
                formik.errors.phone_badan_hukum && "is-invalid"
              }`}
            />
            {formik.touched.phone_badan_hukum && (
              <div id="validationServer03Feedback" className="invalid-feedback">
                {formik.errors.phone_badan_hukum}
              </div>
            )}
          </div>
        </Fragment>
      );
    } else {
      return false;
    }
  };

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/dashboard" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw">{t("badan_hukum_pt")}</h5>
            </Link>
          </div>
          <div className="njwdjhwk">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8 col-xl-8 col-12">
                <p className="text-justify jjdw">{t("p_pt")}</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xl-4 col-12">
                <img src={pt} alt="" className="img-xy" />
              </div>
            </div>
            <hr />
            <KetentuanComponent show={show} setShow={(show) => setShow(show)} />
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
                <label htmlFor="name">*Pilih Layanan</label>
                <select
                  name=""
                  id=""
                  className={`form-control form-layanan ${
                    formik.errors.tnos_subservice_id && "is-invalid"
                  }`}
                  onChange={formik.handleChange("tnos_subservice_id")}
                  onBlur={formik.handleBlur("tnos_subservice_id")}
                  value={formik.values.tnos_subservice_id}
                >
                  <option value="">Pilih</option>
                  <option value="1">PT</option>
                  <option value="2">CV</option>
                  <option value="3">Yayasan</option>
                  <option value="4">Perkumpulan</option>
                  <option value="5">Asosiasi</option>
                </select>
                {formik.touched.tnos_subservice_id && (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.tnos_subservice_id}
                  </div>
                )}
                <div>{renderKeuntungan()}</div>
              </div>
              {renderInputForm()}

              <div className="form-group  mt-3">
                {loading ? (
                  <button
                    className="btn btn-layanan w-100"
                    type="button"
                    disabled
                  >
                    Loading...
                  </button>
                ) : (
                  <button className="btn btn-layanan w-100" type="submit">
                    Lanjut Pembayaran
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default FormTransactionBadanHukumMenu;
