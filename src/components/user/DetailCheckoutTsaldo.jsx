import { Skeleton } from "@mui/material";
import { useFormik } from "formik";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import tnosgems from "../../assets/images/tnosgems.png";
import {
  orderTnosGemsById,
  paymentTnosGems,
} from "../../redux/slices/users/UserSlices";
import ButtonFixedFooter from "../utils/ButtonFixedFooter";
import TitleHeader from "../utils/TitleHeader";

function DetailCheckoutTsaldo() {
  TitleHeader("Checkout Poin");
  const params = useParams();
  const dispatch = useDispatch();

  const storeData = useSelector((store) => store?.users);
  const { loading, detailOrderTnosGems } = storeData;
  const items = detailOrderTnosGems
    ? JSON.parse(detailOrderTnosGems?.items)
    : "";

  useEffect(() => {
    dispatch(orderTnosGemsById(params?.id));
  }, [dispatch, params]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      order_id: params?.id,
    },
    onSubmit: (values) => {
      // console.log(values);

      dispatch(paymentTnosGems(values))
        .then(({ payload }) => {
          if (payload?.success === true) {
            window.location = `${process.env.REACT_APP_API_INVOICE_URL}${payload?.order?.invoice_id}`;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/tnos-gems" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw">Checkout Poin</h5>
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
                <div className="kyhhdg">
                  <div className="img-dafgegh">
                    <img src={tnosgems} alt="" className="fawfawgwa" />
                  </div>
                  <div className="jdwij">
                    Top Up Poin untuk digunakan disemua layanan
                  </div>
                </div>
                <div className="mkmdwadbh">
                  <table className="w-100">
                    <thead>
                      <tr>
                        <td>
                          Keterangan{" "}
                          <span style={{ float: "right", marginRight: "10px" }}>
                            :
                          </span>
                        </td>
                        <th>
                          {" "}
                          <Skeleton width="100px" height={22} />
                        </th>
                      </tr>
                      <tr>
                        <td>
                          Jumlah Poin
                          <span style={{ float: "right", marginRight: "10px" }}>
                            :
                          </span>
                        </td>
                        <th>
                          {" "}
                          <Skeleton width="30px" height={22} />
                        </th>
                      </tr>
                      <tr>
                        <td>
                          Harga
                          <span style={{ float: "right", marginRight: "10px" }}>
                            :
                          </span>
                        </td>
                        <th>
                          <Skeleton width="80px" height={22} />
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </>
            ) : (
              <>
                <div className="kyhhdg">
                  <div className="img-dafgegh">
                    <img src={tnosgems} alt="" className="fawfawgwa" />
                  </div>
                  <div className="jdwij">
                    Top Up Poin untuk digunakan disemua layanan
                  </div>
                </div>
                <div className="mkmdwadbh">
                  <table className="w-100">
                    <thead>
                      <tr>
                        <td>
                          Keterangan{" "}
                          <span style={{ float: "right", marginRight: "10px" }}>
                            :
                          </span>
                        </td>
                        <th>{detailOrderTnosGems?.description}</th>
                      </tr>
                      <tr>
                        <td>
                          Jumlah Poin
                          <span style={{ float: "right", marginRight: "10px" }}>
                            :
                          </span>
                        </td>
                        <th>{items?.quantity}</th>
                      </tr>
                      <tr>
                        <td>
                          Harga
                          <span style={{ float: "right", marginRight: "10px" }}>
                            :
                          </span>
                        </td>
                        <th>
                          Rp{" "}
                          {parseInt(
                            detailOrderTnosGems?.amount
                          ).toLocaleString()}
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </>
            )}

            <form onSubmit={formik.handleSubmit}>
              <ButtonFixedFooter
                loading={loading}
                button={`Bayar Sekarang Rp ${parseInt(
                  detailOrderTnosGems?.amount
                ).toLocaleString()}`}
                cssCustom="btn-dwajdj layanan"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DetailCheckoutTsaldo;
