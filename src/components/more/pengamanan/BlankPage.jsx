import React from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import { t } from "i18next";

function BlankPage() {
  return (
    <>
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container" style={{ marginTop: "0px" }}>
              <div className="payment-content">
                <div className="container-layanan-f">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      margin: "12px 6px 12px 6px",
                    }}
                  >
                    <center>
                      <h4>Blank Page</h4>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlankPage;
