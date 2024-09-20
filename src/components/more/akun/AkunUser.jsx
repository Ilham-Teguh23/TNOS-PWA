import React, { useState } from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import PaddingPwa from "../../moleculars/PaddingPwa";
import right from "../../../assets/images/new pwa icon/akun/right.svg";
import bahasa from "../../../assets/images/new pwa icon/akun/bahasa.svg";
import artikel from "../../../assets/images/new pwa icon/akun/rtikel.svg";
import bantuan from "../../../assets/images/new pwa icon/akun/bantuan.svg";
import rate from "../../../assets/images/new pwa icon/akun/rate.svg";
import chat from "../../../assets/images/new pwa icon/akun/chat.svg";
import signout from "../../../assets/images/new pwa icon/akun/signout.svg";
import NavigateButtomNew from "../../moleculars/NavigateButtomNew";
import Gap from "../../moleculars/Gap";
import { logoutController } from "../../../redux/controller/AuthController";
import { generate } from "../../utils/GenerateInisialName";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../moleculars/ModalComponent";
import LabelComponent from "../../atoms/LabelComponent";
import InputSelectComponent from "../../atoms/InputSelectComponent";
import TitleHeader from "../../utils/TitleHeader";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../../redux/action/globalAction";
import { useTranslation } from "react-i18next";
import { showMessage } from "../../utils/Message";

function AkunUser() {
  TitleHeader("Halaman akun");
  var user = JSON.parse(localStorage.getItem("userInfo"));
  const [isModalLogout, setIsModalLogout] = useState(false);
  const [isModalLanguages, setIsModalLanguages] = useState(false);
  const { i18n, t } = useTranslation();
  const options = [
    { value: "id", label: t("account8") },
    { value: "en", label: t("account9") },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      language: "",
    },
    onSubmit: (values) => {
      dispatch(setLanguage(values.language.value));
      i18n.changeLanguage(values.language.value);
      setIsModalLanguages(!isModalLanguages);
      showMessage("Success");
    },
    // validationSchema: formSchema,
  });

  const handleLogout = () => {
    dispatch(logoutController());
    setIsModalLogout(!isModalLogout);
  };

  return (
    <>
      <TopNewNav
        path={`/dashboard`}
        title={t("account1")}
        type="akun"
        background="transparent"
      />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="container-user-fg"></div>
            <PaddingPwa padding={15}>
              <div className="akun-container-ff">
                <div className="card-akun-hf">
                  <div className="profile-user-f">
                    <div className="bg-circle">{generate(user.mmbr_name)}</div>
                    <div className="data-user">
                      <div className="name">{user.mmbr_name}</div>
                      <div className="phone">{user.mmbr_phone}</div>
                    </div>
                  </div>
                  <div
                    className="nav-akun"
                    onClick={() =>
                      navigate(`/account/profile/${user.mmbr_code}`)
                    }
                  >
                    <img src={right} alt="" />
                  </div>
                </div>
                <Gap height={20} />
                <div
                  className="menu-akun-f-fwd"
                  onClick={() => setIsModalLanguages(true)}
                >
                  <div className="icon-jf">
                    <img src={bahasa} alt="" />
                  </div>
                  <div className="title">{t("account2")}</div>
                </div>
                <div 
                  className="menu-akun-f-fwd"
                  onClick={() => (window.location.href = 'https://tnos.co.id/artikel')}
                >
                  <div className="icon-jf">
                    <img src={artikel} alt="" />
                  </div>
                  <div className="title">{t("account3")}</div>
                </div>
                <div
                  className="menu-akun-f-fwd"
                  onClick={() => navigate("/account/help-center")}
                >
                  <div className="icon-jf">
                    <img src={bantuan} alt="" />
                  </div>
                  <div className="title">{t("account4")}</div>
                </div>
                <div 
                  className="menu-akun-f-fwd"
                  onClick={() => window.open("https://api.whatsapp.com/send?phone=08119595493&text=Hallo admin, saya ingin mengetahui informasi lebih lanjut mengenai pengamanan event", "_blank")}
                >
                  <div className="icon-jf">
                    <img src={chat} alt="" />
                  </div>
                  <div className="title">{t("account6")}</div>
                </div>
                <div
                  className="menu-akun-f-fwd"
                  style={{ borderBottom: "none" }}
                  onClick={() => setIsModalLogout(true)}
                >
                  <div className="icon-jf">
                    <img src={signout} alt="" />
                  </div>
                  <div className="title">{t("account7")}</div>
                </div>
              </div>
              <ModalComponent
                isModalVisible={isModalLogout}
                setModalVisible={setIsModalLogout}
                onClick={logoutController()}
                type="top"
              >
                <h2> {t("account12")}</h2>
                <div className="btn-modal-list">
                  <button
                    className="btn-modal-cancel"
                    onClick={() => setIsModalLogout(!isModalLogout)}
                  >
                    {t("account10")}
                  </button>
                  <button className="btn-modal-accept" onClick={handleLogout}>
                    {t("account13")}
                  </button>
                </div>
              </ModalComponent>
              <ModalComponent
                isModalVisible={isModalLanguages}
                setModalVisible={setIsModalLanguages}
                type="language"
              >
                <div className="form-group mb-2">
                  <LabelComponent label={t("account2")} />
                  <form onSubmit={formik.handleSubmit}>
                    <InputSelectComponent
                      onChange={formik.setFieldValue}
                      onBlur={formik.setFieldTouched}
                      value={formik.values.language.label}
                      id="language"
                      options={options}
                    />
                    <div className="btn-modal-list">
                      <button
                        className="btn-modal-cancel"
                        type="button"
                        onClick={() => setIsModalLanguages(!isModalLanguages)}
                      >
                        {t("account10")}
                      </button>
                      <button className="btn-modal-accept" type="submit">
                        {t("account11")}
                      </button>
                    </div>
                  </form>
                </div>
              </ModalComponent>
            </PaddingPwa>
            <Gap height={70} />
            <NavigateButtomNew />
          </div>
        </div>
      </div>
    </>
  );
}

export default AkunUser;
