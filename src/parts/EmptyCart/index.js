import React from "react";
import { Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <>
      <div style={{ paddingTop: "200px" }}>
        <div className="container d-flex justify-content-center">
          <img src="/images/cart.png" class="mr-4" />
          <span>Keranjang Kosong</span>
        </div>
        <div className="container d-flex justify-content-center mt-5">
          <Button as={Link} to={`/`} className="btn btn-choco ">Pesan Sekarang</Button>
        </div>
      </div>
    </>
  );
}
