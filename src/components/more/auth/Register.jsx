import React from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import PaddingPwa from "../../moleculars/PaddingPwa";
import Gap from "../../moleculars/Gap";
import LabelComponent from "../../atoms/LabelComponent";
import InputComponent from "../../atoms/InputComponent";
import ButtonComponent from "../../atoms/ButtonComponent";
import iconRegister from "../../../assets/images/new pwa icon/auth/iconRegister.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { registerSchema } from "../../utils/formSchema";
import moment from "moment/moment";
import TextError from "../../atoms/TextError";
import { registerController } from "../../../redux/controller/AuthController";
import TitleHeader from "../../utils/TitleHeader";

function Register() {
  TitleHeader("Halaman pendaftaran");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    onSubmit: async (values) => {
      values.timezone = moment.tz.guess();
      dispatch(await registerController(values, navigate));
    },
    validationSchema: registerSchema,
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
                <form onSubmit={formik.handleSubmit} action="">
                  <PaddingPwa padding={15}>
                    <Gap height={60} />
                    <div
                      className="title-header-f"
                      style={{ fontSize: "24px", lineHeight: "24px" }}
                    >
                      REGISTER
                    </div>
                    <Gap height={20} />
                    <div
                      className="description-home-f"
                      style={{ textAlign: "center" }}
                    >
                      Lengkapi data di bawah ini
                    </div>
                    <Gap height={20} />
                    <div className="image-home-f">
                      <img src={iconRegister} alt="" />
                    </div>
                    <Gap height={30} />
                    <div className="form-group mb-3">
                      <LabelComponent label="Nama Lengkap" typeInput="auth" />
                      <InputComponent
                        placeholder={"Masukkan nama lengkap"}
                        typeInput="auth"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                      />
                      {formik.errors.name && formik.touched.name ? (
                        <TextError error={formik.errors.name} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <LabelComponent label="Email" typeInput="auth" />
                      <InputComponent
                        placeholder={"Masukkan email"}
                        typeInput="auth"
                        type="text"
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                      />
                      {formik.errors.email && formik.touched.email ? (
                        <TextError error={formik.errors.email} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <LabelComponent label="No. Telepon" typeInput="auth" />
                      <InputComponent
                        placeholder={"+62"}
                        typeInput="auth"
                        type="text"
                        value={formik.values.phone}
                        onChange={formik.handleChange("phone")}
                        onBlur={formik.handleBlur("phone")}
                      />
                      {formik.errors.phone && formik.touched.phone ? (
                        <TextError error={formik.errors.phone} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className="ask-f-c"
                      onClick={() => navigate("/auth/login")}
                    >
                      Sudah Punya Akun?
                    </div>
                    <Gap height={100} />
                    <ButtonComponent
                      title="Daftar"
                      background="var(--font-color9)"
                      border="1px solid transparent"
                      color="var(--font-color4)"
                      typeButton="auth"
                      type="submit"
                    />
                  </PaddingPwa>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
