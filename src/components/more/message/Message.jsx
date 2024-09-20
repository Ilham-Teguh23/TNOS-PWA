import React from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import PaddingPwa from "../../moleculars/PaddingPwa";
// import NoTransactionComponent from "../../moleculars/NoTransactionComponent";
import Gap from "../../moleculars/Gap";
import NavigateButtomNew from "../../moleculars/NavigateButtomNew";
import iconLayanan from "../../../assets/images/new pwa icon/message/IconMessageLayanan.svg";
import iconRp from "../../../assets/images/new pwa icon/message/iconRp.svg";
import TitleHeader from "../../utils/TitleHeader";
import { useNavigate } from "react-router-dom";
import NoTransactionComponent from "../../moleculars/NoTransactionComponent";

const HaveMessage = () => {
  const navigate = useNavigate();
  const message = true;
  return message ? (
    <NoTransactionComponent title="Belum ada pesan" />
  ) : (
    <div className="have-message-container">
      <div
        className="content-container"
        onClick={() => navigate("/message/81726332352635236")}
      >
        <div className="image-container">
          <img src={iconLayanan} alt="" />
        </div>
        <div className="info-message">
          <div className="title-time-container">
            <div className="title">Pesanan “Pengamanan Usaha & Bisnis”</div>
            <div className="time">31 Okt, 11 : 48 AM</div>
          </div>
          <div className="description">
            Hallo Rivaldi, terima kasih atas kepercayaan nya...
          </div>
        </div>
      </div>

      <div className="content-container read">
        <div className="image-container">
          <img src={iconRp} alt="" />
        </div>
        <div className="info-message">
          <div className="title-time-container">
            <div className="title">Pesanan “Pengamanan Usaha & Bisnis”</div>
            <div className="time">31 Okt, 11 : 48 AM</div>
          </div>
          <div className="description">
            Hallo Rivaldi, terima kasih atas kepercayaan nya...
          </div>
        </div>
      </div>
    </div>
  );
};

function Message() {
  TitleHeader("Halaman pesan");
  return (
    <>
      <TopNewNav
        path={`/dashboard`}
        type="noNav"
        background="transparent"
        title={"Pesan"}
      />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div
              className="dashboard-container-f"
              style={{ marginTop: "60px" }}
            >
              <PaddingPwa padding={15}>
                <HaveMessage />
                {/* <NoTransactionComponent title="Belum ada pesan masuk" /> */}
              </PaddingPwa>
            </div>
            <Gap height={80} />
            <NavigateButtomNew messageCount={0} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;
