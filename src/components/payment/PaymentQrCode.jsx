import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getFetchPaymentByIdAction } from "../../redux/action/paymentAction";
import moment from "moment-timezone";
import Gap from "../moleculars/Gap";
import { QRCodeCanvas } from "qrcode.react";
import TopNewNav from "../moleculars/TopNewNav";
import BankContent from "../moleculars/BankContent";
import HowToPay from "../moleculars/HowToPay";
import qris from "../../assets/images/logo_ewallet/QRIS.png";
import ButtonCustom from "../atoms/ButtonCustom";
import ColdownTimer from "../moleculars/ColdownTimer";
import { setLoading } from "../../redux/action/globalAction";

function PaymentQrCode() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.id;

  const storeData = useSelector((store) => store?.global);
  const { data } = storeData;

  var date =
    moment(data?.payment?.expiration_date).valueOf() - new Date().getTime();
  const NOW_IN_MS = new Date().getTime();
  const time = NOW_IN_MS + date;

  let qr = data?.payment?.actions ? JSON.parse(data?.payment?.actions) : "";

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
      <TopNewNav nav={false} path={`/payment/${id}`} title="Payment QR Code" />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container">
              <div className="payment-content">
                <div className="container-time-qr-code">
                  <div className="time-qr-code">
                    <div className="title">
                      Segera lakukan pembayaran dalam waktu
                    </div>
                    <ColdownTimer target={time} type="QR_CODE" />
                  </div>
                </div>
                <div className="cantainer-option-payment-f">
                  <div className="container-va-f">
                    <BankContent
                      image={qris}
                      title={`Scan QR Code`}
                      border={false}
                    />
                    <div className="box-qr-code-f">
                      <div className="border-qr-code-f">
                        <QRCodeCanvas
                          value={qr?.qr_string}
                          size={280}
                          bgColor={"#fff"}
                          level={"H"}
                        />
                      </div>
                    </div>
                    <Gap height={20} />
                    <ButtonCustom
                      title={`Total pembayaran Rp ${
                        data?.payment?.amount
                          ? data?.payment?.amount.toLocaleString()
                          : "0"
                      }`}
                      type="submit"
                    />
                    <hr />
                  </div>
                  <Gap height={20} />
                  <HowToPay code="QR_CODE" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentQrCode;
