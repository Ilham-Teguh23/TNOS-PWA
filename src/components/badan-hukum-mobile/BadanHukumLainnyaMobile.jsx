/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Fragment } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { badanHukumCreateAction } from "../../redux/slices/badan-hukum/BadanHukumSlices";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const formSchema = Yup.object({
  needs: Yup.string().required("Pemegang saham is required"),
  harga_total: Yup.number()
    .positive()
    .min(1)
    .typeError("Nominal pembayaran must be a number")
    .required("Nominal pembayaran is required"),
  ketentuan: Yup.boolean().oneOf([true], "Ketentuan is required"),
  file_document: Yup.array(),
});

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

function BadanHukumLainnyaMobile() {
  const user = JSON.parse(localStorage.getItem("data"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storeData = useSelector((store) => store?.badanHukum);
  const { loading } = storeData;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tnos_service_id: "3",
      tnos_subservice_id: "6",
      user_id: user?.user_id,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      needs: "",
      harga_total: "",
      ketentuan: false,
      file_document: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      dispatch(badanHukumCreateAction(values))
        .then(({ payload }) => {
          // console.log(payload?.message);
          if (payload?.success === true) {
            // toast.success(payload?.message);
            navigate(`/badan-usaha-lainnya-m/detail/` + payload?.detail?.id);
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/badan-usaha-m" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw">Pembayaran Lainnya</h5>
            </Link>
          </div>
          <div className="njwdjhwk">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12 col-12">
                <p className="text-justify jjdw">
                  Contoh pengisian: Sertifikat jasa Usaha Kontruksi, Penjagaan
                  Rumah Jl. Pondok Indah atau yang lainnya.
                </p>
              </div>
              {/* <div className="col-lg-4 col-md-4 col-sm-4 col-xl-4 col-12">
                <img src={pt} alt="" className="img-xy" />
              </div> */}
            </div>
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
                <label htmlFor="needs">*Keperluan</label>
                <textarea
                  name="susunan_direksi"
                  id="susunan_direksi"
                  cols="10"
                  rows="5"
                  value={formik.values.needs}
                  onChange={formik.handleChange("needs")}
                  onBlur={formik.handleBlur("needs")}
                  className={`form-control form-layanan ${
                    formik.errors.needs && "is-invalid"
                  }`}
                ></textarea>
                {formik.touched.needs && (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.needs}
                  </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="harga_total">
                  *Biaya (Isi nominal sesuai kesepakatan)
                </label>
                <input
                  name="harga_total"
                  type="number"
                  value={formik.values.harga_total}
                  onChange={formik.handleChange("harga_total")}
                  onBlur={formik.handleBlur("harga_total")}
                  className={`form-control form-layanan ${
                    formik.errors.harga_total && "is-invalid"
                  }`}
                />
                {formik.touched.harga_total && (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.harga_total}
                  </div>
                )}
              </div>
              <div className="form-group mb-3">
                <div htmlFor="ktp">*Dokumen Tambahan</div>
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
    </Fragment>
  );
}

export default BadanHukumLainnyaMobile;
