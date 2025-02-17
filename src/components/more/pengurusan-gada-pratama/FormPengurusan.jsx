import React from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import IconPratamaGada from "../../../assets/images/PratamaGadaIcon.png"
import LabelComponent from "../../atoms/LabelComponent";
import InputComponent from "../../atoms/InputComponent";
import TextError from "../../atoms/TextError";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InputCheckboxComponent from "../../atoms/InputCheckboxComponent";
import Gap from "../../moleculars/Gap";
import ButtonComponent from "../../atoms/ButtonComponent";
import { useDropzone } from "react-dropzone";
import { showMessage } from "../../utils/Message";
import { formPengurusanSchema } from "../../utils/formSchema";
import FileUploadComponent from "../../file-upload/FileUploadComponent";
import { pelatihanGadaPratama } from "../../../redux/action/paymentAction";
import { useDispatch } from "react-redux";
import AccordionContent from "../../moleculars/AccordionContent";
import AccordionCustom from "../../moleculars/AccordionCustom";

export default () => {

    var user = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate()
    const location = useLocation();
    const currentPath = location.pathname
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [],
            "text/*": [".csv", ".pdf", ".doc", ".docx"],
        },
        onDrop: (acceptedFiles) => {
            formik.setFieldValue("upload_ktp", acceptedFiles);
        },
        multiple: true,
        onBlur: () => {
            formik.handleBlur("upload_ktp");
        },
        onDropRejected: () => {
            showMessage("File size exceeds the maximum limit", "error");
        },
        maxSize: 1024 * 1024,
    });

    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            tnos_service_id: "6",
            tnos_subservice_id: currentPath.endsWith("pembuatan-baru") ? "2" : currentPath.endsWith("perpanjangan") ? "3" : "",
            needs: "Pendidikan Satpam",
            nama_pic: "",
            nomor_pic: "",
            upload_ktp: [],
            upload_pas_foto: [],
            upload_skck: [],
            user_id: user.mmbr_code,
            name: user.mmbr_name,
            email: user.mmbr_email,
            phone: user.mmbr_phone,
            ketentuan_cek: false,
            currentPath: currentPath
        },
        onSubmit: async (values) => {
            dispatch(
                await pelatihanGadaPratama(
                    values,
                    navigate,
                    `/pengurusan-gada-pratama`
                )
            );
            // navigate(`/pengurusan-gada-pratama/${currentPath.endsWith("pembuatan-baru") ? "pembuatan-baru" : currentPath.endsWith("perpanjangan") ? "perpanjangan" : "" }/ringkasan`)
        },
        validationSchema: formPengurusanSchema,
    });

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <>
            <TopNewNav
                title={"Gada Pratama"}
                path={`/pengurusan-gada-pratama`}
            />
            <div className="container-class">
                <div className="responsive-scroll-container">
                    <div className="responsive-class">
                        <div className="res-class">
                            <div className="payment-container">
                                <div className="payment-content">
                                    <div className="container-layanan-f">
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "20px",
                                                margin: "12px 6px 12px 6px",
                                            }}
                                        >
                                            <img
                                                src={IconPratamaGada}
                                                alt={"Pembuatan Baru"}
                                                style={{ width: '50px' }}
                                            />
                                            <span style={{ fontWeight: "bold" }}>
                                                {currentPath.endsWith("pembuatan-baru") ? "Pembuatan Baru" : currentPath.endsWith("perpanjangan") ? "Perpanjangan" : ""}
                                            </span>
                                        </div>

                                        <div className="mb-2 form-group">
                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                <LabelComponent label={"Nama Lengkap"} />{" "}
                                                <span style={{ color: "red" }}>*</span>
                                            </div>
                                            <InputComponent
                                                value={formik.values.nama_pic}
                                                onChange={formik.handleChange("nama_pic")}
                                                onBlur={formik.handleBlur("nama_pic")}
                                                placeholder={"Masukkan Nama Lengkap"}
                                            />
                                            {formik.errors.nama_pic && formik.touched.nama_pic ? (
                                                <TextError error={formik.errors.nama_pic} />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="mb-2 form-group">
                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                <LabelComponent label={"No. Handphone / WhatsApp"} />{" "}
                                                <span style={{ color: "red" }}>*</span>
                                            </div>
                                            <InputComponent
                                                value={formik.values.nomor_pic}
                                                onChange={formik.handleChange("nomor_pic")}
                                                onBlur={formik.handleBlur("nomor_pic")}
                                                placeholder={"081229092002"}
                                            />
                                            {formik.errors.nomor_pic && formik.touched.nomor_pic ? (
                                                <TextError error={formik.errors.nomor_pic} />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <FileUploadComponent
                                            label={`Upload ${currentPath.endsWith("pembuatan-baru") ? "KTP" : currentPath.endsWith("perpanjangan") ? "KTA" : ""} `}
                                            isRequired={true}
                                            formik={formik}
                                            name="upload_ktp"
                                        />
                                        <FileUploadComponent
                                            label={`Upload ${currentPath.endsWith("pembuatan-baru") ? "Pas Foto" : currentPath.endsWith("perpanjangan") ? " Pas Foto (2 x 3) menggunakan PDL" : ""} `}
                                            isRequired={true}
                                            formik={formik}
                                            name="upload_pas_foto"
                                        />
                                        <FileUploadComponent
                                            label={`Upload ${currentPath.endsWith("pembuatan-baru") ? "SKCK" : currentPath.endsWith("perpanjangan") ? "Ijazah" : ""}`}
                                            isRequired={currentPath.endsWith("perpanjangan")}
                                            formik={formik}
                                            name="upload_skck"
                                        />

                                        {currentPath.endsWith("pembuatan-baru") ? (
                                            <>
                                                <Gap height={20} />

                                                <div className="container-how-to-pay-f">
                                                    <div className="accordion">
                                                        <div className="step-f">
                                                            <b>Fasilitas</b>
                                                            <ul>
                                                                <li>Ijazah Gada Pratama</li>
                                                                <li>Kartu Tanda Anggota Gada Pratama</li>
                                                                <li>PIN Gada Pratama</li>
                                                                <li>Fasilitas Penginapan dan Konsumsi</li>
                                                                <li>Kaos Pelatihan</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <Gap height={10} />
                                        )}

                                        <div className="form-group mb-2">
                                            <InputCheckboxComponent
                                                id="ketentuan_cek"
                                                label={
                                                    <>
                                                        Saya Menyetujui{" "}
                                                        <span style={{fontWeight: 'bold', cursor: 'pointer', pointerEvents: 'auto'}}>
                                                            ketentuan & persyaratan
                                                        </span>{" "}
                                                        Pemesanan Layanan
                                                    </>
                                                }
                                                value={formik.values.ketentuan_cek}
                                                onChange={formik.handleChange("ketentuan_cek")}
                                                onBlur={formik.handleBlur("ketentuan_cek")}
                                                typeLayanan={currentPath.endsWith("pembuatan-baru") ? "pembuatan-baru-gada-pratama" : "perpanjangan-gada-pratama" }
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
                                            title={"Lanjutkan Pesanan"}
                                            type="submit"
                                            onClick={formik.handleSubmit}
                                        // onClick={() => handlePayment()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
