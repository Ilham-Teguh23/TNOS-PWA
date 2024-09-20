import React from "react";
import TitleHeader from "../../utils/TitleHeader";
import TopNewNav from "../../moleculars/TopNewNav";
import PaddingPwa from "../../moleculars/PaddingPwa";
import Gap from "../../moleculars/Gap";
// import NavigateButtomNew from "../../moleculars/NavigateButtomNew";

function DetailMessage() {
  TitleHeader("Halaman rincian pesan");
  return (
    <>
      <TopNewNav title={"Rincian Pesan"} path={`/message`} />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div
              className="dashboard-container-f"
              style={{ marginTop: "60px" }}
            >
              <PaddingPwa padding={15}>
                <div className="rincian-pesan-container">
                  <div className="tanggal">29 Juni 2021</div>
                  <Gap height={10} />
                  <div className="title">
                    Pesanan “Pengamanan Usaha & Bisnis”
                  </div>
                  <Gap height={10} />
                  <div className="description">
                    Hallo Rivaldi, terima kasih atas kepercayaan nya...Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Neque
                    quam rhoncus cras pellentesque tristique tincidunt. Orci sit
                    amet enim venenatis, lectus lacinia duis. Sit tempor urna,
                    nullam augue. Maecenas volutpat platea maecenas leo at
                    mauris.
                  </div>
                  <Gap height={10} />
                  <div className="more-info">
                    <div className="title">Rincian Pesanan</div>
                    <Gap height={15} />
                    <div className="info-f">
                      <div className="content">
                        <div className="title">Waktu</div>
                        <div className="value">2023-03-26</div>
                      </div>
                      <div className="content">
                        <div className="title">Lokasi</div>
                        <div className="value">Plaza Indonesia</div>
                      </div>
                      <div className="content">
                        <div className="title">No. Pesanan</div>
                        <div className="value">TG06202200161</div>
                      </div>
                      <div className="content">
                        <div className="title">Jumlah Tenaga Pengamanan</div>
                        <div className="value">3</div>
                      </div>
                      <div className="content">
                        <div className="title">Lama Waktu Tugas Pengamanan</div>
                        <div className="value">3 Jam</div>
                      </div>
                      <div className="content">
                        <div className="title">Biaya</div>
                        <div className="value">Rp. 4.500.000</div>
                      </div>
                      <div className="content">
                        <div className="title">Status</div>
                        <div className="value">Dalam Perjalanan</div>
                      </div>
                      <div className="content"></div>
                    </div>
                  </div>
                </div>
              </PaddingPwa>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailMessage;
