import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getAuth } from "../../../components/utils/Authentication";
import { generateChiperBasic } from "../../../components/utils/generateChiperBasic";

// ================================================================
// action
// ================================================================

const resetRegisterAction = createAction("users/reset-create");
const resetInputLoginAction = createAction("users/reset-input-phone-login");
const resetInputOtpLoginAction = createAction("users/reset-input-otp-login");

// ================================================================
// register action
// ================================================================

export const registerUserAction = createAsyncThunk(
  "users/register",
  async (values, { rejectWithValue, getState, dispatch }) => {
    const cipherBasic = generateChiperBasic(20);
    try {
      const config = {
        headers: {
          Authorization: `Basic ${cipherBasic}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_MOBILE_URL}/member/auth/register`,
        JSON.stringify(values),
        config
      );
      if (data.statusCode === "200") {
        dispatch(resetRegisterAction());
      }
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================================================================
// input nomor login action
// ================================================================

export const inputPhoneLoginAction = createAsyncThunk(
  "/users/input-phone-login",
  async (values, { rejectWithValue, getState, dispatch }) => {
    const cipherBasic = generateChiperBasic(20);
    try {
      const config = {
        headers: {
          Authorization: `Basic ${cipherBasic}`,
          "Content-Type": "application/json",
        },
      };
      // console.log(value);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_MOBILE_URL}/member/auth/phone`,
        JSON.stringify(values),
        config
      );
      // console.log(data);
      if (data.statusCode === "2000") {
        dispatch(resetInputLoginAction());
      }
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================================================================
// input otp login action
// ================================================================

export const inputOtpLoginAction = createAsyncThunk(
  "users/input-otp-login",
  async (values, { rejectWithValue, getState, dispatch }) => {
    const cipherBasic = generateChiperBasic(20);
    try {
      const config = {
        headers: {
          Authorization: `Basic ${cipherBasic}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_MOBILE_URL}/member/auth/otp`,
        JSON.stringify(values),
        config
      );
      // console.log(data);
      if (data.statusCode === "2000") {
        let ciphertext =
          "TNSUSR:" + values.usercode.toString() + ":" + data.message;
        data.data.token = ciphertext;
        localStorage.setItem("userAuth", ciphertext);
        localStorage.setItem("userInfo", JSON.stringify(data.data));
      }
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
const localStorageAuth = localStorage.getItem("userAuth")
  ? localStorage.getItem("userAuth")
  : null;

const localStorageUserInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
// ================================================================
// logout user action
// ================================================================
export const logoutUserAction = createAsyncThunk(
  "users/logout",
  async (value, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userAuth");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("mmbr_code");
      localStorage.removeItem("authToken");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================================================================
// History Trasacntion action
// ================================================================
export const UserHistoryTransactioAction = createAsyncThunk(
  "users/history-transaction",
  async (values, { rejectWithValue, getState, dispatch }) => {
    // console.log(values);
    try {
      const url = `${process.env.REACT_APP_API_PWA}/history/${values}`;

      const { data } = await axios.get(url);

      // console.log(data);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================================================================
// Auth
// ================================================================
export const AuthenticationAction = createAsyncThunk(
  "users/generate-auth",
  async (values, { rejectWithValue, getState, dispatch }) => {
    // console.log(values);
    let msg = `${process.env.REACT_APP_PW_AUTH}`;
    const value = {
      password: getAuth(msg),
    };

    try {
      const url = `http://127.0.0.1:8000/api/login`;

      const { data } = await axios.post(url, value);
      // console.log(data);
      localStorage.setItem("authToken", data.authorisation.token);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
const AuthBackendLaravel = localStorage.getItem("authToken")
  ? localStorage.getItem("authToken")
  : null;

// ================================================================
// Fetch mesasge user by id action
// ================================================================
export const fetchMessageUserByIdAction = createAsyncThunk(
  "users/message-by-id",
  async (values, { rejectWithValue, getState, dispatch }) => {
    // console.log(values);
    try {
      const url = `${process.env.REACT_APP_API_PWA}/user/message/${values}`;

      const { data } = await axios.get(url);

      // console.log(data);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================================================================
// count unread mesasge user by id action
// ================================================================
export const countUnreadMessage = createAsyncThunk(
  "users/message-count-unread",
  async (values, { rejectWithValue, getState, dispatch }) => {
    // console.log(values);
    try {
      const url = `${process.env.REACT_APP_API_PWA}/user/message/count-unread/${values}`;

      const { data } = await axios.get(url);

      // console.log(data);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================================================================
// read mesasge by id action
// ================================================================
export const readMessage = createAsyncThunk(
  "users/message-read",
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `${process.env.REACT_APP_API_PWA}/user/message/read/${values}`;

      const { data } = await axios.put(url);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================================================================
// fetchAllProduct
// ================================================================
export const fetchAllProduct = createAsyncThunk(
  "users/fetch-all-product",
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `${process.env.REACT_APP_API_PWA}/tnos-gems/fetch-all-product`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================================================================
// orderTnosGems
// ================================================================
export const orderTnosGems = createAsyncThunk(
  "users/order-tnos-gems",
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `${process.env.REACT_APP_API_PWA}/tnos-gems/transaction`;

      const { data } = await axios.post(url, values);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================================================================
// getorderTnosGems by id
// ================================================================
export const orderTnosGemsById = createAsyncThunk(
  "users/fetch-order-tnos-gems-by-id",
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `${process.env.REACT_APP_API_PWA}/tnos-gems/fetch-order-by-id/${values}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================================================================
// get point by user id
// ================================================================
export const getPointByUserId = createAsyncThunk(
  "users/fetch-point-by-user-id",
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `${process.env.REACT_APP_API_PWA}/tnos-gems/fetch-point-by-user-id/${values}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================================================================
// get histories point by user id
// ================================================================
export const getHistoriesPointByUserId = createAsyncThunk(
  "users/fetch-histories-point-by-user-id",
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `${process.env.REACT_APP_API_PWA}/tnos-gems/fetch-point-histories-by-user-id/${values}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================================================================
// get histories point by id
// ================================================================
export const getHistoriesPointById = createAsyncThunk(
  "users/fetch-histories-point-by-id",
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `${process.env.REACT_APP_API_PWA}/tnos-gems/fetch-point-histories-by-id/${values}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================================================================
// payment tnos gems
// ================================================================
export const paymentTnosGems = createAsyncThunk(
  "users/payment-tnos-gems",
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `${process.env.REACT_APP_API_PWA}/tnos-gems/transaction/payment`;

      const { data } = await axios.put(url, values);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================================================================
// in Voucher
// ================================================================
export const inVoucher = createAsyncThunk(
  "users/in-voucher",
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `${process.env.REACT_APP_API_PWA}/voucher/in-voucher`;

      const { data } = await axios.post(url, values);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================================================================
// slices
// ================================================================
const userSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: localStorageAuth,
    userInfo: localStorageUserInfo,
    authToken: AuthBackendLaravel,
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetRegisterAction, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      if (action.payload.statusCode === "200") {
        state.appErr = undefined;
        state.serverErr = undefined;
        state.loading = false;
        state.registered = action.payload;
        state.isCreated = false;
        toast.success("Register Succcessfully");
        // console.log("benar");
      } else {
        state.loading = false;
        state.appErr = action.payload.message;
        // state.serverErr = action.error.message;
        toast.error(action.payload.message);
        // console.log("tidak");
      }
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });

    // input nomor login action
    builder.addCase(inputPhoneLoginAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      // state.serverErr = undefined;
    });
    builder.addCase(resetInputLoginAction, (state, action) => {
      state.isInputLogin = true;
    });
    builder.addCase(inputPhoneLoginAction.fulfilled, (state, action) => {
      if (action.payload.statusCode === "2000") {
        // state.appErr = undefined;
        // state.serverErr = undefined;
        state.loading = false;
        state.inputNumberLogin = action.payload;
        state.isInputLogin = false;
        toast.success("OTP code sent successfully");
      } else {
        state.loading = false;
        state.appErr = action.payload.message;
        // state.serverErr = action.error.message;
        toast.error(action.payload.message);
      }
    });
    builder.addCase(inputPhoneLoginAction.rejected, (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.appErr = action.payload.message;
      // state.serverErr = action.error.message;
    });

    // input otp login action
    builder.addCase(inputOtpLoginAction.pending, (state, action) => {
      state.loading = true;
      // state.appErr = undefined;
      // state.serverErr = undefined;
    });
    builder.addCase(resetInputOtpLoginAction, (state, action) => {
      state.isInputOtp = true;
    });
    builder.addCase(inputOtpLoginAction.fulfilled, (state, action) => {
      if (action.payload.statusCode === "2000") {
        state.isInputOtp = false;
        state.inputOtpLogin = action.payload;
        state.loading = false;
        state.userAuth = localStorage.getItem("userAuth")
          ? localStorage.getItem("userAuth")
          : null;
        toast.success("Login successfully");
        state.userInfo = localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo"))
          : null;
      } else if (action.payload.statusCode === 500) {
        state.loading = false;
        state.appErr = action.payload.message;
        toast.error(action.payload.message);
        // state.serverErr = action.error.message;
      } else {
        state.loading = false;
        state.appErr = action.payload.message;
        toast.error(action.payload.message);
      }
    });
    builder.addCase(inputOtpLoginAction.rejected, (state, action) => {
      state.loading = false;
      // console.log(action.payload);
      // state.appErr = action.payload.message;
      // state.serverErr = action.error.message;
    });

    //logout
    builder.addCase(logoutUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth = undefined;
      state.userInfo = undefined;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(logoutUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload.message;
      state.serverErr = action.error.message;
    });

    //history Transaction
    builder.addCase(UserHistoryTransactioAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(UserHistoryTransactioAction.fulfilled, (state, action) => {
      state.loading = false;
      state.historyList = action.payload.detail;
    });
    builder.addCase(UserHistoryTransactioAction.rejected, (state, action) => {
      state.loading = false;
    });

    //auth
    builder.addCase(AuthenticationAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(AuthenticationAction.fulfilled, (state, action) => {
      state.loading = false;
      state.dataToken = action.payload.authorisation.token;
    });
    builder.addCase(AuthenticationAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
    });

    //fetch message by id
    builder.addCase(fetchMessageUserByIdAction.pending, (state, action) => {
      if (state.loadingRead || state.loadingUnread) {
        state.loading = false;
        state.loadingUnread = false;
        state.loadingRead = false;
      } else {
        state.loading = true;
      }
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchMessageUserByIdAction.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.detail;
    });
    builder.addCase(fetchMessageUserByIdAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
    });

    // count unread mesasge user by id action
    builder.addCase(countUnreadMessage.pending, (state, action) => {
      state.loadingUnread = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(countUnreadMessage.fulfilled, (state, action) => {
      state.unread = action.payload.unread;
    });
    builder.addCase(countUnreadMessage.rejected, (state, action) => {
      state.loadingUnread = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
    });

    // read mesasge by id action
    builder.addCase(readMessage.pending, (state, action) => {
      state.loadingRead = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(readMessage.fulfilled, (state, action) => {
      state.read = action.payload.read;
    });
    builder.addCase(readMessage.rejected, (state, action) => {
      state.loadingRead = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
    });
    // fetch all product
    builder.addCase(fetchAllProduct.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
      state.product = action.payload.product;
      state.loading = false;
    });
    builder.addCase(fetchAllProduct.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
    });

    // orderTnosGems
    builder.addCase(orderTnosGems.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(orderTnosGems.fulfilled, (state, action) => {
      state.orderTnosGems = action.payload.order;
      state.loading = false;
      toast.success(action.payload.message);
    });
    builder.addCase(orderTnosGems.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
      toast.error(`${action.error?.message} ${action.payload?.message}`);
    });

    // orderTnosGems by id
    builder.addCase(orderTnosGemsById.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(orderTnosGemsById.fulfilled, (state, action) => {
      state.detailOrderTnosGems = action.payload.order;
      state.loading = false;
    });
    builder.addCase(orderTnosGemsById.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
      toast.error(`${action.error?.message} ${action.payload?.message}`);
    });

    // get point user by id
    builder.addCase(getPointByUserId.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getPointByUserId.fulfilled, (state, action) => {
      state.detailPointUser = action.payload.point;
      state.loading = false;
    });
    builder.addCase(getPointByUserId.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
      console.log(`${action.error?.message} ${action.payload?.message}`);
    });

    // get histories point user by user id
    builder.addCase(getHistoriesPointByUserId.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getHistoriesPointByUserId.fulfilled, (state, action) => {
      state.historiesPoint = action.payload.point_histories;
      state.loading = false;
    });
    builder.addCase(getHistoriesPointByUserId.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
      console.log(`${action.error?.message} ${action.payload?.message}`);
    });

    // get histories point user by id
    builder.addCase(getHistoriesPointById.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(getHistoriesPointById.fulfilled, (state, action) => {
      state.detailHistoriesPoint = action.payload.point_histories;
      state.loading = false;
    });
    builder.addCase(getHistoriesPointById.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
      console.log(`${action.error?.message} ${action.payload?.message}`);
    });

    // payment tnos gems
    builder.addCase(paymentTnosGems.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(paymentTnosGems.fulfilled, (state, action) => {
      state.paymentTnosGems = action.payload.order;
      state.loading = false;
    });
    builder.addCase(paymentTnosGems.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
      toast.error(`${action.error?.message} ${action.payload?.message}`);
    });

    // in Voucher
    builder.addCase(inVoucher.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(inVoucher.fulfilled, (state, action) => {
      state.voucherCheckout = action.payload.order;
      state.loading = false;
    });
    builder.addCase(inVoucher.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action.payload?.message;
      state.serverErr = action.error?.message;
      toast.error(`${action.error?.message} ${action.payload?.message}`);
    });
  },
});

export default userSlices.reducer;
