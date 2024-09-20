import axios from "axios";
import { showMessage } from "../../components/utils/Message";
import {
  setBank,
  setChannelCode,
  setData,
  setDetail_data_layanan,
  setKabupten,
  setKecamatan,
  setKelurahan,
  setListHistoryByUser,
  setListHistoryByUserById,
  setLoading,
  setProvinsi,
  setAgent,
} from "./globalAction";
import CryptoJS from "crypto-js";
import { Base64 } from "js-base64";

const API_HOST = {
  url: `${process.env.REACT_APP_API_PWA}`,
};

const keyCrpyto = "U2FsdGVkX1+RFxINtDchhPqAxYecNts3Di1tTgbwHg0=";

const base64UrlSafe = (str) => {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const getPaymentByIdAction = async (id) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(`${API_HOST.url}/dashboard/xendit/payment/${id}`)
    .then((response) => {
      dispatch(setChannelCode(response.data.payment.payment_channel));
      if (response.data.payment.payment_channel === "ID_DANA") {
        window.open(
          `${JSON.parse(response.data.payment.actions).mobile_web_checkout_url
          }`,
          "_blank"
        );
        dispatch(setLoading(false));
      } else if (response.data.payment.payment_channel === "ID_SHOPEEPAY") {
        window.open(
          `${JSON.parse(response.data.payment.actions)
            .mobile_deeplink_checkout_url
          }`,
          "_blank"
        );
        dispatch(setLoading(false));
      } else if (response.data.payment.payment_channel === "ID_LINKAJA") {
        const isMobile = /Mobi/.test(navigator.userAgent);
        if (isMobile) {
          console.log("ini hp");
          window.open(
            `${JSON.parse(response.data.payment.actions).mobile_web_checkout_url
            }`,
            "_blank"
          );
        } else {
          console.log("ini desktop");
          window.open(
            `${JSON.parse(response.data.payment.actions).desktop_web_checkout_url
            }`,
            "_blank"
          );
        }

        dispatch(setLoading(false));
      } else if (response.data.payment.payment_channel === "ID_ASTRAPAY") {
        // dispatch(
        //   setUrlPayment(
        //     JSON.parse(response.data.payment.actions).mobile_web_checkout_url
        //   )
        // );
        // console.log(response.data.payment.actions?.mobile_web_checkout_url);
        window.open(
          `${JSON.parse(response.data.payment.actions).mobile_web_checkout_url}`
          // "_blank"
        );
        dispatch(setLoading(false));
      } else {
        console.log("link terkirim");
        dispatch(setLoading(false));
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(setLoading(false));
    });
};

const createOvoAction = (data, navigate) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/ewallet/ovo`, data)
    .then((response) => {
      dispatch(setLoading(false));
      // console.log("1");
      navigate(`/payment/pending/${response.data.payment.id}`);
      showMessage(
        `Cek notifikasi ovo anda, waktu pembayaran tersisa kurang dari 55 detik`
      );
    })
    .catch((error) => {
      dispatch(setLoading(false));
      showMessage(error?.response?.data?.message, "error");
      // console.log(error);
    });
};

const createDanaAction = (data, navigate) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/ewallet/dana`, data)
    .then((response) => {
      dispatch(setLoading(false));
      navigate(`/payment/pending/${response.data.payment.id}`);
      const isMobile = /Mobi/.test(navigator.userAgent);
      if (isMobile) {
        window.open(
          `${JSON.parse(response.data.payment.actions).mobile_web_checkout_url
            ? JSON.parse(response.data.payment.actions)
              .mobile_web_checkout_url
            : JSON.parse(response.data.payment.actions)
              .desktop_web_checkout_url
          }`,
          "_blank"
        );
      } else {
        window.open(
          `${JSON.parse(response.data.payment.actions).desktop_web_checkout_url
            ? JSON.parse(response.data.payment.actions)
              .desktop_web_checkout_url
            : JSON.parse(response.data.payment.actions)
              .mobile_deeplink_checkout_url
          }`,
          "_blank"
        );
      }
      showMessage("Web link aktif selama 30 menit");
    })
    .catch((error) => {
      dispatch(setLoading(false));
      showMessage(error?.response?.data?.message, "error");
      // console.log(error);
    });
};

const createShopeepayAction = (data, navigate) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/ewallet/shopeepay`, data)
    .then((response) => {
      dispatch(setLoading(false));
      navigate(`/payment/pending/${response.data.payment.id}`);
      const isMobile = /Mobi/.test(navigator.userAgent);
      console.log(isMobile);
      if (isMobile) {
        window.open(
          `${JSON.parse(response.data.payment.actions).mobile_web_checkout_url
            ? JSON.parse(response.data.payment.actions)
              .mobile_web_checkout_url
            : JSON.parse(response.data.payment.actions)
              .desktop_web_checkout_url
          }`,
          "_blank"
        );
      } else {
        window.open(
          `${JSON.parse(response.data.payment.actions).desktop_web_checkout_url
            ? JSON.parse(response.data.payment.actions)
              .desktop_web_checkout_url
            : JSON.parse(response.data.payment.actions)
              .mobile_deeplink_checkout_url
          }`,
          "_blank"
        );
      }
      showMessage(`Deeplink maupun QR string aktif selama 30 menit`);
    })
    .catch((error) => {
      dispatch(setLoading(false));
      showMessage(error?.response?.data?.message, "error");
      // console.log(error);
    });
};

const createAstrapayAction = (data, navigate) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/ewallet/astrapay`, data)
    .then((response) => {
      dispatch(setLoading(false));
      // navigate(`/payment/pending/${response.data.payment.id}`);
      const isMobile = /Mobi/.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = `${JSON.parse(response.data.payment.actions).mobile_web_checkout_url
          ? JSON.parse(response.data.payment.actions).mobile_web_checkout_url
          : JSON.parse(response.data.payment.actions).desktop_web_checkout_url
          }`;
      } else {
        window.location.href = `${JSON.parse(response.data.payment.actions).desktop_web_checkout_url
          ? JSON.parse(response.data.payment.actions).desktop_web_checkout_url
          : JSON.parse(response.data.payment.actions)
            .mobile_deeplink_checkout_url
          }`;
      }
      showMessage("Web link aktif selama 15 menit");
    })
    .catch((error) => {
      dispatch(setLoading(false));
      showMessage(error?.response?.data?.message, "error");
      // console.log(error);
    });
};

const createLinkajaAction = (data, navigate) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/ewallet/linkaja`, data)
    .then((response) => {
      dispatch(setLoading(false));

      const isMobile = /Mobi/.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = `${JSON.parse(response.data.payment.actions).mobile_web_checkout_url
          ? JSON.parse(response.data.payment.actions).mobile_web_checkout_url
          : JSON.parse(response.data.payment.actions).desktop_web_checkout_url
          }`;
      } else {
        window.location.href = `${JSON.parse(response.data.payment.actions).desktop_web_checkout_url
          ? JSON.parse(response.data.payment.actions).desktop_web_checkout_url
          : JSON.parse(response.data.payment.actions)
            .mobile_deeplink_checkout_url
          }`;
      }
      showMessage(
        "Web link aktif selama 30 menit, kedaluwarsa dalam 5 menit setelah dibuka"
      );
    })
    .catch((error) => {
      dispatch(setLoading(false));
      showMessage(error?.response?.data?.message, "error");
      // console.log(error);
    });
};

const createVaAction = (data, navigate) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/va/create`, data)
    .then((response) => {
      dispatch(setLoading(false));
      switch (response?.data?.payment?.bank_code) {
        case "MANDIRI":
          navigate(`/payment/bank-mandiri/${response?.data?.payment?.id}`);
          showMessage("Metode pembayaran bank mandiri berhasil dibuat");
          break;
        case "BRI":
          navigate(`/payment/bank-bri/${response?.data?.payment?.id}`);
          showMessage("Metode pembayaran bank BRI berhasil dibuat");
          break;
        case "BCA":
          navigate(`/payment/bank-bca/${response?.data?.payment?.id}`);
          showMessage("Metode pembayaran bank BCA berhasil dibuat");
          break;
        case "BNI":
          navigate(`/payment/bank-bni/${response?.data?.payment?.id}`);
          showMessage("Metode pembayaran bank BNI berhasil dibuat");
          break;
        case "PERMATA":
          navigate(`/payment/bank-permata/${response?.data?.payment?.id}`);
          showMessage("Metode pembayaran bank Permata berhasil dibuat");
          break;
        case "SAHABAT_SAMPOERNA":
          navigate(`/payment/bank-sampoerna/${response?.data?.payment?.id}`);
          showMessage("Metode pembayaran bank Sampoerna berhasil dibuat");
          break;
        case "BSI":
          navigate(`/payment/bank-bsi/${response?.data?.payment?.id}`);
          showMessage("Metode pembayaran bank BSI berhasil dibuat");
          break;
        case "BJB":
          navigate(`/payment/bank-bjb/${response?.data?.payment?.id}`);
          showMessage("Metode pembayaran bank BJB berhasil dibuat");
          break;
        default:
          navigate("/code-error");
      }
    })
    .catch((error) => {
      dispatch(setLoading(false));
      showMessage(error?.response?.data?.message, "error");
      console.log(error);
    });
};

const getFetchPaymentByIdAction = async (id, navigate) => (dispatch) => {
  // dispatch(setLoading(true));
  axios
    .get(`${API_HOST.url}/dashboard/xendit/payment/${id}`)
    .then((response) => {
      // dispatch(setLoading(false));
      dispatch(setData(response?.data));
      switch (response?.data?.payment?.status) {
        case "SUCCEEDED":
          navigate(`/payment/custom/success/${id}`);
          break;
        case "SETTLED":
          navigate(`/payment/custom/success/${id}`);
          break;
        case "EXPIRED":
          navigate(`/payment/failure/${id}`);
          break;
        default:
          break;
      }
    })
    .catch((error) => {
      // console.log(error);
      // dispatch(setLoading(false));
    });
};

const ccCreateAction = async (data, navigate) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/cc/create`, data)
    .then((response) => {
      dispatch(setLoading(false));
      navigate(`/payment/credit-or-debit-card/${response?.data?.payment?.id}`);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispatch(setLoading(false));
    });
};

const updateTokenToPaymentDataAction = async (data, navigate) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .put(`${API_HOST.url}/payment/cc/update-token`, data)
    .then((response) => {
      dispatch(setLoading(true));
      if (
        response?.data?.payment?.status === "APPROVED" ||
        response?.data?.payment?.status === "VERIFIED"
      ) {
        axios
          .post(`${API_HOST.url}/payment/cc/charge/create`, data)
          .then((charge) => {
            dispatch(setLoading(false));
            showMessage(charge?.data?.message);
            navigate(
              `/payment/notification/success/${charge?.data?.payment?.id}`
            );
          })
          .catch((error) => {
            showMessage(error?.response?.data?.message, "error");
            dispatch(setLoading(false));
          });
      }
      dispatch(setLoading(false));
    })
    .catch((error) => {
      // console.log(error);
      dispatch(setLoading(false));
    });
};

const createChargeCcAction = async (data, navigate) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/cc/charge/create`, data)
    .then((response) => {
      dispatch(setLoading(false));
      // navigate(`/payment/credit-or-debit-card/charge/${id}`);
      // dispatch(setData(response?.data));
      navigate(`/payment/notification/success/${response?.data?.payment?.id}`);
      showMessage(response?.data?.message);
      // console.log(response);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispatch(setLoading(false));
    });
};

const getListBankAction = async () => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(`${API_HOST.url}/payment/va/list-bank`)
    .then((response) => {
      dispatch(setLoading(false));
      dispatch(setBank(response?.data?.list_bank));
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispatch(setLoading(false));
    });
};
const createQrCode = async (data, navigate) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/qr-code/create`, data)
    .then((response) => {
      // console.log(response);
      dispatch(setLoading(false));
      navigate(`/payment/qr-code/${response?.data?.payment?.id}`);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispatch(setLoading(false));
    });
};

const createOrderDemo = async (data, navigate) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(`${API_HOST.url}/demo/order/create`, data)
    .then((response) => {
      // console.log(response);
      dispatch(setLoading(false));
      navigate(`/payment/${response?.data?.payment?.id}`);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispatch(setLoading(false));
    });
};

const UserHistoryTransaction = async (id, type) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(`${API_HOST.url}/history/${id}/${type}`)
    .then((response) => {
      dispatch(setListHistoryByUser(response.data.detail));
      dispatch(setLoading(false));
      // navigate(`/payment/${response?.data?.payment?.id}`);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispatch(setLoading(false));
    });
};

const UserHistoryTransactionById = async (id) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(`${API_HOST.url}/order/${id}`)
    .then((response) => {
      dispatch(setListHistoryByUserById(response.data.detail));
      dispatch(setLoading(false));
      // navigate(`/payment/${response?.data?.payment?.id}`);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispatch(setLoading(false));
    });
};

const getAgent = async () => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(`${API_HOST.url}/pwa/partnerdeka`)
    .then((response) => {
      console.log(response?.data?.data);
      dispatch(setAgent(response?.data?.data));
      dispatch(setLoading(false));
      // navigate(`/payment/${response?.data?.payment?.id}`);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispatch(setLoading(false));
    });
};

const getProvinsi = async () => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(`https://dev.farizdotid.com/api/daerahindonesia/provinsi`)
    .then((response) => {
      dispatch(setProvinsi(response?.data?.provinsi));
      dispatch(setLoading(false));
      // navigate(`/payment/${response?.data?.payment?.id}`);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispatch(setLoading(false));
    });
};

const getKabupaten = async (id) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(
      `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`
    )
    .then((response) => {
      dispatch(setKabupten(response?.data?.kota_kabupaten));
      dispatch(setLoading(false));
      // navigate(`/payment/${response?.data?.payment?.id}`);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispatch(setLoading(false));
    });
};
const getKecamatan = async (id) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(
      `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}`
    )
    .then((response) => {
      dispatch(setKecamatan(response?.data?.kecamatan));
      dispatch(setLoading(false));
      // navigate(`/payment/${response?.data?.payment?.id}`);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispatch(setLoading(false));
    });
};

const getKelurahan = async (id) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(
      `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${id}`
    )
    .then((response) => {
      dispatch(setKelurahan(response?.data?.kelurahan));
      dispatch(setLoading(false));
      // navigate(`/payment/${response?.data?.payment?.id}`);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispatch(setLoading(false));
    });
};
const badanHukumCreate =
  async (values, navigate, urlNavigate) => (dispatch) => {
    dispatch(setLoading(true));

    axios
      .post(`${API_HOST.url}/badan-hukum/in-order`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        dispatch(setLoading(false));

        if (values.params) {
          navigate(
            `${urlNavigate}${response?.data?.detail?.id}?query=${values.params}`
          );
        } else {
          navigate(`${urlNavigate}${response?.data?.detail?.id}`);
        }
      })
      .catch((error) => {
        // console.log(error);
        showMessage(error?.response?.data?.message, "error");
        dispatch(setLoading(false));
      });
  };

const pageOthersCreate =
  async (values, navigate, urlNavigate) => (dispatch) => {
    dispatch(setLoading(true));

    axios
      .post(`${API_HOST.url}/badan-hukum/in-order`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        
        // dispatch(setLoading(false));
        // navigate(`${urlNavigate}${response?.data?.detail?.id}`);
      })
      .catch((error) => {
        console.log(error);
        showMessage(error?.response?.data?.message, "error");
        dispatch(setLoading(false));
      });
  };

const badanHukumList = async (id) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(`${API_HOST.url}/badan-hukum/get-detail-order/${id}`)
    .then((response) => {
      dispatch(setDetail_data_layanan(response.data.detail));
      dispatch(setLoading(false));
      // navigate(`/payment/${response?.data?.payment?.id}`);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispatch(setLoading(false));
    });
};

const pageOthersList = async (id) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(`${API_HOST.url}/badan-hukum/get-detail-order/${id}`)
    .then((response) => {
      dispatch(setDetail_data_layanan(response.data.detail));
      dispatch(setLoading(false));
      // navigate(`/payment/${response?.data?.payment?.id}`);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispatch(setLoading(false));
    });
};

const paymentBadanHukum = async (data) => (dispatch) => {
  // dispatch(setLoading(true));
  axios
    .post(`${API_HOST.url}/badan-hukum/in-payment`, data)
    .then((response) => {
      // console.log("Invoide : " + invoiceId);
      // console.log("Amount :" + amount);
      // console.log(invoiceId);
      // console.log(amount);
      // const url = `${process.env.REACT_APP_PAYMENT}/${invoiceId}/${amount}`
      // window.location = `${process.env.REACT_APP_PAYMENT}/${invoiceId}/${amount}`

      // const encryptDataInvoice = CryptoJS.AES.encrypt(String(response?.data?.order?.invoice_id), keyCrpyto).toString();
      // const btoaInvoice = btoa(encryptDataInvoice);

      // const encryptAmount = CryptoJS.AES.encrypt(`${response?.data?.order?.order_total}`, keyCrpyto).toString();
      // const btoaAmount = btoa(encryptAmount)

      // window.location = `${process.env.REACT_APP_PAYMENT}${btoaInvoice}|${btoaAmount}`;

      window.location = `${process.env.REACT_APP_API_INVOICE_URL}${response?.data?.order?.invoice_id}`;
    })
    .catch((error) => {
      showMessage(error?.response?.data?.message, "error");
      dispatch(setLoading(false));
    });
};

const paymentPageOthers = async (data) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(`${API_HOST.url}/badan-hukum/in-payment`, data)
    .then((response) => {
      // console.log(response);
      window.location = `${process.env.REACT_APP_API_INVOICE_URL}${response?.data?.order?.invoice_id}`;
      dispatch(setLoading(false));
      // navigate(`/payment/${response?.data?.payment?.id}`);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispatch(setLoading(false));
    });
};

const paymentPengamananKorporat =
  async (values, navigate, urlNavigate) => (dispatch) => {
    dispatch(setLoading(true));
    axios
      .post(`${API_HOST.url}/order-new`, values)
      .then((response) => {
        // console.log(response);
        dispatch(setLoading(false));

        if (values.params) {
          if (values.user_id != 9999999999) {
            navigate(
              `/corporate-security-m/checkout/${response?.data?.detail?.id}?query=${values.params}`
            );
          } else {
            navigate(`/corporate-security-m/authfailed`);
          }
        } else {
          navigate(
            `/corporate-security/checkout/${response?.data?.detail?.id}`
          );
        }
      })
      .catch((error) => {
        // console.log(error);
        showMessage(error?.response?.data?.message, "error");
        dispatch(setLoading(false));
      });
  };

const paymentPwan =
  async (finalData, navigate, urlNavigate) => (dispatch) => {

    dispatch(setLoading(true));
    axios
      .post(`${API_HOST.url}/order-new-history`, finalData)
      .then((response) => {

        dispatch(setLoading(false));

        navigate(`/corporate-security/section/checkout/${response?.data?.data?.order?.id}`)
        // if (values.params) {
        //   if (values.user_id != 9999999999) {
        //     navigate(
        //       `/corporate-security-m/checkout/${response?.data?.detail?.id}?query=${values.params}`
        //     );
        //   } else {
        //     navigate(`/corporate-security-m/authfailed`);
        //   }
        // } else {
        //   navigate(
        //     `/corporate-security/checkout/${response?.data?.detail?.id}`
        //   );
        // }
      })
      .catch((error) => {
        console.log(error);
        showMessage(error?.response?.data?.message, "error");
        dispatch(setLoading(false));
      });
  };

const paymentPWANRingkasan = async (data) => (dispatch) => {
  axios
    .post(`${API_HOST.url}/dashboard/pwa-revamp/history/${data.order_id}`)
    .then((response) => {
      window.location = `${process.env.REACT_APP_API_INVOICE_URL}${response?.data?.data?.invoice_id}`;

    }).catch((error) => {
      console.log(error);

    })
  // axios
  //   .post(`${API_HOST.url}/dashboard/pwa-revamp/history`, data)
}

export {
  createOvoAction,
  createDanaAction,
  createShopeepayAction,
  getPaymentByIdAction,
  createLinkajaAction,
  createAstrapayAction,
  createVaAction,
  getFetchPaymentByIdAction,
  ccCreateAction,
  updateTokenToPaymentDataAction,
  createChargeCcAction,
  getListBankAction,
  createQrCode,
  createOrderDemo,
  UserHistoryTransaction,
  UserHistoryTransactionById,
  getAgent,
  getProvinsi,
  getKabupaten,
  getKecamatan,
  getKelurahan,
  badanHukumCreate,
  badanHukumList,
  paymentBadanHukum,
  paymentPengamananKorporat,
  pageOthersCreate,
  pageOthersList,
  paymentPageOthers,
  paymentPwan,
  paymentPWANRingkasan
};
