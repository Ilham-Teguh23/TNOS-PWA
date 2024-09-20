/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import cv from "../../assets/images/cv-riwayat.png";
import { useTranslation } from "react-i18next";

import * as Yup from "yup";
import { useFormik } from "formik";
import KetentuanComponent from "../utils/KetentuanComponent";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  badanHukumCreateAction,
  getKabupatenAction,
  getKecamatanAction,
  getKelurahanAction,
  getProvinsiAction,
} from "../../redux/slices/badan-hukum/BadanHukumSlices";
import SelectSearch from "../utils/SelectSearch";
import TitleHeader from "../utils/TitleHeader";
import MenuFooter from "../../components/cummon/MenuFooter"

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

const formSchema = Yup.object({
  name_badan_hukum1: Yup.string().required("Name Opsi 1 is required"),
  name_badan_hukum2: Yup.string().required("Name Opsi 2 is required"),
  name_badan_hukum3: Yup.string().required("Name Opsi 3 is required"),
  file_document: Yup.array().required("Image is required"),
  modal_dasar: Yup.number().required("Modal dasar is required"),
  modal_disetor: Yup.number().required("Modal disetor is required"),
  pemegang_saham: Yup.string().required("Pemegang saham is required"),
  susunan_direksi: Yup.string().required("Susunan_direksi is required"),
  bidang_usaha: Yup.string().required("Bidang usaha is required"),
  email_badan_hukum: Yup.string().required("Email badan hukum is required"),
  phone_badan_hukum: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone badan hukum is required"),
  provinsi: Yup.object().required("Provinsi is required"),
  kabupaten: Yup.object().required("Kabupaten is required"),
  kecamatan: Yup.object().required("kecamatan is required"),
  kelurahan: Yup.object().required("Kelurahan is required"),
  kode_pos: Yup.number()
    .typeError("Kode pos must be a number")
    .required("Kode pos is required"),
  detail_alamat: Yup.string().required("Detail alamat badan hukum is required"),
  ketentuan: Yup.boolean().oneOf([true], "Ketentuan is required"),
});

function BadanHukumCv() {
  TitleHeader("Badan Usaha CV");
  const [name_badan_hukum1, setname_badan_hukum1] = useState("");
  const [name_badan_hukum2, setname_badan_hukum2] = useState("");
  const [name_badan_hukum3, setname_badan_hukum3] = useState("");
  const [prov_id, setProv_id] = useState(null);
  const [kab_id, setKab_id] = useState(null);
  const [kec_id, setKec_id] = useState(null);
  const [kel_id, setKel_id] = useState(null);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storeData = useSelector((store) => store?.badanHukum);
  const { loading, provinsi, kabupaten, kecamatan, kelurahan } = storeData;

  useEffect(() => {
    dispatch(getProvinsiAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getKabupatenAction(prov_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prov_id]);

  useEffect(() => {
    dispatch(getKecamatanAction(kab_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kab_id]);

  useEffect(() => {
    dispatch(getKelurahanAction(kec_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kec_id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tnos_service_id: "3",
      tnos_subservice_id: "2",
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
      ketentuan: false,
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

      values.alamat_badan_hukum = {
        provinsi: {
          id: prov_id,
          nama: values?.provinsi?.label,
        },
        kabupaten: {
          id: kab_id,
          nama: values?.kabupaten?.label,
        },
        kecamatan: {
          id: kec_id,
          nama: values?.kecamatan?.label,
        },
        kelurahan: {
          id: kel_id,
          nama: values?.kelurahan?.label,
        },
        kode_pos: values?.kode_pos,
        detail_alamat: values?.detail_alamat,
      };

      dispatch(badanHukumCreateAction(values))
        .then(({ payload }) => {
          // console.log(payload?.message);
          if (payload?.success === true) {
            // toast.success(payload?.message);
            navigate(`/badan-usaha-cv/` + payload?.detail?.id);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      // console.log(values);
    },
    validationSchema: formSchema,
  });

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "text/*": [".csv", ".pdf", ".doc", ".docx"],
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

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/badan-usaha" className="btn nav-back-arrow">
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
            <KetentuanComponent
              show={show}
              setShow={(show) => setShow(show)}
              kode={`2`}
            />
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
              <div className="form-group mb-3">
                <div htmlFor="ktp">*{t("f_ktp_all_pt")}</div>
                <StyleDropzone
                  style={
                    formik.errors.file_document && { border: "1px solid red" }
                  }
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
                <label htmlFor="name_badan_hukum">*Nama CV opsi pertama</label>
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
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.name_badan_hukum1}
                  </div>
                )}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="name_badan_hukum">*Nama CV opsi kedua</label>
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
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.name_badan_hukum2}
                  </div>
                )}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="name_badan_hukum">*Nama CV opsi ketiga</label>
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
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
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
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
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
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.modal_disetor}
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
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
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
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
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
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.bidang_usaha}
                  </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">*Email CV & Password</label>
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
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
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
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.phone_badan_hukum}
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group mb-2">
                    <label htmlFor="provinsi">*Provinsi</label>
                    <SelectSearch
                      onChange={formik.setFieldValue}
                      onBlur={formik.setFieldTouched}
                      value={formik.values.provinsi?.label}
                      error={formik.errors.provinsi}
                      touched={formik.touched.provinsi}
                      data={provinsi?.provinsi}
                      id="provinsi"
                      valueId={(e) => setProv_id(e)}
                      className="form-layanan"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group mb-2">
                    <label htmlFor="kabupaten">*Kabupaten/Kota</label>
                    <SelectSearch
                      onChange={formik.setFieldValue}
                      onBlur={formik.setFieldTouched}
                      value={formik.values.kabupaten?.label}
                      error={formik.errors.kabupaten}
                      touched={formik.touched.kabupaten}
                      data={kabupaten?.kota_kabupaten}
                      id="kabupaten"
                      valueId={(e) => setKab_id(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group mb-2">
                    <label htmlFor="kecamatan">*Kecamatan</label>
                    <SelectSearch
                      onChange={formik.setFieldValue}
                      onBlur={formik.setFieldTouched}
                      value={formik.values.kecamatan?.label}
                      error={formik.errors.kecamatan}
                      touched={formik.touched.kecamatan}
                      data={kecamatan?.kecamatan}
                      id="kecamatan"
                      valueId={(e) => setKec_id(e)}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group mb-2">
                    <label htmlFor="kelurahan">*kelurahan</label>
                    <SelectSearch
                      onChange={formik.setFieldValue}
                      onBlur={formik.setFieldTouched}
                      value={formik.values.kelurahan?.label}
                      error={formik.errors.kelurahan}
                      touched={formik.touched.kelurahan}
                      data={kelurahan?.kelurahan}
                      id="kelurahan"
                      valueId={(e) => setKel_id(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="kode_pos">*Kode Pos</label>
                <input
                  name="no_penanggung_jawab"
                  type="text"
                  value={formik.values.kode_pos}
                  onChange={formik.handleChange("kode_pos")}
                  onBlur={formik.handleBlur("kode_pos")}
                  className={`form-control form-layanan ${
                    formik.errors.kode_pos && "is-invalid"
                  }`}
                />
                {formik.touched.kode_pos && (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.kode_pos}
                  </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="detail_alamat">*Detail Alamat</label>
                <textarea
                  name="detail_alamat"
                  id="detail_alamat"
                  cols="10"
                  rows="5"
                  defaultValue={formik.values.detail_alamat}
                  onChange={formik.handleChange("detail_alamat")}
                  onBlur={formik.handleBlur("detail_alamat")}
                  className={`form-control form-layanan ${
                    formik.errors.detail_alamat && "is-invalid"
                  }`}
                ></textarea>
                {formik.touched.detail_alamat && (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.detail_alamat}
                  </div>
                )}
              </div>
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  id="ketentuan"
                  value={formik.values.ketentuan}
                  onChange={formik.handleChange("ketentuan")}
                  onBlur={formik.handleBlur("ketentuan")}
                  className={`form-check-input  ${
                    formik.errors.ketentuan && "is-invalid"
                  }`}
                />
                <label
                  className="form-check-label"
                  htmlFor="ketentuan"
                  style={{ fontSize: "13px" }}
                >
                  Saya Menyetujui Ketentuan Dan Persyaratan{" "}
                  <span
                    onClick={() =>
                      window.open(
                        "https://tnosbantuan.freshdesk.com/support/solutions/articles/150000042230",
                        "_blank"
                      )
                    }
                    style={{
                      borderBottom: `${
                        formik.errors.ketentuan
                          ? "1px solid rgb(223 85 93)"
                          : "1px solid rgb(167 167 167)"
                      }`,
                      cursor: "pointer",
                    }}
                  >
                    Pemesanan Layanan
                  </span>
                </label>
              </div>
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
      <MenuFooter footer={false} />
    </Fragment>
  );
}

export default BadanHukumCv;
