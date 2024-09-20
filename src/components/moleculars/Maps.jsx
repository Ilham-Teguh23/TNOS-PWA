import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "../atoms/Marker";

function Maps() {
  const [center, setCenter] = useState({
    lat: 10.99835602,
    lng: 77.01502627,
  });
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          console.log(center);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        // defaultCenter={center}
        center={center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker lat={center.lat} lng={center.lng} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}

export default Maps;
