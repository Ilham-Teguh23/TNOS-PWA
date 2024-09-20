import { createSlice } from "@reduxjs/toolkit";

const data = {
  token: localStorage.getItem("userAuth")
    ? localStorage.getItem("userAuth")
    : null,
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  token_mobile: localStorage.getItem("token_mobile")
    ? localStorage.getItem("token_mobile")
    : null,
};

const AuthSlices = createSlice({
  name: "auth",
  initialState: {
    authenticate: data?.token ? true : false,
    token: data?.token,
    token_mobile: data?.token_mobile,
    request_otp: false,
    mmbr_code: "",
    phone: "",
    userInfo: data?.userInfo,
  },
  reducers: {
    authAction: (state, action) => {
      switch (action.payload.type) {
        case "SET_REQUEST_OTP":
          return {
            ...state,
            request_otp: action.payload.value.request_otp,
            mmbr_code: action.payload.value.mmbr_code,
            phone: action.payload.value.phone,
          };
        case "SET_VERIFICATION_OTP":
          return {
            ...state,
            authenticate: action.payload.value.authenticate,
            token: action.payload.value.token,
            userInfo: action.payload.value.userInfo,
            request_otp: action.payload.value.request_otp,
          };
        default:
          return;
      }
    },
  },
});

export const { authAction } = AuthSlices.actions;
export default AuthSlices.reducer;
