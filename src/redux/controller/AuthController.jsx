import axios from "axios";

import { generateChiperBasic } from "../../components/utils/generateChiperBasic";
import { setLoading } from "../action/globalAction";
import { setRequestOtp, setVerificationOtp } from "../action/authAction";
import { showMessage } from "../../components/utils/Message";

const loginController = (data, navigate) => (dispatch) => {
  const cipherBasic = generateChiperBasic(20);

  const config = {
    headers: {
      Authorization: `Basic ${cipherBasic}`,
      "Content-Type": "application/json",
    },
  };
  // console.log(value);
  dispatch(setLoading(true));
  axios
    .post(
      `${process.env.REACT_APP_API_MOBILE_URL}/member/auth/phone`,
      JSON.stringify(data),
      config
    )
    .then((response) => {
      if (response.data.statusCode === "2000") {
        dispatch(
          setRequestOtp({
            request_otp: true,
            mmbr_code: response.data.data.mmbr_code,
            phone: data.phone,
          })
        );
        dispatch(setLoading(false));
        showMessage("OTP code sent successfully");
        navigate(`/auth/login/otp?mmbr_code=${response.data.data.mmbr_code}`);
        // console.log("success", response);
      } else {
        dispatch(setLoading(false));
        showMessage("Your phone number is not found", "error");
        console.log("error", response);
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const requestOtpController = (data) => (dispatch) => {
  console.log(data);
  const cipherBasic = generateChiperBasic(20);

  const config = {
    headers: {
      Authorization: `Basic ${cipherBasic}`,
      "Content-Type": "application/json",
    },
  };
  // console.log(value);
  dispatch(setLoading(true));
  axios
    .post(
      `${process.env.REACT_APP_API_MOBILE_URL}/member/auth/phone`,
      JSON.stringify(data),
      config
    )
    .then((response) => {
      if (response.data.statusCode === "2000") {
        dispatch(
          setRequestOtp({
            request_otp: true,
            mmbr_code: response.data.data.mmbr_code,
            phone: data.phone,
          })
        );
        dispatch(setLoading(false));
        showMessage("OTP code sent successfully");
        // console.log("success", response);
      } else {
        dispatch(setLoading(false));
        showMessage("Your phone number is not found", "error");
        console.log("error", response);
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const verifycationOtpController = (data, navigate) => (dispatch) => {
  const cipherBasic = generateChiperBasic(20);

  const config = {
    headers: {
      Authorization: `Basic ${cipherBasic}`,
      "Content-Type": "application/json",
    },
  };
  dispatch(setLoading(true));
  axios
    .post(
      `${process.env.REACT_APP_API_MOBILE_URL}/member/auth/otp`,
      JSON.stringify(data),
      config
    )
    .then((response) => {
      if (response.data.statusCode === "2000") {
        let ciphertext =
          "TNSUSR:" + data.usercode.toString() + ":" + response.data.message;
        // response.data.data.token = ciphertext;
        localStorage.setItem("userAuth", ciphertext);
        localStorage.setItem("userInfo", JSON.stringify(response.data.data));
        dispatch(
          setVerificationOtp({
            authenticate: true,
            token: ciphertext,
            userInfo: response.data.data,
            request_otp: false,
          })
        );

        dispatch(setLoading(false));
        showMessage("Verification OTP successfully");
        navigate("/dashboard");
        // console.log("success", response);
      } else {
        dispatch(setLoading(false));
        showMessage("The OTP code you entered is incorrect", "error");
        console.log("error", response);
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
  // console.log(data);
};

const logoutController = () => (dispatch) => {
  localStorage.removeItem("userAuth");
  localStorage.removeItem("userInfo");
  dispatch(
    setVerificationOtp({
      authenticate: false,
      token: "",
      userInfo: {},
    })
  );
};

const registerController = (data, navigate) => (dispatch) => {
  const cipherBasic = generateChiperBasic(20);

  const config = {
    headers: {
      Authorization: `Basic ${cipherBasic}`,
      "Content-Type": "application/json",
    },
  };
  dispatch(setLoading(true));
  axios
    .post(
      `${process.env.REACT_APP_API_MOBILE_URL}/member/auth/register`,
      JSON.stringify(data),
      config
    )
    .then((response) => {
      if (response.data.statusCode === "200") {
        // dispatch(resetRegisterAction());
        dispatch(setLoading(false));
        showMessage("Register successfully");
        navigate("/auth/login");
      } else {
        dispatch(setLoading(false));
        showMessage("User already registered", "error");
        console.log("error", response);
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export {
  loginController,
  requestOtpController,
  verifycationOtpController,
  logoutController,
  registerController,
};
