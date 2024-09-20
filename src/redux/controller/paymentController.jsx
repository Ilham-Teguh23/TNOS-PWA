import axios from "axios";
import { showMessage } from "../../components/utils/Message";
import { setBank, setChannelCode, setData, setLoading } from "./globalAction";

const API_HOST = {
  url: `${process.env.REACT_APP_API_PWA}`,
};

const getPaymentByIdAction = async (id) => (dispact) => {
  dispact(setLoading(true));
  axios
    .get(`${API_HOST.url}/dashboard/xendit/payment/${id}`)
    .then((response) => {
      dispact(setChannelCode(response.data.payment.payment_channel));
      if (response.data.payment.payment_channel === "ID_DANA") {
        window.open(
          `${
            JSON.parse(response.data.payment.actions).mobile_web_checkout_url
          }`,
          "_blank"
        );
        dispact(setLoading(false));
      } else if (response.data.payment.payment_channel === "ID_SHOPEEPAY") {
        window.open(
          `${
            JSON.parse(response.data.payment.actions)
              .mobile_deeplink_checkout_url
          }`,
          "_blank"
        );
        dispact(setLoading(false));
      } else if (response.data.payment.payment_channel === "ID_LINKAJA") {
        const isMobile = /Mobi/.test(navigator.userAgent);
        if (isMobile) {
          console.log("ini hp");
          window.open(
            `${
              JSON.parse(response.data.payment.actions).mobile_web_checkout_url
            }`,
            "_blank"
          );
        } else {
          console.log("ini desktop");
          window.open(
            `${
              JSON.parse(response.data.payment.actions).desktop_web_checkout_url
            }`,
            "_blank"
          );
        }

        dispact(setLoading(false));
      } else if (response.data.payment.payment_channel === "ID_ASTRAPAY") {
        // dispact(
        //   setUrlPayment(
        //     JSON.parse(response.data.payment.actions).mobile_web_checkout_url
        //   )
        // );
        // console.log(response.data.payment.actions?.mobile_web_checkout_url);
        window.open(
          `${JSON.parse(response.data.payment.actions).mobile_web_checkout_url}`
          // "_blank"
        );
        dispact(setLoading(false));
      } else {
        console.log("link terkirim");
        dispact(setLoading(false));
      }
    })
    .catch((error) => {
      console.log(error);
      dispact(setLoading(false));
    });
};

const createOvoAction = (data, navigate) => (dispact) => {
  dispact(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/ewallet/ovo`, data)
    .then((response) => {
      dispact(setLoading(false));
      // console.log("1");
      navigate(`/payment/pending/${response.data.payment.id}`);
      showMessage(
        `Cek notifikasi ovo anda, waktu pembayaran tersisa kurang dari 55 detik`
      );
    })
    .catch((error) => {
      dispact(setLoading(false));
      showMessage(error?.response?.data?.message, "error");
      // console.log(error);
    });
};

const createDanaAction = (data, navigate) => (dispact) => {
  dispact(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/ewallet/dana`, data)
    .then((response) => {
      dispact(setLoading(false));
      navigate(`/payment/pending/${response.data.payment.id}`);
      const isMobile = /Mobi/.test(navigator.userAgent);
      if (isMobile) {
        window.open(
          `${
            JSON.parse(response.data.payment.actions).mobile_web_checkout_url
              ? JSON.parse(response.data.payment.actions)
                  .mobile_web_checkout_url
              : JSON.parse(response.data.payment.actions)
                  .desktop_web_checkout_url
          }`,
          "_blank"
        );
      } else {
        window.open(
          `${
            JSON.parse(response.data.payment.actions).desktop_web_checkout_url
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
      dispact(setLoading(false));
      showMessage(error?.response?.data?.message, "error");
      // console.log(error);
    });
};

const createShopeepayAction = (data, navigate) => (dispact) => {
  dispact(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/ewallet/shopeepay`, data)
    .then((response) => {
      dispact(setLoading(false));
      navigate(`/payment/pending/${response.data.payment.id}`);
      const isMobile = /Mobi/.test(navigator.userAgent);
      console.log(isMobile);
      if (isMobile) {
        window.open(
          `${
            JSON.parse(response.data.payment.actions).mobile_web_checkout_url
              ? JSON.parse(response.data.payment.actions)
                  .mobile_web_checkout_url
              : JSON.parse(response.data.payment.actions)
                  .desktop_web_checkout_url
          }`,
          "_blank"
        );
      } else {
        window.open(
          `${
            JSON.parse(response.data.payment.actions).desktop_web_checkout_url
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
      dispact(setLoading(false));
      showMessage(error?.response?.data?.message, "error");
      // console.log(error);
    });
};

const createAstrapayAction = (data, navigate) => (dispact) => {
  dispact(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/ewallet/astrapay`, data)
    .then((response) => {
      dispact(setLoading(false));
      // navigate(`/payment/pending/${response.data.payment.id}`);
      const isMobile = /Mobi/.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = `${
          JSON.parse(response.data.payment.actions).mobile_web_checkout_url
            ? JSON.parse(response.data.payment.actions).mobile_web_checkout_url
            : JSON.parse(response.data.payment.actions).desktop_web_checkout_url
        }`;
      } else {
        window.location.href = `${
          JSON.parse(response.data.payment.actions).desktop_web_checkout_url
            ? JSON.parse(response.data.payment.actions).desktop_web_checkout_url
            : JSON.parse(response.data.payment.actions)
                .mobile_deeplink_checkout_url
        }`;
      }
      showMessage("Web link aktif selama 15 menit");
    })
    .catch((error) => {
      dispact(setLoading(false));
      showMessage(error?.response?.data?.message, "error");
      // console.log(error);
    });
};

const createLinkajaAction = (data, navigate) => (dispact) => {
  dispact(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/ewallet/linkaja`, data)
    .then((response) => {
      dispact(setLoading(false));

      const isMobile = /Mobi/.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = `${
          JSON.parse(response.data.payment.actions).mobile_web_checkout_url
            ? JSON.parse(response.data.payment.actions).mobile_web_checkout_url
            : JSON.parse(response.data.payment.actions).desktop_web_checkout_url
        }`;
      } else {
        window.location.href = `${
          JSON.parse(response.data.payment.actions).desktop_web_checkout_url
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
      dispact(setLoading(false));
      showMessage(error?.response?.data?.message, "error");
      // console.log(error);
    });
};

const createVaAction = (data, navigate) => (dispact) => {
  dispact(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/va/create`, data)
    .then((response) => {
      dispact(setLoading(false));
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
      dispact(setLoading(false));
      showMessage(error?.response?.data?.message, "error");
      console.log(error);
    });
};

const getFetchPaymentByIdAction = async (id, navigate) => (dispact) => {
  // dispact(setLoading(true));
  axios
    .get(`${API_HOST.url}/dashboard/xendit/payment/${id}`)
    .then((response) => {
      // dispact(setLoading(false));
      dispact(setData(response?.data));
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
      // dispact(setLoading(false));
    });
};

const ccCreateAction = async (data, navigate) => (dispact) => {
  dispact(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/cc/create`, data)
    .then((response) => {
      dispact(setLoading(false));
      navigate(`/payment/credit-or-debit-card/${response?.data?.payment?.id}`);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispact(setLoading(false));
    });
};

const updateTokenToPaymentDataAction = async (data, navigate) => (dispact) => {
  dispact(setLoading(true));
  axios
    .put(`${API_HOST.url}/payment/cc/update-token`, data)
    .then((response) => {
      dispact(setLoading(true));
      if (
        response?.data?.payment?.status === "APPROVED" ||
        response?.data?.payment?.status === "VERIFIED"
      ) {
        axios
          .post(`${API_HOST.url}/payment/cc/charge/create`, data)
          .then((charge) => {
            dispact(setLoading(false));
            showMessage(charge?.data?.message);
            navigate(
              `/payment/notification/success/${charge?.data?.payment?.id}`
            );
          })
          .catch((error) => {
            showMessage(error?.response?.data?.message, "error");
            dispact(setLoading(false));
          });
      }
      dispact(setLoading(false));
    })
    .catch((error) => {
      // console.log(error);
      dispact(setLoading(false));
    });
};

const createChargeCcAction = async (data, navigate) => (dispact) => {
  dispact(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/cc/charge/create`, data)
    .then((response) => {
      dispact(setLoading(false));
      // navigate(`/payment/credit-or-debit-card/charge/${id}`);
      // dispact(setData(response?.data));
      navigate(`/payment/notification/success/${response?.data?.payment?.id}`);
      showMessage(response?.data?.message);
      // console.log(response);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispact(setLoading(false));
    });
};

const getListBankAction = async () => (dispact) => {
  dispact(setLoading(true));
  axios
    .get(`${API_HOST.url}/payment/va/list-bank`)
    .then((response) => {
      dispact(setLoading(false));
      dispact(setBank(response?.data?.list_bank));
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispact(setLoading(false));
    });
};
const createQrCode = async (data, navigate) => (dispact) => {
  dispact(setLoading(true));
  axios
    .post(`${API_HOST.url}/payment/qr-code/create`, data)
    .then((response) => {
      // console.log(response);
      dispact(setLoading(false));
      navigate(`/payment/qr-code/${response?.data?.payment?.id}`);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispact(setLoading(false));
    });
};

const createOrderDemo = async (data, navigate) => (dispact) => {
  dispact(setLoading(true));
  axios
    .post(`${API_HOST.url}/demo/order/create`, data)
    .then((response) => {
      // console.log(response);
      dispact(setLoading(false));
      navigate(`/payment/${response?.data?.payment?.id}`);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispact(setLoading(false));
    });
};

const UserHistoryTransaction = async (id, navigate) => (dispact) => {
  dispact(setLoading(true));
  axios
    .post(`${API_HOST.url}/history/${id}`)
    .then((response) => {
      console.log(response);
      dispact(setLoading(false));
      // navigate(`/payment/${response?.data?.payment?.id}`);
    })
    .catch((error) => {
      // console.log(error);
      showMessage(error?.response?.data?.message, "error");
      dispact(setLoading(false));
    });
};

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
};
