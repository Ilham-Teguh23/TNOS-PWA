import React from "react";
import { useNavigate } from "react-router-dom";
import law from "../../assets/images/law.png";
import badanHukum from "../../assets/images/badan-hukum-dashboard.png";
import pendamping from "../../assets/images/pendamping.png";
import guard from "../../assets/images/guard.png";
import korporat from "../../assets/images/guard-dashboard.png";
import csh from "../../assets/images/csh-dashboard.png";
// import notif from "../../assets/images/notif.png";

import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import NavDesktop from "../cummon/NavDesktop";
import MenuFooter from "../cummon/MenuFooter";
import TitleHeader from "../utils/TitleHeader";
// import { useDispatch, useSelector } from "react-redux";
// import { countUnreadMessage } from "../../redux/slices/users/UserSlices";

function Dashboard() {
  TitleHeader("Dashboard");

  const navigate = useNavigate();
  const { t } = useTranslation();

  // const dispatch = useDispatch();
  // const storeData = useSelector((store) => store?.users);
  // const { userInfo, unread } = storeData;

  // useEffect(() => {
  //   dispatch(countUnreadMessage(userInfo?.mmbr_code));
  // }, [dispatch, userInfo]);

  return (
    <Fragment>
      <NavDesktop />

      <div className="responsive-class">
        <div className="res-class">
          <div className="dashboard-content-s">
            {/* <div className="card-ndwajdn" onClick={() => navigate("/message")}>
              <div className="condawjdnawkd">
                <h5 className="title-keterangan-notif">Progress Pesanan</h5>
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <img src={notif} alt="" className="abcwd " />
                  </div>
                  <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
                    <b>Title</b>
                    <p className="text-justify p-keterangan-notif">
                      Agent TNOS akan segera menghubungimu. periksa pesan masuk
                      secara berkala
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="row">
              <div className="col-4 mb-2">
                <div
                  className="card-kkmcn-3"
                  onClick={() => navigate("/badan-usaha")}
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
                <h5 className="title-layanan">Pengamanan Usaha dan Bisnis</h5>
              </div>
              <div className="col-4 mb-2">
                <div
                  className="card-kkmcn-4"
                  onClick={() => navigate("/solusi-hukum")}
                  // onClick={() => navigate("/next-update")}
                  // style={{ opacity: "0.2" }}
                >
                  <img src={csh} alt="" className="img-layanan-jjdk" />
                </div>
                <h5 className="title-layanan">Komprehensif Solusi Hukum</h5>
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
                <h5 className="title-layanan">
                  Konsultasi Hukum via Video Call
                </h5>
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
                  style={{ opacity: "0.2" }}
                >
                  <img src={guard} alt="" className="img-layanan-jjdk" />
                </div>
                <h5 className="title-layanan">Pengamanan Pribadi</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MenuFooter footer={true} />
    </Fragment>
  );
}

export default Dashboard;
