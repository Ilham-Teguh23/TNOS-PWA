/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { Fragment } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import csh from "../../assets/images/csh-form.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { badanHukumCreateAction } from "../../redux/slices/badan-hukum/BadanHukumSlices";
import MenuFooter from "../../components/cummon/MenuFooter";
import { decode as base64_decode } from "base-64";
import { useState } from "react";
import { useEffect } from "react";
var CryptoJS = require("crypto-js");
const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

const formSchema = Yup.object({
  needs: Yup.string().required("Keperluan Hukum is required"),
  ketentuan: Yup.boolean().oneOf([true], "Ketentuan is required"),
});

function SolusiHukumMobile() {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const storeData = useSelector((store) => store?.badanHukum);
  const { loading } = storeData;

  useEffect(() => {
    handleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUser = () => {
    let str = searchParams.get("query");
    var base64regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    if (!base64regex.test(str)) {
      if (!localStorage.getItem("data")) {
        console.log("salah");
        localStorage.removeItem("data");
        navigate("/login");
      }
    } else {
      let string = base64_decode(str);
      let cryptdata = string;
      const info2x = CryptoJS.AES.decrypt(cryptdata, secretKey).toString(
        CryptoJS.enc.Utf8
      );
      var data = "";
      if (!info2x) {
        console.log("salah");
      } else {
        data = JSON.parse(info2x);
        setUser(data);

        localStorage.setItem("data", JSON.stringify(data));
      }
      if (!localStorage.getItem("data")) {
        if (!data.user_id) {
          console.log("salah");
          localStorage.removeItem("data");
          navigate("/login");
        }
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tnos_service_id: "3",
      tnos_subservice_id: "7",
      user_id: user?.user_id,
      name: user?.name,
      // email: "semenjakpetang176@gmail.com",
      // phone: "081389003413",
      email: user?.email,
      phone: user?.phone,
      needs: "",
      ketentuan: false,
    },
    onSubmit: (values) => {
      // console.log(values);
      dispatch(badanHukumCreateAction(values))
        .then(({ payload }) => {
          // console.log(payload?.message);
          if (payload?.success === true) {
            // toast.success(payload?.message);
            navigate(`/solusi-hukum-m/` + payload?.detail?.id);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validationSchema: formSchema,
  });

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="njwdjhwk" style={{ padding: "20px 20px 50px 20px" }}>
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8 col-xl-8 col-12">
                <p className="text-justify jjdw">
                  Penyelesaian permasalahan hukum secara menyeluruh.
                </p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xl-4 col-12">
                <img src={csh} alt="" className="img-xy" />
              </div>
            </div>
            <hr />
            <ToastContainer
              position="bottom-right"
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

            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-2">
                <label htmlFor="needs">*Keperluan Hukum</label>
                <textarea
                  name="susunan_direksi"
                  id="susunan_direksi"
                  cols="10"
                  rows="5"
                  value={formik.values.needs}
                  onChange={formik.handleChange("needs")}
                  onBlur={formik.handleBlur("needs")}
                  className={`form-control form-layanan ${
                    formik.errors.needs && "is-invalid"
                  }`}
                ></textarea>
                {formik.touched.needs && (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.needs}
                  </div>
                )}
              </div>
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  id="ketentuan"
                  value={formik.values.ketentuan}
                  onChange={formik.handleChange("ketentuan")}
                  onBlur={formik.handleBlur("ketentuan")}
                  className={`form-check-input  ${
                    formik.errors.ketentuan && "is-invalid"
                  }`}
                />
                <label
                  className="form-check-label"
                  htmlFor="ketentuan"
                  style={{ fontSize: "13px" }}
                >
                  Saya Menyetujui Ketentuan Dan Persyaratan{" "}
                  <span
                    onClick={() =>
                      window.open(
                        "https://tnosbantuan.freshdesk.com/support/solutions/articles/150000043751-membatalkan-pesanan-csh-comprehensive-solusi-hukum-",
                        "_blank"
                      )
                    }
                    style={{
                      borderBottom: `${
                        formik.errors.ketentuan
                          ? "1px solid rgb(223 85 93)"
                          : "1px solid rgb(167 167 167)"
                      }`,
                      cursor: "pointer",
                    }}
                  >
                    Pemesanan Layanan
                  </span>
                </label>
              </div>
              <div className="form-group  mt-3">
                {loading ? (
                  <button
                    className="btn btn-layanan w-100"
                    type="button"
                    disabled
                  >
                    Loading...
                  </button>
                ) : (
                  <button className="btn btn-layanan w-100" type="submit">
                    Lanjut Pembayaran
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <MenuFooter footer={false} />
    </Fragment>
  );
}

export default SolusiHukumMobile;
