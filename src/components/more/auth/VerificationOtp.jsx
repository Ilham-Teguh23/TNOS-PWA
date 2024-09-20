import React, { useEffect, useState } from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import PaddingPwa from "../../moleculars/PaddingPwa";
import Gap from "../../moleculars/Gap";
import iconLogin from "../../../assets/images/new pwa icon/auth/iconLoginOtp.svg";
import InputComponent from "../../atoms/InputComponent";
import ButtonComponent from "../../atoms/ButtonComponent";
import TimeOtp from "../../moleculars/TimeOtp";
import { getParams } from "../../moleculars/GetParams";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  requestOtpController,
  verifycationOtpController,
} from "../../../redux/controller/AuthController";
import moment from "moment/moment";
import { useFormik } from "formik";
import { verificationOtpSchema } from "../../utils/formSchema";
import TextError from "../../atoms/TextError";
import TitleHeader from "../../utils/TitleHeader";
// import moment from "moment";

function VerificationOtp() {
  TitleHeader("Halaman verifikasi otp");
  const [otpNumber, setOtpNumber] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });
  const [remainingTime, setRemainingTime] = useState(30);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authData = useSelector((store) => store?.auth);
  const { mmbr_code, phone, request_otp } = authData;

  useEffect(() => {
    checkParams();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkParams = () => {
    let checkP = getParams(["mmbr_code", "test"]);
    if (!checkP?.mmbr_code || !mmbr_code || !request_otp || !phone) {
      navigate("/auth/login");
    } // params &&
  };

  function handleChange(event) {
    const { name, value } = event.target;
    const parseValue = value.replace(/[^0-9]/g, "");
    setOtpNumber({
      ...otpNumber,
      [name]: parseValue,
    });
    if (parseValue.length === 0) {
      const nextFieldName = `otp${parseInt(name.substring(3)) - 1}`;
      const nextInput = document.getElementsByName(nextFieldName)[0];
      if (nextFieldName !== "otp0") {
        nextInput.focus();
      }
    }

    if (parseValue.length === 1 && name !== "otp6") {
      const nextFieldName = `otp${parseInt(name.substring(3)) + 1}`;
      const nextInput = document.getElementsByName(nextFieldName)[0];
      nextInput.focus();
    }
  }
  const handleRequestOtpAgain = async () => {
    const data = {
      phone: phone,
      mmbr_code: mmbr_code,
      timezone: moment.tz.guess(),
      method: "0",
    };
    dispatch(await requestOtpController(data));
    setRemainingTime(30);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      otp:
        otpNumber.otp1 +
        otpNumber.otp2 +
        otpNumber.otp3 +
        otpNumber.otp4 +
        otpNumber.otp5 +
        otpNumber.otp6,
    },
    onSubmit: async (values) => {
      //   values.otp =
      //     otpNumber.otp1 +
      //     otpNumber.otp2 +
      //     otpNumber.otp3 +
      //     otpNumber.otp4 +
      //     otpNumber.otp5 +
      //     otpNumber.otp6;
      values.timezone = moment.tz.guess();
      values.fbtoken = "fcmToken";
      values.usercode = mmbr_code;
      dispatch(await verifycationOtpController(values, navigate));
    },
    validationSchema: verificationOtpSchema,
  });

  return (
    <>
      <TopNewNav title="Beranda" path={`/auth/login`} type="auth" />
      <div className="container-class">
        <div
          className="responsive-class"
          style={{ background: "var(--bg-color6)" }}
        >
          <div className="res-class">
            <div className="payment-container">
              <div className="container-home-f">
                <PaddingPwa padding={15}>
                  <Gap height={60} />
                  <div
                    className="title-header-f"
                    style={{ fontSize: "24px", lineHeight: "24px" }}
                  >
                    VERIFIKASI TERKIRIM!
                  </div>
                  <Gap height={20} />
                  <div
                    className="description-home-f"
                    style={{ textAlign: "center" }}
                  >
                    Masukkan kode OTP yang terkirim ke : <br />
                    <span style={{ color: "var(--font-color3)" }}>
                      {phone && phone}
                    </span>
                  </div>
                  <Gap height={20} />
                  <div className="image-home-f">
                    <img src={iconLogin} alt="" />
                  </div>
                  <Gap height={30} />
                  <div className="container-otp-f-l">
                    <div className="jdk">
                      <InputComponent
                        typeInput="auth"
                        textAlign="center"
                        fontSize="20px"
                        maxLength={1}
                        name="otp1"
                        value={otpNumber.otp1}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="jdk">
                      <InputComponent
                        typeInput="auth"
                        textAlign="center"
                        fontSize="20px"
                        maxLength={1}
                        name="otp2"
                        value={otpNumber.otp2}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="jdk">
                      <InputComponent
                        typeInput="auth"
                        textAlign="center"
                        fontSize="20px"
                        maxLength={1}
                        name="otp3"
                        value={otpNumber.otp3}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="jdk">
                      <InputComponent
                        typeInput="auth"
                        textAlign="center"
                        fontSize="20px"
                        maxLength={1}
                        name="otp4"
                        value={otpNumber.otp4}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="jdk">
                      <InputComponent
                        typeInput="auth"
                        textAlign="center"
                        fontSize="20px"
                        maxLength={1}
                        name="otp5"
                        value={otpNumber.otp5}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="jdk">
                      <InputComponent
                        typeInput="auth"
                        textAlign="center"
                        fontSize="20px"
                        maxLength={1}
                        name="otp6"
                        value={otpNumber.otp6}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {formik.errors.otp && formik.touched.otp ? (
                    <TextError error={formik.errors.otp} />
                  ) : (
                    ""
                  )}
                  <Gap height={30} />
                  <div className="couldown-otp-f-d">
                    {remainingTime < 1 ? (
                      <div>
                        <span onClick={() => handleRequestOtpAgain()}>
                          Request OTP
                        </span>
                      </div>
                    ) : (
                      <div>
                        Kode baru :{" "}
                        <span>
                          <TimeOtp
                            remainingTime={remainingTime}
                            setRemainingTime={setRemainingTime}
                          />
                        </span>
                      </div>
                    )}
                  </div>
                  <Gap height={100} />
                  <ButtonComponent
                    title="Lanjutkan"
                    background="var(--font-color9)"
                    border="1px solid transparent"
                    color="var(--font-color4)"
                    typeButton="auth"
                    type="button"
                    onClick={formik.handleSubmit}
                  />
                </PaddingPwa>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerificationOtp;
