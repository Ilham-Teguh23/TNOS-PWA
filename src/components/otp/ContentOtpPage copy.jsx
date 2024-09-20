import React, { Component, Fragment } from "react";
import { FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import MenuLogin from "../login/MenuLogin";

export class ContentOtpPage extends Component {
  submitOTP() {
    alert("adad");
  }
  render() {
    return (
      <Fragment>
        <div className="responsive-class">
          <div className="res-class">
            <MenuLogin />
            <div className="content-box-login">
              <h5 className="title-login">Kode OTP sudah dikirim!</h5>
              <p className="p-login">
                Masukan kode OTP yang telah kami SMS ke nomor HP-mu yang
                terdaftar +628123345678911.
              </p>

              <form action="" className="form-top-login">
                <label htmlFor="">OTP</label>
                <div className="d-flex align-content-center">
                  <input
                    type="text"
                    maxLength="4"
                    className="otp form-control "
                    placeholder="####"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <div className="times-otp">
                    <FaPhone />
                    <span className="m-0">01:55</span>
                  </div>
                </div>
                <div className="text-center">
                  {/* <Link to="/dashboard" className="btn btn-submit-login">
                    Lanjut
                  </Link> */}
                  <button
                    onClick={() => this.submitOTP()}
                    className="btn btn-submit-login"
                  >
                    Lanjut
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ContentOtpPage;
