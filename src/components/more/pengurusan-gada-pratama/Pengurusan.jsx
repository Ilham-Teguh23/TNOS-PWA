import React, { useState } from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import "../../../assets/css/allLayanan.css";
import Gap from "../../moleculars/Gap";
import LabelComponent from "../../atoms/LabelComponent";
import ButtonComponent from "../../atoms/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { solusiHukumSchema } from "../../utils/formSchema";
import { useDispatch } from "react-redux";
import { badanHukumCreate } from "../../../redux/action/paymentAction";
import TitleHeader from "../../utils/TitleHeader";
import TextError from "../../atoms/TextError";
import InputCheckboxComponent from "../../atoms/InputCheckboxComponent";
import { t } from "i18next";
import PratamaGada from "../../../assets/images/PratamaGadaIcon.png"
import { Button } from "react-bootstrap";
import { ArrowForward } from "@mui/icons-material";

function PengurusanGadaPratama() {
    TitleHeader(t("layanan8"));
    var user = JSON.parse(localStorage.getItem("userInfo"));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            tnos_service_id: "3",
            tnos_subservice_id: "7",
            needs: "",
            user_id: user.mmbr_code,
            name: user.mmbr_name,
            email: user.mmbr_email,
            phone: user.mmbr_phone,
            ketentuan_cek: false
        },
        onSubmit: async (values) => {
            //   console.log(values);
            dispatch(
                await badanHukumCreate(
                    values,
                    navigate,
                    "/comprehensive-Legal-solutions/checkout/"
                )
            );
        },
        validationSchema: solusiHukumSchema,
    });

    return (
        <>
            <TopNewNav title={t("layanan8")} path={`/dashboard`} />
            <div className="container-class">
                <div className="responsive-class">
                    <div className="res-class">
                        <div className="flexcol">
                            <div className="flexbox">
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <img
                                        src={PratamaGada}
                                        alt={"Pembuatan Baru"}
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            padding: "4px",
                                            backgroundColor: "white",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <span style={{ alignSelf: "center", marginLeft: "24px" }}>
                                        Pembuatan Baru
                                    </span>
                                </div>
                                <Button
                                    onClick={() => navigate("/pengurusan-gada-pratama/pembuatan-baru")}
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
                            <div className="flexbox">
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <img
                                        src={PratamaGada}
                                        alt={"Perpanjangan"}
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            padding: "4px",
                                            backgroundColor: "white",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <span style={{ alignSelf: "center", marginLeft: "24px" }}>
                                        Perpanjangan
                                    </span>
                                </div>
                                <Button
                                    onClick={() => navigate("/pengurusan-gada-pratama/perpanjangan")}
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PengurusanGadaPratama;
