import React, { useEffect, useRef, useState } from "react";
import TopNewNav from "../moleculars/TopNewNav";
import TitleHeader from "../utils/TitleHeader";
import { t } from "i18next";
import PAS from "../../assets/images/PAS.svg";
import Trigger from "../../assets/images/TRIGGER.svg";
import { Button } from "react-bootstrap";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";

import { decode as base64_decode } from "base-64";
import { getParams } from "../moleculars/GetParams";

var CryptoJS = require("crypto-js");
const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

function ListLayananMobile() {
  TitleHeader("Halaman Pengamanan");
  const navigate = useNavigate();
  const searchParams = useParams();

  const [getP, setP] = useState(null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const checkParams = () => {
    let checkP = getParams(["query"]);

    if (!checkP) {
      console.log("params tidak ditemukan");
    } else {
      var base64regex =
        /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
      if (!base64regex.test(checkP.query)) {
        console.log("data base64 tidak cocok");
        navigate("/not-found");
      } else {
        let string = base64_decode(checkP.query);
        let cryptdata = string;
        const info2x = CryptoJS.AES.decrypt(cryptdata, secretKey).toString(
          CryptoJS.enc.Utf8
        );

        if (!info2x) {
          console.log("data base64 not match when decrypt");
        } else {
          var paramValue = JSON.parse(info2x);
          console.log(paramValue);
          setUser(paramValue);
          setP(checkP.query);
          localStorage.setItem("data", JSON.stringify(paramValue));
        }
        if (!localStorage.getItem("data")) {
          if (!paramValue.user_id) {
            console.log("salah");
            navigate("/not-found");
          }
        }
      }
    }
  };

  useEffect(() => {
    checkParams();
  }, []);

  return (
    <>
      {/* <TopNewNav title="List Layanan" path={`/security-providers`} /> */}
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="flexcol" style={{margin: '20px 12px 24px 12px'}}>
              {searchParams?.mitra === t("partner2") ? (
                <div className="flexbox">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <img
                      src={PAS}
                      alt="pas"
                      style={{
                        width: "60px",
                        height: "60px",
                        padding: "4px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                      }}
                    />
                    <span style={{ alignSelf: "center", marginLeft: "24px" }}>
                      Pengamanan Usaha dan Bisnis{" "}
                    </span>
                  </div>
                  <Button
                    onClick={() =>
                      navigate(
                        `/corporate-security-m/${searchParams.mitra}?query=${getP}`
                      )
                    }
                    style={{ backgroundColor: "#E3E8ED", border: 0 }}
                  >
                    {" "}
                    <ArrowForward
                      style={{
                        color: "#777777",
                        fontSize: "18px",
                        fontWeight: 600,
                      }}
                    />{" "}
                  </Button>
                </div>
              ) : (
                <div className="flexbox">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <img
                      src={Trigger}
                      alt="pas"
                      style={{
                        width: "60px",
                        height: "60px",
                        padding: "4px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                      }}
                    />
                    <span style={{ alignSelf: "center", marginLeft: "24px" }}>
                      Pengamanan Usaha dan Bisnis
                    </span>
                  </div>
                  <Button
                    onClick={() =>
                      navigate(
                        `/corporate-security-m/${searchParams.mitra}?query=${getP}`
                      )
                    }
                    style={{ backgroundColor: "#E3E8ED", border: 0 }}
                  >
                    {" "}
                    <ArrowForward
                      style={{
                        color: "#777777",
                        fontSize: "18px",
                        fontWeight: 600,
                      }}
                    />{" "}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListLayananMobile;
