import React, { useEffect, useRef, useState } from "react";
import TopNewNav from "../moleculars/TopNewNav";
import TitleHeader from "../utils/TitleHeader";
import { t } from "i18next";
import PAS from "../../assets/images/PAS.svg";
import { Alert, Button } from "react-bootstrap";
import { ArrowForward } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { decode as base64_decode } from "base-64";
import axios from "axios";
import { getParams } from "../moleculars/GetParams";
var CryptoJS = require("crypto-js");
const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

function ListLayananParamsMobile() {
  TitleHeader("Halaman Pengamanan");
  const navigate = useNavigate();
  const searchParams = useParams();
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  const [getP, setP] = useState(null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const [getDataLayananById, setDataLayananById] = useState([]);

  const getProviderById = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/layanan/${id}`
    );

    setDataLayananById(response.data.data.layanan);
  };

  useEffect(() => {
    getProviderById(id);
    checkParams()
  }, []);

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

  return (
    <>
      <TopNewNav title="List Layanan" path={`/security-providers`} />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="flexcol">
              {getDataLayananById.length > 0 ? (
                getDataLayananById.map((layanan, id) => (
                  <div key={id} className="flexbox">
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
                        {layanan?.name}
                      </span>
                    </div>
                    <Button
                      onClick={() =>
                        navigate(`/corporate-security-m/section/${searchParams.mitra}?query=${getP}`)
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
                ))
              ) : (
                <Alert variant="danger" className="text-center">Layanan Tidak Tersedia</Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListLayananParamsMobile;
