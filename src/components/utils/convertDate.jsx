import { t } from "i18next";
import moment from "moment";

const converterDate = (date) => {
  var dt = moment(date, "YYYY-MM-DD HH:mm:ss");
  var hari = "";
  var bulan = "";

  switch (dt.format("dddd")) {
    case "Monday":
      hari = t("day1");
      break;
    case "Tuesday":
      hari = t("day2");
      break;
    case "Wednesday":
      hari = t("day3");
      break;
    case "Thursday":
      hari = t("day4");
      break;
    case "Friday":
      hari = t("day5");
      break;
    case "Saturday":
      hari = t("day6");
      break;
    case "Sunday":
      hari = t("day7");
      break;
    default:
      hari = "";
      break;
  }

  switch (dt.format("MMMM")) {
    case "January":
      bulan = "januari";
      break;
    case "February":
      bulan = "februari";
      break;
    case "March":
      bulan = "Maret";
      break;
    case "April":
      bulan = "April";
      break;
    case "May":
      bulan = "Mei";
      break;
    case "June":
      bulan = "Juni";
      break;
    case "July":
      bulan = "Juli";
      break;
    case "August":
      bulan = "Agustus";
      break;
    case "September":
      bulan = "September";
      break;
    case "October":
      bulan = "Oktober";
      break;
    case "November":
      bulan = "November";
      break;
    case "December":
      bulan = "Desember";
      break;
    default:
      bulan = "";
      break;
  }
  return (
    hari +
    dt.format(`, DD`) +
    " " +
    bulan +
    dt.format(` YYYY`) +
    dt.format(" HH:mm")
  );
};

export { converterDate };
