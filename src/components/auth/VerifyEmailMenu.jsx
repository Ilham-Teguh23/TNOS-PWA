import axios from "axios";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import success from "../../assets/images/success.png";

function VerifyEmailMenu() {
  const params = useParams();
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [verify, setVerify] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyEmail = async () => {
    setLoader(true);
    await axios
      .get(`http://127.0.0.1:8000/api/auth/verify/${params.token}`)
      .then((res) => {
        console.log(res);
        setLoader(false);
        setMessage(res.data.message);
        setVerify(true);
        // navigate(
        //   `${process.env.REACT_APP_API_PWA}` +
        //   res.data.order.invoice_id,
        // );
      })
      .catch((res) => {
        console.log(res);
        setLoader(false);
        setMessage(res.response.data.message);
      });
  };
  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="njwdjhwk">
            {loader ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : message ? (
              <div className="njwdjhwk">
                <div className="img-success-kdd">
                  <img src={success} alt="" className="w-100" />
                </div>
                <div className="keterangan-notif">
                  <h5
                    className={`title-keterangan-notif ${
                      verify ? "text-success" : "text-danger"
                    }`}
                  >
                    {message}
                  </h5>
                  <button
                    onClick={() => navigate("/login")}
                    className="btn btn-layanan"
                  >
                    Kembali ke menu utama
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default VerifyEmailMenu;
