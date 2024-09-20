import React, { Component } from "react";
import { FaMedal, FaMoneyBillAlt, FaPlus, FaUser } from "react-icons/fa";
import frame from "../../assets/images/Frame.png";
import { Link, Navigate } from "react-router-dom";
import garis from "../../assets/images/garis.png";
import law from "../../assets/images/law.png";
import cv from "../../assets/images/business.png";
import pt from "../../assets/images/business-2.png";
import pendamping from "../../assets/images/pendamping.png";
import guard from "../../assets/images/guard.png";
import guard_1 from "../../assets/images/guard-2.png";
import notif from "../../assets/images/notif.png";

export class ContentDashboard extends Component {
  state = {
    isBenefit: 1,
    url: "",
  };
  

  onClikBenefit(select) {
    this.setState({ isBenefit: select });
  }
  onClickUrlLayanan(url) {
    console.log(url);
    this.setState({ url: url });
  }
  render() {
    var keuntungan;
    if (this.state.isBenefit === 1) {
      keuntungan = (
        <div ref="keuntungan1" className="content-click-dadnajdw">
          <h5 className="title-dna">keuntungan 1</h5>
          <p className="p-ndajdb">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
            molestiae tenetur ad est perspiciatis eius quidem velit id
            temporibus deleniti?
          </p>
        </div>
      );
    }

    if (this.state.isBenefit === 2) {
      keuntungan = (
        <div className="content-click-dadnajdw">
          <h5 className="title-dna">keuntungan 2</h5>
          <p className="p-ndajdb">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo fugiat
            a eaque. Eum possimus, quibusdam esse nemo illo deserunt nulla.
          </p>
        </div>
      );
    }
    if (this.state.isBenefit === 3) {
      keuntungan = (
        <div className="content-click-dadnajdw">
          <h5 className="title-dna">keuntungan 3</h5>
          <p className="p-ndajdb">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quia
            iste dolorum ducimus error consequatur ex rerum eum. Voluptatibus,
            iste.
          </p>
        </div>
      );
    }
    if (this.state.url) {
      return <Navigate to={this.state.url} replace />;
    }
    if (!localStorage.getItem("token") && !localStorage.getItem("user")) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div>
        <div className="responsive-class">
          <div className="res-class">
            <div className="profile d-flex  align-items-center">
              <div className="icon-profile mr-2">
                <FaUser />
              </div>
              <div className="name-profile">
                <h3 className="nm">Rivaldi Gunawan</h3>
                <span
                  className="rw"
                  onClick={() => this.onClickUrlLayanan("/riwayat-transaksi")}
                >
                  Riwayat Transaksi
                </span>
              </div>
            </div>
            <div className="dashboard-content-s">
              <div className="djas">
                <div className="row justify-content-center align-items-center">
                  <div className="col-6">
                    <div className="card-white-s">
                      <img className="ops" src={frame} alt="" />
                      <br />
                      <Link to="#" className="da">
                        0<sub className="wd">GEMS</sub>
                      </Link>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div className="kjs">
                          <Link className=" hadw">
                            <FaMoneyBillAlt className="dap" />
                            <br />
                            Bayar
                          </Link>
                          <Link className=" hadw">
                            <FaPlus className="dap" />
                            <br />
                            Top Up
                          </Link>
                          <Link className=" hadw">
                            <FaMedal className="dap" />
                            <br />
                            Promo
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-4">
                <div className="card-body">
                  <h5 className="title-keterangan-notif">Progress Pesanan</h5>
                  <div className="row">
                    <div className="col-3">
                      <img src={notif} alt="" className="w-100" />
                    </div>
                    <div className="col-9">
                      <p className="text-justify p-keterangan-notif">
                        Agent TNOS akan segera menghubungimu. periksa pesan
                        masuk secara berkala
                      </p>
                      <button
                        onClick={() => this.onClickUrlLayanan("/message")}
                        className="btn btn-layanan"
                      >
                        Check pesan masuk
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="garis-da">
                <img src={garis} width="100%" alt="" />
              </div>
              <div className="title-layanan">
                <p>Ini adalah layanan </p>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Necessitatibus veniam optio iure odio odit facere atque qui
                  magni nesciunt dolores?
                </p>
              </div>
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-2">
                  <div
                    className="card-kkmcn-0"
                    onClick={() =>
                      this.onClickUrlLayanan("/form-transaksi-konsultasi-hukum")
                    }
                  >
                    <img src={law} alt="" className="img-layanan-jjdk" />
                  </div>
                  <h5 className="title-layanan">
                    Konsultasi <br />
                    Hukum
                  </h5>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-2">
                  <div className="card-kkmcn-1">
                    <img src={pendamping} alt="" className="img-layanan-jjdk" />
                  </div>
                  <h5 className="title-layanan">
                    Pendampingan <br />
                    Hukum
                  </h5>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-2">
                  <div className="card-kkmcn-2">
                    <img src={guard} alt="" className="img-layanan-jjdk" />
                  </div>
                  <h5 className="title-layanan">
                    Pengamanan <br />
                    perorangan
                  </h5>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-2">
                  <div className="card-kkmcn-4">
                    <img src={pt} alt="" className="img-layanan-jjdk" />
                  </div>
                  <h5 className="title-layanan">
                    Pembuatan <br />
                    Badan CV
                  </h5>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-2">
                  <div
                    className="card-kkmcn-3"
                    onClick={() => this.onClickUrlLayanan("/form-transaksi-pt")}
                  >
                    <img src={cv} alt="" className="img-layanan-jjdk" />
                  </div>
                  <h5 className="title-layanan">
                    Pembuatan <br />
                    Badan PT
                  </h5>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 mb-2">
                  <div className="card-kkmcn-5">
                    <img src={guard_1} alt="" className="img-layanan-jjdk" />
                  </div>
                  <h5 className="title-layanan">
                    Pengamanan <br />
                    Korporat
                  </h5>
                </div>
              </div>

              <div className="garis-da">
                <img src={garis} width="100%" alt="" />
              </div>
              <div className="slider-dadnknk">
                <div className="text-center hadkd">
                  <img className="ccad" src={frame} alt="" />
                  <br />
                  <h5 className="dadw">
                    <span className="bdahb">Keuntungan Pakai TNOS</span> Gems
                  </h5>
                  <p className="nadk">
                    Keuntungan pengguna baru total hingga satu juta
                  </p>
                </div>
                {/* <div className="row justify-content-center align-items-center">
                  <div className="col-4 p-0 m-0">
                    <div className="card-ndanma">
                      <div className="ndaklad">
                        <div className="daann">
                          <h5 className="andj">
                            Buat kamu yang butuh
                            <span className="dadw"> Efesien</span> nan{" "}
                            <span className="dadw">Maksimal</span>
                          </h5>
                          <h5 className="ndajb">
                            <span className="orange">Voucher: </span>
                            <br />
                            Disc 30%
                            <br />
                            Pengaman
                          </h5>
                          <div className="adbw">
                            <Link className="dadafgg">Klik detail</Link>
                          </div>
                          <div className="content-dnkdw">
                            <h5 className="ksad">judul 1</h5>
                            <p>
                              Lorem ipsum dolor, sit amet consectetur
                              adipisicing elit. Reprehenderit, debitis?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="button-keuntungan-da">
                  <div className="btn-group">
                    <button
                      className={`dkada ${
                        this.state.isBenefit === 1 ? "active" : ""
                      }`}
                      onClick={() => this.onClikBenefit(1)}
                    >
                      keuntungan 1
                    </button>
                    <button
                      className={`dkada ${
                        this.state.isBenefit === 2 ? "active" : ""
                      }`}
                      onClick={() => this.onClikBenefit(2)}
                    >
                      keuntungan 2
                    </button>
                    <button
                      className={`dkada ${
                        this.state.isBenefit === 3 ? "active" : ""
                      }`}
                      onClick={() => this.onClikBenefit(3)}
                    >
                      keuntungan 3
                    </button>
                  </div>
                </div>
                {keuntungan}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContentDashboard;
