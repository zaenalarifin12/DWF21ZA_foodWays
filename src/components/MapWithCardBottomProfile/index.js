import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
  PureComponent,
} from "react";
import { withRouter } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import ReactMapGL, {
  Marker,
  NavigationControl,
  GeolocateControl,
  CanvasOverlay,
} from "react-map-gl";

import { MAPBOX_TOKEN } from "../../config/Constants";
import "../../assets/map.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Geocoder from "react-map-gl-geocoder";

import { API } from "../../config/api";

import ControlPanel from "./ControlPanel";
import Pin from "../Pin";
import axios from "axios";
import { MapContext } from "../../context/MapContext";
const TOKEN = MAPBOX_TOKEN;
const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px",
};

function MapWithCardBottomProfile(props) {
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
  });
  const [marker, setMarker] = useState({
    latitude: 40,
    longitude: -100,
  });

  const [stateMap, dispatchMap] = useContext(MapContext);

  const [events, logEvents] = useState({});

  const onMarkerDragStart = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));
  }, []);

  const onMarkerDragEnd = useCallback(async (event) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });

    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.lngLat[0]},${event.lngLat[1]}.json?access_token=${TOKEN}`
    );

    dispatchMap({
      type: "EDIT_MAP",
      payload: {
        name: response.data.features[0].text,
        address: response.data.features[0].place_name,
        longtitude: event.lngLat[0],
        latitude: event.lngLat[1],
        time: "10 - 11 menit",
      },
    });
  }, []);

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  async function success(pos) {
    var crd = pos.coords;
    setViewport({
      latitude: crd.latitude,
      longitude: crd.longitude,
    });
    setMarker({
      latitude: crd.latitude,
      longitude: crd.longitude,
    });

    // untuk mendapatkan nama (reverce geocoding)
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${crd.longitude},${crd.latitude}.json?access_token=${TOKEN}`
    );

    dispatchMap({
      type: "EDIT_MAP",
      payload: {
        name: response.data.features[0].text,
        address: response.data.features[0].place_name,
        longtitude: crd.longitude,
        latitude: crd.latitude,
        time: "10 - 11 menit",
      },
    });
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);
  const geolocateControlStyle = {
    right: 10,
    top: 10,
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{ padding: 0 }}>
        <div>
          <div>
            <ReactMapGL
              {...viewport}
              width="100%"
              height="700px"
              mapStyle="mapbox://styles/mapbox/streets-v9"
              onViewportChange={setViewport}
              mapboxApiAccessToken={MAPBOX_TOKEN}
            >
              <GeolocateControl
                style={geolocateControlStyle}
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
                auto
              />
              <Marker
                longitude={marker.longitude}
                latitude={marker.latitude}
                offsetTop={-20}
                offsetLeft={-10}
                draggable
                onDragStart={onMarkerDragStart}
                onDrag={onMarkerDrag}
                onDragEnd={onMarkerDragEnd}
              >
                <Pin size={20} />
              </Marker>

              <div className="nav" style={navStyle}>
                <NavigationControl />
              </div>
              <ControlPanel
                onClickButton={props.onClickButton}
                events={events}
              />
            </ReactMapGL>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default MapWithCardBottomProfile;
