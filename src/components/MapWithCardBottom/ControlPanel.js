import React, { useContext } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { MapContext } from "../../context/MapContext";

const eventNames = ["onDragStart", "onDrag", "onDragEnd"];

function round5(value) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

const navStyle = {
  position: "absolute",
  bottom: 0,
  right: 180,
  padding: "10px",
};

function ControlPanel(props) {
  const [stateMap, dispatchMap] = useContext(MapContext);
  
  return (
    <div className="control-panel" style={navStyle}>
      <div class="card" style={{ width: 400 }}>
        <div class="card-body">
          <p className="font-weight-bold">Select My Location</p>
          <Row>
            <Col xs={3}>
              <img src="icons/marker.svg" />
            </Col>
            <Col>
              <Row>
                <span className="font-weight-bold">{stateMap.name}</span>
              </Row>
              <Row className>{stateMap.address}</Row>
            </Col>
          </Row>
          <Button
            onClick={props.onClickButton}
            className="mt-2 btn btn-sm btn-block btn-choco"
          >
            Confirm Location
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
