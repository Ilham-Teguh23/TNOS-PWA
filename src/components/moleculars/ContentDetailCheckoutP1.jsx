import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getParams } from "./GetParams";
import { decode as base64_decode } from "base-64";
import { useEffect } from "react";
import { t } from "i18next";
import CheckoutHeader from "./CheckoutHeader";
import CheckoutValue from "./CheckoutValue";
import { converterDate } from "../utils/convertDate";
import Gap from "./Gap";
import time from "../../assets/images/new pwa icon/time.svg";
import usaha from "../../assets/images/new pwa icon/usaha.svg";
import location from "../../assets/images/new pwa icon/location.svg";
import moment from "moment";
var CryptoJS = require("crypto-js");
const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

function ContentDetailCheckoutP1({ layanan, data }) {

    const [getP, setP] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("data")));

    const navigate = useNavigate();

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
                    console.log(paramValue.id);
                    setUser(paramValue);
                    setP(checkP.query);
                    localStorage.setItem("data", JSON.stringify(paramValue));
                }
                if (!localStorage.getItem("data")) {
                    if (!paramValue) {
                        console.log("salah");
                        navigate("/not-found");
                    }
                }
            }
        }
    };

    useEffect(() => {
        if (getP != null) {
            checkParams();
        }
    }, []);

    let alamat = "";
    const address = data?.alamat_badan_hukum;
    const isJson = (() => {
        try {
            JSON.parse(address);
            return true;
        } catch (error) {
            return false;
        }
    })();

    alamat = isJson ? JSON.parse(address) : address;

    const [getJsonData, setJsonData] = useState([])
    const [getJsonComponent, setJsonComponent] = useState([])
    const [totalAkhirPayment, setTotalAkhirPayment] = useState(0)

    useEffect(() => {

        if (layanan === "P1 Force") {
            const fetchPWAN = () => {

                console.log("CONSOLE");
                console.log(data?.history);
                

                const convert = JSON.parse(data?.history?.json_data)
                setJsonData(convert)

                const convertOthers = JSON.parse(data?.history?.json_others_component)
                
                setJsonComponent(convertOthers)

                const updatedComponents = convertOthers.map(item => ({
                    ...item,
                    harga_akhir: item.harga_akhir,
                }));

                const totalHargaAkhir = updatedComponents.reduce((total, item) => {
                    return total + (item.harga_akhir || 0);
                }, 0);

                setTotalAkhirPayment(totalHargaAkhir)
            }
            fetchPWAN()
        }
    }, [layanan, data]);

    let totalHargaPWA = 0
    let unitOthers = 0

    if (getJsonData && getJsonData.length > 0) {
        getJsonData.forEach((item) => {
            if (item.subsections && item.subsections.length > 0) {
                item.subsections.forEach((subsection) => {

                    if (subsection.products && subsection.products.length > 0) {
                        subsection.products.forEach((product) => {

                            if (Number(product.value) === 1) {

                                totalHargaPWA += product.harga_pwa * product.value;
                                unitOthers += Number(product.value)

                                if (subsection.others && subsection.others.length > 0) {
                                    
                                    subsection.others.forEach((other) => {
                                        totalHargaPWA += other.value
                                    })
                                }

                            }

                        });
                    }
                });
            }
        });
    }

    const stylesValue = {
        titleValue: {
            fontSize: '12px',
            lineHeight: '24px',
            fontWeight: '400',
            color: 'var(--font-color4)'
        }
    }

    const renderContent = () => {
        switch (layanan) {
            case "P1 Force":
                return (
                    <>
                        <div>
                            <CheckoutHeader
                                image={usaha}
                                title="Informasi Pemesanan"
                                alt="Informasi Usaha"
                            />
                            <CheckoutValue
                                title="Keperluan Pengamanan Untuk"
                                value={data?.detail?.needs}
                            />
                            <CheckoutValue
                                title="Nama Penanggung Jawab"
                                value={data?.detail?.nama_pic}
                            />
                            <CheckoutValue
                                title="No. HP Penanggung Jawab"
                                value={data?.detail?.nomor_pic}
                            />{" "}
                            <hr />
                            <CheckoutHeader
                                image={location}
                                title="Lokasi Pengamanan"
                                alt="Lokasi Pengamanan"
                            />
                            <p style={{ fontSize: "12px" }}>{data?.detail?.location}</p>{" "}
                            <hr />
                            <CheckoutHeader image={time} title="Waktu" alt="Waktu" />
                            <CheckoutValue
                                title="Tanggal Mulai"
                                value={data?.detail?.tanggal_mulai}
                            />
                            <CheckoutValue title="Jam Mulai" value={data?.detail?.jam_mulai} />
                            <CheckoutValue title="Durasi" value={`${data?.detail?.durasi_pengamanan} Jam`} />
                            {/* <CheckoutValue
                                title="Jarak"
                                value={`${data?.detail?.jarak} KM`}
                            /> */}
                        </div>
                        <Gap height={15} />
                        <div>
                            {data?.detail?.payment_status !== "EXPIRED"
                                ? data?.detail?.paid_at && (
                                    <CheckoutValue
                                        title="Jam Terbayar"
                                        color="green"
                                        value={converterDate(moment(data?.detail?.paid_at))}
                                    />
                                )
                                : data?.expiry_date && (
                                    <CheckoutValue
                                        title="Jam Kadaluarsa"
                                        color="red"
                                        value={converterDate(moment(data?.detail?.expiry_date))}
                                    />
                                )}
                            {data?.detail?.tnos_subservice_id === "1" &&
                                data?.detail?.tnos_service_id === "4" ? (
                                <div></div>
                            ) : (
                                <></>
                            )}
                            {getJsonData && getJsonData.length > 0 ? (
                                getJsonData.map((item, index) => {
                                    return (
                                        <div style={{ fontWeight: 'bold' }} key={index}>
                                            <CheckoutHeader
                                                image={""}
                                                alt={item.name}
                                            />
                                            {item.subsections && item.subsections.length > 0 && (
                                                item.subsections.map((subsection, subIndex) => {
                                                    const totalValue = subsection.products ? subsection.products.reduce((acc, product) => acc + Number(product.value), 0) : 0;

                                                    return (
                                                        <div style={{ paddingTop: '7px' }} key={subIndex}>
                                                            <CheckoutHeader
                                                                alt={subsection.name}
                                                            />
                                                            {subsection.products && subsection.products.length > 0 && (
                                                                <>
                                                                    {subsection.products.map((products, productsIndex) => (
                                                                        <div key={productsIndex}>
                                                                            <div className="row">
                                                                                <div className="col-md-5">
                                                                                    <div style={stylesValue.titleValue}>
                                                                                        {products.column}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-3">
                                                                                    <div style={{ ...stylesValue.titleValue, fontWeight: 'bold' }}>
                                                                                        {` ( ${products.value} ${products.unit} ) `}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <div style={{ ...stylesValue.titleValue, textAlign: 'right', fontWeight: 'bold' }}>
                                                                                        {`Rp. ${(products.harga_pwa * products.value).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                    {subsection.others && subsection.others.length > 0 && (
                                                                        subsection.others.map((others, othersIndex) => (
                                                                            <div key={othersIndex}>
                                                                                <div className="row">
                                                                                    <div className="col-md-5">
                                                                                        <div style={stylesValue.titleValue}>
                                                                                            {others.others_column}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-3">
                                                                                        <div style={{ ...stylesValue.titleValue, fontWeight: 'bold' }}>
                                                                                            {` ( ${totalValue} ${others.unit} ) `}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <div style={{ ...stylesValue.titleValue, fontWeight: 'bold', textAlign: 'right' }}>
                                                                                            {`Rp. ${(others.value * totalValue).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                "Tidak Ditemukan"
                            )}

                            <hr />

                            <div className="row">
                                <div className="col-md-5">
                                    <div style={stylesValue.titleValue}>
                                        {data?.layanan} {data?.detail?.durasi_pengamanan} Jam
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div style={{ ...stylesValue.titleValue, fontWeight: 'bold' }}>
                                        {` ( ${data?.history?.hari} Hari ) `}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div style={{ ...stylesValue.titleValue, fontWeight: 'bold', textAlign: 'right' }}>
                                        {`Rp. ${(totalHargaPWA * data?.history?.hari).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} `}
                                    </div>
                                </div>
                            </div>

                            {getJsonComponent && getJsonComponent.length > 0 && (
                                <>
                                    {getJsonComponent.map((komponen, komponenIndex) => (
                                        <div key={komponenIndex} className="row">
                                            <div className="col-md-8">
                                                <div style={stylesValue.titleValue}>
                                                    {komponen.nama_komponen}
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div style={{ ...stylesValue.titleValue, fontWeight: 'bold', textAlign: 'right' }}>

                                                    {`Rp. ${(komponen.harga_akhir).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} `}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}

                            {/* <div className="row">
                                <div className="col-md-8">
                                    <div style={stylesValue.titleValue}>
                                        Technical Meeting
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div style={{ ...stylesValue.titleValue, fontWeight: 'bold', textAlign: 'right' }}>
                                        {`Rp. ${(totalAkhirPayment).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} `}
                                    </div>
                                </div>
                            </div> */}

                            <hr/>

                            <div className="row">
                                <div className="col-md-8">
                                    <div style={stylesValue.titleValue}>
                                        Total Pembayaran
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div style={{ ...stylesValue.titleValue, fontWeight: 'bold', textAlign: 'right' }}>
                                        {`Rp. ${(data?.detail?.order_total).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} `}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>
                );
            default:
                return;
        }
    }

    return renderContent();
}

export default ContentDetailCheckoutP1