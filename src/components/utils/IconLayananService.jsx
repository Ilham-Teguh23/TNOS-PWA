import { t } from "i18next";
import solusi_hukum from "../../assets/images/new pwa icon/riwayat/iconsSolusiHukum.svg";
import legalitas_lainnya from "../../assets/images/new pwa icon/riwayat/legalitas_lainnya.svg";
import pengamanan from "../../assets/images/new pwa icon/riwayat/pengamanan.svg";
import PAS from "../../assets/images/TRIGGER.svg";
import TRIGER from "../../assets/images/PAS.svg"
import Lainnya from "../../assets/images/new pwa icon/dashboard/iconPembayaranLainnya.png"
import P1 from "../../assets/images/P1-NEW.png"

const icon = (layanan) => {
  // console.log(layanan);
  switch (layanan) {
    case t("sublayanan1"):
      return legalitas_lainnya;
    case t("sublayanan2"):
      return legalitas_lainnya;
    case t("sublayanan3"):
      return legalitas_lainnya;
    case t("sublayanan4"):
      return legalitas_lainnya;
    case t("sublayanan5"):
      return legalitas_lainnya;
    case t("sublayanan6"):
      return pengamanan;
    case t("sublayanan7"):
      return solusi_hukum;
    case t("partner1"):
      return PAS;
    case t("partner2"):
      return TRIGER
    case t("layanan7"):
      return Lainnya
    case "P1 Force":
      return P1;
    default:
      return;
  }
};

export { icon };
