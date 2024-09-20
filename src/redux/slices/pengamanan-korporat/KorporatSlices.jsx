import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// ================================================================
// create pengamanan korporat action
// ================================================================
export const createKorporatAction = createAsyncThunk(
  "pengamanan-korporat/create",
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `${process.env.REACT_APP_API_PWA}/pengamanan-korporat/in-order`;
      const { data } = await axios.post(url, values);
      //   console.log(data);
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
// create pengamanan korporat action
// ================================================================
export const fetchKorporatByIdAction = createAsyncThunk(
  "pengamanan-korporat/fetch-by-id",
  async (values, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `${process.env.REACT_APP_API_PWA}/pengamanan-korporat/get-detail-order/${values}`;
      const { data } = await axios.get(url);
      //   console.log(data);
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

export const getPriceMitra = createAsyncThunk(
  "pengamanan-korporat/fetch-by-id",
  async (values, { rejectWithValue, getState, dispatch }) => {
    console.log(values)
    try {
      const url = `http://localhost:8000/api/pub/get-price?mitra=${values?.mitra}&hours=${values?.hours}&personil=${values?.personil}`;
      const { data } = await axios.get(url);
      //   console.log(data);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const paymentKorporatAction = createAsyncThunk(
  "pengamanan-korporat/payment",
  async (values, { rejectWithValue, getState, dispatch }) => {
    console.log(values);
    try {
      const url = `${process.env.REACT_APP_API_PWA}/pengamanan-korporat/in-payment`;
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

const korporatSlices = createSlice({
  name: "korporat",
  initialState: {},
  extraReducers: (builder) => {
    // create action
    builder.addCase(createKorporatAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createKorporatAction.fulfilled, (state, action) => {
      toast.success(action.payload.message);
      state.korporatCreated = action.payload.detail;
      state.isCreated = false;
      state.loading = false;
    });
    builder.addCase(createKorporatAction.rejected, (state, action) => {
      toast.error(action.payload.message);
      state.loading = false;
    });

    // fetch by id action
    builder.addCase(fetchKorporatByIdAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchKorporatByIdAction.fulfilled, (state, action) => {
      state.korporatList = action.payload.detail;
      state.loading = false;
    });
    builder.addCase(fetchKorporatByIdAction.rejected, (state, action) => {
      toast.error(action.payload.message);
      state.loading = false;
    });

    // payment action
    builder.addCase(paymentKorporatAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(paymentKorporatAction.fulfilled, (state, action) => {
      state.korporatPayment = action.payload.order;
      state.loading = false;
    });
    builder.addCase(paymentKorporatAction.rejected, (state, action) => {
      toast.error(action.payload.message);
      state.loading = false;
    });
  },
});

export default korporatSlices.reducer;
