import React, { useEffect, useRef, useState } from "react";
import LabelComponent from "../../atoms/LabelComponent";
import InputAreaComponent from "../../atoms/InputAreaComponent";
import DatePickerComponent from "../../atoms/DatePickerComponent";
import TimePickerComponent from "../../atoms/TimePickerComponent";
import Gap from "../../moleculars/Gap";
import ButtonComponent from "../../atoms/ButtonComponent";
import { useNavigate } from "react-router-dom";
import ButtonClick from "../../moleculars/ButtonClick";
import { showMessage } from "../../utils/Message";
import Geocode from "react-geocode";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/action/globalAction";
import { FaSearchLocation } from "react-icons/fa";
import Loading from "../../utils/Loading";
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment-timezone";
import TextError from "../../atoms/TextError";
import { paymentPengamananKorporat } from "../../../redux/action/paymentAction";
import TitleHeader from "../../utils/TitleHeader";

import { decode as base64_decode } from "base-64";
import { getParams } from "../../moleculars/GetParams";
import InputCheckboxComponent from "../../atoms/InputCheckboxComponent";
var CryptoJS = require("crypto-js");
const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;

const formSchema = Yup.object({
  needs: Yup.string().required("Keperluan is required"),
  location: Yup.string().required("Lokasi is required"),
  ketentuan_cek: Yup.boolean().oneOf([true], "Ketentuan is required"),
});
function PengamananKorporatMobile() {
  TitleHeader("Halaman Pengamanan");
  const newDate = new Date(new Date());
  const [tanggal, setTanggal] = useState(
    newDate.setDate(newDate.getDate() + 3)
  );
  const [time, setTime] = useState(
    newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds()
  );
  const [personel, setPersonel] = useState(3);
  const [duration, setDuration] = useState(3);
  const [center, setCenter] = useState({});
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [mapErr, setMapErr] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const navigate = useNavigate();
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

  useEffect(() => {
    checkParams();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (!isLoaded) {
    <Loading />;
  }

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
      ketentuan_cek: false,
    },
    onSubmit: async (values) => {
      // const answer_array = values.time.split(",");
      // console.log(answer_array);

      const dtanggal = moment(tanggal).local().format("YYYY-MM-DD");
      values.datetime = `${dtanggal} ${time}`;

      // values.datetime =
      values.duration = duration;
      values.jml_personil = personel;
      // console.log(values);
      dispatch(
        await paymentPengamananKorporat(
          values,
          navigate,
          "/pengamanan-korporat-m/checkout/"
        )
      );
    },
    validationSchema: formSchema,
  });

  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  return (
    <>
      {/* <TopNewNav title="Pengamanan Usaha dan Bisnis" path={`/dashboard`} /> */}
      <div className="container-class">
        <div className="responsive-class">
          <div className="res-class">
            <div className="payment-container" style={{ marginTop: "0px" }}>
              <div className="payment-content">
                <div className="container-layanan-f">
                  <div className="form-group mb-2">
                    <LabelComponent label="Keperluan Pengamanan untuk" />
                    <InputAreaComponent
                      value={formik.values.needs}
                      onChange={formik.handleChange("needs")}
                      onBlur={formik.handleBlur("needs")}
                      placeholder={"Masukkan "}
                    />
                    {formik.errors.needs && formik.touched.needs ? (
                      <TextError error={formik.errors.needs} />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group mb-2">
                    <LabelComponent
                      label={
                        <div>
                          Masukkan lokasi pengamanan{" "}
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
                              <span
                                type="button"
                                className="text-warning"
                                onClick={handleShow}
                              >
                                Map 🔍
                              </span>
                            )}
                            )
                          </span>
                        </div>
                      }
                    />
                    <InputAreaComponent
                      placeholder={"Masukkan Lokasi"}
                      value={formik.values.location}
                      onChange={formik.handleChange("location")}
                      onBlur={formik.handleBlur("location")}
                    />
                    {formik.errors.location && formik.touched.location ? (
                      <TextError error={formik.errors.location} />
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="form-group mb-2">
                        <LabelComponent label="Tanggal" />
                        <DatePickerComponent
                          tanggal={tanggal}
                          setTanggal={setTanggal}
                          style={{ padding: "0.6rem" }}
                          minDateNumber={3}
                        />
                      </div>
                      <Gap height={10} />
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-2">
                        <LabelComponent label="Jam" />
                        <TimePickerComponent value={time} onChange={setTime} />
                      </div>
                      <Gap height={10} />
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-2">
                        <LabelComponent label="Durasi Pengamanan" />
                        <ButtonClick
                          value={duration}
                          setValue={setDuration}
                          minValue={3}
                          maxValue={12}
                          addValue={1}
                          type="jam"
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-2">
                        <LabelComponent label="Tenaga pengamanan" />
                        <ButtonClick
                          value={personel}
                          setValue={setPersonel}
                          minValue={3}
                          maxValue={8}
                          addValue={1}
                          type="personel"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-2">
                    <InputCheckboxComponent
                      id="ketentuan_cek"
                      label="Saya menyetujui ketentuan & persyaratan Pemesanan
                        Layanan"
                      value={formik.values.ketentuan_cek}
                      onChange={formik.handleChange("ketentuan_cek")}
                      onBlur={formik.handleBlur("ketentuan_cek")}
                      typeLayanan="pengamanan"
                    />
                    {formik.errors.ketentuan_cek &&
                    formik.touched.ketentuan_cek ? (
                      <TextError error={formik.errors.ketentuan_cek} />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <Gap height={70} />
                <ButtonComponent
                  title={"Lanjut Pembayaran"}
                  onClick={formik.handleSubmit}
                  type="button"
                  // onClick={() => handlePayment()}
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
                  className="input-group-text bg-primary text-white"
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

export default PengamananKorporatMobile;
