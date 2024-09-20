import React from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import "../../../assets/css/allLayanan.css";
import Gap from "../../moleculars/Gap";
import LabelComponent from "../../atoms/LabelComponent";
import InputComponent from "../../atoms/InputComponent";
import ButtonComponent from "../../atoms/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { lainnyaSchema } from "../../utils/formSchema";
import TextError from "../../atoms/TextError";
import { useDropzone } from "react-dropzone";
import iconFileInput from "../../../assets/images/new pwa icon/inputFile/inputFileIcon.svg";
import fileUploadIcon from "../../../assets/images/new pwa icon/inputFile/file-upload.svg";
import { useDispatch } from "react-redux";
import { badanHukumCreate } from "../../../redux/action/paymentAction";
import { showMessage } from "../../utils/Message";
import TitleHeader from "../../utils/TitleHeader";

function PembubaranPerseroan() {
  TitleHeader("Halaman Pembubaran Perseroan Terbatas");
  var user = JSON.parse(localStorage.getItem("userInfo"));
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "text/*": [".csv", ".pdf", ".doc", ".docx"],
    },
    onDrop: (acceptedFiles) => {
      formik.setFieldValue("file_document", acceptedFiles);
    },
    multiple: true,
    onBlur: () => {
      formik.handleBlur("file_document");
    },
    onDropRejected: () => {
      showMessage("File size exceeds the maximum limit", "error");
    },
    maxSize: 1024 * 1024,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tnos_service_id: "3",
      tnos_subservice_id: "6",
      name_badan_hukum1: "",
      user_id: user.mmbr_code,
      name: user.mmbr_name,
      email: user.mmbr_email,
      phone: user.mmbr_phone,
      file_document: "",
      email_badan_hukum: "",
      phone_badan_hukum: "",
    },
    onSubmit: async (values) => {
      //   console.log(values);
      dispatch(await badanHukumCreate(values, navigate, "/others/checkout/"));
    },
    validationSchema: lainnyaSchema,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <>
      <TopNewNav
        title="Pembubaran Perseroan Terbatas"
        path={`/business-or-legal-entity`}
      />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container">
              <div className="payment-content">
                <div className="container-layanan-f">
                  <Gap height={10} />

                  <form action="">
                    <div className="form-group mb-2">
                      <LabelComponent label="Dokumen Tambahan (Opsional)" />
                      <div {...getRootProps({ className: "form-payment" })}>
                        <input {...getInputProps()} />
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          className="input-file-container"
                        >
                          <div
                            className="left-content"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={iconFileInput}
                              alt=""
                              style={{ marginRight: "10px" }}
                            />
                            <div
                              className="placeholder-f"
                              style={{ color: "var(--border-color1)" }}
                            >
                              {files.length > 0
                                ? `${files.length} file`
                                : "Pilih atau Drag file"}
                            </div>
                          </div>
                          <div className="right-content">
                            <img src={fileUploadIcon} alt="" />
                          </div>
                        </div>
                      </div>
                      {files.length > 0 ? (
                        <div className="container-file-display">
                          <h4>Files</h4>
                          <ul style={{ display: "block" }}>{files}</ul>
                        </div>
                      ) : (
                        ""
                      )}
                      {formik.errors.file_document &&
                      formik.touched.file_document ? (
                        <TextError error={formik.errors.file_document} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group mb-2">
                      <LabelComponent id="name_badan_hukum1" label="Nama PT" />
                      <InputComponent
                        id="name_badan_hukum1"
                        name="name_badan_hukum1"
                        type={"text"}
                        placeholder={"Masukkan nama usaha"}
                        defaultValue={formik.values.name_badan_hukum1}
                        onChange={formik.handleChange("name_badan_hukum1")}
                        onBlur={formik.handleBlur("name_badan_hukum1")}
                      />
                      {formik.errors.name_badan_hukum1 &&
                      formik.touched.name_badan_hukum1 ? (
                        <TextError error={formik.errors.name_badan_hukum1} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group mb-2">
                      <LabelComponent label="Email Usaha & Password" />
                      <InputComponent
                        type={"text"}
                        placeholder={"123@gmail.com Password=1234"}
                        defaultValue={formik.values.email_badan_hukum}
                        onChange={formik.handleChange("email_badan_hukum")}
                        onBlur={formik.handleBlur("email_badan_hukum")}
                      />
                      {formik.errors.email_badan_hukum &&
                      formik.touched.email_badan_hukum ? (
                        <TextError error={formik.errors.email_badan_hukum} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group mb-2">
                      <LabelComponent label="Nomor HP Penanggung Jawab" />
                      <InputComponent
                        type={"text"}
                        placeholder={"Masukkan nomor HP"}
                        defaultValue={formik.values.phone_badan_hukum}
                        onChange={formik.handleChange("phone_badan_hukum")}
                        onBlur={formik.handleBlur("phone_badan_hukum")}
                      />
                      {formik.errors.phone_badan_hukum &&
                      formik.touched.phone_badan_hukum ? (
                        <TextError error={formik.errors.phone_badan_hukum} />
                      ) : (
                        ""
                      )}
                    </div>
                    <Gap height={70} />
                    <ButtonComponent
                      title={"Lanjut Pembayaran"}
                      type="submit"
                      onClick={formik.handleSubmit}
                      // onClick={() => handlePayment()}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PembubaranPerseroan;
