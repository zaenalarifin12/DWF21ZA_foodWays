import React from "react";
import Fade from "react-reveal/Fade";

function Hero() {
  return (
    <div className="bg-warning">
      <div className="container p-4">
        <div className="row">
          <Fade left delay={100}>
            <div className="col my-auto">
              <h1>Are You Hungry ?</h1>
              <h1>Express Home Delivery</h1>
              <div className="row mt-4">
                <div className="col">
                  <img width="100%" src="/images/line.png" />
                </div>
                <div className="col">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s.
                  </p>
                </div>
              </div>
            </div>
          </Fade>
          <Fade top>
            <div className="col">
              <img src="/images/food.png" alt="food" />
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}

export default Hero;
