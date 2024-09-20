import { createSlice } from "@reduxjs/toolkit";

// config language
const userLanguage = !localStorage.getItem("language")
  ? navigator.language || navigator.userLanguage
  : localStorage.getItem("language");
localStorage.setItem("language", userLanguage.split("-")[0]);
const defaultLanguage = localStorage.getItem("language");

const GlobalSlices = createSlice({
  name: "global",
  initialState: {
    isError: false,
    messaage: "Error",
    isLoading: false,
    isUrlPayment: "/not-found",
    channel_code: "-",
    // payment_data: {
    //   id: "8711dd5f-769e-47b7-9bb0-b50a93f1c1a0",
    //   customer: {
    //     name: "Dicki Prasetya",
    //     email: "semenjakpetang176@gmail.com",
    //     phone: "+6281389003413",
    //   },
    //   items: {
    //     id: "1",
    //     name: "Percobaan",
    //     quantity: 1,
    //     price: 5000000,
    //   },
    // },
    payment_data: "",
    data: "",
    list_bank: [],
    is_payment: false,
    params: {},
    list_history_by_user: [],
    list_history_by_user_by_id: [],
    provinsi: [],
    agent: [],
    kabupaten: [],
    kecamatan: [],
    kelurahan: [],
    detail_data_layanan: {},
    language: defaultLanguage,
  },
  reducers: {
    globalAction: (state, action) => {
      switch (action.payload.type) {
        case "SET_ERROR":
          //   console.log(action.payload);
          return {
            ...state,
            isError: action.payload.value.isError,
            messaage: action.payload.value.messaage,
          };
        case "SET_LOADING":
          return {
            ...state,
            isLoading: action.payload.value,
          };
        case "SET_URL_PAYMENT":
          return {
            ...state,
            isUrlPayment: action.payload.value,
          };
        case "SET_CHANNEL_CODE":
          return {
            ...state,
            channel_code: action.payload.value,
          };
        case "SET_PAYMENT_DATA":
          return {
            ...state,
            payment_data: action.payload.value,
          };
        case "SET_DATA":
          return {
            ...state,
            data: action.payload.value,
          };
        case "LIST_BANK":
          return {
            ...state,
            list_bank: action.payload.value,
          };
        case "IS_PAYMENT":
          return {
            ...state,
            is_payment: action.payload.value,
          };
        case "SET_PARAMS":
          return {
            ...state,
            params: action.payload.value,
          };
        case "SET_LIST_HISTORY_BY_USER":
          return {
            ...state,
            list_history_by_user: action.payload.value,
          };
        case "SET_LIST_HISTORY_BY_USER_BY_ID":
          return {
            ...state,
            list_history_by_user_by_id: action.payload.value,
          };
        case "SET_PROVINSI":
          return {
            ...state,
            provinsi: action.payload.value,
          };
        case "SET_AGENT":
          return {
            ...state,
            agent: action.payload.value
          };
        case "SET_KABUPATEN":
          return {
            ...state,
            kabupaten: action.payload.value,
          };
        case "SET_KECAMATAN":
          return {
            ...state,
            kecamatan: action.payload.value,
          };
        case "SET_KELURAHAN":
          return {
            ...state,
            kelurahan: action.payload.value,
          };
        case "SET_DETAIL_DATA_LAYANAN":
          return {
            ...state,
            detail_data_layanan: action.payload.value,
          };
        case "SET_LANGUAGE":
          return {
            ...state,
            language: action.payload.value,
          };
        default:
          return;
      }
    },
  },
});

export const { globalAction } = GlobalSlices.actions;
export default GlobalSlices.reducer;
