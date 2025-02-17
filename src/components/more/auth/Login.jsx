import React from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import PaddingPwa from "../../moleculars/PaddingPwa";
import Gap from "../../moleculars/Gap";
import iconLogin from "../../../assets/images/new pwa icon/auth/iconLogin.svg";
import LabelComponent from "../../atoms/LabelComponent";
import InputComponent from "../../atoms/InputComponent";
import CaptchaComponent from "../../moleculars/CaptchaComponent";
import ButtonComponent from "../../atoms/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../utils/formSchema";
import { validateCaptcha } from "react-simple-captcha";
import { useDispatch } from "react-redux";
import { showMessage } from "../../utils/Message";
import PhoneNumber from "../../moleculars/PhoneNumber";
import TextError from "../../atoms/TextError";
import { loginController } from "../../../redux/controller/AuthController";
import moment from "moment/moment";
import TitleHeader from "../../utils/TitleHeader";
import PhoneInput from "react-phone-input-2";

function Login() {
    TitleHeader("Halaman masuk");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            phone: "",
            captcha: "",
        },
        onSubmit: async (values) => {
            values.timezone = moment.tz.guess();
            values.method = "0";

            let phone = values.phone.replace(/\D/g, "");

            if (phone.startsWith("62")) {
                phone = "0" + phone.substring(2);
            } else if (!phone.startsWith("0")) {
                phone = "0" + phone;
            }

            values.phone = phone;

            if (validateCaptcha(values?.captcha) === true) {
                dispatch(await loginController(values, navigate));
            } else {
                showMessage("Code OTP Failed", "error");
            }
        },
        validationSchema: loginSchema,
    });



    return (
        <>
            <TopNewNav title="Beranda" path={`/`} type="auth" />
            <div className="container-class">
                <div
                    className="responsive-class"
                    style={{ background: "var(--bg-color6)" }}
                >
                    <div className="res-class">
                        <div className="payment-container">
                            <div className="container-home-f">
                                <PaddingPwa padding={15}>
                                    <Gap height={60} />
                                    <div
                                        className="title-header-f"
                                        style={{ fontSize: "24px", lineHeight: "24px" }}
                                    >
                                        LOGIN
                                    </div>
                                    <Gap height={20} />
                                    <div
                                        className="description-home-f"
                                        style={{ textAlign: "center" }}
                                    >
                                        Masukkan nomor telepon terdaftar
                                    </div>
                                    <Gap height={20} />
                                    <div className="image-home-f">
                                        <img src={iconLogin} alt="" />
                                    </div>
                                    <Gap height={30} />
                                    <form onSubmit={formik.handleSubmit} action="">
                                        <div className="form-group mb-2">
                                            <LabelComponent label="No. Telepon" typeInput="auth" />
                                            <PhoneInput
                                                country={"id"}
                                                value={formik.values.phone || "+62"}
                                                onChange={(value, countryData) => {
                                                    const dialCode = `+${countryData.dialCode}`;

                                                    let newValue = value.replace(/\D/g, "");

                                                    if (!newValue.startsWith(countryData.dialCode) || newValue.length <= countryData.dialCode.length) {
                                                        newValue = dialCode;
                                                    }

                                                    formik.setFieldValue("phone", newValue);
                                                    formik.setFieldValue("phonecode", countryData.dialCode);
                                                }}
                                                onKeyDown={(e) => {
                                                    const dialCode = "+62";

                                                    if (
                                                        (e.key === "Backspace" || e.key === "Delete") &&
                                                        formik.values.phone.length <= dialCode.length
                                                    ) {
                                                        e.preventDefault();
                                                    }

                                                    if (
                                                        e.key === "Backspace" &&
                                                        formik.values.phone.length === dialCode.length + 1
                                                    ) {
                                                        formik.setFieldValue("phone", dialCode);
                                                        e.preventDefault();
                                                    }
                                                }}
                                                onBlur={() => {
                                                    if (!formik.values.phone || formik.values.phone === "+") {
                                                        formik.setFieldValue("phone", "+62");
                                                    }
                                                    formik.setFieldTouched("phone", true);
                                                }}
                                                enableSearch={true}
                                                disableCountryCode={false}
                                                disableDropdown={false}
                                                enableAreaCodes={false}
                                                enableLongNumbers={true}
                                                autoFormat={false}
                                                inputStyle={{
                                                    width: "100%",
                                                    paddingLeft: "50px",
                                                }}
                                                containerClass="phone-input-container"
                                            />
                                            {formik.errors.phone && formik.touched.phone && (
                                                <TextError error={formik.errors.phone} />
                                            )}
                                        </div>
                                        <hr style={{ color: "var(--font-color9)" }} />
                                        <div className="form-group mb-2">
                                            <CaptchaComponent />
                                            <Gap height={15} />
                                            <InputComponent
                                                placeholder={"Enter Captcha "}
                                                typeInput="auth"
                                                value={formik.values.captcha}
                                                onChange={formik.handleChange("captcha")}
                                                onBlur={formik.handleBlur("captcha")}
                                            />
                                            {formik.errors.captcha && formik.touched.captcha ? (
                                                <TextError error={formik.errors.captcha} />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <Gap height={100} />
                                        <ButtonComponent
                                            title="Lanjutkan"
                                            background="var(--font-color9)"
                                            border="1px solid transparent"
                                            color="var(--font-color4)"
                                            typeButton="auth"
                                            type="submit"
                                        />
                                    </form>
                                </PaddingPwa>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
