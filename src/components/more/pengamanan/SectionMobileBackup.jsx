import React, { useEffect, useRef, useState } from "react"
import TitleHeader from "../../utils/TitleHeader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { decode as base64_decode } from "base-64";
import { showMessage } from "../../utils/Message";
import Geocode from "react-geocode";
import moment from "moment-timezone";
import moment_datetime from "moment";
import Loading from "../../utils/Loading";
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import PAS from "../../../assets/images/PAS.svg";
import Trigger from "../../../assets/images/TRIGGER.svg";
import axios from "axios";
import LabelComponent from "../../atoms/LabelComponent";
import InputComponent from "../../atoms/InputComponent";
import { paymentPwanMobile } from "../../../redux/action/paymentAction";
import { useFormik } from "formik";
import TextError from "../../atoms/TextError";
import InputAreaComponent from "../../atoms/InputAreaComponent";
import Gap from "../../moleculars/Gap";
import ButtonComponent from "../../atoms/ButtonComponent";
import DatePickerComponent from "../../atoms/DatePickerComponent";
import TimePickerComponent from "../../atoms/TimePickerComponent";
import { setLoading } from "../../../redux/action/globalAction";
import { Alert, Modal } from "react-bootstrap";
import Select from "react-select";
import { FaSearchLocation } from "react-icons/fa";
import { getParams } from "../../moleculars/GetParams.jsx";
var CryptoJS = require("crypto-js");
const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

function SectionMobile() {

    TitleHeader("Halaman Pengamanan");
    const searchParams = useParams();
    const newDate = new Date(new Date());
    const [tanggal, setTanggal] = useState(
        searchParams?.mitra === "PAS"
            ? newDate.setDate(newDate.getDate())
            : newDate.setDate(newDate.getDate() + 3)
    );
    const [time, setTime] = useState(moment().format("HH:mm"));
    const [jarak, setJarak] = useState(0);
    const [err1, setErr1] = useState({ iserr: false, message: "" });
    const [personel, setPersonel] = useState(3);
    const [duration, setDuration] = useState(4);

    const locationUrl = useLocation();
    const id = locationUrl.pathname.split("/")[3]
    const idDurasi = locationUrl.pathname.split("/")[4]
    const [getDataSectionById, setDataSectionById] = useState([]);
    const [getDataSubSectionId, setDataSubSectionById] = useState([]);
    const [getProductById, setDataProductById] = useState([]);
    const [getProductBySectionId, setProductBySectionId] = useState([]);
    const [getOthersById, setOthersById] = useState([])
    const [getUnit, setUnit] = useState([])
    const [getComponent, setComponent] = useState([])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function hitungJarak(lat1, long1, lat2, long2) {
        const toRadian = (n) => (n * Math.PI) / 180;

        let R = 6371;
        let x1 = lat2 - lat1;
        let dLat = toRadian(x1);
        let x2 = long2 - long1;
        let dLon = toRadian(x2);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadian(lat1)) *
            Math.cos(toRadian(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
        return Math.round(d);
    }

    const onMarkerDragEnd = (coord) => {
        const { latLng } = coord;

        const lat = latLng.lat();
        const lng = latLng.lng();
        if (!lat || !lng) {
            showMessage("Location not found", "error");
        }

        showMessage("Select a location successfully");
        setCenter({
            lat: lat,
            lng: lng,
        });

        if (searchParams?.mitra === "PAS") {
            setJarak(hitungJarak(-6.228663580230741, 106.7198173824197, lat, lng));
        } else {
            setJarak(hitungJarak(-6.32243985038034, 106.84738076294884, lat, lng));
        }
        Geocode.fromLatLng(lat, lng).then(
            (response) => {
                const address = response.results[0].formatted_address;
                for (
                    let i = 0;
                    i < response.results[0].address_components.length;
                    i++
                ) {
                    for (
                        let j = 0;
                        j < response.results[0].address_components[i].types.length;
                        j++
                    ) {
                        switch (response.results[0].address_components[i].types[j]) {
                            case "locality":
                                break;
                            case "administrative_area_level_1":
                                break;
                            case "country":
                                break;
                        }
                    }
                }
                setLocation(address);
                formik.setFieldValue("location", address);
            },
            (error) => {
                console.log(error ? error : "");
            }
        );
    };

    let initialCategory = [];
    const [getP, setP] = useState(null);

    if (searchParams?.mitra === t("partner1")) {
        initialCategory = [
            {
                id: 8,
                label: "8 Jam",
            },
            {
                id: 12,
                label: "12 Jam",
            },
        ];
    } else if (searchParams?.mitra === t("partner2")) {
        initialCategory = [
            {
                id: 4,
                label: "Half day (4 Jam)",
            },
            {
                id: 8,
                label: "Full day (8 Jam)",
            },
        ];
    }

    const initialValues = {};
    getOthersById.forEach(others => {
        initialValues[`others_${others.id}`] = 0;
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        onSubmit: async (values) => {

            const dtanggal = moment(tanggal).local().format("YYYY-MM-DD");

            let orderTotal = 0;

            const dynamicValues = [];
            getDataSectionById?.section?.forEach((section) => {
                const subsectionsArray = [];

                getDataSubSectionId
                    .filter((subsection) => subsection.section_id === section.id)
                    .forEach((subsection) => {
                        const productsArrayInSubsection = [];

                        getProductById
                            .filter((product) => product.section_id === subsection.id)
                            .forEach((product) => {

                                const value = parseFloat(formik.values[product.column] || 0)
                                const harga_pwa = parseFloat(product.harga || 0)
                                const subtotal = harga_pwa * value

                                orderTotal += subtotal

                                productsArrayInSubsection.push({
                                    column: product.column,
                                    value: formik.values[product.column] || "",
                                    harga_pwa: product.harga,
                                    unit: product.satuans.satuan,
                                    harga_dasar: product.harga_dasar,
                                    include_tnos_fee: product.include_tnos_fee,
                                    include_ppn: product.include_ppn,
                                    tnos_fee: product.tnos_fee,
                                    platform_fee: product.platform_fee
                                });
                            });

                        const othersArrayInSubSection = [];

                        getOthersById
                            .filter((others) => others.url_id === subsection.id)
                            .forEach((others) => {

                                const othersHarga = parseFloat(others.harga || 0)
                                let totalProductValues = 0

                                productsArrayInSubsection.forEach((product) => {
                                    totalProductValues += parseFloat(product.value || 0)
                                })

                                const othersSubtotal = othersHarga * totalProductValues

                                orderTotal += othersSubtotal;

                                if (formik.values[`others_${others.id}`] === 1) {
                                    othersArrayInSubSection.push({
                                        others_column: others.others_column,
                                        value: others.harga,
                                        unit: others.satuans.satuan
                                    })
                                }

                            })

                        subsectionsArray.push({
                            name: subsection.name,
                            products: productsArrayInSubsection,
                            others: othersArrayInSubSection
                        });
                    });

                const productsArrayInSection = [];
                getProductBySectionId
                    .filter((product) => product.section_id === section.id)
                    .forEach((product) => {

                        // const value = parseFloat(formik.values[product.column] || 0);
                        // const harga_pwa = parseFloat(product.harga || 0);
                        // const subtotal = harga_pwa * value;

                        productsArrayInSection.push({
                            column: product.column,
                            value: formik.values[product.column] || "", // Nilai input dari formik
                        });
                    });

                dynamicValues.push({
                    name: section.name,
                    subsections: subsectionsArray,
                    products: productsArrayInSection
                });
            });

            const dynamicOthersComponents = [];
            getComponent.forEach((component) => {

                dynamicOthersComponents.push({
                    id: component.id,
                    komponen: component.komponen,
                    value: formik.values[`${component.id}_others_component`] || "",
                    unit: component.satuans.satuan
                })

            })

            const formData = {
                json: dynamicValues,
                json_others_component: dynamicOthersComponents
            };

            const additionalFields = {
                datetime: `${dtanggal} ${time}`,
                jarak,
                tanggal_mulai: dtanggal,
                durasi_pengamanan: duration,
                jumlah_tenaga_pengamanan: personel,
                idprovider: params?.id,
                jam_mulai: time,
                user_id: user.mmbr_code,
                name: user.mmbr_name,
                email: user.mmbr_email,
                phone: user.mmbr_phone,
                hari: values.hari,
                needs: values.needs,
                location: values.location,
                nama_pic: values.nama_pic,
                nomor_pic: values.nomor_pic,
                id_layanan: locationUrl.pathname.split("/")[3],
                orderTotal: orderTotal * values.hari,
                durasi_pengamanan: getDurasi?.durasi,
                params: getP
            };

            const finalData = { ...formData, ...additionalFields };

            dispatch(
                await paymentPwanMobile(
                    finalData,
                    navigate,
                    "/corporate-security-m/section/checkout/"
                )
            );
        },
    });

    const [center, setCenter] = useState({});
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("");
    const [mapErr, setMapErr] = useState(false);
    var user = JSON.parse(localStorage.getItem("userInfo"));
    const [defaultDuration, setDefaultDuration] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const storeData = useSelector((store) => store?.global);
    const { isLoading } = storeData;
    const [libraries] = useState(["places"]);
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [getLayananData, setLayananData] = useState([]);
    const [getDurasi, setDurasi] = useState([])

    const destinationRef = useRef();
    useEffect(() => {
        getLocation();
        getLayanans()
        getSectionById()
        getComponentData()
        checkParams()
    }, []);

    const getLayanans = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/layanan/${id}/show`
        )

        const responseDurasi = await axios.get(
            `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/durasi/${idDurasi}/show`
        )

        setLayananData(response.data.data)
        setDurasi(responseDurasi.data.data)
    }

    const getComponentData = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/komponen-lainnya`
        )

        setComponent(response.data.data.othersComponent)
    }

    const getLocation = () => {
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

        Geocode.setLanguage("en");

        Geocode.setRegion("id");

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
            setMapErr(false);
        } else {
            setStatus("Geolocation is not supported by your browser");
            setMapErr(true);
        }

        function showPosition(position) {
            setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        }
        function showError(error) {
            setMapErr(true);
            setStatus(error?.message ? error?.message : "Something wrong");
            showMessage(error?.message ? error?.message : "Something wrong", "error");
        }
    };

    const getLatLngFromAdress = () => {
        formik.setFieldValue("location", destinationRef.current.value);

        dispatch(setLoading(true));
        Geocode.fromAddress(destinationRef.current.value).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setCenter({
                    lat: lat,
                    lng: lng,
                });
                setLocation(destinationRef.current.value);
                if (searchParams?.mitra === "PAS") {
                    setJarak(
                        hitungJarak(-6.228663580230741, 106.7198173824197, lat, lng)
                    );
                } else {
                    setJarak(
                        hitungJarak(-6.32243985038034, 106.84738076294884, lat, lng)
                    );
                }
                dispatch(setLoading(false));
                showMessage("Select a location successfully");
            },
            (error) => {
                console.error(error);
                dispatch(setLoading(false));
                showMessage("Location not found", "error");
            }
        );
    };

    const othersComponents = [
        {
            value: 1,
            label: "Iyaa Include"
        },
        {
            value: 2,
            label: "Tidak Include"
        }
    ]

    const technicalMeetingOptions = [
        {
            value: 1,
            label: "Iyaa Include"
        },
        {
            value: 2,
            label: "Tidak Include"
        }
    ]

    moment_datetime.locale(localStorage.getItem("language"));

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
                    // console.log(paramValue);
                    // setUser(paramValue);
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

    const getSectionById = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/section/${idDurasi}`
        );

        const cek = response.data.data;

        setDataSectionById(cek)

        const checkPromises = cek?.section?.map(async (section) => {
            if (section.have_sub_section === "1") {
                const subSectionResponse = await axios.get(
                    `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/subsection/${section.id}`
                );

                const arrSubSection = subSectionResponse.data.data.subsection;

                setDataSubSectionById((prevSubSections) => [
                    ...prevSubSections,
                    ...arrSubSection,
                ]);

                const subSectionPromises = arrSubSection?.map(async (subsection) => {
                    const productResponse = await axios.get(
                        `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/product/${subsection.id}`
                    );
                    return productResponse.data.data.product;
                });

                const layananPromises = arrSubSection?.map(async (layanans) => {
                    const layananResponse = await axios.get(
                        `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/others/${layanans.id}`
                    );
                    return layananResponse.data.data;
                });

                const products = await Promise.all(subSectionPromises);
                setDataProductById((prevProducts) => [
                    ...prevProducts,
                    ...products.flat(),
                ]);

                const othersAll = await Promise.all(layananPromises);
                setOthersById((prevOthers) => [
                    ...prevOthers,
                    ...othersAll.flat(),
                ]);
            } else {
                const productResponse = await axios.get(
                    `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/product/${section.id}`
                );

                setProductBySectionId((prevProducts) => [
                    ...prevProducts,
                    ...productResponse.data.data.product,
                ]);
            }
        });

        await Promise.all(checkPromises);

    }

    if (!isLoaded) {
        <Loading />;
    }
    return (
        <>
            <div className="container-class">
                <div className="responsive-class">
                    <div className="res-class">
                        <div className="payment-container" style={{ marginTop: '0px' }}>
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
                                        <img
                                            src={
                                                searchParams?.mitra === t("partner1") ? Trigger : PAS
                                            }
                                            alt={
                                                searchParams?.mitra === t("partner1")
                                                    ? t("partner1")
                                                    : t("partner2")
                                            }
                                        />
                                        <span style={{ fontWeight: "bold" }}>
                                            {getLayananData?.name} {getDurasi?.durasi} Jam
                                        </span>
                                    </div>

                                    <div className="mb-2 form-group">
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <LabelComponent label={"Keperluan Pengamanan Untuk"} />{" "}
                                            <span style={{ color: "red" }}>*</span>
                                        </div>
                                        <InputComponent
                                            value={formik.values.needs}
                                            onChange={formik.handleChange("needs")}
                                            onBlur={formik.handleBlur("needs")}
                                            placeholder={"Masukkan Keperluan Pengamanan Untuk"}
                                        />
                                        {formik.errors.needs && formik.touched.needs ? (
                                            <TextError error={formik.errors.needs} />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="mb-2 form-group">
                                        <LabelComponent
                                            label={
                                                <div>
                                                    {t("Lokasi Pengamanan")}{" "}
                                                    <span
                                                        style={{
                                                            color: "var(--font-color3)",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        (
                                                        {mapErr ? (
                                                            status
                                                        ) : (
                                                            <>
                                                                <span
                                                                    type="button"
                                                                    className="text-warning"
                                                                    onClick={handleShow}
                                                                >
                                                                    Klik Map 🔍
                                                                </span>
                                                            </>
                                                        )}
                                                        )
                                                    </span>
                                                    <span style={{ color: "red" }}>*</span>
                                                </div>
                                            }
                                        />
                                        <InputAreaComponent
                                            // placeholder={"Input Here or Select Maps"}
                                            value={formik.values.location}
                                            // onChange={formik.handleChange("location")}
                                            readOnly
                                            onBlur={formik.handleBlur("location")}
                                        />
                                        {formik.errors.location && formik.touched.location ? (
                                            <TextError error={formik.errors.location} />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="mb-2 form-group">
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <LabelComponent label={"Nama Penanggung Jawab"} />{" "}
                                            <span style={{ color: "red" }}>*</span>
                                        </div>
                                        <InputComponent
                                            value={formik.values.nama_pic}
                                            onChange={formik.handleChange("nama_pic")}
                                            onBlur={formik.handleBlur("nama_pic")}
                                            placeholder={"Masukkan di sini"}
                                        />
                                        {formik.errors.nama_pic && formik.touched.nama_pic ? (
                                            <TextError error={formik.errors.nama_pic} />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="mb-2 form-group">
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <LabelComponent label={"No HP Penanggung Jawab"} />{" "}
                                            <span style={{ color: "red" }}>*</span>
                                        </div>
                                        <InputComponent
                                            value={formik.values.nomor_pic}
                                            onChange={formik.handleChange("nomor_pic")}
                                            onBlur={formik.handleBlur("nomor_pic")}
                                            placeholder={"Masukkan Nomor HP"}
                                        />
                                        {formik.errors.nomor_pic && formik.touched.nomor_pic ? (
                                            <TextError error={formik.errors.nomor_pic} />
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <div className="mb-2 form-group">
                                                <LabelComponent label={t("guard2")} />
                                                <DatePickerComponent
                                                    tanggal={tanggal}
                                                    setTanggal={setTanggal}
                                                    style={{ padding: "0.6rem" }}
                                                    minDateNumber={searchParams?.mitra === "PAS" ? 7 : 3}
                                                />
                                                {err1?.iserr ? <TextError error={err1?.message} /> : ""}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-2 form-group">
                                                <LabelComponent label={t("guard3")} />
                                                <TimePickerComponent value={time} onChange={setTime} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-2 form-group">
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <LabelComponent label={t("guard8")} />{" "}
                                            <span style={{ color: "red" }}>*</span>
                                        </div>
                                        <InputComponent
                                            value={formik.values.hari}
                                            onChange={formik.handleChange("hari")}
                                            onBlur={formik.handleBlur("hari")}
                                            placeholder={"Masukkan Jumlah Hari"}
                                        />
                                        {formik.errors.hari && formik.touched.hari ? (
                                            <TextError error={formik.errors.hari} />
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    {getDataSectionById?.section?.length > 0 ? (
                                        getDataSectionById?.section?.map((section, index) => (
                                            <>
                                                <div key={index} className="mb-2 form-group">
                                                    <h6 className="fw-bold">
                                                        {`${section?.name}`}
                                                    </h6>
                                                </div>

                                                <hr />

                                                {getDataSubSectionId
                                                    .filter(
                                                        (subsections) =>
                                                            subsections.section_id === section.id
                                                    )
                                                    .map((subsection, subSectionIndex) => (
                                                        <>
                                                            <div key={subSectionIndex} className="mb-2 form-group">
                                                                <span className="fw-bold">
                                                                    {`${subsection?.name}`}
                                                                </span>
                                                            </div>

                                                            {getProductById
                                                                .filter(
                                                                    (productsFilterById) =>
                                                                        productsFilterById.section_id ===
                                                                        subsection.id
                                                                )
                                                                .map((productsById, productsIndex) => (
                                                                    <>
                                                                        <div className="row" key={productsIndex}>
                                                                            <div className="col-md-7">
                                                                                <div
                                                                                    className="mb-2 form-group"
                                                                                >
                                                                                    <div
                                                                                        style={{
                                                                                            display: "flex",
                                                                                            flexDirection: "row",
                                                                                        }}
                                                                                    >
                                                                                        <LabelComponent
                                                                                            label={`${productsById.column}`}
                                                                                        />
                                                                                        <span style={{ color: "red" }}>*</span>
                                                                                    </div>
                                                                                    <InputComponent
                                                                                        value={
                                                                                            formik.values[`${productsById.column}`]
                                                                                        }
                                                                                        onChange={formik.handleChange(
                                                                                            `${productsById.column}`
                                                                                        )}
                                                                                        onBlur={formik.handleBlur(
                                                                                            `${productsById.column}`
                                                                                        )}
                                                                                        placeholder="Masukkan Jumlah Keperluan"
                                                                                    />
                                                                                    {formik.errors[`${productsById.column}`] &&
                                                                                        formik.touched[`${productsById.column}`] ? (
                                                                                        <TextError
                                                                                            error={
                                                                                                formik.errors[`${productsById.column}`]
                                                                                            }
                                                                                        />
                                                                                    ) : (
                                                                                        ""
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-5 d-flex align-items-center">
                                                                                <div
                                                                                    style={{
                                                                                        paddingTop: '5px'
                                                                                    }}
                                                                                >
                                                                                    {productsById.satuans.satuan}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                ))}

                                                            {getOthersById
                                                                .filter(
                                                                    (othersLayananById) =>
                                                                        othersLayananById.url_id === subsection.id
                                                                ).map((othersById, othersIndex) => (
                                                                    <>
                                                                        <div key={othersIndex} className="row">
                                                                            <div className="col-md-7">
                                                                                <div className="mb-3 form-group">
                                                                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                                                                        <LabelComponent label={`${othersById.others_column}`} />{" "}
                                                                                        <span style={{ color: "red" }}>*</span>
                                                                                    </div>
                                                                                    <Select
                                                                                        options={othersComponents}
                                                                                        onChange={(selectedOptionOthersComponent) => formik.setFieldValue(`others_${othersById.id}`, selectedOptionOthersComponent.value)}
                                                                                        value={othersComponents.find(option => option.value === formik.values[`others_${othersById.id}`])}
                                                                                        onBlur={() => formik.setFieldTouched(`others_${othersById}`, true)}
                                                                                        styles={{
                                                                                            control: (baseStyles, state) => ({
                                                                                                ...baseStyles,
                                                                                                padding: "0.18rem",
                                                                                                fontSize: "0.9rem",
                                                                                            }),
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-5 d-flex align-items-center">
                                                                                <div
                                                                                    style={{
                                                                                        paddingTop: '5px'
                                                                                    }}
                                                                                >
                                                                                    {othersById.satuans.satuan}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                ))
                                                            }
                                                        </>
                                                    ))}

                                                {getProductBySectionId
                                                    .filter(
                                                        (productsSection) =>
                                                            productsSection.section_id === section.id
                                                    )
                                                    .map((productSection, productSectionIndex) => (
                                                        <>
                                                            <div
                                                                key={productSectionIndex}
                                                                className="mb-2 form-group"
                                                            >
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        flexDirection: "row",
                                                                    }}
                                                                >
                                                                    <LabelComponent
                                                                        label={`${productSection.column}`}
                                                                    />
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </div>
                                                                <InputComponent
                                                                    value={formik.values[`${productSection.column}`]}
                                                                    onChange={formik.handleChange(
                                                                        `${productSection.column}`
                                                                    )}
                                                                    onBlur={formik.handleBlur(
                                                                        `${productSection.column}`
                                                                    )}
                                                                    placeholder={`Masukkan Keperluan ${productSection.column}`}
                                                                />
                                                                {formik.errors[`${productSection.column}`] &&
                                                                    formik.touched[`${productSection.column}`] ? (
                                                                    <TextError
                                                                        error={formik.errors[`${productSection.column}`]}
                                                                    />
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                        </>
                                                    ))}
                                            </>
                                        ))
                                    ) : (
                                        <Alert variant="danger" className="text-center">
                                            Data Section Tidak Ditemukan
                                        </Alert>
                                    )}

                                    <div className="mb-2 form-group">
                                        <h6 className="fw-bold">
                                            KOMPONEN LAINNYA
                                        </h6>
                                    </div>

                                    {getComponent.map((komponen, komponenIndex) => (
                                        <>
                                            <div key={komponenIndex} className="row">
                                                <div className="col-md-7">
                                                    <div className="mb-3 form-group">
                                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                                            <LabelComponent label={`${komponen.komponen}`} />{" "}
                                                            <span style={{ color: "red" }}>*</span>
                                                        </div>
                                                        <Select
                                                            options={technicalMeetingOptions}
                                                            onChange={(selectedOptionOthersComponent) => formik.setFieldValue(`${komponen.id}_others_component`, selectedOptionOthersComponent.value)}
                                                            value={technicalMeetingOptions.find(option => option.value === formik.values[`${komponen.id}_others_component`])}
                                                            onBlur={() => formik.setFieldTouched(`${komponen}_others_component`, true)}
                                                            styles={{
                                                                control: (baseStyles, state) => ({
                                                                    ...baseStyles,
                                                                    padding: "0.18rem",
                                                                    fontSize: "0.9rem",
                                                                }),
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-5 d-flex align-items-center">
                                                    <div
                                                        style={{
                                                            paddingTop: '5px'
                                                        }}
                                                    >
                                                        {komponen.satuans.satuan}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))}

                                </div>
                                <Gap height={70} />
                                <ButtonComponent
                                    title={t("guard7")}
                                    disabled={err1?.iserr}
                                    onClick={formik.handleSubmit}
                                    type="button"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal tabIndex="-1" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cari lokasi atau pilih lokasi dari map</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="kdjn-dkwd">
                        <div className="input-group ">
                            <Autocomplete className="input-auto-dld">
                                <input
                                    type="text"
                                    className="form-control form-layanan"
                                    aria-label="Masukan lokasi"
                                    aria-describedby="basic-addon2"
                                    ref={destinationRef}
                                    style={{ borderRadius: "0px" }}
                                />
                            </Autocomplete>
                            {isLoading ? (
                                <span
                                    type="button"
                                    className="input-group-text "
                                    id="basic-addon2"
                                    disabled
                                >
                                    Loading...
                                </span>
                            ) : (
                                <span
                                    type="button"
                                    className="text-white input-group-text bg-primary"
                                    id="basic-addon2"
                                    onClick={() => getLatLngFromAdress()}
                                >
                                    <FaSearchLocation />
                                </span>
                            )}
                        </div>
                    </div>
                    <div>
                        <GoogleMap
                            center={center}
                            zoom={11}
                            mapContainerStyle={{
                                width: "100%",
                                height: "400px",
                                zIndex: "1000000",
                            }}
                            options={{
                                zoomControl: false,
                                streetViewControl: false,
                                mapTypeControl: false,
                                fullscreenControl: false,
                            }}
                        >
                            <Marker
                                position={center}
                                draggable={true}
                                onDragEnd={(value) => onMarkerDragEnd(value)}
                            />
                        </GoogleMap>
                    </div>
                    <hr />
                    <div>
                        <span className="text-danger">Contoh penulisan lokasi</span>:{" "}
                        <b>
                            {location ? location : "Lokasi belum dipilih"}, (dekat gedung A),
                            (rumah warna merah) dan lain lain.
                        </b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-layanan " onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default SectionMobile