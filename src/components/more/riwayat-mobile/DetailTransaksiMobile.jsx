import React, { useEffect, useState } from "react"
import TitleHeader from "../../utils/TitleHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { badanHukumList, paymentBadanHukum } from "../../../redux/action/paymentAction";
import { useFormik } from "formik";
import ButtonComponent from "../../atoms/ButtonComponent";
import CheckoutValue from "../../moleculars/CheckoutValue";
import TopNewNav from "../../moleculars/TopNewNav";
import PaddingPwa from "../../moleculars/PaddingPwa";
import HeaderCheckoutLayanan from "../../moleculars/HeaderCheckoutLayanan";
import ContentDetailCheckoutP1History from "../../moleculars/ContentDetailCheckoutP1History";
import ContentDetailCheckout from "../../moleculars/ContentDetailCheckout";
import Gap from "../../moleculars/Gap";
import ModalComponent from "../../moleculars/ModalComponent";
import Iframe from "react-iframe";
import { getNameLayanan } from "../../utils/layananService";
import PAS from "../../../assets/images/PAS.svg"
import axios from "axios";
import ContentTitleValue from "../../moleculars/ContentTitleValue";
import { decode as base64_decode } from "base-64";
import { getParams } from "../../moleculars/GetParams";
var CryptoJS = require("crypto-js");
const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

function DetailTransaksiMobile() {

    TitleHeader("Halaman rincian riwayat");
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("data")));
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Loading state untuk data
    const params = useParams();
    const idParams = params["*"];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const storeData = useSelector((store) => store?.global);
    const { detail_data_layanan } = storeData;

    useEffect(() => {
        getData()
    }, []);

    const getData = () => {
        setIsLoading(true);
        dispatch(badanHukumList(idParams)).then(() => setIsLoading(false));
    };


    useEffect(() => {
        checkParams()
    }, [])

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

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            order_id: idParams,
        },
        onSubmit: async (values) => {
            dispatch(await paymentBadanHukum(values));
        },
    });

    const renderStatusOrder = (payment_status) => {
        switch (payment_status) {
            case "001":
                return (
                    <ContentTitleValue
                        type="waiting"
                        title="Status Order:"
                        value="Menunggu"
                    />
                );
            case "002":
                return (
                    <ContentTitleValue
                        type="waiting"
                        title="Status Order:"
                        value="Order Diproses"
                    />
                );
            case "003":
                return (
                    <ContentTitleValue
                        type="success"
                        title="Status Order:"
                        value="Mendapatkan Mitra"
                    />
                );
            case "004":
                return (
                    <ContentTitleValue
                        type="success"
                        title="Status Order:"
                        value="Menuju Lokasi"
                    />
                );
            case "005":
                return (
                    <ContentTitleValue
                        type="success"
                        title="Status Order:"
                        value="Hadir dan Sedang Bertugas"
                    />
                );
            case "006":
                return (
                    <ContentTitleValue
                        type="waiting"
                        title="Status Order:"
                        value="Cek Dokumen"
                    />
                );
            case "007":
                return (
                    <ContentTitleValue
                        type="waiting"
                        title="Status Order:"
                        value="Registrasi Dokumen"
                    />
                );
            case "008":
                return (
                    <ContentTitleValue
                        type="success"
                        title="Status Order:"
                        value="Registrasi Selesai"
                    />
                );
            case "009":
                return (
                    <ContentTitleValue
                        type="success"
                        title="Status Order:"
                        value="Penyerahan Dokumen"
                    />
                );
            case "010":
                return (
                    <ContentTitleValue
                        type="success"
                        title="Status Order:"
                        value="Selesai"
                    />
                );
            default:
                return (
                    <ContentTitleValue
                        type="waiting"
                        title="Status Order:"
                        value="Membuat Pesanan"
                    />
                );
        }
    };

    const renderButton = () => {
        if (detail_data_layanan?.detail?.payment_status === "ORDER") {
            return (
                <ButtonComponent
                    typeButton="rincian"
                    others={
                        <CheckoutValue
                            title="Total Pembayaran"
                            value={detail_data_layanan?.detail?.order_total}
                            color="var(--font-color10)"
                            number={true}
                        />
                    }
                    title="Bayar Sekarang "
                    type="submit"
                />
            );
        } else if (detail_data_layanan?.detail?.payment_status === "UNPAID") {
            return (
                <ButtonComponent
                    typeButton="rincian"
                    others={
                        <CheckoutValue
                            title="Total Pembayaran"
                            value={detail_data_layanan?.detail?.order_total}
                            color="var(--font-color10)"
                            number={true}
                        />
                    }
                    border="#fef5e8"
                    background="#fef5e8"
                    color="#f99f1b"
                    title="Klik untuk membayar"
                    type="button"
                    onClick={() =>
                        (window.location = `${process.env.REACT_APP_API_INVOICE_URL}${detail_data_layanan?.detail?.invoice_id}`)
                    }
                />
            );
        } else if (detail_data_layanan?.detail?.payment_status === "EXPIRED") {
            return (
                <ButtonComponent
                    typeButton="rincian"
                    others={
                        <CheckoutValue
                            title="Total Pembayaran"
                            value={detail_data_layanan?.detail?.order_total}
                            color="var(--font-color10)"
                            number={true}
                        />
                    }
                    background="var(--font-color11)"
                    color="var(--bg-color7)"
                    border="var(--font-color11)"
                    title="Gagal"
                    type="button"
                //   onClick={() => navigate(`/account/profile/change/${id}`)}
                />
            );
        } else {
            return (
                <ButtonComponent
                    typeButton="rincian"
                    others={
                        <CheckoutValue
                            title="Total Pembayaran"
                            value={detail_data_layanan?.detail?.order_total}
                            color="var(--font-color10)"
                            number={true}
                        />
                    }
                    border="var(--font-color12)"
                    background="var(--font-color12)"
                    color="var(--bg-color2)"
                    title="Sudah Dibayar"
                    type="button"
                //   onClick={() => navigate(`/account/profile/change/${id}`)}
                />
            );
        }
    };

    const renderButtonP1 = () => {
        if (detail_data_layanan?.detail?.detail?.payment_status === "ORDER") {
            return (
                <ButtonComponent
                    typeButton="rincian"
                    others={
                        <CheckoutValue
                            title="Total Pembayaran"
                            value={detail_data_layanan?.detail?.detail?.order_total}
                            color="var(--font-color10)"
                            number={true}
                        />
                    }
                    title="Bayar Sekarang "
                    type="submit"
                />
            );
        } else if (detail_data_layanan?.detail?.detail?.payment_status === "UNPAID") {
            return (
                <ButtonComponent
                    typeButton="rincian"
                    others={
                        <CheckoutValue
                            title="Total Pembayaran"
                            value={detail_data_layanan?.detail?.detail?.order_total}
                            color="var(--font-color10)"
                            number={true}
                        />
                    }
                    border="#fef5e8"
                    background="#fef5e8"
                    color="#f99f1b"
                    title="Klik untuk membayar"
                    type="button"
                    onClick={() =>
                        (window.location = `${process.env.REACT_APP_API_INVOICE_URL}${detail_data_layanan?.detail?.detail?.invoice_id}`)
                    }
                />
            );
        } else if (detail_data_layanan?.detail?.detail?.payment_status === "EXPIRED") {
            return (
                <ButtonComponent
                    typeButton="rincian"
                    others={
                        <CheckoutValue
                            title="Total Pembayaran"
                            value={detail_data_layanan?.detail?.detail?.order_total}
                            color="var(--font-color10)"
                            number={true}
                        />
                    }
                    background="var(--font-color11)"
                    color="var(--bg-color7)"
                    border="var(--font-color11)"
                    title="Gagal"
                    type="button"
                //   onClick={() => navigate(`/account/profile/change/${id}`)}
                />
            );
        } else {
            return (
                <ButtonComponent
                    typeButton="rincian"
                    others={
                        <CheckoutValue
                            title="Total Pembayaran"
                            value={detail_data_layanan?.detail?.detail?.order_total}
                            color="var(--font-color10)"
                            number={true}
                        />
                    }
                    border="var(--font-color12)"
                    background="var(--font-color12)"
                    color="var(--bg-color2)"
                    title="Sudah Dibayar"
                    type="button"
                //   onClick={() => navigate(`/account/profile/change/${id}`)}
                />
            );
        }
    };

    return (
        <>
            <div className="container-class">
                <div className="responsive-class">
                    <div className="res-class">
                        <div
                            className="dashboard-container-f"
                            style={{ marginTop: "0px" }}
                        >
                            {isLoading ? (
                                <p>
                                    Loading Data...
                                </p>
                            ) : (
                                <>
                                    {detail_data_layanan?.type === "others" ? (
                                        <>
                                            <PaddingPwa padding={15}>
                                                <HeaderCheckoutLayanan
                                                    layanan={getNameLayanan(
                                                        detail_data_layanan?.detail?.tnos_service_id,
                                                        detail_data_layanan?.detail?.tnos_subservice_id
                                                    )}
                                                    payment_status={detail_data_layanan?.detail?.status_order}
                                                />

                                                <ContentDetailCheckout
                                                    layanan={getNameLayanan(
                                                        detail_data_layanan?.detail?.tnos_service_id,
                                                        detail_data_layanan?.detail?.tnos_subservice_id
                                                    )}
                                                    data={detail_data_layanan?.detail}
                                                />
                                            </PaddingPwa>
                                        </>
                                    ) : (
                                        <>
                                            <PaddingPwa padding={15}>
                                                <div className="detail-riwayat-container">
                                                    <img
                                                        src={
                                                            detail_data_layanan?.type === "p1"
                                                                ? detail_data_layanan?.detail?.provider?.image || ""
                                                                : ""
                                                        }
                                                        style={detail_data_layanan?.type === "p1" ? { width: "55px" } : {}}
                                                        alt="not internet connection"
                                                    />

                                                    <div className="content-detail">
                                                        <div className="title-f">
                                                            {detail_data_layanan?.detail?.provider?.name_sc}
                                                        </div>
                                                        <div className="info-s">
                                                            <div className="title">{detail_data_layanan?.detail?.layanan?.name} {detail_data_layanan?.detail?.detail?.durasi_pengamanan} Jam</div>
                                                        </div>
                                                        {renderStatusOrder(detail_data_layanan?.detail?.detail?.status_order)}
                                                    </div>
                                                </div>

                                                <ContentDetailCheckoutP1History
                                                    layanan={getNameLayanan(
                                                        detail_data_layanan?.detail?.detail?.tnos_service_id,
                                                        detail_data_layanan?.detail?.detail?.tnos_subservice_id
                                                    )}
                                                    data={detail_data_layanan.detail}
                                                />
                                            </PaddingPwa>
                                        </>
                                    )}
                                </>
                            )}
                            <Gap height={120} />
                            <form action="" onSubmit={formik.handleSubmit}>
                                {detail_data_layanan?.type === "others" ? (
                                    renderButton()
                                ) : (
                                    renderButtonP1()
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ModalComponent
                isModalVisible={isModalVisible}
                setModalVisible={setIsModalVisible}
                // onClick={}
                type="pembatalan"
            >
                <PaddingPwa padding={5}>
                    <Iframe
                        url="https://tnosbantuan.freshdesk.com/support/solutions/articles/150000042230"
                        width="100%"
                        height="100%"
                        styles={{ minHeight: "100vh" }}
                        id=""
                        className=""
                        display="block"
                        position="relative"
                    />
                </PaddingPwa>
            </ModalComponent>
        </>
    )
}

export default DetailTransaksiMobile