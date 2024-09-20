import React, { Fragment, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPaymentByIdAction } from "../../redux/action/paymentAction";
import success from "../../assets/images/success.png";

function PaymentProccess() {
  const params = useParams();
  const id = params.id;
  const dispact = useDispatch();
  const storeData = useSelector((store) => store?.global);
  //   console.log(storeData);
  const { channel_code } = storeData;

  useEffect(() => {
    const getPaymentById = async () => {
      dispact(await getPaymentByIdAction(id));
    };

    getPaymentById();
  }, [dispact, id]);

  const nama_chanel = () => {
    if (channel_code === "ID_DANA") {
      return "DANA";
    } else if (channel_code === "ID_SHOPEEPAY") {
      return "ShopeePay";
    } else if (channel_code === "ID_LINKAJA") {
      return "LinkAja";
    } else if (channel_code === "ID_OVO") {
      return "OVO";
    } else if (channel_code === "ID_ASTRAPAY") {
      return "Astrapay";
    } else {
      return "Error";
    }
  };

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/payment-option" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw">Payment {nama_chanel()}</h5>
            </Link>
          </div>
          <div className="njwdjhwk">
            <div className="img-success-kdd">
              <img src={success} alt="" className="w-100" />
            </div>
            <div className="keterangan-notif">
              <h5 className="title-keterangan-notif">
                Silahkan lanjutkan pembayaran
              </h5>
              <p className="p-keterangan-notif">
                lanjutkan pembayaran anda, jika ada kendala silahkan hubungi
                costumer service kami di cs@gmail.com
              </p>
              <button className="btn btn-layanan">Kembali ke menu utama</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default PaymentProccess;
