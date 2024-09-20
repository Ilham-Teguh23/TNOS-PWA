import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getFetchPaymentByIdAction } from "../../redux/action/paymentAction";
import moment from "moment-timezone";
import "../../assets/css/paymentStyle.css";
import Gap from "../moleculars/Gap";
import bri from "../../assets/images/logo_bank/Bank-04.png";
import TopNewNav from "../moleculars/TopNewNav";
import DetailCostumer from "../moleculars/DetailCostumer";
import BankContent from "../moleculars/BankContent";
import VaContent from "../moleculars/VaContent";
import HowToPay from "../moleculars/HowToPay";
import { setLoading } from "../../redux/action/globalAction";

function PaymentBri() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params?.id;

  const storeData = useSelector((store) => store?.global);
  const { data, payment_data } = storeData;

  useEffect(() => {
    dispatch(setLoading(true));
    const intervalId = setInterval(() => {
      dispatch(setLoading(false));
      getPaymentById();
    }, 5000); // Mengambil data setiap 5 detik

    // Fungsi pembersihan untuk menghapus interval saat komponen unmount
    return () => clearInterval(intervalId);

    //eslint-disable-next-line
  }, [dispatch, id]);

  const getPaymentById = async () => {
    dispatch(await getFetchPaymentByIdAction(id, navigate));
  };

  const amount = data?.payment?.amount ? data.payment.amount.toLocaleString() : "0";

  const date = data?.payment?.expiration_date
    ? moment(data.payment.expiration_date).valueOf() - new Date().getTime()
    : 0;
  const NOW_IN_MS = new Date().getTime();
  const time = NOW_IN_MS + date;

  return (
    <>
      <TopNewNav nav={false} path={`/payment/${id}`} title="Payment BRI" />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container">
              <div className="payment-content">
                <DetailCostumer
                  amount={amount}
                  id={payment_data?.id}
                  time={time}
                />
                <div className="cantainer-option-payment-f">
                  <BankContent image={bri} title={`Bank BRI`} border={false} />
                  <Gap height={20} />
                  <div className="container-va-f">
                    <div className="description">
                      Completed payment from bri to the virtual account
                      number below
                    </div>
                    <Gap height={20} />
                    <VaContent
                      title={`Company code`}
                      value={data?.payment?.merchant_code}
                      copy={true}
                    />
                    <VaContent
                      title={`Virtual account number`}
                      value={data?.payment?.account_number}
                      copy={true}
                    />
                  </div>
                  <Gap height={20} />
                  <HowToPay
                    code="BRI"
                    account_number={data?.payment?.account_number}
                    merchant_code={data?.payment?.merchant_code}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentBri;
