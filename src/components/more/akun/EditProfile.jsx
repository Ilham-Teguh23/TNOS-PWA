import React from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import { useParams } from "react-router-dom";
import PaddingPwa from "../../moleculars/PaddingPwa";
import ButtonComponent from "../../atoms/ButtonComponent";
import LabelComponent from "../../atoms/LabelComponent";
import InputComponent from "../../atoms/InputComponent";
import TitleHeader from "../../utils/TitleHeader";
import { useTranslation } from "react-i18next";

function EditProfile() {
  TitleHeader("Halaman ubah profil");
  const { id } = useParams();
  var user = JSON.parse(localStorage.getItem("userInfo"));
  const { t } = useTranslation();
  // const navigate = useNavigate();
  return (
    <>
      <TopNewNav title={t("account14")} path={`/account/profile/${id}`} />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container">
              <div className="payment-content">
                <PaddingPwa padding={15}>
                  <div className="form-group mb-2">
                    <LabelComponent label={t("account15")} />
                    <InputComponent
                      type={"text"}
                      placeholder={"Masukkan nik"}
                      defaultValue="-"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <LabelComponent label={t("account16")} />
                    <InputComponent
                      type={"text"}
                      placeholder={"Masukkan nama lengkap"}
                      defaultValue={user?.mmbr_name}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <LabelComponent label={t("account17")} />
                    <InputComponent
                      type={"text"}
                      placeholder={"Masukkan email"}
                      defaultValue={user?.mmbr_email}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <LabelComponent label={t("account18")} />
                    <InputComponent
                      type={"text"}
                      placeholder={"Masukkan no handphone"}
                      defaultValue={user?.mmbr_phone}
                    />
                  </div>
                </PaddingPwa>
                <ButtonComponent
                  title={t("account20")}
                  //   onClick={() => navigate(`/more/akun/profile/edit/${id}`)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
