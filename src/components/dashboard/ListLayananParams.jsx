import React, { useEffect, useRef, useState } from "react";
import TopNewNav from "../moleculars/TopNewNav";
import TitleHeader from "../utils/TitleHeader";
import { t } from "i18next";
import PAS from "../../assets/images/PAS.svg";
import { Alert, Button } from "react-bootstrap";
import { ArrowForward } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

function ListLayanan() {
  TitleHeader("Halaman Pengamanan");
  const navigate = useNavigate();
  const searchParams = useParams();
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  const [getDataLayananById, setDataLayananById] = useState([]);

  const getProviderById = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/layanan/${id}`
    );

    setDataLayananById(response.data.data.layanan);
  };

  useEffect(() => {
    getProviderById(id);
  }, []);

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
                        navigate(`/corporate-security/section/${layanan?.id}`)
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

export default ListLayanan;
