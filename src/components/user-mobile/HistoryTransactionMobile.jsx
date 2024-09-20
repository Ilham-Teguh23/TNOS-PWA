import React from "react";
import { Fragment } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import khukum from "../../assets/images/konsultasi-hukum.png";
import phukum from "../../assets/images/phukum.png";
import ppengamanan from "../../assets/images/ppengamanan.png";
import topup from "../../assets/images/topup.png";
// import tcoin from "../../assets/images/tnosCoin.png";
import pt from "../../assets/images/pt.png";
import cv from "../../assets/images/cv.png";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment-timezone";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { UserHistoryTransactioAction } from "../../redux/slices/users/UserSlices";

function HistoryTransactionMobile() {
  const { t } = useTranslation();
  const [layananId, setLayananId] = useState("");
  const navigate = useNavigate();
  const storeData = useSelector((store) => store?.users);
  const { userInfo, historyList, loading } = storeData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserHistoryTransactioAction(userInfo?.mmbr_code));
  }, [dispatch, userInfo]);

  let renderData = "";
  if (historyList) {
    // this gives an object with dates as keys
    const groups =
      historyList &&
      historyList?.reduce((groups, game) => {
        const date = game.day.split(" ")[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(game);
        return groups;
      }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        games: groups[date],
      };
    });

    // console.log("sebelum difilter:");
    // console.log(groupArrays);

    // console.log("setelah difilter:");
    // console.log(filter);

    renderData =
      groupArrays &&
      groupArrays.map((row, key) => {
        var dt = moment(row.date, "YYYY-MM-DD HH:mm:ss");
        var hari = "";
        var bulan = "";
        if (localStorage.getItem("code") === "idn") {
          switch (dt.format("dddd")) {
            case "Monday":
              hari = "Senin";
              break;
            case "Tuesday":
              hari = "Selasa";
              break;
            case "Wednesday":
              hari = "Rabu";
              break;
            case "Thursday":
              hari = "Kamis";
              break;
            case "Friday":
              hari = "Jumat";
              break;
            case "Saturday":
              hari = "Saptu";
              break;
            case "Sunday":
              hari = "Minggu";
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
        } else {
          hari = dt.format("dddd");
          bulan = dt.format("MMMM");
        }

        return (
          <Fragment key={key}>
            <div className="history-wjdwn mt-3">
              <h5 className="title-wdnwj">
                {hari}
                {dt.format(`, DD`)}
                {" " + bulan}
                {dt.format(` YYYY`)}
              </h5>
              {layananId
                ? row.games &&
                  row.games
                    ?.filter((row) => row.tnos_service_id === layananId)
                    .map((row, key) => {
                      var name = "";
                      var icon = "";
                      var payment_status = "";
                      var css_payment_status = {};
                      var idr = "";
                      var url = "";
                      var status_order = "";
                      var css_status_order = {
                        background: "rgb(90 255 110 / 0%)",
                      };

                      if (row.payment_status === "ORDER") {
                        payment_status = "Order";
                        css_payment_status = { color: "rgb(169 169 169)" };
                        idr = "Rp.";
                      } else if (row.payment_status === "UNPAID") {
                        payment_status = "Belum dibayar";
                        css_payment_status = { color: "rgb(185 201 57)" };
                        idr = "Rp.";
                      } else if (
                        row.payment_status === "PAID" ||
                        row.payment_status === "SETTLED"
                      ) {
                        payment_status = "Sudah dibayar";
                        css_payment_status = { color: "rgb(90 255 110)" };
                        idr = "Rp.";
                      } else {
                        payment_status = "Kadaluarsa";
                        css_payment_status = { color: "rgb(255 90 90)" };
                        idr = "Rp.";
                      }
                      if (row.status_order === "WAIT") {
                        status_order = "Menunggu";
                      } else if (row.status_order === "START") {
                        status_order = "Mitra sedang persiapan";
                      } else if (row.status_order === "RUN") {
                        status_order =
                          "Mitra sedang bertugas atau dalam perjalanan";
                      } else if (row.status_order === "FINISH") {
                        status_order = "Mitra Selesai bertugas";
                      } else {
                        status_order = "Kosong";
                      }
                      if (
                        row.tnos_service_id === "1" &&
                        row.tnos_subservice_id === "1"
                      ) {
                        name = "Konsultasi Hukum";
                        icon = khukum;
                      } else if (
                        row.tnos_service_id === "1" &&
                        row.tnos_subservice_id === "2"
                      ) {
                        name = "Pendampingan Hukum";
                        icon = phukum;
                      } else if (
                        row.tnos_service_id === "2" &&
                        row.tnos_subservice_id === "1"
                      ) {
                        name = "Pengamanan Perorangan";
                        icon = ppengamanan;
                      } else if (
                        row.tnos_service_id === "2" &&
                        row.tnos_subservice_id === "2"
                      ) {
                        name = "Pengamanan Korporat";
                        icon = ppengamanan;
                        url = `/pengamanan-korporat/${row.id}`;
                      } else if (
                        row.tnos_service_id === "3" &&
                        row.tnos_subservice_id === "1"
                      ) {
                        name = "Badan Usaha PT";
                        icon = pt;
                        url = `/badan-usaha-pt/${row.id}`;
                      } else if (
                        row.tnos_service_id === "3" &&
                        row.tnos_subservice_id === "2"
                      ) {
                        name = "Badan Usaha CV";
                        icon = cv;
                        url = `/badan-usaha-cv/${row.id}`;
                      } else if (
                        row.tnos_service_id === "3" &&
                        row.tnos_subservice_id === "3"
                      ) {
                        name = "Badan Usaha Yayasan";
                        icon = cv;
                        url = `/badan-usaha-yayasan/${row.id}`;
                      } else if (
                        row.tnos_service_id === "3" &&
                        row.tnos_subservice_id === "4"
                      ) {
                        name = "Badan Usaha Perkumpulan";
                        icon = cv;
                        url = `/badan-usaha-perkumpulan/${row.id}`;
                      } else if (
                        row.tnos_service_id === "3" &&
                        row.tnos_subservice_id === "5"
                      ) {
                        name = "Badan Usaha Asosiasi";
                        icon = cv;
                        url = `/badan-usaha-asosiasi/${row.id}`;
                      } else {
                        name = "tidak ada";
                        icon = topup;
                      }

                      return (
                        <Fragment key={key}>
                          <div className="d-flex align-items-center justify-content-between mb-2 dawd">
                            <div className="d-flex align-items-center">
                              <div className="text-center">
                                <img
                                  src={icon}
                                  alt=""
                                  className="img-ndadnaj"
                                />
                              </div>
                              <div className="profil-ndwadnj">
                                <div className="dwdwa-faf">{name}</div>
                                <span
                                  className="kkn-sf"
                                  style={css_status_order}
                                >
                                  Status Pembayaran:{" "}
                                  <b
                                    className="kkn-sf"
                                    style={css_payment_status}
                                  >
                                    {payment_status}
                                  </b>
                                </span>
                                <br />
                                <span
                                  className="kkn-sf"
                                  style={css_status_order}
                                >
                                  Status Order:{" "}
                                  <b>
                                    {row.payment_status === "PAID" ||
                                    row.payment_status === "SETTLED"
                                      ? status_order
                                      : "-"}
                                  </b>
                                </span>
                                <br />
                                <span
                                  className="kkn-sf"
                                  style={css_status_order}
                                >
                                  Waktu Order: <b>{row.created_at}</b>
                                </span>
                                <br />
                                <span
                                  className="kkn-sf"
                                  style={css_status_order}
                                >
                                  Waktu Kadaluarsa: <b>{row.expiry_date}</b>
                                </span>
                              </div>
                            </div>
                            <div className="ndwdwdwajdw">
                              <div className="harga-dwjdjw">
                                {`${idr} `}{" "}
                                {row.order_total
                                  ? row.order_total.toLocaleString()
                                  : ""}
                              </div>
                              {/* <div className="d-flex gems-dwd">
                            <img src={tcoin} alt="" className="img-dvdwh" />{" "}
                            TNOS Gems
                          </div> */}
                              <div
                                onClick={() => navigate(url)}
                                className="klik"
                              >
                                Lanjutkan membayar
                              </div>
                            </div>
                          </div>
                        </Fragment>
                      );
                    })
                : row.games.map((row, key) => {
                    var name = "";
                    var icon = "";
                    var payment_status = "";
                    var css_payment_status = {};
                    var idr = "";
                    var url;
                    var status_order = "";
                    var css_status_order = {
                      background: "rgb(90 255 110 / 0%)",
                    };

                    if (row.payment_status === "ORDER") {
                      payment_status = "Memesan";
                      css_payment_status = { color: "rgb(169 169 169)" };
                      idr = "Rp.";
                    } else if (row.payment_status === "UNPAID") {
                      payment_status = "Belum dibayar";
                      css_payment_status = { color: "rgb(185 201 57)" };
                      idr = "Rp.";
                    } else if (
                      row.payment_status === "PAID" ||
                      row.payment_status === "SETTLED"
                    ) {
                      payment_status = "Sudah dibayar";
                      css_payment_status = { color: "rgb(90 255 110)" };
                      idr = "Rp.";
                    } else {
                      payment_status = "Kadaluarsa";
                      css_payment_status = { color: "rgb(255 90 90)" };
                      idr = "Rp.";
                    }
                    if (row.status_order === "WAIT") {
                      status_order = "Menunggu";
                    } else if (row.status_order === "START") {
                      status_order = "Mitra sedang persiapan";
                    } else if (row.status_order === "RUN") {
                      status_order =
                        "Mitra sedang bertugas atau dalam perjalanan";
                    } else if (row.status_order === "FINISH") {
                      status_order = "Mitra Selesai bertugas";
                    } else {
                      status_order = "Kosong";
                    }
                    if (
                      row.tnos_service_id === "1" &&
                      row.tnos_subservice_id === "1"
                    ) {
                      name = "Konsultasi Hukum";
                      icon = khukum;
                    } else if (
                      row.tnos_service_id === "1" &&
                      row.tnos_subservice_id === "2"
                    ) {
                      name = "Pendampingan Hukum";
                      icon = phukum;
                    } else if (
                      row.tnos_service_id === "2" &&
                      row.tnos_subservice_id === "1"
                    ) {
                      name = "Pengamanan Perorangan";
                      icon = ppengamanan;
                    } else if (
                      row.tnos_service_id === "2" &&
                      row.tnos_subservice_id === "2"
                    ) {
                      name = "Pengamanan Korporat";
                      icon = ppengamanan;
                      url = `/pengamanan-korporat/${row.id}`;
                    } else if (
                      row.tnos_service_id === "3" &&
                      row.tnos_subservice_id === "1"
                    ) {
                      name = "Badan Usaha PT";
                      icon = pt;
                      url = `/badan-usaha-pt/${row.id}`;
                    } else if (
                      row.tnos_service_id === "3" &&
                      row.tnos_subservice_id === "2"
                    ) {
                      name = "Badan Usaha CV";
                      icon = cv;
                      url = `/badan-usaha-cv/${row.id}`;
                    } else if (
                      row.tnos_service_id === "3" &&
                      row.tnos_subservice_id === "3"
                    ) {
                      name = "Badan Usaha Yayasan";
                      icon = cv;
                      url = `/badan-usaha-yayasan/${row.id}`;
                    } else if (
                      row.tnos_service_id === "3" &&
                      row.tnos_subservice_id === "4"
                    ) {
                      name = "Badan Usaha Perkumpulan";
                      icon = cv;
                      url = `/badan-usaha-perkumpulan/${row.id}`;
                    } else if (
                      row.tnos_service_id === "3" &&
                      row.tnos_subservice_id === "5"
                    ) {
                      name = "Badan Usaha Asosiasi";
                      icon = cv;
                      url = `/badan-usaha-asosiasi/${row.id}`;
                    } else {
                      name = "tidak ada";
                      icon = topup;
                    }
                    // console.log(url);
                    return (
                      <Fragment key={key}>
                        <div className="d-flex align-items-center justify-content-between mb-2 dawd">
                          <div className="d-flex align-items-center">
                            <div className="text-center">
                              <img src={icon} alt="" className="img-ndadnaj" />
                            </div>
                            <div className="profil-ndwadnj">
                              <div className="dwdwa-faf">{name}</div>
                              <span className="kkn-sf" style={css_status_order}>
                                Status Pembayaran:{" "}
                                <b
                                  className="kkn-sf"
                                  style={css_payment_status}
                                >
                                  {payment_status}
                                </b>
                              </span>
                              <br />
                              <span className="kkn-sf" style={css_status_order}>
                                Status Order:{" "}
                                <b>
                                  {row.payment_status === "PAID" ||
                                  row.payment_status === "SETTLED"
                                    ? status_order
                                    : "-"}
                                </b>
                              </span>
                              <br />
                              <span className="kkn-sf" style={css_status_order}>
                                Waktu Order: <b>{row.created_at}</b>
                              </span>
                              <br />
                              <span className="kkn-sf" style={css_status_order}>
                                Waktu Kadaluarsa: <b>{row.expiry_date}</b>
                              </span>
                            </div>
                          </div>
                          <div className="ndwdwdwajdw">
                            <div className="harga-dwjdjw">
                              {`${idr} `}
                              {row.order_total
                                ? row.order_total.toLocaleString()
                                : ""}
                            </div>
                            {/* <div className="d-flex gems-dwd">
                          <img src={tcoin} alt="" className="img-dvdwh" />{" "}
                          TNOS Gems
                        </div> */}
                            {row.payment_status === "UNPAID" ||
                            row.payment_status === "ORDER" ? (
                              <div
                                onClick={() => navigate(url)}
                                className="klik"
                              >
                                Lanjutkan membayar
                              </div>
                            ) : (
                              <div
                                onClick={() =>
                                  navigate(`/riwayat-transaksi/${row.id}`)
                                }
                                className="klik"
                              >
                                Detail
                              </div>
                            )}
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
            </div>
          </Fragment>
        );
      });
  }
  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/dashboard" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw ml-2">{t("riwayat_transaksi")}</h5>
            </Link>
          </div>
          <div className="njwdjhwk">
            <hr />
            <div className="dawbdwb d-flex align-items-center justify-content-center">
              {/* <div className="form-group">
                <select className="filter-jdawjd" name="" id="">
                  <option value="">Tanggal</option>
                  <option value="">Tanggal</option>
                  <option value="">Tanggal</option>
                  <option value="">Tanggal</option>
                </select>
              </div> */}
              <div className="form-group">
                <select
                  onChange={(e) => setLayananId(e.target.value)}
                  className="filter-jdawjd"
                  name=""
                  id=""
                >
                  <option value="">{t("semua")}</option>
                  <option value="1">{t("pengacara")}</option>
                  <option value="2">{t("pengamanan")}</option>
                  <option value="3">{t("badan_hukum")}</option>
                </select>
              </div>
              {/* <div className="form-group">
                <select className="filter-jdawjd" name="" id="">
                  <option value="">Metode</option>
                </select>
              </div> */}
              <hr />
            </div>
            {!loading ? (
              renderData.length > 0 ? (
                renderData
              ) : (
                <div className="w-100 text-center mt-3">
                  {" "}
                  Data Kosong
                  <br />
                </div>
              )
            ) : (
              <div className="w-100 text-center mt-3">
                {" "}
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <br />
              </div>
            )}

            {/* <div className="history-wjdwn mt-3">
              <h5 className="title-wdnwj">Selasa, 02 Nov 2022</h5>
              <div className="d-flex align-items-center justify-content-between mb-2 dawd">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <img src={khukum} alt="" className="img-ndadnaj" />
                  </div>
                  <div className="profil-ndwadnj">
                    <div className="ndawdj">Konsultasi Hukum</div>
                    <div className="dwdwa-faf">Ria Safitri, SH</div>
                  </div>
                </div>
                <div className="ndwdwdwajdw">
                  <div className="harga-dwjdjw">-Rp. {randomAngka()}</div>
                  <div className="d-flex gems-dwd">
                    <img src={tcoin} alt="" className="img-dvdwh" /> TNOS Gems
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2 dawd">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <img src={khukum} alt="" className="img-ndadnaj" />
                  </div>
                  <div className="profil-ndwadnj">
                    <div className="ndawdj">Konsultasi Hukum</div>
                    <div className="dwdwa-faf">Ria Safitri, SH</div>
                  </div>
                </div>
                <div className="ndwdwdwajdw">
                  <div className="harga-dwjdjw">-Rp. {randomAngka()}</div>
                  <div className="d-flex gems-dwd">
                    <img src={tcoin} alt="" className="img-dvdwh" /> TNOS Gems
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2 dawd">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <img src={ppengamanan} alt="" className="img-ndadnaj" />
                  </div>
                  <div className="profil-ndwadnj">
                    <div className="ndawdj">Pengamanan</div>
                    <div className="dwdwa-faf">Ria Safitri, SH</div>
                  </div>
                </div>
                <div className="ndwdwdwajdw">
                  <div className="harga-dwjdjw">-Rp. {randomAngka()}</div>
                  <div className="d-flex gems-dwd">
                    <img src={tcoin} alt="" className="img-dvdwh" /> TNOS Gems
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2 dawd">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <img src={phukum} alt="" className="img-ndadnaj" />
                  </div>
                  <div className="profil-ndwadnj">
                    <div className="ndawdj">Pendampingan Hukum</div>
                    <div className="dwdwa-faf">Ria Safitri, SH</div>
                  </div>
                </div>
                <div className="ndwdwdwajdw">
                  <div className="harga-dwjdjw">-Rp. {randomAngka()}</div>
                  <div className="d-flex gems-dwd">
                    <img src={tcoin} alt="" className="img-dvdwh" /> TNOS Gems
                  </div>
                </div>
              </div>
            </div>
            <div className="history-wjdwn mt-3">
              <h5 className="title-wdnwj">Selasa, 01 Nov 2022</h5>
              <div className="d-flex align-items-center justify-content-between mb-2 dawd">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <img src={phukum} alt="" className="img-ndadnaj" />
                  </div>
                  <div className="profil-ndwadnj">
                    <div className="ndawdj">Pendampingan Hukum</div>
                    <div className="dwdwa-faf">Ria Safitri, SH</div>
                  </div>
                </div>
                <div className="ndwdwdwajdw">
                  <div className="harga-dwjdjw">-Rp. {randomAngka()}</div>
                  <div className="d-flex gems-dwd">
                    <img src={tcoin} alt="" className="img-dvdwh" /> TNOS Gems
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2 dawd">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <img src={ppengamanan} alt="" className="img-ndadnaj" />
                  </div>
                  <div className="profil-ndwadnj">
                    <div className="ndawdj">Pengamanan</div>
                    <div className="dwdwa-faf">Ria Safitri, SH</div>
                  </div>
                </div>
                <div className="ndwdwdwajdw">
                  <div className="harga-dwjdjw">-Rp. {randomAngka()}</div>
                  <div className="d-flex gems-dwd">
                    <img src={tcoin} alt="" className="img-dvdwh" /> TNOS Gems
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2 dawd">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <img src={ppengamanan} alt="" className="img-ndadnaj" />
                  </div>
                  <div className="profil-ndwadnj">
                    <div className="ndawdj">Pengamanan</div>
                    <div className="dwdwa-faf">Ria Safitri, SH</div>
                  </div>
                </div>
                <div className="ndwdwdwajdw">
                  <div className="harga-dwjdjw">-Rp. {randomAngka()}</div>
                  <div className="d-flex gems-dwd">
                    <img src={tcoin} alt="" className="img-dvdwh" /> TNOS Gems
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2 dawd">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <img src={topup} alt="" className="img-ndadnaj" />
                  </div>
                  <div className="profil-ndwadnj">
                    <div className="ndawdj">Top Up</div>
                    <div className="dwdwa-faf">Ria Safitri, SH</div>
                  </div>
                </div>
                <div className="ndwdwdwajdw">
                  <div className="harga-dwjdjw">-Rp. {randomAngka()}</div>
                  <div className="d-flex gems-dwd">
                    <img src={tcoin} alt="" className="img-dvdwh" /> TNOS Gems
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2 dawd">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <img src={topup} alt="" className="img-ndadnaj" />
                  </div>
                  <div className="profil-ndwadnj">
                    <div className="ndawdj">Top Up</div>
                    <div className="dwdwa-faf">Ria Safitri, SH</div>
                  </div>
                </div>
                <div className="ndwdwdwajdw">
                  <div className="harga-dwjdjw">-Rp. {randomAngka()}</div>
                  <div className="d-flex gems-dwd">
                    <img src={tcoin} alt="" className="img-dvdwh" /> TNOS Gems
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2 dawd">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <img src={khukum} alt="" className="img-ndadnaj" />
                  </div>
                  <div className="profil-ndwadnj">
                    <div className="ndawdj">Konsultasi Hukum</div>
                    <div className="dwdwa-faf">Ria Safitri, SH</div>
                  </div>
                </div>
                <div className="ndwdwdwajdw">
                  <div className="harga-dwjdjw">-Rp. {randomAngka()}</div>
                  <div className="d-flex gems-dwd">
                    <img src={tcoin} alt="" className="img-dvdwh" /> TNOS Gems
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HistoryTransactionMobile;
