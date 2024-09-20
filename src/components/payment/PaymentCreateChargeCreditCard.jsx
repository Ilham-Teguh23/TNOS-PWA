import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createChargeCcAction,
  getFetchPaymentByIdAction,
} from "../../redux/action/paymentAction";

function PaymentCreateChargeCreditCard() {
  //   const [card_cvn, setcard_cvn] = useState("");
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const navigate = useNavigate();
  const storeData = useSelector((store) => store?.global);
  const { data } = storeData;

  useEffect(() => {
    const getPaymentById = async () => {
      dispatch(await getFetchPaymentByIdAction(id));
    };

    getPaymentById();
  }, [dispatch, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataValue = {
      id: id,
      //   authentication_id: data?.payment?.authentication_id,
      token_id: data?.payment?.token_id,
      status: data?.payment?.status,
      amount: data?.payment?.amount,
      //   card_cvn: card_cvn,
    };

    dispatch(await createChargeCcAction(dataValue, navigate));
    // alert("Create Charger successfully!");
  };

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="njwdjhwk">
            <p className="text-center">
              jumlah pembayaran
              <br />
              {data?.payment?.amount}
            </p>
            <form onSubmit={(e) => handleSubmit(e)} action="">
              {/* <div className="form-group  mt-3">
                <label htmlFor="card_cvn">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  value={card_cvn}
                  onChange={(e) => setcard_cvn(e.target.value)}
                />
              </div> */}
              <div className="form-group  mt-3">
                <button
                  className="btn btn-layanan w-100"
                  onClick={() => handleSubmit()}
                  type="submit"
                >
                  Bayar Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default PaymentCreateChargeCreditCard;
