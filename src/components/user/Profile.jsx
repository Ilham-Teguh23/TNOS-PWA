import React from "react";
import { Fragment } from "react";
import {
  FaArrowLeft,
  // FaCoins,
  FaLanguage,
  FaQuestion,
  FaSignOutAlt,
  FaStar,
  FaUserEdit,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../cummon/Loader";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
// import { logoutUserAction } from "../../redux/slices/users/UserSlices";
import TitleHeader from "../utils/TitleHeader";
import { logoutController } from "../../redux/controller/AuthController";
const lngs = [
  { code: "en", native: "English" },
  { code: "idn", native: "Indonesia" },
];

function Profile() {
  TitleHeader("Menu Profile");
  const [overlay, setOverlay] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [languageCode, setLanguageCode] = useState("");
  var user = JSON.parse(localStorage.getItem("userInfo"));

  const dispatch = useDispatch();

  // console.log(user);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { t, i18n } = useTranslation();

  const handleTrans = (e) => {
    e.preventDefault();
    setOverlay(true);
    localStorage.setItem("code", languageCode);
    setShow(false);
    setTimeout(() => setOverlay(false), 2000);
    i18n.changeLanguage(localStorage.getItem("code"));
  };

  return (
    <Fragment>
      {overlay ? <Loader /> : ""}
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/dashboard" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw">{t("Akun")}</h5>
            </Link>
          </div>
          <div className="njwdjhwk">
            <div className="profile-user-hda">
              <div
                className="content-profile-dad"
                onClick={() => navigate(`/profile/${user.mmbr_code}`)}
              >
                <div className="icon-skdw">
                  <FaUserEdit />
                </div>
                <div className="name-menu-dajad">{t("Profil")}</div>
              </div>
              {/* <div
                className="content-profile-dad"
                onClick={() => navigate(`/tnos-gems`)}
              >
                <div className="icon-skdw">
                  <FaCoins />
                </div>
                <div className="name-menu-dajad">Tnos Gems</div>
              </div> */}
              <div className="content-profile-dad" onClick={() => handleShow()}>
                <div className="icon-skdw">
                  <FaLanguage />
                </div>
                <div className="name-menu-dajad">{t("Pilih_Bahasa")}</div>
              </div>
              <div
                className="content-profile-dad"
                onClick={() =>
                  window.open(
                    "https://tnosbantuan.freshdesk.com/support/solutions/150000082952",
                    "_blank"
                  )
                }
              >
                <div className="icon-skdw">
                  <FaQuestion />
                </div>
                <div className="name-menu-dajad">{t("Pusat_Bantuan")}</div>
              </div>
              <div className="content-profile-dad">
                <div className="icon-skdw">
                  <FaStar />
                </div>
                <div className="name-menu-dajad">{t("Nilai_Aplikasi")}</div>
              </div>
              <div
                className="content-profile-dad"
                onClick={() => dispatch(logoutController())}
              >
                <div className="icon-skdw">
                  <FaSignOutAlt />
                </div>
                <div className="name-menu-dajad">{t("Keluar")}</div>
              </div>
              {/* <div className="content-profile-dad">
                <div className="icon-skdw">
                  <FaUserEdit />
                </div>
                <div className="name-menu-dajad">Petugas Favorit</div>
              </div> */}
            </div>
            <Modal size="sm" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{t("Pilih_Bahasa")}</Modal.Title>
              </Modal.Header>
              <form action="">
                <Modal.Body>
                  <div className="form-group">
                    <select
                      onChange={(e) => setLanguageCode(e.target.value)}
                      className="form-control form-layanan"
                      name=""
                      id=""
                    >
                      <option value="">{t("Pilih_Bahasa")}</option>
                      {lngs.map((lng, i) => {
                        const { code, native } = lng;
                        return (
                          <option key={code} value={code}>
                            {native}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={(e) => handleTrans(e)}
                  >
                    {t("Pilih")}
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Profile;
