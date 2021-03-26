import React, {
  useState,
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

import ControlPanel from "../ControlPanel";
import Pin from "../Pin";
import axios from "axios";
const TOKEN = MAPBOX_TOKEN;
const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px",
};

// import React, { PureComponent } from 'react'
// import { CanvasOverlay } from 'react-map-gl'

class PolylineOverlay extends PureComponent {
  _redraw({ width, height, ctx, isDragging, project, unproject }) {
    const {
      points,
      color = "red",
      lineWidth = 2,
      renderWhileDragging = true,
    } = this.props;
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";

    if ((renderWhileDragging || !isDragging) && points) {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
      ctx.beginPath();
      points.forEach((point) => {
        const pixel = project([point[0], point[1]]);
        ctx.lineTo(pixel[0], pixel[1]);
      });
      ctx.stroke();
    }
  }

  render() {
    return <CanvasOverlay redraw={this._redraw.bind(this)} />;
  }
}

function Map() {
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
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${marker.longitude},${marker.longitude}.json?access_token=${TOKEN}`
    );

    console.log(response);
  }, []);

  // -6.477959, 110.735870

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  async function success(pos) {
    var crd = pos.coords;
    setMarker({
      latitude: crd.latitude,
      longitude: crd.longitude,
    });

    // untuk mendapatkan nama (reverce geocoding)
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${crd.longitude},${crd.latitude}.json?access_token=${TOKEN}`
    );

    const responsex = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/-73.996,40.732;-73.991,40.735.json?access_token=${TOKEN}`
    );

    console.log(responsex);
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
    // map.addControl(
    //   new mapboxgl.GeolocateControl({
    //     positionOptions: {
    //       enableHighAccuracy: true,
    //     },
    //     trackUserLocation: true,
    //   })
    // );
  }, []);
  const geolocateControlStyle = {
    right: 10,
    top: 10,
  };
  return (
    <div>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="700px"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <PolylineOverlay
          points={[
            [
              166.911692,
              -77.913968
            ],
            [
              166.929016,
              -77.90812
            ],
            [
              166.947212,
              -77.897579
            ],
            [
              166.949008,
              -77.888564
            ],
            [
              166.569408,
              -77.94875
            ],
            [
              166.516897,
              -77.952685
            ]
          ]}
        />

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
        <ControlPanel events={events} />
      </ReactMapGL>
    </div>
  );
}

export default Map;
