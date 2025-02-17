import React from "react";
import { useDropzone } from "react-dropzone";
import LabelComponent from "../atoms/LabelComponent";
import iconFileInput from "../../assets/images/new pwa icon/inputFile/inputFileIcon.svg";
import fileUploadIcon from "../../assets/images/new pwa icon/inputFile/file-upload.svg";
import TextError from "../atoms/TextError";

const FileUploadComponent = ({
    label,
    isRequired = false,
    formik,
    name,
    allowedFileFormats = ["jpg", "jpeg", "png", "svg", "pdf"],
}) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            formik.setFieldValue(name, acceptedFiles); // Menyimpan file ke dalam Formik
        },
        accept: allowedFileFormats.map((ext) => `.${ext}`).join(","),
    });

    return (
        <div className="form-group mb-2">
            <div style={{ display: "flex", flexDirection: "row" }}>
                <LabelComponent label={label} />
                {isRequired &&  <span style={{ color: "red"}}>*</span>}
                <span style={{marginLeft: '5px'}}>
                <LabelComponent label={"(Max : 3MB)"} />
                </span>
            </div>
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
                            {formik.values[name]?.length > 0
                                ? `${formik.values[name].length} file`
                                : "Pilih atau Drag file"}
                        </div>
                    </div>
                    <div className="right-content">
                        <img src={fileUploadIcon} alt="" />
                    </div>
                </div>
            </div>
            {formik.values[name]?.length > 0 && (
                <div className="container-file-display">
                    <h4>Files</h4>
                    <ul style={{ display: "block" }}>
                        {formik.values[name].map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            {formik.errors[name] && formik.touched[name] && (
                <TextError error={formik.errors[name]} />
            )}
        </div>
    );
};


export default FileUploadComponent
