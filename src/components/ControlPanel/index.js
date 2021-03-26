import React from "react";
import { Col, Row } from "react-bootstrap";

const eventNames = ["onDragStart", "onDrag", "onDragEnd"];

function round5(value) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

const navStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  padding: "10px",
};

function ControlPanel(props) {
  return (
    <div className="control-panel" style={navStyle}>
      <div class="card" style={{ width: 400 }}>
        <div class="card-body">
          <p className="font-weight-bold">
            Waiting for the transaction to be approved
          </p>
          <Row>
            <Col xs={3}>
              <img src="icons/marker.svg" />
            </Col>
            <Col>
              <Row>
                <span className="font-weight-bold">Harbour Building</span>
              </Row>
              <Row className>
                Jl. Elang IV No.48, Sawah Lama, Kec. Ciputat, Kota Tangerang
                Selatan, Banten 15413, Indonesia
              </Row>
            </Col>
          </Row>
          <p className="mt-2 font-weight-bold">Delivery time</p>
          <p>10 - 15 Minutes</p>
          {/* <div>
            {eventNames.map((eventName) => {
              const { events = {} } = props;
              const lngLat = events[eventName];
              return (
                <div key={eventName}>
                  <strong>{eventName}:</strong>{" "}
                  {lngLat ? lngLat.map(round5).join(", ") : <em>null</em>}
                </div>
              );
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
