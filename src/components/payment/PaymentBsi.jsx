import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getFetchPaymentByIdAction } from "../../redux/action/paymentAction";
import moment from "moment-timezone";
import Gap from "../moleculars/Gap";
import bsi from "../../assets/images/logo_bank/Bank-07.png";
import TopNewNav from "../moleculars/TopNewNav";
import DetailCostumer from "../moleculars/DetailCostumer";
import BankContent from "../moleculars/BankContent";
import VaContent from "../moleculars/VaContent";
import HowToPay from "../moleculars/HowToPay";
import { setLoading } from "../../redux/action/globalAction";

function PaymentBsi() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params?.id;

  const storeData = useSelector((store) => store?.global);
  const { data, payment_data } = storeData;

  var date =
    moment(data?.payment?.expiration_date).valueOf() - new Date().getTime();
  const NOW_IN_MS = new Date().getTime();
  const time = NOW_IN_MS + date;

  useEffect(() => {
    dispatch(setLoading(true));
    const intervalId = setInterval(() => {
      dispatch(setLoading(false));
      getPaymentById();
    }, 5000); // Fetch data every 5 seconds

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);

    //eslint-disable-next-line
  }, [dispatch, id]);

  const getPaymentById = async () => {
    dispatch(await getFetchPaymentByIdAction(id, navigate));
  };

  return (
    <>
      <TopNewNav nav={false} path={`/payment/${id}`} title="Payment BSI" />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container">
              <div className="payment-content">
                <DetailCostumer
                  amount={data?.payment?.amount?.toLocaleString()}
                  id={payment_data?.id}
                  time={time}
                />
                <div className="cantainer-option-payment-f">
                  <BankContent image={bsi} title={`Bank BSI`} border={false} />
                  <Gap height={20} />
                  <div className="container-va-f">
                    <div className="description">
                      Completed payment from bsi to the virtual account
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
                    code="BSI"
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

export default PaymentBsi;
