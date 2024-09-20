import moment from "moment-timezone";
import React from "react";
import { useState } from "react";
// import { useEffect } from "react";
import { Fragment } from "react";
import { Modal } from "react-bootstrap";
import { FaMinus, FaPlus, FaSearchLocation } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Geocode from "react-geocode";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import Loader from "../cummon/Loader";
import { useRef } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createKorporatAction } from "../../redux/slices/pengamanan-korporat/KorporatSlices";
import { decode as base64_decode } from "base-64";
import TitleHeader from "../utils/TitleHeader";
import DateTimePicker from "react-datetime-picker";

var CryptoJS = require("crypto-js");
const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

const formSchema = Yup.object({
  needs: Yup.string().required("Keperluan is required"),
  location: Yup.string().required("Lokasi is required"),
  time: Yup.date()
    .min(
      moment().add(3, "days").format("YYYY-MM-DD HH:mm"),
      "Waktu harus maju 3 hari dari jam sekarang"
    )
    .required("Tanggal is required"),
  ketentuan: Yup.boolean().oneOf([true], "Ketentuan is required"),
});

function PengamananKorporatMobile() {
  TitleHeader("Pengamanan Usaha dan Bisnis");
  const { t } = useTranslation();
  // const [map, setMap] = useState(null);
  const [libraries] = useState(["places"]);
  // const [directionResponse, setDirectionResponse] = useState(null);
  // const [distance, setDistance] = useState(null);
  // const [durationMap, setDurationMap] = useState(null);
  const [center, setCenter] = useState({});
  const [status, setStatus] = useState("");
  const [mapErr, setMapErr] = useState(false);
  // const [addressLocation, setAddressLocation] = useState("");
  const [show, setShow] = useState(false);
  const destinationRef = useRef();
  const [duration, setDuration] = useState(3);
  const [guard, setGuard] = useState(3);
  const [location, setLocation] = useState("");
  const [user, setUser] = useState();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const storeData = useSelector((store) => store?.korporat);
  const { loading } = storeData;

  useEffect(() => {
    handleUser();
    getLocation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUser = () => {
    let str = searchParams.get("query");
    var base64regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    if (!base64regex.test(str)) {
      if (!localStorage.getItem("data")) {
        console.log("salah");
        navigate("/login");
      }
    } else {
      let string = base64_decode(str);
      let cryptdata = string;
      const info2x = CryptoJS.AES.decrypt(cryptdata, secretKey).toString(
        CryptoJS.enc.Utf8
      );
      var data = "";
      if (!info2x) {
        console.log("salah");
      } else {
        data = JSON.parse(info2x);
        setUser(data);
        localStorage.setItem("data", JSON.stringify(data));
      }
      if (!localStorage.getItem("data")) {
        if (!data.user_id) {
          console.log("salah");
          navigate("/login");
        }
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tnos_service_id: "2",
      tnos_subservice_id: "2",
      user_id: user?.user_id,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      needs: "",
      time: "",
      location: "",
      ketentuan: false,
    },
    onSubmit: (values) => {
      values.datetime = moment(values.time)
        .local()
        .format("YYYY-MM-DD HH:mm:ss");
      values.duration = duration;
      values.jml_personil = guard;
      console.log(values);
      dispatch(createKorporatAction(values))
        .then(({ payload }) => {
          // console.log(payload?.message);
          if (payload?.success === true) {
            // toast.success(payload?.message);
            navigate(`/pengamanan-korporat-m/detail/` + payload?.detail?.id);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validationSchema: formSchema,
  });

  const add = () => {
    if (duration >= 12) {
      return false;
    }
    setDuration(duration + 1);
  };
  const min = () => {
    if (duration <= 3) {
      return false;
    }

    setDuration(duration - 1);
  };
  const addGuard = () => {
    setGuard(guard + 1);
  };
  const minGuard = () => {
    if (guard <= 3) {
      return false;
    }
    setGuard(guard - 1);
  };

  // const calculateRoute = async () => {
  //   console.log(originRef.current.value);
  //   if (originRef.current.value === "" || destinationRef.current.value === "") {
  //     return;
  //   }
  //   // eslint-disable-next-line no-undef
  //   const directionService = new google.maps.DirectionsService();
  //   const results = await directionService.route({
  //     origin: originRef.current.value,
  //     destination: destinationRef.current.value,
  //     // eslint-disable-next-line no-undef
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   });

  //   setDirectionResponse(results);
  //   setDistance(results.routes[0].legs[0].distance.text);
  //   setDurationMap(results.routes[0].legs[0].duration.text);
  // };

  // const clearRoute = () => {
  //   setDirectionResponse(null);
  //   setDistance("");
  //   setDurationMap("");

  //   originRef.current.value = "";
  //   destinationRef.current.value = "";
  // };

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
      toast.error(error?.message ? error?.message : "Something wrong", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // if (!navigator.geolocation) {
    //   setStatus("Geolocation is not supported by your browser");
    //   setMapErr(true);
    //   console.log("1");
    // } else {
    //   setStatus("Locating...");
    //   console.log("2");
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       setCenter({
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude,
    //       });
    //       setMapErr(false);
    //     },
    //     () => {
    //       setStatus(
    //         "Unable to retrieve your location, Please enable GPS location on your browser and device"
    //       );
    //       setMapErr(true);
    //       console.log("4");
    //     }
    //   );
    // }
  };

  const getLatLngFromAdress = () => {
    // console.log("ini cek");
    setLoader(true);
    Geocode.fromAddress(destinationRef.current.value).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setCenter({
          lat: lat,
          lng: lng,
        });
        setLocation(destinationRef.current.value);
        formik.setFieldValue("location", destinationRef.current.value);

        setLoader(false);
        toast.success("Select a location successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // console.log("a");
      },
      (error) => {
        console.error(error);
        setLoader(false);
        toast.error("Location not found", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    );
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log(center);
  const onMarkerDragEnd = (coord) => {
    const { latLng } = coord;

    const lat = latLng.lat();
    const lng = latLng.lng();
    if (!lat || !lng) {
      toast.error("Location not found", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    toast.success("Select a location successfully", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setCenter({
      lat: lat,
      lng: lng,
    });

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
      },
      (error) => {
        console.log(error ? error : "");
      }
    );
  };

  const handleOnchangeTime = (value) => {
    formik.setFieldValue("time", value);
  };

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="njwdjhwk" style={{ padding: "20px 20px 50px 20px" }}>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12 col-12">
                <p className="text-justify jjdw">{t("p_k")}</p>
              </div>
            </div>
            <hr />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />

            <form onSubmit={formik.handleSubmit} noValidate>
              <div className="form-group mb-2">
                <label htmlFor="needs">*Keperluan Pengamanan</label>
                <textarea
                  name="needs"
                  id="needs"
                  cols="10"
                  rows="5"
                  value={formik.values.needs}
                  onChange={formik.handleChange("needs")}
                  onBlur={formik.handleBlur("needs")}
                  className={`form-control form-layanan  ${
                    formik.errors.needs && "is-invalid"
                  }`}
                ></textarea>
                {formik.touched.needs && (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.needs}
                  </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="location">
                  *{t("alamat_k")} (
                  {mapErr ? (
                    status
                  ) : (
                    <span
                      type="button"
                      className="text-warning"
                      onClick={handleShow}
                    >
                      Map <FaSearchLocation />
                    </span>
                  )}
                  )
                </label>
                <textarea
                  name="location"
                  id="location"
                  cols="10"
                  rows="5"
                  value={formik.values.location}
                  onChange={formik.handleChange("location")}
                  onBlur={formik.handleBlur("location")}
                  className={`form-control form-layanan  ${
                    formik.errors.location && "is-invalid"
                  }`}
                ></textarea>

                {formik.touched.location && (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formik.errors.location}
                  </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="time">*{t("waktu_k")}:</label>
                <DateTimePicker
                  value={formik.values.time ? formik.values.time : ""}
                  onChange={handleOnchangeTime}
                  onBlur={formik.handleBlur("time")}
                  className="datetime-style-dawd"
                  minDate={
                    new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
                  }
                  format="y-MM-dd HH:mm:ss"
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="durasi">*{t("jumlah_k")}</label>
                <div className="durasi-kkdmm">
                  <span onClick={() => minGuard()} className="minus-ssdwa">
                    <FaMinus />
                  </span>
                  <span className="durasi">
                    {guard} {t("personil")}
                  </span>
                  <span onClick={() => addGuard()} className="plus-ssdwa">
                    <FaPlus />
                  </span>
                </div>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="durasi">*{t("durasi_k")}</label>
                <div className="durasi-kkdmm">
                  <span onClick={() => min()} className="minus-ssdwa">
                    <FaMinus />
                  </span>
                  <span className="durasi">
                    {duration} {t("jam")}
                  </span>
                  <span onClick={() => add()} className="plus-ssdwa">
                    <FaPlus />
                  </span>
                </div>
              </div>
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  id="ketentuan"
                  value={formik.values.ketentuan}
                  onChange={formik.handleChange("ketentuan")}
                  onBlur={formik.handleBlur("ketentuan")}
                  className={`form-check-input  ${
                    formik.errors.ketentuan && "is-invalid"
                  }`}
                />
                <label
                  className="form-check-label"
                  htmlFor="ketentuan"
                  style={{ fontSize: "13px" }}
                >
                  Saya Menyetujui Ketentuan Dan Persyaratan{" "}
                  <span
                    onClick={() =>
                      window.open(
                        "https://tnosbantuan.freshdesk.com/support/solutions/articles/150000042230",
                        "_blank"
                      )
                    }
                    style={{
                      borderBottom: `${
                        formik.errors.ketentuan
                          ? "1px solid rgb(223 85 93)"
                          : "1px solid rgb(167 167 167)"
                      }`,
                      cursor: "pointer",
                    }}
                  >
                    Membatalkan Pemesanan Layanan Pengamanan Korporat
                  </span>
                </label>
              </div>
              <div className="form-group  mt-3">
                {loading ? (
                  <button
                    className="btn btn-layanan w-100"
                    type="submit"
                    disabled
                  >
                    Loading...
                  </button>
                ) : (
                  <button className="btn btn-layanan w-100" type="submit">
                    Lanjut Pembayaran
                  </button>
                )}
              </div>
            </form>

            <Modal tabIndex="-1" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Cari lokasi atau pilih lokasi dari map
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="kdjn-dkwd">
                  <div className="input-group ">
                    <Autocomplete className="input-auto-dld">
                      <input
                        type="text"
                        className="form-control form-layanan"
                        ariaLabel="Masukan lokasi"
                        ariaDescribedby="basic-addon2"
                        ref={destinationRef}
                        style={{ borderRadius: "0px" }}
                      />
                    </Autocomplete>
                    {loader ? (
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
                        className="input-group-text bg-primary text-white"
                        id="basic-addon2"
                        onClick={() => getLatLngFromAdress()}
                      >
                        <FaSearchLocation />
                      </span>
                    )}
                  </div>
                </div>
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
                <hr />
                <div>
                  <span className="text-danger">Contoh penulisan lokasi</span>:{" "}
                  <b>
                    {location ? location : "Lokasi belum dipilih"}, (dekat
                    gedung A), (rumah warna merah) dan lain lain.
                  </b>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button className="btn btn-layanan " onClick={handleClose}>
                  Close
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default PengamananKorporatMobile;
