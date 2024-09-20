import React, { Component, Fragment } from "react";
import ContentOtpPage from "../components/otp/ContentOtpPage";
import "../assets/css/verifOtp.css";
export class VerifOtpPage extends Component {
  componentDidMount() {
    window.scroll(0, 0);
    document.title = "TNOS | Verified OTP Page";
  }
  render() {
    return (
      <Fragment>
        <ContentOtpPage />
      </Fragment>
    );
  }
}

export default VerifOtpPage;
