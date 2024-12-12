import React, { useEffect, useState } from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import { t } from "i18next";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import TitleHeader from "../../utils/TitleHeader";
import PaddingPwa from "../../moleculars/PaddingPwa";
import HeaderCheckoutLayanan from "../../moleculars/HeaderCheckoutLayanan";
import { getNameLayanan } from "../../utils/layananService";
import Gap from "../../moleculars/Gap";
import { useFormik } from "formik";
import ButtonComponent from "../../atoms/ButtonComponent";
import { paymentPWANRingkasan } from "../../../redux/action/paymentAction";
import ContentDetailCheckoutP1 from "../../moleculars/ContentDetailCheckoutP1";
import PAS from "../../../assets/images/PAS.svg"
import ContentTitleValue from "../../moleculars/ContentTitleValue";

function RingkasanSectionMobile() {
    TitleHeader("Halaman rincian")
    const location = useLocation()
    const dispatch = useDispatch()
    const pathParts = location.pathname.split("/")
    const id = pathParts[pathParts.length - 1]
    const [getDetail, setDetail] = useState([])
    const [totalAkhirPayment, setTotalAkhirPayment] = useState(0)

    const getData = async () => {
        await axios.get(
            `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/history/${id}`
        ).then((response) => {

            setDetail(response?.data?.data)

            const updatedComponents = response?.data?.data?.resultsTM?.map(item => ({
                ...item,
                harga_akhir: item.harga_akhir,
            }));

            const totalHargaAkhir = updatedComponents.reduce((total, item) => {
                return total + (item.harga_akhir || 0);
            }, 0);

            setTotalAkhirPayment(totalHargaAkhir)

        }).catch((error) => {
            console.log(error);
        })
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            order_id: id,
            harga_akhir: getDetail?.detail?.order_total + totalAkhirPayment
        },
        onSubmit: async (values) => {
            dispatch(await paymentPWANRingkasan(values));
        },
    });

    useEffect(() => {
        getData()
    }, [id])

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
        if (getDetail?.detail?.payment_status === "ORDER") {
            return <ButtonComponent title="Bayar Sekarang " type="submit" />;
        } else if (getDetail?.detail?.payment_status === "UNPAID") {
            return (
                <ButtonComponent
                    border="#fef5e8"
                    background="#fef5e8"
                    color="#f99f1b"
                    title="Klik untuk membayar"
                    type="button"
                    onClick={() =>
                        (window.location = `${process.env.REACT_APP_API_INVOICE_URL}${getDetail?.detail?.invoice_id}`)
                    }
                />
            );
        } else if (getDetail?.detail?.payment_status === "EXPIRED") {
            return (
                <ButtonComponent
                    background="var(--font-color11)"
                    color="var(--bg-color7)"
                    border="var(--font-color11)"
                    title="Sudah Dibayar"
                    type="button"
                //   onClick={() => navigate(`/account/profile/change/${id}`)}
                />
            );
        } else {
            return (
                <ButtonComponent
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
            {/* <TopNewNav
                title={t("Ringkasan Pengamanan Usaha dan Bisnis")}
                path={`/services-list/`}
            /> */}
            <div className="container-class">
                <div className="responsive-class">
                    <div className="res-class">
                        <div
                            className="dashboard-container-f"
                            style={{ marginTop: "0px" }}
                        >
                            <PaddingPwa padding={15}>
                                {getDetail?.detail?.tnos_service_id === "6" && getDetail?.detail?.tnos_subservice_id === "1" ? (
                                    <>
                                        <div className="detail-riwayat-container">
                                            <img
                                                src={getDetail?.image}
                                                alt={getDetail?.provider}
                                                style={{width: '60px'}}
                                            />
                                            <div className="content-detail">
                                                <div className="title-f">
                                                    {getDetail?.provider}
                                                </div>
                                                <div className="info-s">
                                                    <div className="title">{getDetail?.layanan}</div>
                                                </div>
                                                {renderStatusOrder(getDetail?.detail?.payment_status)}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <HeaderCheckoutLayanan
                                            layanan={getNameLayanan(
                                                getDetail?.detail?.tnos_service_id,
                                                getDetail?.detail?.tnos_subservice_id
                                            )}
                                            payment_status={getDetail?.detail?.payment_status}
                                        />
                                    </>
                                )}

                                <ContentDetailCheckoutP1
                                    layanan={getNameLayanan(
                                        getDetail?.detail?.tnos_service_id,
                                        getDetail?.detail?.tnos_subservice_id
                                    )}
                                    data={getDetail}
                                />
                            </PaddingPwa>
                            <Gap height={80} />
                            <form action="" onSubmit={formik.handleSubmit}>
                                {renderButton()}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RingkasanSectionMobile