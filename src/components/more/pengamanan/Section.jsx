import React, { useEffect, useRef, useState } from "react";
import TopNewNav from "../../moleculars/TopNewNav";
import LabelComponent from "../../atoms/LabelComponent";
import InputAreaComponent from "../../atoms/InputAreaComponent";
import DatePickerComponent from "../../atoms/DatePickerComponent";
import TimePickerComponent from "../../atoms/TimePickerComponent";
import Gap from "../../moleculars/Gap";
import ButtonComponent from "../../atoms/ButtonComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ButtonClick from "../../moleculars/ButtonClick";
import { showMessage } from "../../utils/Message";
import Geocode from "react-geocode";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { Alert, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/action/globalAction";
import { FaSearchLocation } from "react-icons/fa";
import Loading from "../../utils/Loading";
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment-timezone";
import moment_datetime from "moment";
import "moment/min/locales.min";
import TextError from "../../atoms/TextError";
import { paymentPwan } from "../../../redux/action/paymentAction";
import TitleHeader from "../../utils/TitleHeader";
import InputCheckboxComponent from "../../atoms/InputCheckboxComponent";
import { t } from "i18next";
import PAS from "../../../assets/images/PAS.svg";
import Trigger from "../../../assets/images/TRIGGER.svg";
import InputComponent from "../../atoms/InputComponent.jsx";
import Select from "react-select";
import axios from "axios";
import InputSelectComponent from "../../atoms/InputSelectComponent.jsx";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formSchema = Yup.object({
  keperluan_pengamanan: Yup.string().required(
    "Keperluan Pengamanan Usaha wajib di isi"
  ),
  location: Yup.string().required("Lokasi wajib di isi"),
  ketentuan_cek: Yup.boolean().oneOf([true], "Ketentuan wajib di isi"),
  nama_pic: Yup.string().required("Nama PIC wajib di isi"),
  nomor_pic: Yup.string()
    .matches(phoneRegExp, "Nomor PIC tidak valid")
    .required("Nomor PIC wajib di isi"),
});
function Section() {
  TitleHeader("Halaman Pengamanan");
  const searchParams = useParams();
  const newDate = new Date(new Date());
  const [tanggal, setTanggal] = useState(
    // searchParams?.mitra === "PAS" ? newDate.setDate(newDate.getDate() + 7) : newDate.setDate(newDate.getDate() + 3)
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
  const pathParts = locationUrl.pathname.split("/");
  const id = pathParts[pathParts.length - 1];
  const [getDataSectionById, setDataSectionById] = useState([]);
  const [getDataSubSectionId, setDataSubSectionById] = useState([]);
  const [getProductById, setDataProductById] = useState([]);
  const [getProductBySectionId, setProductBySectionId] = useState([]);
  const [getOthersById, setOthersById] = useState([])
  const [getUnit, setUnit] = useState([])
  const [getComponent, setComponent] = useState([])

  let initialCategory = [];

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

  const [allCategory, setAllCategory] = useState(initialCategory);

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

  const destinationRef = useRef();
  useEffect(() => {
    getLocation();
  }, []);

  if (!isLoaded) {
    <Loading />;
  }

  moment_datetime.locale(localStorage.getItem("language"));

  const getSectionById = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/section/${id}`
    );

    const cek = response.data.data;
    setDataSectionById(cek);

    const checkPromises = cek?.section?.map(async (section) => {
      if (section.have_sub_section === "1") {
        const subSectionResponse = await axios.get(
          `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/subsection/${section.id}`
        );

        const arrSubSection = subSectionResponse.data.data.subsection;
        setDataSubSectionById(arrSubSection);

        const subSectionPromises = arrSubSection?.map(async (subsection) => {
          const productResponse = await axios.get(
            `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/product/${subsection.id}`
          );
          return productResponse.data.data.product;
        });

        // const subSectionLayanan = arrSubSection?.map(async (layanan) => {
        //   const productLayananResponse = await axios.get(
        //     `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/others/${sub}`
        //   )
        // })

        const layananPromises = arrSubSection?.map(async (layanans) => {
          const layananResponse = await axios.get(
            `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/others/${layanans.id}`
          );
          return layananResponse.data.data;
        })

        const products = await Promise.all(subSectionPromises);
        setDataProductById((prevProducts) => [
          ...prevProducts,
          ...products.flat(),
        ]);

        const othersAll = await Promise.all(layananPromises);
        setOthersById((prevothers) => [
          ...prevothers,
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
  };

  const getUnitData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/unit`
    )

    const formattedShow = response.data.data.unit.map((unit) => ({
      label: unit.satuan,
      value: unit.satuan
    }))

    setUnit(formattedShow)
  }

  const getComponentData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_PWA}/dashboard/pwa-revamp/komponen-lainnya`
    )

    setComponent(response.data.data.othersComponent)
  }

  useEffect(() => {
    getSectionById(id);
    getUnitData()
    getComponentData()
  }, [id]);

  useEffect(() => {
    let timed = moment_datetime(time, "HH:mm");

    if (searchParams?.mitra === t("partner2")) {
      if (
        timed.isAfter(moment_datetime("00:29", "HH:mm")) &&
        timed.isBefore(moment_datetime("06:00", "HH:mm"))
      ) {
        setAllCategory([
          {
            id: 8,
            label: "8 Jam",
          },
        ]);
        setDefaultDuration([
          {
            id: 8,
            label: "8 Jam",
          },
        ]);
        setDuration(8);
      } else {
        setAllCategory([
          {
            id: 8,
            label: "8 Jam",
          },
          {
            id: 4,
            label: "4 Jam",
          },
        ]);
        setDuration(4);
      }
    }
  }, [time]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(),
    onSubmit: async (values) => {

      const dtanggal = moment(tanggal).local().format("YYYY-MM-DD");

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
                othersArrayInSubSection.push({
                  others_column: others.others_column,
                  value: others.harga,
                  unit: others.satuans.satuan
                })
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
          komponen: component.komponen,
          harga: component.harga,
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
        needs: values.needs,
        location: values.location,
        nama_pic: values.nama_pic,
        nomor_pic: values.nomor_pic,
        id_layanan: locationUrl.pathname.split("/")[3]
      };

      const finalData = { ...formData, ...additionalFields };

      dispatch(
        await paymentPwan(
          finalData,
          navigate,
          "/corporate-security/section/checkout/"
        )
      );
    },
  });

  function validDate() {
    const dtanggalm = moment(tanggal);
    const dtanggals = moment();
    const diffdays = dtanggalm.diff(dtanggals, "days") + 1;

    if (searchParams?.mitra === t("partner2")) {
      if (diffdays < 3 && personel >= 3 && personel <= 5) {
        setErr1({
          iserr: true,
          message:
            "3 s/d 5 tenaga pengamanan dapat dipesan 3 hari sebelum acara dimulai",
        });
      } else if (diffdays < 5 && personel >= 6 && personel <= 10) {
        setErr1({
          iserr: true,
          message:
            "5 s/d 10 tenaga pengamanan dapat dipesan 5 hari sebelum acara dimulai",
        });
      } else if (diffdays < 7 && personel > 10) {
        setErr1({
          iserr: true,
          message:
            "Lebih dari 10 tenaga pengamanan dapat dipesan 7 hari sebelum acara dimulai",
        });
      } else {
        setErr1({ iserr: false });
      }
    }
  }
  useEffect(() => {
    validDate();
  }, [personel, tanggal]);
  // modal
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
  // marker ondrag
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
      //console.log(formik.values.jarak)
    } else {
      setJarak(hitungJarak(-6.32243985038034, 106.84738076294884, lat, lng));
    }
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        // let city, state, country;
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
            // eslint-disable-next-line default-case
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                // city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                // state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                // country = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
        // console.log("1", city, state, country);
        // console.log(address);
        setLocation(address);
        formik.setFieldValue("location", address);
        // console.log(address);
      },
      (error) => {
        console.log(error ? error : "");
      }
    );
  };

  //get location
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

        // console.log("a");
      },
      (error) => {
        console.error(error);
        dispatch(setLoading(false));
        showMessage("Location not found", "error");
      }
    );
  };

  function getInitialValues() {
    const initialValues = {};

    getDataSectionById?.section?.forEach((section) => {
      // Section
      initialValues[section.name] = '';

      // Subsection
      getDataSubSectionId
        .filter(subsection => subsection.section_id === section.id)
        .forEach((subsection) => {
          initialValues[subsection.name] = '';

          // Product di dalam subsection
          getProductById
            .filter(product => product.section_id === subsection.id)
            .forEach((product) => {
              initialValues[product.column] = ''; // Product columns
            });

          getOthersById
            .filter(others => others.url_id === subsection.id)
            .forEach((others) => {
              initialValues[others.others_column] = '';
            })
        });

      // Product langsung di section (tanpa subsection)
      getProductBySectionId
        .filter(product => product.section_id === section.id)
        .forEach((product) => {
          initialValues[product.column] = ''; // Product columns
        });
    });

    return initialValues;
  }

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

  return (
    <>
      <TopNewNav
        title={t("P1 Force")}
        path={`/services-list/${searchParams.mitra}`}
      />
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container">
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
                      {getDataSectionById?.layanan?.name}
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
                      placeholder={"Masukkan Keperluan Pengamanan Badan Usaha"}
                    />
                    {formik.errors.needs &&
                      formik.touched.needs ? (
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
                      <Gap height={10} />
                    </div>
                    <div className="col-6">
                      <div className="mb-2 form-group">
                        <LabelComponent label={t("guard3")} />
                        <TimePickerComponent value={time} onChange={setTime} />
                      </div>
                      <Gap height={10} />
                    </div>
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
                                    othersLayananById.url_id ===
                                    subsection.id
                                )
                                .map((othersById, othersIndex) => (
                                  <>
                                    <div key={othersIndex} className="row">
                                      <div className="col-md-7">
                                        <div className="mb-2 form-group">
                                          <div style={{ display: "flex", flexDirection: "row" }}>
                                            <LabelComponent label={othersById.others_column} />{" "}
                                            <span style={{ color: "red" }}>*</span>
                                          </div>
                                          <InputSelectComponent
                                            options={othersComponents}
                                            id={`partner_${othersById.id}`}
                                            onChange={(selectedOptions) => {
                                              if (selectedOptions.value === 1) {
                                                formik.setFieldValue(`harga_${othersById.id}`, othersById.harga)
                                              } else {
                                                formik.setFieldValue(`harga_${othersById.id}`, 0)
                                              }
                                              formik.setFieldValue(`partner_${othersById.id}`, selectedOptions.value)
                                            }}
                                            onBlur={() => formik.setFieldTouched(`partner_${othersById.id}`)}
                                            value={formik.values[`partner_${othersById.id}`] || 1}
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
                                      {/* <div className="col-md-5">
                                        <div className="mb-3 form-group">
                                          <div style={{ display: "flex", flexDirection: "row" }}>
                                            <LabelComponent label={'Satuan'} />{" "}
                                            <span style={{ color: "red" }}>*</span>
                                          </div>
                                          <Select
                                            options={getUnit}
                                            onChange={(selectedOptionSatuan) => formik.setFieldValue(`${othersById.others_column}_unit`, selectedOptionSatuan.value)}
                                            value={getUnit.find(option => option.value === formik.values[`${othersById.others_column}_unit`])}
                                            onBlur={() => formik.setFieldTouched(`${othersById}_unit`, true)}
                                            styles={{
                                              control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                padding: "0.18rem",
                                                fontSize: "0.9rem",
                                              }),
                                            }}
                                          />
                                        </div>
                                      </div> */}
                                    </div>
                                  </>
                                ))}
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
              {/* {directionResponse && (
                    <DirectionsRenderer directions={directionResponse} />
                  )} */}
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
  );
}

export default Section;
