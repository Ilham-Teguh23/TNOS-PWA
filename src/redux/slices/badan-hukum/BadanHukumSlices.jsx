import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { toast } from "react-toastify";

const resetBadanHukumCreatedAction = createAction("badan-hukum/reset-create");
const resetPaymentBadanHukumCreatedAction = createAction(
  "badan-hukum/reset-payment"
);

// ================================================================
// create action
// ================================================================

export const badanHukumCreateAction = createAsyncThunk(
  "badan-hukum/create",
  async (values, { rejectWithValue, getState, dispatch }) => {
    // console.log(values);

    try {
      const url = `${process.env.REACT_APP_API_PWA}/badan-hukum/in-order`;
      // const url = "http://127.0.0.1:8000/api/badan-hukum-pt/in-order";
      const { data } = await axios.post(url, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(resetBadanHukumCreatedAction());
      //   console.log(data);
      return data;
    } catch (error) {
      //   console.log(error);
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================================================================
// fetch by Id action
// ================================================================

export const fetchBadanHukumByIdAction = createAsyncThunk(
  "badan-hukum/fetch-by-id",
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `${process.env.REACT_APP_API_PWA}/badan-hukum/get-detail-order/${values}`;
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
// payment action
// ================================================================

export const paymentBadanHukumAction = createAsyncThunk(
  "badan-hukum/payment",
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `${process.env.REACT_APP_API_PWA}/badan-hukum/in-payment`;
      const { data } = await axios.post(url, values);
      // console.log(data);
      dispatch(resetPaymentBadanHukumCreatedAction());
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
// get provinsi action
// ================================================================

export const getProvinsiAction = createAsyncThunk(
  "provinsi/fetch",
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `https://dev.farizdotid.com/api/daerahindonesia/provinsi`;
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
// get kabupaten by Id action
// ================================================================

export const getKabupatenAction = createAsyncThunk(
  "kabupaten/fetch",
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${values}`;
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
// get kecamatan by Id action
// ================================================================

export const getKecamatanAction = createAsyncThunk(
  "kecamatan/fetch",
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${values}`;
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
// get kelurahan by Id action
// ================================================================

export const getKelurahanAction = createAsyncThunk(
  "kelurahan/fetch",
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${values}`;
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

const badanHukumSlices = createSlice({
  name: "badanHukum",
  initialState: {},
  extraReducers: (builder) => {
    // create action
    builder.addCase(badanHukumCreateAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetBadanHukumCreatedAction, (state, action) => {
      state.isCreated = true;
    });
    builder.addCase(badanHukumCreateAction.fulfilled, (state, action) => {
      // console.log("fulfilled");
      // console.log(action.payload);
      toast.success(action.payload.message);
      state.badanHukumCreated = action.payload.detail;
      state.isCreated = false;
      state.loading = false;
    });
    builder.addCase(badanHukumCreateAction.rejected, (state, action) => {
      // console.log("reject");
      // console.log(action.payload);
      toast.error(action.payload.message);
      state.loading = false;
    });

    // fetch by id action
    builder.addCase(fetchBadanHukumByIdAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchBadanHukumByIdAction.fulfilled, (state, action) => {
      // console.log("fulfilled");
      // console.log(action.payload);
      state.badanHukumList = action.payload.detail;
      state.loading = false;
    });
    builder.addCase(fetchBadanHukumByIdAction.rejected, (state, action) => {
      // console.log("reject");
      // console.log(action.payload);
      toast.error(action.payload.message);
      state.loading = false;
    });

    // payment action
    builder.addCase(paymentBadanHukumAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPaymentBadanHukumCreatedAction, (state, action) => {
      state.isPayment = true;
    });
    builder.addCase(paymentBadanHukumAction.fulfilled, (state, action) => {
      state.badanHukumPayment = action.payload.order;
      state.loading = false;
      state.isPayment = false;
    });
    builder.addCase(paymentBadanHukumAction.rejected, (state, action) => {
      toast.error(action.payload.message);
      state.loading = false;
    });

    // provinsi action
    builder.addCase(getProvinsiAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProvinsiAction.fulfilled, (state, action) => {
      state.provinsi = action.payload;
      state.loading = false;
    });
    builder.addCase(getProvinsiAction.rejected, (state, action) => {
      state.loading = false;
    });

    // kabupaten action
    builder.addCase(getKabupatenAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getKabupatenAction.fulfilled, (state, action) => {
      state.kabupaten = action.payload;
      state.loading = false;
    });
    builder.addCase(getKabupatenAction.rejected, (state, action) => {
      state.loading = false;
    });

    // kecamatan action
    builder.addCase(getKecamatanAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getKecamatanAction.fulfilled, (state, action) => {
      state.kecamatan = action.payload;
      state.loading = false;
    });
    builder.addCase(getKecamatanAction.rejected, (state, action) => {
      state.loading = false;
    });

    // kelurahan action
    builder.addCase(getKelurahanAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getKelurahanAction.fulfilled, (state, action) => {
      state.kelurahan = action.payload;
      state.loading = false;
    });
    builder.addCase(getKelurahanAction.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default badanHukumSlices.reducer;
