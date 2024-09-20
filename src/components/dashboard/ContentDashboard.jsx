import React from "react";
// import { FaUser } from "react-icons/fa";
// import frame from "../../assets/images/Frame.png";
import { useNavigate } from "react-router-dom";
// import garis from "../../assets/images/garis.png";
import law from "../../assets/images/law.png";
import badanHukum from "../../assets/images/badan-hukum-dashboard.png";
import pendamping from "../../assets/images/pendamping.png";
import guard from "../../assets/images/guard.png";
import korporat from "../../assets/images/guard-dashboard.png";
import csh from "../../assets/images/csh-dashboard.png";
// import notif from "../../assets/images/notif.png";
// import { useState } from "react";
import { Fragment } from "react";
// import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// import Loader from "../cummon/Loader";

function ContentDashboard() {
  // const [isBenefit, setIsBenefit] = useState(1);
  // const [user, setUser] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("user")));
  // }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     isTokenExpired();
  //   }, 5000);

  //   return () => clearInterval(intervalId);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const isTokenExpired = () => {
  //   const expiry = localStorage.getItem("expires_in");
  //   const check = Math.floor(new Date().getTime() / 1000) >= expiry;
  //   console.log(expiry);
  //   console.log(Math.floor(new Date().getTime() / 1000));
  //   if (check) {
  //     dispatch({
  //       type: "LOGOUT",
  //     });
  //   }
  // };

  // const onClikBenefit = (select) => {
  //   setIsBenefit(select);
  // };

  // var keuntungan;
  // if (isBenefit === 1) {
  //   keuntungan = (
  //     <div className="content-click-dadnajdw">
  //       <h5 className="title-dna">keuntungan 1</h5>
  //       <p className="p-ndajdb">
  //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
  //         molestiae tenetur ad est perspiciatis eius quidem velit id temporibus
  //         deleniti?
  //       </p>
  //     </div>
  //   );
  // }

  // if (isBenefit === 2) {
  //   keuntungan = (
  //     <div className="content-click-dadnajdw">
  //       <h5 className="title-dna">keuntungan 2</h5>
  //       <p className="p-ndajdb">
  //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo fugiat a
  //         eaque. Eum possimus, quibusdam esse nemo illo deserunt nulla.
  //       </p>
  //     </div>
  //   );
  // }
  // if (isBenefit === 3) {
  //   keuntungan = (
  //     <div className="content-click-dadnajdw">
  //       <h5 className="title-dna">keuntungan 3</h5>
  //       <p className="p-ndajdb">
  //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quia
  //         iste dolorum ducimus error consequatur ex rerum eum. Voluptatibus,
  //         iste.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          {/* <div className="profile d-flex  align-items-center">
            <div className="icon-profile mr-2">
              <FaUser />
            </div>
            <div className="name-profile">
              <h3 className="nm">{user.mmbr_name}</h3>
              <span
                className="rw"
                onClick={() => navigate("/riwayat-transaksi")}
              >
                {t("riwayat_transaksi")}
              </span>
            </div>
          </div> */}
          <div className="dashboard-content-s">
            {/* <div className="djas">
              <div className="row justify-content-center align-items-center">
                <div className="col-6">
                  <div className="card-white-s">
                    <img className="ops" src={frame} alt="" />
                    <br />
                    <Link to="#" className="da">
                      0<sub className="wd">GEMS</sub>
                    </Link>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <div className="kjs">
                        <Link className=" hadw">
                          <FaMoneyBillAlt className="dap" />
                          <br />
                          Bayar
                        </Link>
                        <Link className=" hadw">
                          <FaPlus className="dap" />
                          <br />
                          Top Up
                        </Link>
                        <Link className=" hadw">
                          <FaMedal className="dap" />
                          <br />
                          Promo
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="card mt-4">
              <div className="card-body">
                <h5 className="title-keterangan-notif">Progress Pesanan</h5>
                <div className="row">
                  <div className="col-3">
                    <img src={notif} alt="" className="w-100" />
                  </div>
                  <div className="col-9">
                    <p className="text-justify p-keterangan-notif">
                      Agent TNOS akan segera menghubungimu. periksa pesan masuk
                      secara berkala
                    </p>
                    <button
                      onClick={() => navigate("/message")}
                      className="btn btn-layanan"
                    >
                      Check pesan masuk
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="garis-da">
              <img src={garis} width="100%" alt="" />
            </div> */}
            {/* <div className="title-layanan">
              <p>Ini adalah layanan </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Necessitatibus veniam optio iure odio odit facere atque qui
                magni nesciunt dolores?
              </p>
            </div> */}
            <div className="row">
              <div className="col-4 mb-2">
                <div
                  className="card-kkmcn-3"
                  onClick={() => navigate("/badan-hukum")}
                >
                  <img src={badanHukum} alt="" className="img-layanan-jjdk" />
                </div>
                <h5 className="title-layanan">{t("badan_usaha")}</h5>
              </div>

              <div className="col-4 mb-2">
                <div
                  className="card-kkmcn-5"
                  onClick={() => navigate("/pengamanan-korporat")}
                >
                  <img src={korporat} alt="" className="img-layanan-jjdk" />
                </div>
                <h5 className="title-layanan">{t("pengamanan_k")}</h5>
              </div>
              <div className="col-4 mb-2">
                <div
                  className="card-kkmcn-4"
                  onClick={() => navigate("/next-update")}
                  style={{ opacity: "0.2" }}
                >
                  <img src={csh} alt="" className="img-layanan-jjdk" />
                </div>
                <h5 className="title-layanan">{t("CSH")}</h5>
              </div>
              <div className="col-4 mb-2">
                <div
                  className="card-kkmcn-0"
                  onClick={() => navigate("/next-update")}
                  // onClick={() => navigate("/form-transaksi-konsultasi-hukum")}
                  style={{ opacity: "0.2" }}
                >
                  <img src={law} alt="" className="img-layanan-jjdk" />
                </div>
                <h5 className="title-layanan">{t("pengacara_k")}</h5>
              </div>
              <div className="col-4 mb-2">
                <div
                  className="card-kkmcn-1"
                  onClick={() => navigate("/next-update")}
                  // onClick={() => navigate("/form-transaksi-pendampingan-hukum")}
                  style={{ opacity: "0.2" }}
                >
                  <img src={pendamping} alt="" className="img-layanan-jjdk" />
                </div>
                <h5 className="title-layanan">{t("pengacara_p")}</h5>
              </div>
              <div className="col-4 mb-2">
                <div
                  className="card-kkmcn-2"
                  onClick={() => navigate("/next-update")}
                  // onClick={() =>
                  //   navigate("/form-transaksi-pengamanan-perorangan")
                  // }
                  style={{ opacity: "0.2" }}
                >
                  <img src={guard} alt="" className="img-layanan-jjdk" />
                </div>
                <h5 className="title-layanan">{t("pengamanan_p")}</h5>
              </div>
            </div>

            {/* <div className="garis-da">
              <img src={garis} width="100%" alt="" />
            </div> */}
            {/* <div className="slider-dadnknk">
              <div className="text-center hadkd"> */}
            {/* <img className="ccad" src={frame} alt="" />
                <br /> */}
            {/* <h5 className="dadw">
                  <span className="bdahb">Keuntungan Pakai TNOS</span> Gems
                </h5>
                <p className="nadk">
                  Keuntungan pengguna baru total hingga satu juta
                </p>
              </div> */}
            {/* <div className="row justify-content-center align-items-center">
                  <div className="col-4 p-0 m-0">
                    <div className="card-ndanma">
                      <div className="ndaklad">
                        <div className="daann">
                          <h5 className="andj">
                            Buat kamu yang butuh
                            <span className="dadw"> Efesien</span> nan{" "}
                            <span className="dadw">Maksimal</span>
                          </h5>
                          <h5 className="ndajb">
                            <span className="orange">Voucher: </span>
                            <br />
                            Disc 30%
                            <br />
                            Pengaman
                          </h5>
                          <div className="adbw">
                            <Link className="dadafgg">Klik detail</Link>
                          </div>
                          <div className="content-dnkdw">
                            <h5 className="ksad">judul 1</h5>
                            <p>
                              Lorem ipsum dolor, sit amet consectetur
                              adipisicing elit. Reprehenderit, debitis?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
            {/* <div className="button-keuntungan-da">
                <div className="btn-group">
                  <button
                    className={`dkada ${isBenefit === 1 ? "active" : ""}`}
                    onClick={() => onClikBenefit(1)}
                  >
                    keuntungan 1
                  </button>
                  <button
                    className={`dkada ${isBenefit === 2 ? "active" : ""}`}
                    onClick={() => onClikBenefit(2)}
                  >
                    keuntungan 2
                  </button>
                  <button
                    className={`dkada ${isBenefit === 3 ? "active" : ""}`}
                    onClick={() => onClikBenefit(3)}
                  >
                    keuntungan 3
                  </button>
                </div>
              </div>
              {keuntungan} */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ContentDashboard;
