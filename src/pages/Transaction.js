import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import Header from "./../parts/Header";
import { Input, Button, Form, Row, Col } from "react-bootstrap";
import ModalMap from "../parts/ModalMap";

function Transaction(props) {
  return (
    <div className="bg-warning">
      <Header />

      <div
        className=""
        style={{
          backgroundColor: "#E5E5E5",
          height: "100vh",
        }}
      >
        <div className="container pt-5">
          <Row>
            <Col>
              <Row>
                <Col>
                  <h1 className="h3 my-4">Income Transaction</h1>
                </Col>
              </Row>
              
              <Row>
                <table class="table table-striped">
                  <thead style={{backgroundColor: "#f6f6f6"}}>
                    <tr>
                      <th class="text-center" >No</th>
                      <th class="text-center" >Name</th>
                      <th class="text-center" >Address</th>
                      <th class="text-center" >product order</th>
                      <th class="text-center" >Status</th>
                      <th class="text-center" >Action</th>
                    </tr>
                  </thead>
                  <tbody style={{backgroundColor: "white"}}>
                    <tr>
                      <th>1</th>
                      <td>Sugeng No Pants</td>
                      <td>Cileungsi</td>
                      <td>Pkaket Geprek, Paket ke..</td>
                      <td className="text-warning">Waiting Approve</td>
                      <td className="d-flex justify-content-around">
                          <Button className="btn btn-danger btn-sm">Cancel</Button>
                          <Button className="btn btn-teal btn-sm">Approve</Button>
                      </td>
                    </tr>
                    <tr>
                      <th>2</th>
                      <td>Sugeng No Pants</td>
                      <td>Cileungsi</td>
                      <td>Pkaket Geprek, Paket ke..</td>
                      <td className="text-success">Success</td>
                      <td className="text-center">
                          <img src="/icons/success.svg" />
                      </td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>Sugeng No Pants</td>
                      <td>Cileungsi</td>
                      <td>Pkaket Geprek, Paket ke..</td>
                      <td className="text-danger">Cancel</td>
                      <td className="text-center">
                          <img src="/icons/cancel.svg" />
                      </td>
                    </tr>
                    <tr>
                      <th>4</th>
                      <td>Sugeng No Pants</td>
                      <td>Cileungsi</td>
                      <td>Pkaket Geprek, Paket ke..</td>
                      <td className="text-info">Waiting Approve</td>
                      <td className="text-center">
                          <img src="/icons/success.svg" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
