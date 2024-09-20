import React from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import PaddingPwa from "../../moleculars/PaddingPwa";
import legalitas from "../../../assets/images/new pwa icon/dashboard/iconLegalitas.svg";
import pengamanan from "../../../assets/images/new pwa icon/dashboard/iconPengamananUsaha.svg";
import comprehensive from "../../../assets/images/new pwa icon/dashboard/iconComprehensive.svg";
import lainnya from "../../../assets/images/new pwa icon/dashboard/iconPembayaranLainnya.png";
import NavigateButtomNew from "../../moleculars/NavigateButtomNew";
import Gap from "../../moleculars/Gap";
import TitleHeader from "../../utils/TitleHeader";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CryptoJS from "crypto-js";

function Dashboard() {
  TitleHeader("Halaman dashboard");
  var user = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const { t } = useTranslation();

  const jsonData = JSON.stringify({
    "OID": "TAB2408202200006.171584818236112014000",
    "data": JSON.stringify({
      "name": "Ada",
      "email": "customerservice@tnos.world",
      "phone": "081112233777"
    }),
    "title": "pengamanan",
    "amount": 10000
  })

  const encrypt = CryptoJS.AES.encrypt(jsonData, "Ach2o1&invVocS%*n25F*cQhash209").toString()
  const encrypData = btoa(encrypt)

  console.log(encrypData);

  return (
    <>
      <TopNewNav
        path={`/dashboard`}
        type="dashboard"
        background="transparent"
      />

      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="container-user-fg">
              <div className="name-user-fj">
                {t("greeting")}, {user?.mmbr_name}
              </div>
            </div>
            <div className="dashboard-container-f">
              <PaddingPwa padding={15}>
                <center>
                  <div className="row mt-3">
                    <div className="col-4">
                      <div
                        className="container-card-f-f"
                        onClick={() => navigate("/security-providers")}
                      >
                        <div className="card-dashboard-fkf">
                          <img src={pengamanan} alt="" />
                        </div>
                        <div className="title">{t("layanan2")}</div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div
                        className="container-card-f-f"
                        onClick={() =>
                          navigate("/comprehensive-Legal-solutions")
                        }
                      >
                        <div className="card-dashboard-fkf">
                          <img src={comprehensive} alt="" />
                        </div>
                        <div className="title">{t("layanan3")}</div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div
                        className="container-card-f-f"
                        onClick={() => navigate("/pembayaran-lainnya")}
                      >
                        <div className="card-dashboard-fkf">
                          <img src={lainnya} alt="" style={{ width: "69px" }} />
                        </div>
                        <div className="title">{t("layanan7")}</div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row mt-3">
                    <div className="col-6">
                      <div
                        className="container-card-f-f"
                        onClick={() => navigate("/business-or-legal-entity")}
                      >
                        <div className="card-dashboard-fkf">
                          <img src={legalitas} alt="" />
                        </div>
                        <div className="title">{t("layanan1")}</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div
                        className="container-card-f-f"
                        onClick={() => navigate("/pembayaran-lainnya")}
                      >
                        <div className="card-dashboard-fkf">
                          <img src={lainnya} alt="" style={{ width: "69px" }} />
                        </div>
                        <div className="title">{t("layanan7")}</div>
                      </div>
                    </div>
                  </div> */}
                </center>
              </PaddingPwa>
              <Gap height={70} />
              <NavigateButtomNew />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
