import {
  ccCreateAction,
  createAstrapayAction,
  createDanaAction,
  createLinkajaAction,
  createQrCode,
  createShopeepayAction,
  createVaAction,
} from "../../redux/action/paymentAction";

const checkout = async (code, value, dispatch, navigate) => {
  switch (code) {
    case "DANA":
      const dana = {
        id: value?.id,
        amount: value?.items?.price * value?.items?.quantity,
        name: value?.customer?.name,
        email: value?.customer?.email,
        phone: value?.customer?.phone,
        items: JSON.stringify(value?.items),
        bank_code: code,
      };
      dispatch(createDanaAction(dana, navigate));
      break;
    case "OVO":
      navigate(`/payment/ovo`);
      break;
    case "LINKAJA":
      const linkaja = {
        id: value?.id,
        amount: value?.items?.price * value?.items?.quantity,
        name: value?.customer?.name,
        email: value?.customer?.email,
        phone: value?.customer?.phone,
        items: JSON.stringify(value?.items),
        bank_code: code,
      };
      dispatch(createLinkajaAction(linkaja, navigate));
      break;
    case "SHOPEEPAY":
      const shopeepay = {
        id: value?.id,
        amount: value?.items?.price * value?.items?.quantity,
        name: value?.customer?.name,
        email: value?.customer?.email,
        phone: value?.customer?.phone,
        items: JSON.stringify(value?.items),
        bank_code: code,
      };
      dispatch(createShopeepayAction(shopeepay, navigate));
      break;
    case "ASTRAPAY":
      const astrapay = {
        id: value?.id,
        amount: value?.items?.price * value?.items?.quantity,
        name: value?.customer?.name,
        email: value?.customer?.email,
        phone: value?.customer?.phone,
        items: JSON.stringify(value?.items),
        bank_code: code,
      };
      dispatch(createAstrapayAction(astrapay, navigate));
      break;
    case "MANDIRI":
      const mandiri = {
        id: value?.id,
        amount: value?.items?.price * value?.items?.quantity,
        name: value?.customer?.name,
        email: value?.customer?.email,
        phone: value?.customer?.phone,
        items: JSON.stringify(value?.items),
        bank_code: code,
      };
      dispatch(await createVaAction(mandiri, navigate));
      break;
    case "BRI":
      const bri = {
        id: value?.id,
        amount: value?.items?.price * value?.items?.quantity,
        name: value?.customer?.name,
        email: value?.customer?.email,
        phone: value?.customer?.phone,
        items: JSON.stringify(value?.items),
        bank_code: code,
      };
      dispatch(await createVaAction(bri, navigate));
      break;
    case "BCA":
      const bca = {
        id: value?.id,
        amount: value?.items?.price * value?.items?.quantity,
        name: value?.customer?.name,
        email: value?.customer?.email,
        phone: value?.customer?.phone,
        items: JSON.stringify(value?.items),
        bank_code: code,
      };
      dispatch(await createVaAction(bca, navigate));
      break;
    case "BNI":
      const bni = {
        id: value?.id,
        amount: value?.items?.price * value?.items?.quantity,
        name: value?.customer?.name,
        email: value?.customer?.email,
        phone: value?.customer?.phone,
        items: JSON.stringify(value?.items),
        bank_code: code,
      };
      dispatch(await createVaAction(bni, navigate));
      break;
    case "PERMATA":
      const permata = {
        id: value?.id,
        amount: value?.items?.price * value?.items?.quantity,
        name: value?.customer?.name,
        email: value?.customer?.email,
        phone: value?.customer?.phone,
        items: JSON.stringify(value?.items),
        bank_code: code,
      };
      dispatch(await createVaAction(permata, navigate));
      break;
    case "SAHABAT_SAMPOERNA":
      const sampoerna = {
        id: value?.id,
        amount: value?.items?.price * value?.items?.quantity,
        name: value?.customer?.name,
        email: value?.customer?.email,
        phone: value?.customer?.phone,
        items: JSON.stringify(value?.items),
        bank_code: code,
      };
      dispatch(await createVaAction(sampoerna, navigate));
      break;
    case "BSI":
      const bsi = {
        id: value?.id,
        amount: value?.items?.price * value?.items?.quantity,
        name: value?.customer?.name,
        email: value?.customer?.email,
        phone: value?.customer?.phone,
        items: JSON.stringify(value?.items),
        bank_code: code,
      };
      dispatch(await createVaAction(bsi, navigate));
      break;
    case "BJB":
      const bjb = {
        id: value?.id,
        amount: value?.items?.price * value?.items?.quantity,
        name: value?.customer?.name,
        email: value?.customer?.email,
        phone: value?.customer?.phone,
        items: JSON.stringify(value?.items),
        bank_code: code,
      };
      dispatch(await createVaAction(bjb, navigate));
      break;
    case "CREDIT_CARD":
      const cc = {
        id: value?.id,
        amount: value?.items?.price * value?.items?.quantity,
        name: value?.customer?.name,
        email: value?.customer?.email,
        phone: value?.customer?.phone,
        items: JSON.stringify(value?.items),
        bank_code: code,
      };
      dispatch(await ccCreateAction(cc, navigate));
      break;
    case "QR_CODE":
      const qr_code = {
        id: value?.id,
        amount: value?.items?.price * value?.items?.quantity,
        name: value?.customer?.name,
        email: value?.customer?.email,
        phone: value?.customer?.phone,
        items: JSON.stringify(value?.items),
      };
      dispatch(await createQrCode(qr_code, navigate));
      break;
    default:
      return false;
  }
};

export { checkout };
