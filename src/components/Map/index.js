import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import MapGL, { Marker } from "react-map-gl";

import { MAPBOX_TOKEN } from "../../config/Constants";

import "../../assets/map.css";

function Map() {
  const [lotitude, setLotitude] = useState(0);
  const [langtitude, setLangtitude] = useState(0);

  const [viewport, setViewport] = useState({
    latitude: langtitude,
    longitude: lotitude,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    let crd = pos.coords;

    setViewport({
      latitude: crd.latitude,
      longitude: crd.longitude,
      zoom: 14,
      bearing: 0,
      pitch: 0,
    });
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [langtitude, lotitude]);

  return (
    <div>
      <MapGL
        {...viewport}
        width="auto"
        height="50vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Marker
          latitude={langtitude}
          longitude={lotitude}
          offsetLeft={-20}
          offsetTop={-40}
        >
          <div>You are here</div>
        </Marker>
      </MapGL>
    </div>
  );
}

export default Map;
