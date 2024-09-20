import React from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getHistoriesPointByUserId,
  getPointByUserId,
  orderTnosGems,
} from "../../redux/slices/users/UserSlices";
import ButtonFixedFooter from "../../../src/components/utils/ButtonFixedFooter";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import TitleHeader from "../utils/TitleHeader";
import tnosgems from "../../assets/images/tnosgems.png";
import tnosgemsmin from "../../assets/images/tnosgemsmin.png";
import moment from "moment-timezone";
import { Skeleton } from "@mui/material";
const formSchema = Yup.object({
  quantity: Yup.string()
    .required("Point cannot be null")
    .test("quantity", "Value must be 10 points", (val) => parseInt(val) >= 10),
});
function TnosGems() {
  TitleHeader("Top Up Tnos Gems");
  var user = JSON.parse(localStorage.getItem("userInfo"));
  const dispact = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispact(getPointByUserId(user.mmbr_code));
    dispact(getHistoriesPointByUserId(user.mmbr_code));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispact]);

  const storeData = useSelector((store) => store?.users);
  const { loading, product, detailPointUser, historiesPoint } = storeData;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      quantity: "10",
      id: "1",
    },
    onSubmit: (values) => {
      values.user_id = user.mmbr_code;
      values.description = "Pembelian Poin";
      values.customer = {
        gives_name: user.mmbr_name,
        email: user.mmbr_email,
        mobile_number: user.mmbr_phone,
      };

      values.items = {
        id: values.id,
        quantity: values.quantity,
      };

      // console.log(values);

      dispact(orderTnosGems(values))
        .then(({ payload }) => {
          // console.log(payload?.message);
          if (payload?.success === true) {
            // toast.success(payload?.message);
            // console("berhasil");
            // console.log(payload?.order);
            navigate(`/tnos-gems/` + payload?.order?.id);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validationSchema: formSchema,
  });

  const addQuantity = () => {
    let value = parseInt(formik.values.quantity);

    formik.setFieldValue("quantity", (value += 1));
  };
  const minQuantity = () => {
    let value = parseInt(formik.values.quantity);

    if (parseInt(formik.values.quantity) <= 10) {
      return false;
    }
    formik.setFieldValue("quantity", (value -= 1));
  };

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/profile" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw">Top Up Tnos Gems</h5>
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
            <div className="box-topup-tnos-gems">
              <div className="profile-dawd">
                <div className="jdkawdnawkdawhd">
                  <div className="dawdawd">{user.mmbr_name}</div>
                </div>
                <div className="dawdadafbbtjku">
                  <div className="dwadadaw">
                    Poin:{" "}
                    <span>
                      {loading ? (
                        <Skeleton width="30px" height={22} />
                      ) : detailPointUser ? (
                        detailPointUser?.point
                      ) : (
                        0
                      )}
                    </span>
                  </div>
                  <div
                    className="agawdawdaw"
                    onClick={() => navigate("/dashboard")}
                  >
                    Layanan
                  </div>
                </div>
              </div>
              <form onSubmit={formik.handleSubmit} action="">
                <div className="dwadawdwfw">
                  <label htmlFor="quantity">Masukan Jumlah Poin</label>
                  <div className="dwko">
                    <span onClick={() => minQuantity()}>-</span>
                    <input
                      type="text"
                      id="quantity"
                      min="0"
                      className="abdwd-dawd"
                      value={formik.values.quantity}
                      onChange={(e) => {
                        e.preventDefault();
                        const { value } = e.target;
                        const regex =
                          /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
                        if (regex.test(value.toString())) {
                          formik.setFieldValue("quantity", value);
                        }
                      }}
                      onBlur={formik.handleBlur("quantity")}
                    />
                    <span onClick={() => addQuantity()}>+</span>
                  </div>
                  {formik.touched.quantity && (
                    <div className="text-danger text-center">
                      {formik.errors.quantity}
                    </div>
                  )}

                  <p className="dwadwji">
                    Masukan jumlah Point yang ingin dibeli, 1 Poin sama dengan
                    Rp 10.000 dapat digunakan disemua layanan yang tersedia
                  </p>
                </div>
                <ButtonFixedFooter
                  loading={loading}
                  button={`Checkout Rp ${
                    product?.price
                      ? (
                          product.price * parseInt(formik.values.quantity)
                        ).toLocaleString()
                      : (
                          10000 * parseInt(formik.values.quantity)
                        ).toLocaleString()
                  }`}
                  cssCustom="btn-dwajdj layanan"
                  type="submit"
                />
              </form>
            </div>
            <div className="dwadawdwfw">
              <div className="klwodwdanwd">
                <div className="title-dwddwadahthf">Transaksi Terakhir</div>
              </div>
              <div className="klwodwdanwd">
                <div className="lmnndjawbd">
                  {loading ? (
                    <>
                      {" "}
                      <div className="dwafnwf">
                        <div className="nncbawhdw">
                          <Skeleton
                            variant="circular"
                            width="55px"
                            height="55px"
                          />
                          <div className="mdwakdbpi">
                            <div className="dwwkdjjfwif">
                              <Skeleton width="50px" height={22} />
                            </div>
                            <div className="vefafwa">
                              <Skeleton width="30px" height={22} />
                            </div>
                            <div className="vajkyaf">
                              <Skeleton width="120px" height={22} />
                            </div>
                          </div>
                        </div>
                        <div className="jawwffwacawd">
                          <div className="davkugsd">
                            <Skeleton width="50px" height={22} />
                          </div>
                          <div className="cadgvrh">
                            <Skeleton width="30px" height={22} />
                          </div>
                        </div>
                      </div>
                      <div className="dwafnwf">
                        <div className="nncbawhdw">
                          <Skeleton
                            variant="circular"
                            width="55px"
                            height="55px"
                          />
                          <div className="mdwakdbpi">
                            <div className="dwwkdjjfwif">
                              <Skeleton width="50px" height={22} />
                            </div>
                            <div className="vefafwa">
                              <Skeleton width="30px" height={22} />
                            </div>
                            <div className="vajkyaf">
                              <Skeleton width="120px" height={22} />
                            </div>
                          </div>
                        </div>
                        <div className="jawwffwacawd">
                          <div className="davkugsd">
                            <Skeleton width="50px" height={22} />
                          </div>
                          <div className="cadgvrh">
                            <Skeleton width="30px" height={22} />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : historiesPoint && historiesPoint.length > 0 ? (
                    historiesPoint?.map((row, key) => {
                      return (
                        <div className="dwafnwf" key={key}>
                          <div className="nncbawhdw">
                            {row?.in_point && (
                              <img src={tnosgems} alt="" className="nvwadwdj" />
                            )}
                            {row?.out_point && (
                              <img
                                src={tnosgemsmin}
                                alt=""
                                className="nvwadwdj"
                              />
                            )}

                            <div className="mdwakdbpi">
                              <div className="dwwkdjjfwif">
                                {row?.description}
                              </div>
                              {row?.in_point && (
                                <div className="vefafwa">Masuk TNOS</div>
                              )}
                              {row?.out_point && (
                                <div className="vefafwa">Keluar TNOS</div>
                              )}

                              <div className="vajkyaf">
                                {moment(row?.created_at).format("DD-MM-YYYY")}
                              </div>
                            </div>
                          </div>
                          <div className="jawwffwacawd">
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                navigate(`/tnos-gems/rincian/${row?.id}`)
                              }
                            >
                              <FaArrowRight />
                            </span>
                            {row?.in_point && (
                              <div className="davkugsd">
                                Rp{(row?.in_point * 10000).toLocaleString()}
                              </div>
                            )}
                            {row?.out_point && (
                              <div className="davkugsd">
                                -Rp{(row?.out_point * 10000).toLocaleString()}
                              </div>
                            )}
                            <div className="cadgvrh">Berhasil</div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className="dwwkdjjfwif"
                      style={{ textAlign: "center", paddingTop: "7px" }}
                    >
                      Data Kosong
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TnosGems;
