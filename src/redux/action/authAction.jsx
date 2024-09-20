import { authAction } from "../global/AuthSlices";

const setRequestOtp = (value) => {
  return authAction({ type: "SET_REQUEST_OTP", value });
};
const setVerificationOtp = (value) => {
  return authAction({ type: "SET_VERIFICATION_OTP", value });
};

export { setRequestOtp, setVerificationOtp };
