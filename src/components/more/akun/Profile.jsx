import React from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import PaddingPwa from "../../moleculars/PaddingPwa";
import ButtonComponent from "../../atoms/ButtonComponent";
import { useNavigate, useParams } from "react-router-dom";
import TitleHeader from "../../utils/TitleHeader";
import { useTranslation } from "react-i18next";

function Profile() {
  TitleHeader("Halaman profil");
  const navigate = useNavigate();
  const { id } = useParams();
  var user = JSON.parse(localStorage.getItem("userInfo"));
  const { t } = useTranslation();

  return (
    <>
      <TopNewNav title={t("account14")} path={`/account`} />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container">
              <div className="payment-content">
                <PaddingPwa padding={15}>
                  <div className="card-profile-info-fc">
                    <div className="title">
                      <div className="label-fg">{t("account15")}</div>
                      <div className="label-fg">{t("account16")} </div>
                      <div className="label-fg">{t("account17")} </div>
                      <div className="label-fg">{t("account18")} </div>
                    </div>
                    <div className="value">
                      <div className="label-fg">-</div>
                      <div className="label-fg">{user?.mmbr_name}</div>
                      <div className="label-fg">{user?.mmbr_email}</div>
                      <div className="label-fg">{user?.mmbr_phone}</div>
                    </div>
                  </div>
                </PaddingPwa>
                <ButtonComponent
                  title={t("account19")}
                  onClick={() => navigate(`/account/profile/change/${id}`)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
