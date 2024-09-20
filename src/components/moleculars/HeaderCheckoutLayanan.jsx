import React from "react";
import ContentTitleValue from "./ContentTitleValue";
import { icon } from "../utils/IconLayananService";
import { t } from "i18next";
import PAS from "../../assets/images/TRIGGER.svg";
import Trigger from "../../assets/images/PAS.svg";
import Lainnya from "../../assets/images/new pwa icon/dashboard/iconPembayaranLainnya.png";
function HeaderCheckoutLayanan({ layanan, payment_status }) {
  const renderStatusOrder = () => {
    switch (payment_status) {
      case "001":
        return (
          <ContentTitleValue
            type="waiting"
            title="Status Order:"
            value="Menunggu"
          />
        );
      case "002":
        return (
          <ContentTitleValue
            type="waiting"
            title="Status Order:"
            value="Order Diproses"
          />
        );
      case "003":
        return (
          <ContentTitleValue
            type="success"
            title="Status Order:"
            value="Mendapatkan Mitra"
          />
        );
      case "004":
        return (
          <ContentTitleValue
            type="success"
            title="Status Order:"
            value="Menuju Lokasi"
          />
        );
      case "005":
        return (
          <ContentTitleValue
            type="success"
            title="Status Order:"
            value="Hadir dan Sedang Bertugas"
          />
        );
      case "006":
        return (
          <ContentTitleValue
            type="waiting"
            title="Status Order:"
            value="Cek Dokumen"
          />
        );
      case "007":
        return (
          <ContentTitleValue
            type="waiting"
            title="Status Order:"
            value="Registrasi Dokumen"
          />
        );
      case "008":
        return (
          <ContentTitleValue
            type="success"
            title="Status Order:"
            value="Registrasi Selesai"
          />
        );
      case "009":
        return (
          <ContentTitleValue
            type="success"
            title="Status Order:"
            value="Penyerahan Dokumen"
          />
        );
      case "010":
        return (
          <ContentTitleValue
            type="success"
            title="Status Order:"
            value="Selesai"
          />
        );
      default:
        return (
          <ContentTitleValue
            type="waiting"
            title="Status Order:"
            value="Membuat Pesanan"
          />
        );
    }
  };
  //gambar darisini
  return (
    <div className="detail-riwayat-container">
      <img
        src={icon(layanan)}
        alt="not internet connection"
        style={layanan == t("layanan7") ? { width: "50px" } : {}}
      />
      <div className="content-detail">
        <div className="title-f">{layanan}</div>
        <div className="info-s">
          <div className="title">Ada</div>
        </div>
        {renderStatusOrder()}
      </div>
    </div>
  );
}

export default HeaderCheckoutLayanan;
