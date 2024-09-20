import React, { Component, Fragment } from "react";
import logo from "../../assets/images/tnos_logo_loader.gif";

export class Loader extends Component {
  render() {
    return (
      <Fragment>
        <div className="responsive-class">
          <div className="res-class">
            <div className="centered-logo ">
              <div className="cent-logo">
                <div className="cc">
                  <div className="img-dwd">
                    <img
                      src={logo}
                      alt=""
                      style={{ maxWidth: "170px" }}
                      className="logo-loader "
                    />
                  </div>
                  {/* <div className="el-232">
                    <div className="lds-ellipsis">
                      <div>T</div>
                      <div>N</div>
                      <div>O</div>
                      <div>S</div>
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="col-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Loader;
