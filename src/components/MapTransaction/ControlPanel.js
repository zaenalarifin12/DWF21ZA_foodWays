import { Button } from "react-bootstrap";
import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { MapContext } from "../../context/MapContext";

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
  const [stateMap, dispatchMap] = useContext(MapContext);

  const { data, loading, erorr, refetch } = useQuery(
    "dataIdTransaksi",
    async () => {
      const id = localStorage.getItem("transaction");
      const response = API.get(`/transaction/${id}`);

      return response;
    },
    {
      refetchInterval: 1000,
    }
  );

  return (
    <div className="control-panel" style={navStyle}>
      <div class="card" style={{ width: 400 }}>
        <div class="card-body">
          <p className="font-weight-bold">
            {data?.data.data?.transaction?.status == "on the way"
              ? "Driver On The Way"
              : "Waiting for the transaction to be approved"}
          </p>
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
          <p className="mt-2 font-weight-bold">Delivery time</p>
          <p>{props.time}</p>
          {data?.data.data?.transaction?.status == "on the way" ? (
            <Button
              onClick={props.onClickButton}
              className="btn btn-sm btn-choco btn-block font-weight-bold"
            >
              Finished Order
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
