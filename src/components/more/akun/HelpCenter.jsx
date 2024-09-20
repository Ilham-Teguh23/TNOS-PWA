import React from "react";
import PaddingPwa from "../../moleculars/PaddingPwa";
import TopNewNav from "../../moleculars/TopNewNav";
import Iframe from "react-iframe";
import TitleHeader from "../../utils/TitleHeader";
import { useTranslation } from "react-i18next";

function HelpCenter() {
  TitleHeader("Halaman pusat bantuan");
  const { t } = useTranslation();
  return (
    <>
      <TopNewNav title={t("account4")} path={`/account`} />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container">
              <div className="payment-content">
                <PaddingPwa padding={15}>
                  <Iframe
                    url="https://tnosbantuan.freshdesk.com/support/solutions/150000082952"
                    width="100%"
                    height="100%"
                    styles={{ minHeight: "100vh" }}
                    id=""
                    className=""
                    display="block"
                    position="relative"
                  />
                </PaddingPwa>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HelpCenter;
