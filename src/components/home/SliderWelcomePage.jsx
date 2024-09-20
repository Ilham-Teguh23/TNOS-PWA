import React from "react";
import { Fragment } from "react";
import welcome from "../../assets/images/welcome.png";
import ButtonWelcomePage from "./ButtonWelcomePage";
// import { useTranslation } from "react-i18next";

function SliderWelcomePage() {
  // const { t } = useTranslation();

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="content-slider">
            <img width="100%" height="260px" src={welcome} alt="" />
            <div className="dwad">
              <h5 className="title-welcome-page text-left mb-1">
                TNOS siap siaga kapanpun dimanapun !
              </h5>
              <p className="p-welcome-page text-justify">
                Aplikasi yang buat hidup kamu lebih aman dan nyaman, Selalu siap
                siaga untuk pendampingan dan konsultasi segala keperluan dan
                masalah kamu
              </p>
            </div>
          </div>
          <ButtonWelcomePage />
        </div>
      </div>
    </Fragment>
  );
}

export default SliderWelcomePage;
