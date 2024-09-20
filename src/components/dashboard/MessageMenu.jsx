import React from "react";
import { Fragment } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
// import agen_tnos from "../../assets/images/agen-tnos.png";
// import rp from "../../assets/images/rp.png";

function MessageMenu() {
  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="nav-top-login">
            <Link to="/dashboard" className="btn nav-back-arrow">
              <FaArrowLeft className="hhagwd" />
              <h5 className="title-kasnadkw">Pesan</h5>
            </Link>
          </div>
          <div className="njwdjhwk">
            <hr />
            {/* <div className="pesan-hdwh mb-2">
              <div className="row">
                <div className="col-3">
                  <img src={agen_tnos} alt="" className="w-100" />
                </div>
                <div className="col-9">
                  <h5 className="title-pesan-hhada">Agent TNOS</h5>
                  <p className="p-pesan-hhada">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maiores, commodi.
                  </p>
                  <p className="datetime-pesan-kdw">31 Okt, 11 : 48 AM</p>
                </div>
              </div>
            </div>
            <div className="pesan-hdwh mb-2">
              <div className="row">
                <div className="col-3">
                  <img src={rp} alt="" className="w-100" />
                </div>
                <div className="col-9">
                  <h5 className="title-pesan-hhada">
                    Pembayaran kamu telah terkonfirmasi
                  </h5>
                  <p className="p-pesan-hhada">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maiores, commodi.
                  </p>
                  <p className="datetime-pesan-kdw">31 Okt, 11 : 48 AM</p>
                </div>
              </div>
            </div>
            <div className="pesan-hdwh read mb-2">
              <div className="row">
                <div className="col-3">
                  <img src={rp} alt="" className="w-100" />
                </div>
                <div className="col-9">
                  <h5 className="title-pesan-hhada">
                    Pembayaran kamu telah terkonfirmasi
                  </h5>
                  <p className="p-pesan-hhada">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maiores, commodi.
                  </p>
                  <p className="datetime-pesan-kdw">31 Okt, 11 : 48 AM</p>
                </div>
              </div>
            </div>
            <div className="pesan-hdwh read mb-2">
              <div className="row">
                <div className="col-3">
                  <img src={agen_tnos} alt="" className="w-100" />
                </div>
                <div className="col-9">
                  <h5 className="title-pesan-hhada">Agent TNOS</h5>
                  <p className="p-pesan-hhada">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maiores, commodi.
                  </p>
                  <p className="datetime-pesan-kdw">31 Okt, 11 : 48 AM</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default MessageMenu;
