import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Spinner } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import TitleHeader from "../utils/TitleHeader";

function UpdateProfile() {
  TitleHeader("Ubah Profil");
  var user = JSON.parse(localStorage.getItem("userInfo"));
  const [loader, setLoader] = useState(false);
  const [no_ktp, setNo_ktp] = useState("");
  const [name, setName] = useState(user.mmbr_name);
  const [email, setEmail] = useState(user.mmbr_email);
  const [no_telepon, setNo_telepon] = useState(user.mmbr_phone);
  const { t } = useTranslation();

  const handleSubmitUpdateProfile = async (e) => {
    setLoader(true);
    e.preventDefault();
    toast.error("Maaf fitur ini sedang tahap perbaikan", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setLoader(false);
  };
  //   console.log(user);
  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/profile" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw">{t("ubah_profil")}</h5>
            </Link>
          </div>
          <div className="njwdjhwk">
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
            <form onSubmit={(e) => handleSubmitUpdateProfile(e)} action="">
              <div className="form-group mb-3">
                <label htmlFor="no_ktp">{t("no_ktp")}</label>
                <input
                  value={no_ktp}
                  onChange={(e) => setNo_ktp(e.target.value)}
                  type="text"
                  className="form-control form-layanan"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="name">{t("nama_lengkap")}</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control form-layanan"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="form-control form-layanan"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">{t("no_telepon")}</label>
                <input
                  value={no_telepon}
                  onChange={(e) => setNo_telepon(e.target.value)}
                  type="text"
                  className="form-control form-layanan"
                />
              </div>
              <div className="form-group mt-3">
                <button
                  type="submit"
                  className="btn btn-layanan w-100"
                  disabled={loader}
                >
                  {loader ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    t("ubah")
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UpdateProfile;
