import axios from "axios";
import moment from "moment-timezone";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { Spinner } from "react-bootstrap";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import xy from "../../assets/images/xy.png";

function FormTransactionKonsultasiMenu() {
  const [needs, setNeeds] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState(moment().format("YYYY-MM-DD HH:mm"));
  const [duration, setDuration] = useState(20);
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [formError, setFormError] = useState({
    needs: "",
    name: "",
    email: "",
    phone: "",
    time: "",
    duration: "",
  });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const onChangeDatetime = (e) => {
    const time_now = moment(e).format("YYYY-MM-DD HH:mm");
    const time_add_hour = moment().add(3, "hours").format("YYYY-MM-DD HH:mm");

    if (time_now < time_add_hour) {
      toast.error(
        "waktu harus maju 3 jam dari jam sekarang " +
          moment().format("YYYY-MM-DD HH:mm").toString(),
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      console.log("waktu tidak boleh kurang");
      setTime(moment().format("YYYY-MM-DD HH:mm"));
    } else {
      console.log("waktu boleh");
      setTime(e);
    }
  };

  const onSubmitOrder = async (e) => {
    e.preventDefault();
    const date_new = moment(time).local().format("YYYY-MM-DD HH:mm:ss");
    const data = {
      tnos_service_id: 1,
      tnos_subservice_id: 1,
      user_id: user.id,
      needs: needs,
      name: name,
      email: email,
      phone: phone,
      time: date_new,
      duration: duration,
    };
    setLoader(true);
    setFormError({
      needs: "",
      name: "",
      email: "",
      phone: "",
      time: "",
      duration: "",
    });

    await axios
      .post("https://api-pwa.tnos.world/api/konsultasi/in-order", data)
      .then((res) => {
        console.log(res);
        setLoader(false);
        if (!res.data.success) {
          setFormError({
            needs: res.data.error.needs,
            name: res.data.error.name,
            email: res.data.error.email,
            phone: res.data.error.phone,
            time: res.data.error.time,
            duration: res.data.error.duration,
          });
        }
        console.log(formError);
        navigate(
          `/form-transaksi-detail-konsultasi-hukum/` + res.data.detail.id,
          { state: res.data.message }
        );
      })
      .catch((res) => {
        console.log(res);
        toast.error(
          res.response.data.message
            ? res.response.data.message
            : "there is something wrong",
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        // console.log(res);
        setLoader(false);
      });
  };

  const add = () => {
    setDuration(duration + 1);
  };
  const min = () => {
    if (duration <= 20) {
      return false;
    }
    setDuration(duration - 1);
  };

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/dashboard" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
            </Link>
          </div>
          <div className="njwdjhwk">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8 col-xl-8 col-12">
                <h5 className="title-kasnadkw">Konsultasi Hukum</h5>
                <p className="text-justify jjdw">
                  Mitra Pengacara Akan memberikan layanan konsultasi hukum
                  terkait permasalahan yang berkaitan dengan hukum pidana,
                  perdata maupun hukum Islam secara pribadi melalui sarana video
                  call atau telepon
                </p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xl-4 col-12">
                <img src={xy} alt="" className="img-xy" />
              </div>
            </div>
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
            <form onSubmit={(e) => onSubmitOrder(e)}>
              <div className="form-group mb-2">
                <label htmlFor="keperluan">*Keperluan Konsultasi</label>
                <textarea
                  name="keperluan"
                  id="keperluan"
                  cols="10"
                  rows="5"
                  className={`form-control form-layanan ${
                    formError.needs ? "is-invalid" : ""
                  }`}
                  value={needs}
                  onChange={(e) => setNeeds(e.target.value)}
                ></textarea>
                {formError.needs ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.needs}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="nama">*Nama</label>
                <input
                  type="text"
                  name="nama"
                  className={`form-control form-layanan ${
                    formError.name ? "is-invalid" : ""
                  }`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {formError.name ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.name}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">*Email</label>
                <input
                  type="text"
                  name="email"
                  className={`form-control form-layanan ${
                    formError.email ? "is-invalid" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {formError.email ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.email}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="no_telepon">*No. Telephone / Whats App</label>
                <input
                  type="text"
                  name="no_telepon"
                  className={`form-control form-layanan ${
                    formError.phone ? "is-invalid" : ""
                  }`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {formError.phone ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.phone}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="no_telepon">*Pilih waktu konsultasi :</label>
                <input
                  type="datetime-local"
                  name="time"
                  className={`form-control form-layanan ${
                    formError.time ? "is-invalid" : ""
                  }`}
                  value={time}
                  onChange={(e) => onChangeDatetime(e.target.value)}
                />
                {formError.time ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.time}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="durasi">*Pilih Durasi Menit</label>
                <div className="durasi-kkdmm">
                  <span onClick={() => min()} className="minus-ssdwa">
                    <FaMinus />
                  </span>
                  <span className="durasi">{duration} Menit</span>
                  <span onClick={() => add()} className="plus-ssdwa">
                    <FaPlus />
                  </span>
                </div>
              </div>
              <div className="form-group  mt-3">
                <button
                  className="btn btn-layanan w-100"
                  type="submit"
                  disabled={loader}
                >
                  {loader ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Lanjut Pembayaran"
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

export default FormTransactionKonsultasiMenu;
