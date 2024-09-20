import React, { useEffect, useState } from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import "../../../assets/css/allLayanan.css";
import Gap from "../../moleculars/Gap";
import LabelComponent from "../../atoms/LabelComponent";
import InputComponent from "../../atoms/InputComponent";
import InputSusunanComponent from "../../moleculars/InputSusunanComponent";
import ShowValueInputSusunan from "../../moleculars/ShowValueInputSusunan";
import ButtonComponent from "../../atoms/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { yayasanSchema } from "../../utils/formSchema";
import TextError from "../../atoms/TextError";
import { useDropzone } from "react-dropzone";
import iconFileInput from "../../../assets/images/new pwa icon/inputFile/inputFileIcon.svg";
import fileUploadIcon from "../../../assets/images/new pwa icon/inputFile/file-upload.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  badanHukumCreate,
  getKabupaten,
  getKecamatan,
  getKelurahan,
  getProvinsi,
  getAgent
} from "../../../redux/action/paymentAction";
import InputSelectSearchComponent from "../../atoms/InputSelectSearchComponent";
import InputCreatetableSelectComponent from "../../atoms/InputCreatetableSelectComponent";
import { showMessage } from "../../utils/Message";
import TitleHeader from "../../utils/TitleHeader";
import ModalComponent from "../../moleculars/ModalComponent";
import KetentuanComponentNew from "../../moleculars/KetentuanComponentNew";
import InputCheckboxComponent from "../../atoms/InputCheckboxComponent";
import InputSelectComponent from "../../atoms/InputSelectComponent";

function BadanYayasan() {
  TitleHeader("Halaman Yayasan");
  var user = JSON.parse(localStorage.getItem("userInfo"));
  const [isModalVisible, setIsModalVisible] = useState(false);
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
  const storeData = useSelector((store) => store?.global);
  const { provinsi, agent, kabupaten, kecamatan, kelurahan } = storeData;
  const [prov_id, setProv_id] = useState(null);
  const [kab_id, setKab_id] = useState(null);
  const [kec_id, setKec_id] = useState(null);

  // const [bidangUsaha, setBidangUsaha] = useState("");
  // console.log(bidangUsaha);

  const navigate = useNavigate();

  const agentConvert = agent?.map((row) => {
    return {
      value: row?.id,
      label: `${row?.code} - ${row?.name}`
    }
  })

  const provinsiConvert = provinsi?.map((row) => {
    return {
      value: row?.id,
      label: row?.nama,
    };
  });

  const kabuptenConvert = kabupaten?.map((row) => {
    return {
      value: row?.id,
      label: row?.nama,
    };
  });

  const kecamatanConvert = kecamatan?.map((row) => {
    return {
      value: row?.id,
      label: row?.nama,
    };
  });

  const kelurahanConvert = kelurahan?.map((row) => {
    return {
      value: row?.id,
      label: row?.nama,
    };
  });

  useEffect(() => {
    fetchProvinsi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchAgent();
  }, []);

  useEffect(() => {
    fetchKabupaten(prov_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prov_id]);

  useEffect(() => {
    fetchKecamatan(kab_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kab_id]);

  useEffect(() => {
    fetchKelurahan(kec_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kec_id]);

  const fetchAgent = async () => {
    dispatch(await getAgent());
  };

  const fetchProvinsi = async () => {
    dispatch(await getProvinsi());
  };

  const fetchKabupaten = async (id) => {
    dispatch(await getKabupaten(id));
  };
  const fetchKecamatan = async (id) => {
    dispatch(await getKecamatan(id));
  };
  const fetchKelurahan = async (id) => {
    dispatch(await getKelurahan(id));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tnos_service_id: "3",
      tnos_subservice_id: "3",
      name_badan_hukum: "",
      name_badan_hukum1: "",
      name_badan_hukum2: "",
      name_badan_hukum3: "",
      domisili_sekarang: "",
      jalan: "",
      rt: "",
      rw: "",
      provinsi: "",
      partner: "",
      kabupaten: "",
      kecamatan: "",
      kelurahan: "",
      kode_pos: "",
      bidang_usaha: "",
      email_badan_hukum: "",
      user_id: user.mmbr_code,
      name: user.mmbr_name,
      email: user.mmbr_email,
      phone: user.mmbr_phone,
      file_document: "",
      phone_badan_hukum: "",
      alamat_badan_hukum: {},
      susunan_direksi: "",
      ketentuan_cek: false,
    },
    onSubmit: async (values) => {
      values.name_badan_hukum = [
        {
          opsi: values.name_badan_hukum1,
        },
        {
          opsi: values.name_badan_hukum2,
        },
        {
          opsi: values.name_badan_hukum3,
        },
      ];

      values.alamat_badan_hukum = {
        domisili_sekarang: values.domisili_sekarang,
        jalan: values.jalan,
        rt: values.rt,
        rw: values.rw,
        provinsi: values.provinsi,
        kabupaten: values.kabupaten,
        kecamatan: values.kecamatan,
        kelurahan: values.kelurahan,
        kode_pos: values.kode_pos,
      };

      console.log(values);
      dispatch(
        await badanHukumCreate(values, navigate, "/foundation/checkout/")
      );
    },
    validationSchema: yayasanSchema,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <>
      <TopNewNav
        title="Pembuatan Legalitas Yayasan"
        path={`/business-or-legal-entity`}
      />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container">
              <div className="container-ketentuan-f">
                <b>Ketentuan Pendirian Yayasan</b>
                <p>
                  1. Ketentuan nama Yayasan
                  <br />
                  Untuk nama Yayasan, mohon untuk mengajukan 3 (tiga) nama
                  Yayasan dengan aturan:
                </p>
                <div
                  className="container-button-detail-ketentuan-f"
                  onClick={() => setIsModalVisible(true)}
                >
                  Lihat Detail
                </div>
              </div>
              <div className="payment-content">
                <div className="container-layanan-f">
                  <form action="">
                    <div className="form-group mb-2">
                      <LabelComponent label="Nama Partners" />
                      <InputSelectComponent 
                        options={agentConvert} 
                        onChange={formik.setFieldValue} 
                        onBlur={formik.setFieldTouched} 
                        value={formik.values.partner.value} 
                        id="partner" />

                      {formik.errors.partner &&
                        formik.touched.partner ? (
                        <TextError error={formik.errors.partner} />
                      ) : (
                        ""
                      )}
                    </div>
                    <b className="title-layanan-f">Informasi Yayasan</b>
                    <Gap height={10} />
                    <div className="form-group mb-2">
                      <LabelComponent label="Upload KTP & NPWP seluruh Pengurus" />
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
                      <LabelComponent
                        id="name_badan_hukum1"
                        label="Nama Yayasan (opsi pertama)"
                      />
                      <InputComponent
                        type={"text"}
                        placeholder={"Masukkan nama yayasan"}
                        defaultValue={formik.values.name_badan_hukum1}
                        onChange={formik.handleChange("name_badan_hukum1")}
                        onBlur={formik.handleBlur("name_badan_hukum1")}
                        id="name_badan_hukum1"
                        name="name_badan_hukum1"
                      />
                      {formik.errors.name_badan_hukum1 &&
                        formik.touched.name_badan_hukum1 ? (
                        <TextError error={formik.errors.name_badan_hukum1} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group mb-2">
                      <LabelComponent
                        id="name_badan_hukum2"
                        label="Nama Yayasan (opsi kedua)"
                      />
                      <InputComponent
                        id="name_badan_hukum2"
                        name="name_badan_hukum2"
                        type={"text"}
                        placeholder={"Masukkan nama yayasan"}
                        defaultValue={formik.values.name_badan_hukum2}
                        onChange={formik.handleChange("name_badan_hukum2")}
                        onBlur={formik.handleBlur("name_badan_hukum2")}
                      />
                      {formik.errors.name_badan_hukum2 &&
                        formik.touched.name_badan_hukum2 ? (
                        <TextError error={formik.errors.name_badan_hukum2} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group mb-2">
                      <LabelComponent
                        id="name_badan_hukum3"
                        label="Nama Yayasan (opsi ketiga)"
                      />
                      <InputComponent
                        id="name_badan_hukum3"
                        name="name_badan_hukum3"
                        type={"text"}
                        placeholder={"Masukkan nama yayasan"}
                        defaultValue={formik.values.name_badan_hukum3}
                        onChange={formik.handleChange("name_badan_hukum3")}
                        onBlur={formik.handleBlur("name_badan_hukum3")}
                      />
                      {formik.errors.name_badan_hukum3 &&
                        formik.touched.name_badan_hukum3 ? (
                        <TextError error={formik.errors.name_badan_hukum3} />
                      ) : (
                        ""
                      )}
                    </div>
                    <hr />
                    <b className="title-layanan-f">Domisili Yayasan</b>
                    <Gap height={10} />
                    <div className="form-group mb-2">
                      <LabelComponent
                        id="domisili_sekarang"
                        label="Domisili Yayasan"
                      />
                      <InputComponent
                        id="domisili_sekarang"
                        type={"text"}
                        placeholder={"Masukkan Domisili Usaha"}
                        defaultValue={formik.values.domisili_sekarang}
                        onChange={formik.handleChange("domisili_sekarang")}
                        onBlur={formik.handleBlur("domisili_sekarang")}
                      />
                      {formik.errors.domisili_sekarang &&
                        formik.touched.domisili_sekarang ? (
                        <TextError error={formik.errors.domisili_sekarang} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group mb-2">
                      <LabelComponent id="jalan" label="Nomor/Blok" />
                      <InputComponent
                        id="jalan"
                        type={"text"}
                        placeholder={"Masukkan Nomor/Blok"}
                        defaultValue={formik.values.jalan}
                        onChange={formik.handleChange("jalan")}
                        onBlur={formik.handleBlur("jalan")}
                      />
                      {formik.errors.jalan && formik.touched.jalan ? (
                        <TextError error={formik.errors.jalan} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group mb-2">
                          <LabelComponent id="rt" label="RT" />
                          <InputComponent
                            id="rt"
                            type={"text"}
                            placeholder={"Masukkan RT"}
                            defaultValue={formik.values.rt}
                            onChange={formik.handleChange("rt")}
                            onBlur={formik.handleBlur("rt")}
                          />
                          {formik.errors.rt && formik.touched.rt ? (
                            <TextError error={formik.errors.rt} />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group mb-2">
                          <LabelComponent id="rw" label="RW" />
                          <InputComponent
                            id="rw"
                            type={"text"}
                            placeholder={"Masukkan RW"}
                            defaultValue={formik.values.rw}
                            onChange={formik.handleChange("rw")}
                            onBlur={formik.handleBlur("rw")}
                          />
                          {formik.errors.rw && formik.touched.rw ? (
                            <TextError error={formik.errors.rw} />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group mb-2">
                      <LabelComponent label="Provinsi" />
                      <InputSelectSearchComponent
                        options={provinsiConvert}
                        onChange={formik.setFieldValue}
                        onBlur={formik.setFieldTouched}
                        value={formik.values.provinsi.label}
                        id="provinsi"
                        valueId={(e) => setProv_id(e)}
                      />
                    </div>
                    {formik.errors.provinsi && formik.touched.provinsi ? (
                      <TextError error={formik.errors.provinsi} />
                    ) : (
                      ""
                    )}
                    <div className="form-group mb-2">
                      <LabelComponent label="Kota/Kabupaten" />
                      <InputSelectSearchComponent
                        options={kabuptenConvert}
                        onChange={formik.setFieldValue}
                        onBlur={formik.setFieldTouched}
                        value={formik?.values?.kabupaten?.label}
                        id="kabupaten"
                        valueId={(e) => setKab_id(e)}
                      />
                      {formik.errors.kabupaten && formik.touched.kabupaten ? (
                        <TextError error={formik.errors.kabupaten} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group mb-2">
                      <LabelComponent label="Kecamatan" />
                      <InputSelectSearchComponent
                        options={kecamatanConvert}
                        onChange={formik.setFieldValue}
                        onBlur={formik.setFieldTouched}
                        value={formik?.values?.kecamatan?.label}
                        id="kecamatan"
                        valueId={(e) => setKec_id(e)}
                      />
                      {formik.errors.kecamatan && formik.touched.kecamatan ? (
                        <TextError error={formik.errors.kecamatan} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group mb-2">
                      <LabelComponent label="Kelurahan" />
                      <InputSelectSearchComponent
                        options={kelurahanConvert}
                        onChange={formik.setFieldValue}
                        onBlur={formik.setFieldTouched}
                        value={formik?.values?.kelurahan?.label}
                        id="kelurahan"
                      />
                      {formik.errors.kelurahan && formik.touched.kelurahan ? (
                        <TextError error={formik.errors.kelurahan} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group mb-2">
                      <LabelComponent id="kode_post" label="Kode Pos" />
                      <InputComponent
                        id="kode_post"
                        type={"text"}
                        placeholder={"Masukkan kode pos"}
                        defaultValue={formik.values.kode_pos}
                        onChange={formik.handleChange("kode_pos")}
                        onBlur={formik.handleBlur("kode_pos")}
                      />
                      {formik.errors.kode_pos && formik.touched.kode_pos ? (
                        <TextError error={formik.errors.kode_pos} />
                      ) : (
                        ""
                      )}
                    </div>
                    <hr />
                    <b className="title-layanan-f">Informasi Pengurus</b>
                    <Gap height={10} />
                    <div className="form-group mb-2">
                      <LabelComponent label="Susunan Pengurus" />
                      <Gap height={10} />
                      <ShowValueInputSusunan
                        value={formik.values.susunan_direksi}
                        setValue={(e) =>
                          formik.setFieldValue("susunan_direksi", e)
                        }
                        type="direksi"
                      />
                      <InputSusunanComponent
                        value={formik.values.susunan_direksi}
                        setValue={(e) =>
                          formik.setFieldValue("susunan_direksi", e)
                        }
                        onBlur={formik.handleBlur("susunan_direksi")}
                        component={[
                          {
                            field1: "name",
                            field2: "jabatan",
                            value: "",
                          },
                        ]}
                      />
                      {formik.errors.susunan_direksi &&
                        formik.touched.susunan_direksi ? (
                        <TextError error={formik.errors.susunan_direksi} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group mb-2">
                      <LabelComponent
                        label="Bidang Usaha KBLI 2020 ( (Maksimal 5, dapat dilihat di 
                        https://oss.go.id/informasi/kbli-berbasis-risiko)"
                      />
                      <InputCreatetableSelectComponent
                        onChange={formik.setFieldValue}
                        onBlur={formik.setFieldTouched}
                        value={formik.values.bidang_usaha.label}
                        id="bidang_usaha"
                      />
                      {formik.errors.bidang_usaha &&
                        formik.touched.bidang_usaha ? (
                        <TextError error={formik.errors.bidang_usaha} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group mb-2">
                      <LabelComponent label="Email Yayasan & Password" />
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
                    <div className="form-group mb-2">
                      <InputCheckboxComponent
                        id="ketentuan_cek"
                        label="Saya menyetujui ketentuan & persyaratan Pemesanan
                        Layanan"
                        value={formik.values.ketentuan_cek}
                        onChange={formik.handleChange("ketentuan_cek")}
                        onBlur={formik.handleBlur("ketentuan_cek")}
                        typeLayanan="legalitas"
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
                    // onClick={() => handlePayment()}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalComponent
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        // onClick={}
        type="kententuan"
      >
        <KetentuanComponentNew type="Badan Hukum Yayasan" />
      </ModalComponent>
    </>
  );
}

export default BadanYayasan;
