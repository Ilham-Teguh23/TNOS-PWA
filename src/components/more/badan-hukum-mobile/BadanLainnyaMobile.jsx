import React, { useEffect, useState } from "react";
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
import {
  badanHukumCreate,
  getAgent,
} from "../../../redux/action/paymentAction";
import { showMessage } from "../../utils/Message";
import TitleHeader from "../../utils/TitleHeader";
import InputCheckboxComponent from "../../atoms/InputCheckboxComponent";
import InputSelectComponent from "../../atoms/InputSelectComponent";
import { useSelector } from "react-redux";
import { decode as base64_decode } from "base-64";
import { getParams } from "../../moleculars/GetParams";
var CryptoJS = require("crypto-js");

const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

function BadanLainnyaMobile() {
  TitleHeader("Halaman Lainnya");
  const user = JSON.parse(localStorage.getItem("data"));
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
  const [getP, setP] = useState(null);
  const [usersData, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const dispatch = useDispatch();
  const storeData = useSelector((store) => store?.global);
  const { agent } = storeData;

  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tnos_service_id: "3",
      tnos_subservice_id: "6",
      harga_total: 0,
      needs: "",
      partner: "",
      user_id: user?.user_id,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      file_document: "",
      ketentuan_cek: false,
      params: getP
    },
    onSubmit: async (values) => {
      dispatch(
        await badanHukumCreate(
          values,
          navigate,
          "/badan-usaha-lainnya-m/checkout/"
        )
      );
    },
    validationSchema: lainnyaSchema,
  });

  useEffect(() => {
    fetchAgent();
    checkParams()
  }, []);

  const fetchAgent = async () => {
    dispatch(await getAgent());
  };

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const agentConvert = agent?.map((row) => {
    return {
      value: row?.id,
      label: `${row?.code} - ${row?.name}`,
    };
  });

  const checkParams = () => {
    let checkP = getParams(["query"]);

    if (!checkP) {
      console.log("params tidak ditemukan");
    } else {
      var base64regex =
        /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
      if (!base64regex.test(checkP.query)) {
        console.log("data base64 tidak cocok");
        navigate("/not-found");
      } else {
        let string = base64_decode(checkP.query);
        let cryptdata = string;
        const info2x = CryptoJS.AES.decrypt(cryptdata, secretKey).toString(
          CryptoJS.enc.Utf8
        );

        if (!info2x) {
          console.log("data base64 not match when decrypt");
        } else {
          var paramValue = JSON.parse(info2x);
          console.log(paramValue);
          setUser(paramValue);
          setP(checkP.query);
          localStorage.setItem("data", JSON.stringify(paramValue));
        }
        if (!localStorage.getItem("data")) {
          if (!paramValue.user_id) {
            console.log("salah");
            navigate("/not-found");
          }
        }
      }
    }
  };

  return (
    <>
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container" style={{ marginTop: "0px" }}>
              <div className="payment-content">
                <div className="container-layanan-f">
                  <Gap height={10} />
                  <form action="">
                    <div className="form-group mb-2">
                      <LabelComponent
                        id="needs"
                        label="Contoh pengisian: Sertifikat Jasa Usaha Konstruksi atau yang lainnya."
                      />
                      <div className="form-group mb-2 mt-4">
                        <LabelComponent label="Nama Partners" />
                        <InputSelectComponent
                          options={agentConvert}
                          onChange={formik.setFieldValue}
                          onBlur={formik.setFieldTouched}
                          value={formik.values.partner.value}
                          id="partner"
                        />

                        {formik.errors.partner && formik.touched.partner ? (
                          <TextError error={formik.errors.partner} />
                        ) : (
                          ""
                        )}
                      </div>
                      <LabelComponent label="Keperluan" />
                      <textarea
                        name="needs"
                        id="needs"
                        cols="10"
                        rows="5"
                        placeholder="Masukan keperluan anda"
                        value={formik.values.needs}
                        onChange={formik.handleChange("needs")}
                        onBlur={formik.handleBlur("needs")}
                        className={`form-payment ${
                          formik.errors.needs && "is-invalid"
                        }`}
                      />
                      {formik.errors.needs && formik.touched.needs ? (
                        <TextError error={formik.errors.needs} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group mb-2">
                      <LabelComponent
                        id="harga_total"
                        label="Biaya (Isi nominal sesuai kesepakatan)"
                      />
                      <InputComponent
                        id="harga_total"
                        type={"number"}
                        placeholder={"Biaya (Isi nominal sesuai kesepakatan)"}
                        defaultValue={formik.values.harga_total}
                        onChange={formik.handleChange("harga_total")}
                        onBlur={formik.handleBlur("harga_total")}
                      />
                      {formik.errors.harga_total &&
                      formik.touched.harga_total ? (
                        <TextError error={formik.errors.harga_total} />
                      ) : (
                        ""
                      )}
                    </div>
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
                      <InputCheckboxComponent
                        id="ketentuan_cek"
                        label="Saya menyetujui ketentuan & persyaratan Pemesanan
                        Layanan"
                        value={formik.values.ketentuan_cek}
                        onChange={formik.handleChange("ketentuan_cek")}
                        onBlur={formik.handleBlur("ketentuan_cek")}
                        typeLayanan="badan-usaha-atau-hukum"
                      />
                      {formik.errors.ketentuan_cek &&
                      formik.touched.ketentuan_cek ? (
                        <TextError error={formik.errors.ketentuan_cek} />
                      ) : (
                        ""
                      )}
                    </div>
                    <Gap height={70} />
                    <ButtonComponent
                      title={"Lanjut Pembayaran"}
                      type="submit"
                      onClick={formik.handleSubmit}
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

export default BadanLainnyaMobile;
