import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFetchPaymentByIdAction } from "../../redux/action/paymentAction";
import moment from "moment-timezone";
import Gap from "../moleculars/Gap";
import bca from "../../assets/images/logo_bank/Bank-12.png";
import TopNewNav from "../moleculars/TopNewNav";
import DetailCostumer from "../moleculars/DetailCostumer";
import BankContent from "../moleculars/BankContent";
import VaContent from "../moleculars/VaContent";
import HowToPay from "../moleculars/HowToPay";

function PaymentBca() {
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
    const getPaymentById = async () => {
      dispatch(await getFetchPaymentByIdAction(id));
    };

    getPaymentById();
  }, [dispatch, id]);

  return (
    <>
      <TopNewNav nav={false} path={`/payment/${id}`} title="Payment BCA" />
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
                  <BankContent image={bca} title={`Bank BCA`} border={false} />
                  <Gap height={20} />
                  <div className="container-va-f">
                    <div className="description">
                      Completed payment from mandiri to the virtual account
                      number below
                    </div>
                    <Gap height={20} />
                    <VaContent
                      title={`Company code`}
                      value={data?.payment?.business_id}
                      copy={true}
                    />
                    <VaContent
                      title={`Virtual account number`}
                      value={data?.payment?.account_number}
                      copy={true}
                    />
                  </div>
                  <Gap height={20} />
                  <HowToPay />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentBca;
