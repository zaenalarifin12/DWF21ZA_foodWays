import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

import "../../assets/map.css";

import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import { MAPBOX_TOKEN } from "../../config/Constants";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = MAPBOX_TOKEN;

function Map() {
  const mapContainer = useRef();
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    var map = new mapboxgl.Map({
      container: mapContainer.current,

      style: "mapbox://styles/mapbox/streets-v11",
      center: [-79.4512, 43.6568],
      zoom: 13,
    });

    map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
      }),
      "top-left"
    );

    // const map = new mapboxgl.Map({
    //   container: mapContainer.current,
    //   style: "mapbox://styles/mapbox/streets-v11",
    //   center: [lng, lat],
    //   zoom: zoom,
    // });

    // const directions = new Directions({
    //   accessToken: mapboxgl.accessToken,
    //   unit: 'metric',
    //   profile: 'mapbox/driving'
    // })

    // map.addControl(directions, 'top-left');

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    //

    return () => map.remove();
  }, []);

  return (
    <div>
      <div className="map-container" ref={mapContainer} />
    </div>
  );
}

export default Map;
