import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
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
import PolylineOverlay from "./PolylineOverlay";
import { timeConverter } from "../../utils/timeConverter";
import { useQuery } from "react-query";
import { MapContext } from "../../context/MapContext";
const TOKEN = MAPBOX_TOKEN;
const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px",
};

function MapTransaction(props) {
  const [viewport, setViewport] = useState({
    latitude: -7.005396,
    longitude: 110.402295,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });
  const [stateMap, dispatchMap] = useContext(MapContext);
  
  const [marker, setMarker] = useState({
    latitude: -7.005396,
    longitude: 110.402295,
  });

  const [markerSecond, setMarkerSecond] = useState({
    latitude: -7.013689,
    longitude: 110.389696,
  });

  const [events, logEvents] = useState({});

  const [coordinates, setCoordinates] = useState([]);

  const [time, setTime] = useState("");

  const [partner, setPartner] = useState(null);

  const [user, setUser] = useState(null)

  const {
    data: partnerData,
    loading: partnerLoading,
    error: partnerError,
    refetch: partnerRefetch,
  } = useQuery("direction", async () => {
    let partnerId = localStorage.getItem("partnerId");
    const response = await API.get(`/user/${partnerId}`);

    setPartner(response?.data?.data?.user);
  });

  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch: userRefetch,
  } = useQuery("userDatalocation", async () => {
    
    const response = await API.get(`/check-auth`);

    setUser(response?.data?.data?.user);
    getLocation()
  },
  {
    // Refetch the data every second
    refetchInterval: 5000,
  });

  const getLocation = async () => {
    let location1 = user?.location;
    let location2 = partner?.location;

    const response = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${location1};${location2}?alternatives=false&geometries=geojson&steps=false&access_token=${TOKEN}`
    );

    setMarker({
      latitude: response.data.waypoints[0].location[1],
      longitude: response.data.waypoints[0].location[0],
    });

    setMarkerSecond({
      latitude: response.data.waypoints[1].location[1],
      longitude: response.data.waypoints[1].location[0],
    });

    setCoordinates(response.data.routes[0].geometry.coordinates);

    setTime(timeConverter(response.data.routes[0].legs[0].duration));
  };

  // useEffect(() => {
  //   getLocation();
    
  // }, []);

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
              <PolylineOverlay points={coordinates} />

              <Marker
                longitude={marker.longitude}
                latitude={marker.latitude}
                offsetTop={-20}
                offsetLeft={-10}
              >
                <Pin size={20} />
              </Marker>

              <Marker
                longitude={markerSecond.longitude}
                latitude={markerSecond.latitude}
                offsetTop={-20}
                offsetLeft={-10}
              >
                <Pin size={20} />
              </Marker>

              <div className="nav" style={navStyle}>
                <NavigationControl />
              </div>
              <ControlPanel
              onClickButton={props.onClickButton}
              time={time} events={events} />
            </ReactMapGL>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default MapTransaction;
