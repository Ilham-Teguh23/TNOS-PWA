import axios from "axios";
import moment from "moment-timezone";
import React from "react";
import { useState } from "react";
// import { useEffect } from "react";
import { Fragment } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { FaMinus, FaPlus, FaSearchLocation } from "react-icons/fa";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Geocode from "react-geocode";
import gk from "../../assets/images/gk.png";
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
// import aes from "crypto-js/aes";
// import encHex from "crypto-js/enc-hex";
// import padZeroPadding from "crypto-js/pad-zeropadding";
// import { useDispatch } from "react-redux";
// import { AuthenticationAction } from "../../redux/slices/users/UserSlices";
import { decode as base64_decode } from "base-64";
var CryptoJS = require("crypto-js");
const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

function PengamananKorporatMobile() {
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState();

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(AuthenticationAction());
  // }, []);
  useEffect(() => {
    handleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //if (searchParams.get("query")) {

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

  const [needs, setNeeds] = useState("");
  const [time, setTime] = useState(
    moment().add(3, "days").format("YYYY-MM-DD HH:mm")
  );
  const [duration, setDuration] = useState(3);
  const [guard, setGuard] = useState(3);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const [formError, setFormError] = useState({
    needs: "",
    name: "",
    email: "",
    phone: "",
    time: "",
    duration: "",
    location: "",
  });
  const [loader, setLoader] = useState(false);

  const handleUser = () => {
    let str = searchParams.get("query");
    var base64regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    if (!base64regex.test(str)) {
      console.log("salah");
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
      }

      if (data.user_id) {
        setUser(data);
        console.log("-------------------------------------------------------");
        console.log(data);
        console.log("-------------------------------------------------------");
      } else {
        console.log("salah");
      }
    }
  };

  const onChangeDatetime = (e) => {
    const time_now = moment(e).format("YYYY-MM-DD HH:mm");
    const time_add_hour = moment().add(3, "days").format("YYYY-MM-DD HH:mm");

    if (time_now < time_add_hour) {
      toast.error(
        "waktu harus maju 3 hari dari jam sekarang " +
          moment().format("YYYY-MM-DD HH:mm").toString(),
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      // console.log("waktu tidak boleh kurang");
      setTime(time_add_hour);
    } else {
      // console.log("waktu boleh");
      setTime(e);
    }
  };

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

  const onSubmitOrder = async (e) => {
    e.preventDefault();
    const date_new = moment(time).local().format("YYYY-MM-DD HH:mm:ss");
    const data = {
      tnos_service_id: "2",
      tnos_subservice_id: "2",
      needs: needs,
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      time: date_new,
      duration: duration,
      location: location,
      jml_personil: guard,
    };
    setLoader(true);
    setFormError({
      needs: "",
      name: "",
      email: "",
      phone: "",
      time: "",
      duration: "",
    });
    const url = `${process.env.REACT_APP_API_PWA}/pengamanan-korporat/in-order`;
    await axios
      .post(url, data)
      .then((res) => {
        console.log(res);
        setLoader(false);
        if (res.data.error) {
          setFormError({
            needs: res.data.error.needs,
            name: res.data.error.name,
            email: res.data.error.email,
            phone: res.data.error.phone,
            time: res.data.error.time,
            duration: res.data.error.duration,
            location: res.data.error.location,
          });
        }

        navigate(`/pengamanan-korporat-m/detail/` + res.data.detail.id);
      })
      .catch((res) => {
        console.log(res);
        toast.error(
          res.response.data.message
            ? res.response.data.message
            : "there is something wrong",
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );

        setLoader(false);
      });
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
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
      setMapErr(true);
      console.log("1");
    } else {
      setStatus("Locating...");
      console.log("2");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setMapErr(false);
        },
        () => {
          setStatus(
            "Unable to retrieve your location, Please enable GPS location on your browser and device"
          );
          setMapErr(true);
          console.log("4");
        }
      );
    }
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) {
    return <Loader />;
  }

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

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

    Geocode.setLanguage("en");

    Geocode.setRegion("id");

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
      },
      (error) => {
        console.log(error ? error : "");
      }
    );
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Fragment>
      <div className="responsive-class">
        <div className="res-class">
          <div className="njwdjhwk" style={{ marginTop: "20px" }}>
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8 col-xl-8 col-12">
                <p className="text-justify jjdw">{t("p_k")}</p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xl-4 col-12">
                <img src={gk} alt="" className="img-xy" />
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

            <form onSubmit={(e) => onSubmitOrder(e)} noValidate>
              <div className="form-group mb-2">
                <label htmlFor="keperluan">*{t("keperluan_k")}</label>
                <textarea
                  name="keperluan"
                  id="keperluan"
                  cols="10"
                  rows="5"
                  className={`form-control form-layanan ${
                    formError.needs ? "is-invalid" : ""
                  }`}
                  value={needs}
                  onChange={(e) => setNeeds(e.target.value)}
                ></textarea>
                {formError.needs ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.needs}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="alamat">
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
                  name="keperluan"
                  id="alamat"
                  cols="10"
                  rows="5"
                  className={`form-control form-layanan ${
                    formError.location ? "is-invalid" : ""
                  }`}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                ></textarea>
                {formError.location ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.location}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group mb-2">
                <label htmlFor="no_telepon">*{t("waktu_k")}:</label>
                <input
                  type="datetime-local"
                  name="time"
                  className={`form-control form-layanan ${
                    formError.time ? "is-invalid" : ""
                  }`}
                  value={time}
                  onChange={(e) => onChangeDatetime(e.target.value)}
                />
                {formError.time ? (
                  <div
                    id="validationServer03Feedback"
                    className="invalid-feedback"
                  >
                    {formError.time}
                  </div>
                ) : (
                  ""
                )}
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
              <div className="form-group  mt-3">
                <button
                  className="btn btn-layanan w-100"
                  type="submit"
                  disabled={loader}
                >
                  {loader ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Lanjut Pembayaran"
                  )}
                </button>
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
