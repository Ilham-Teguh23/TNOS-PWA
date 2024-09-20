import { Skeleton } from "@mui/material";
import moment from "moment-timezone";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getHistoriesPointById } from "../../redux/slices/users/UserSlices";
import TitleHeader from "../utils/TitleHeader";
import tnosgems from "../../assets/images/tnosgems.png";
import tnosgemsmin from "../../assets/images/tnosgemsmin.png";

function DetailRincianPembayaranTsaldo() {
  TitleHeader("Rincian Pembayaran");
  const dispact = useDispatch();
  const params = useParams();
  const storeData = useSelector((store) => store?.users);
  const { loading, detailHistoriesPoint } = storeData;

  useEffect(() => {
    dispact(getHistoriesPointById(params?.id));
  }, [dispact, params]);

  const handleCopy = (e) => {
    if (e) {
      navigator.clipboard.writeText(e);
      toast.success(`Copied to clipboard ${e}`);
    }
  };

  const renderContent = () => {
    if (detailHistoriesPoint?.out_point) {
      return (
        <>
          <div className="uhdwdwnjjnas">
            <div className="njdwadjnalpdwa">
              <div className="njdalpwrind">
                <sub>-Rp</sub>{" "}
                {`${(
                  detailHistoriesPoint?.out_point * 10000
                ).toLocaleString()}`}
              </div>
              <div className="bnhdawdkpwd">
                <FaCheckCircle /> Berhasil
              </div>
              <div className="kijdwnajnfw">
                Waktu Selesai:
                {moment(detailHistoriesPoint?.createdAt).format(
                  " DD-MM-YYYY HH:MM"
                )}
              </div>
            </div>
          </div>
          <div className="hiodwadoj">
            <div className="bdhwdhwadj">
              <div className="fafoofsf">Ke</div>
              <div className="oodwijadnn">
                <img
                  src={tnosgemsmin}
                  alt="tnos gems"
                  className="njdnawjdbwg"
                  style={{ width: "30px" }}
                />{" "}
                {`-${detailHistoriesPoint?.out_point} Poin`}
              </div>
            </div>
            <div className="bdhwdhwadj">
              <div className="fafoofsf">Metode Pembayaran</div>
              <div className="oodwijadnn">TNOS POINT</div>
            </div>
            <div className="bdhwdhwadj ggefeafasf">
              <div className="fafwdahrd">Rincian Referensi</div>
            </div>
            <div className="bdhwdhwadj">
              <div className="fafoofsf">No. Transaksi</div>
              <div className="oodwijadnn">
                {detailHistoriesPoint?.histories_id}
                <span
                  style={{ color: "gray", cursor: "pointer" }}
                  onClick={() =>
                    handleCopy(`${detailHistoriesPoint?.histories_id}`)
                  }
                >
                  {` SALIN`}
                </span>
              </div>
            </div>
            <div className="bdhwdhwadj">
              <div className="fafoofsf">Tanggal Transaksi</div>
              <div className="oodwijadnn">
                {detailHistoriesPoint?.createdAt}
              </div>
            </div>
            <div className="bdhwdhwadj ggefeafasf">
              <div className="fafwdahrd">Rincian Layanan</div>
            </div>
            <div className="bdhwdhwadj">
              <div className="fafoofsf">Keterangan</div>
              <div className="oodwijadnn">
                {detailHistoriesPoint?.description}
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="uhdwdwnjjnas">
            <div className="njdwadjnalpdwa">
              <div className="njdalpwrind">
                <sub>Rp</sub> {detailHistoriesPoint?.amount?.toLocaleString()}
              </div>
              <div className="bnhdawdkpwd">
                <FaCheckCircle /> Berhasil
              </div>
              <div className="kijdwnajnfw">
                Waktu Selesai:
                {moment(detailHistoriesPoint?.createdAt).format(
                  " DD-MM-YYYY HH:MM"
                )}
              </div>
            </div>
          </div>
          <div className="hiodwadoj">
            <div className="bdhwdhwadj">
              <div className="fafoofsf">Ke</div>
              <div className="oodwijadnn">
                <img
                  src={tnosgems}
                  alt="tnos gems"
                  className="njdnawjdbwg"
                  style={{ width: "30px" }}
                />{" "}
                TNOS
              </div>
            </div>
            <div className="bdhwdhwadj">
              <div className="fafoofsf">Metode Pembayaran</div>
              <div className="oodwijadnn">
                {detailHistoriesPoint?.payment_method}
              </div>
            </div>
            <div className="bdhwdhwadj ggefeafasf">
              <div className="fafwdahrd">Rincian Referensi</div>
            </div>
            <div className="bdhwdhwadj">
              <div className="fafoofsf">No. Transaksi</div>
              <div className="oodwijadnn">
                {detailHistoriesPoint?.tsaldo_invoice_id}
                <span
                  style={{ color: "gray", cursor: "pointer" }}
                  onClick={() =>
                    handleCopy(`${detailHistoriesPoint?.tsaldo_invoice_id}`)
                  }
                >
                  {` SALIN`}
                </span>
              </div>
            </div>
            <div className="bdhwdhwadj">
              <div className="fafoofsf">No. Referensi</div>
              <div className="oodwijadnn">
                {detailHistoriesPoint?.external_id}
              </div>
            </div>
            <div className="bdhwdhwadj">
              <div className="fafoofsf">Tanggal Transaksi</div>
              <div className="oodwijadnn">
                {detailHistoriesPoint?.createdAt}
              </div>
            </div>
            {/* <div className="bdhwdhwadj ggefeafasf">
              <div className="fafwdahrd">Rincian Layanan</div>
            </div> */}
            {/* <div className="bdhwdhwadj">
            <div className="fafoofsf">Pengaman Korporat</div>
            <div className="oodwijadnn">
              <FaArrowRight />
            </div>
          </div> */}
          </div>
        </>
      );
    }
  };

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/tnos-gems" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw">Rincian Pembayaran</h5>
            </Link>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="njwdjhwk">
            {loading ? (
              <>
                <div className="uhdwdwnjjnas">
                  <div className="njdwadjnalpdwa">
                    <div className="njdalpwrind">
                      <Skeleton width="50px" height={42} />
                    </div>
                    <div className="bnhdawdkpwd">
                      <Skeleton width="40px" height={22} />
                    </div>
                    <div className="kijdwnajnfw">
                      <Skeleton width="100px" height={22} />
                    </div>
                  </div>
                </div>
                <div className="hiodwadoj">
                  <div className="bdhwdhwadj">
                    <div className="fafoofsf">
                      {" "}
                      <Skeleton width="50px" height={32} />
                    </div>
                    <div className="oodwijadnn">
                      <Skeleton width="50px" height={35} />
                    </div>
                  </div>
                  <div className="bdhwdhwadj">
                    <div className="fafoofsf">
                      {" "}
                      <Skeleton width="50px" height={32} />
                    </div>
                    <div className="oodwijadnn">
                      {" "}
                      <Skeleton width="50px" height={35} />
                    </div>
                  </div>
                  <div className="bdhwdhwadj ggefeafasf">
                    <div className="fafwdahrd">
                      {" "}
                      <Skeleton width="50px" height={32} />
                    </div>
                  </div>
                  <div className="bdhwdhwadj">
                    <div className="fafoofsf">
                      {" "}
                      <Skeleton width="50px" height={32} />
                    </div>
                    <div className="oodwijadnn">
                      <Skeleton width="50px" height={35} />
                    </div>
                  </div>
                  <div className="bdhwdhwadj">
                    <div className="fafoofsf">
                      {" "}
                      <Skeleton width="50px" height={32} />
                    </div>
                    <div className="oodwijadnn">
                      {" "}
                      <Skeleton width="50px" height={35} />
                    </div>
                  </div>
                  {/* <div className="bdhwdhwadj ggefeafasf">
                <div className="fafwdahrd">Rincian Pesanan</div>
              </div>
              <div className="bdhwdhwadj">
                <div className="fafoofsf">No. Referensi</div>
                <div className="oodwijadnn">1121245242525234546646</div>
              </div> */}
                </div>
              </>
            ) : detailHistoriesPoint ? (
              renderContent()
            ) : (
              <>
                <div className="uhdwdwnjjnas">
                  <div className="njdwadjnalpdwa">
                    <div className="bnhdawdkpwd">
                      <FaTimesCircle style={{ color: "red" }} /> Data Tidak
                      Ditemukan
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DetailRincianPembayaranTsaldo;
