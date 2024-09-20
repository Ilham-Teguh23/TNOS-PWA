import { globalAction } from "../global/GlobalSlices";

const setLoading = (value) => {
  return globalAction({ type: "SET_LOADING", value });
};

const setUrlPayment = (value) => {
  return globalAction({ type: "SET_URL_PAYMENT", value });
};
const setChannelCode = (value) => {
  return globalAction({ type: "SET_CHANNEL_CODE", value });
};
const setPaymentData = (value) => {
  return globalAction({ type: "SET_PAYMENT_DATA", value });
};

const setData = (value) => {
  return globalAction({ type: "SET_DATA", value });
};
const setBank = (value) => {
  return globalAction({ type: "LIST_BANK", value });
};
const isPayment = (value) => {
  return globalAction({ type: "IS_PAYMENT", value });
};
const setParams = (value) => {
  return globalAction({ type: "SET_PARAMS", value });
};
const setListHistoryByUser = (value) => {
  return globalAction({ type: "SET_LIST_HISTORY_BY_USER", value });
};
const setListHistoryByUserById = (value) => {
  return globalAction({ type: "SET_LIST_HISTORY_BY_USER_BY_ID", value });
};
const setProvinsi = (value) => {
  return globalAction({ type: "SET_PROVINSI", value });
};
const setAgent = (value) => {
  return globalAction({ type: "SET_AGENT", value });
};
const setKabupten = (value) => {
  return globalAction({ type: "SET_KABUPATEN", value });
};
const setKecamatan = (value) => {
  return globalAction({ type: "SET_KECAMATAN", value });
};
const setKelurahan = (value) => {
  return globalAction({ type: "SET_KELURAHAN", value });
};
const setDetail_data_layanan = (value) => {
  return globalAction({ type: "SET_DETAIL_DATA_LAYANAN", value });
};
const setLanguage = (value) => {
  localStorage.setItem("language", value);
  return globalAction({ type: "SET_LANGUAGE", value });
};

export {
  setLoading,
  setUrlPayment,
  setChannelCode,
  setPaymentData,
  setData,
  setBank,
  isPayment,
  setParams,
  setListHistoryByUser,
  setListHistoryByUserById,
  setProvinsi,
  setAgent,
  setKabupten,
  setKecamatan,
  setKelurahan,
  setDetail_data_layanan,
  setLanguage,
};
